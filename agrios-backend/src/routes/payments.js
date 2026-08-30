const router = require('express').Router();
const { query } = require('../config/db');
const { authenticate } = require('../middleware/auth');
const { ok, err } = require('../utils/response');
const crypto = require('crypto');

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE = 'https://api.paystack.co';

const PLANS = {
  pro:      { name: 'Agrios Pro',      amount: 250000,   tier: 'pro',      duration_days: 30  }, // ₦2,500 in kobo
  business: { name: 'Agrios Business', amount: 1500000,  tier: 'business', duration_days: 30  }, // ₦15,000 in kobo
  pro_year: { name: 'Agrios Pro Annual',amount: 2500000, tier: 'pro',      duration_days: 365 }, // ₦25,000/year
};

const paystackReq = async (path, method = 'GET', body = null) => {
  const fetch = require('node-fetch');
  const res = await fetch(PAYSTACK_BASE + path, {
    method,
    headers: {
      'Authorization': `Bearer ${PAYSTACK_SECRET}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return await res.json();
};

// POST /api/payments/initiate — start checkout
router.post('/initiate', authenticate, async (req, res) => {
  const { plan } = req.body;
  if (!PLANS[plan]) return err(res, 'Invalid plan. Choose: pro, business, or pro_year');
  if (!PAYSTACK_SECRET) return err(res, 'Payment not configured — contact support');
  
  const planData = PLANS[plan];
  try {
    const reference = `AGR-${req.user.id.split('-')[0].toUpperCase()}-${Date.now()}`;
    const data = await paystackReq('/transaction/initialize', 'POST', {
      email: req.user.email,
      amount: planData.amount,
      reference,
      callback_url: `${process.env.FRONTEND_URL || 'https://useagrios.com'}/?payment=success`,
      metadata: {
        user_id: req.user.id,
        plan,
        tier: planData.tier,
        duration_days: planData.duration_days,
        custom_fields: [
          { display_name: 'Plan', variable_name: 'plan', value: planData.name },
          { display_name: 'User ID', variable_name: 'user_id', value: req.user.id },
        ],
      },
    });
    if (!data.status) throw new Error(data.message || 'Paystack error');
    return ok(res, {
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
      plan: planData.name,
      amount_ngn: planData.amount / 100,
    });
  } catch (e) {
    console.error('Paystack initiate error:', e.message);
    return err(res, 'Failed to initiate payment — try again', 500);
  }
});

// GET /api/payments/verify/:reference — verify after redirect
router.get('/verify/:reference', authenticate, async (req, res) => {
  try {
    const data = await paystackReq(`/transaction/verify/${req.params.reference}`);
    if (!data.status || data.data.status !== 'success') {
      return err(res, 'Payment not successful');
    }
    const meta = data.data.metadata;
    const userId = meta.user_id || req.user.id;
    const tier = meta.tier || 'pro';
    const days = parseInt(meta.duration_days) || 30;
    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    // Update user subscription
    await query(`UPDATE users SET subscription_tier=$1, updated_at=NOW() WHERE id=$2`, [tier, userId]);
    
    // Upsert subscription record
    await query(`
      INSERT INTO subscriptions (user_id, tier, paystack_reference, amount_ngn, expires_at, is_active)
      VALUES ($1,$2,$3,$4,$5,true)
      ON CONFLICT (user_id) DO UPDATE SET
        tier=$2, paystack_reference=$3, amount_ngn=$4,
        expires_at=$5, is_active=true, started_at=NOW()
    `, [userId, tier, req.params.reference, data.data.amount / 100, expiresAt]);

    return ok(res, {
      success: true,
      tier,
      expires_at: expiresAt,
      message: `Welcome to Agrios ${tier.charAt(0).toUpperCase()+tier.slice(1)}!`,
    });
  } catch (e) {
    console.error('Paystack verify error:', e.message);
    return err(res, 'Payment verification failed', 500);
  }
});

// POST /api/payments/webhook — Paystack webhook (server-to-server)
router.post('/webhook', async (req, res) => {
  // Verify webhook signature
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET || '')
    .update(JSON.stringify(req.body))
    .digest('hex');
  
  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const { event, data } = req.body;
  
  if (event === 'charge.success') {
    const meta = data.metadata;
    if (!meta?.user_id || !meta?.tier) {
      return res.sendStatus(200); // not our transaction
    }
    const days = parseInt(meta.duration_days) || 30;
    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    try {
      await query(`UPDATE users SET subscription_tier=$1, updated_at=NOW() WHERE id=$2`, [meta.tier, meta.user_id]);
      await query(`
        INSERT INTO subscriptions (user_id, tier, paystack_reference, amount_ngn, expires_at, is_active)
        VALUES ($1,$2,$3,$4,$5,true)
        ON CONFLICT (user_id) DO UPDATE SET
          tier=$2, paystack_reference=$3, amount_ngn=$4, expires_at=$5, is_active=true, started_at=NOW()
      `, [meta.user_id, meta.tier, data.reference, data.amount / 100, expiresAt]);
      console.log(`[Payment] Subscription activated: ${meta.user_id} → ${meta.tier}`);
    } catch (e) { console.error('Webhook DB error:', e.message); }
  }

  if (event === 'subscription.disable' || event === 'charge.failed') {
    // Could downgrade user here — for now just log
    console.log(`[Payment] Event: ${event}`, data.reference);
  }

  res.sendStatus(200);
});

// GET /api/payments/plans — list available plans
router.get('/plans', (req, res) => {
  return ok(res, Object.entries(PLANS).map(([key, p]) => ({
    key,
    name: p.name,
    amount_ngn: p.amount / 100,
    tier: p.tier,
    duration_days: p.duration_days,
  })));
});

// GET /api/payments/status — check user's current subscription
router.get('/status', authenticate, async (req, res) => {
  try {
    const result = await query(
      `SELECT s.*, u.subscription_tier FROM subscriptions s
       JOIN users u ON u.id = s.user_id
       WHERE s.user_id=$1 AND s.is_active=true`,
      [req.user.id]
    );
    if (!result.rows.length) {
      return ok(res, { tier: 'free', is_active: false });
    }
    const sub = result.rows[0];
    const isExpired = sub.expires_at && new Date(sub.expires_at) < new Date();
    if (isExpired) {
      await query(`UPDATE users SET subscription_tier='free' WHERE id=$1`, [req.user.id]);
      await query(`UPDATE subscriptions SET is_active=false WHERE user_id=$1`, [req.user.id]);
      return ok(res, { tier: 'free', is_active: false, expired_at: sub.expires_at });
    }
    return ok(res, {
      tier: sub.tier,
      is_active: true,
      expires_at: sub.expires_at,
      days_remaining: Math.ceil((new Date(sub.expires_at) - new Date()) / 86400000),
    });
  } catch (e) { return err(res, 'Failed to fetch subscription status', 500); }
});

module.exports = router;
