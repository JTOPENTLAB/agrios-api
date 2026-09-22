// src/routes/push.js
// Stores and removes browser push subscriptions

const router = require('express').Router();
const { query } = require('../config/db');
const { authenticate } = require('../middleware/auth');
const { ok, err } = require('../utils/response');

// POST /api/push/subscribe
// Body: { subscription: <PushSubscription JSON> }
router.post('/subscribe', authenticate, async (req, res) => {
  const { subscription } = req.body;
  if (!subscription || !subscription.endpoint) {
    return err(res, 'subscription object with endpoint required');
  }

  try {
    // Upsert — same endpoint may be re-sent on page reload
    await query(
      `INSERT INTO push_subscriptions (user_id, endpoint, subscription)
       VALUES ($1, $2, $3)
       ON CONFLICT (endpoint) DO UPDATE SET user_id=$1, subscription=$3, updated_at=NOW()`,
      [req.user.id, subscription.endpoint, JSON.stringify(subscription)]
    );
    return ok(res, { subscribed: true });
  } catch (e) {
    console.error('[Push route] Subscribe error:', e.message);
    return err(res, 'Failed to save subscription', 500);
  }
});

// DELETE /api/push/unsubscribe
// Body: { endpoint: '...' }
router.delete('/unsubscribe', authenticate, async (req, res) => {
  const { endpoint } = req.body;
  if (!endpoint) return err(res, 'endpoint required');

  try {
    await query(
      'DELETE FROM push_subscriptions WHERE user_id=$1 AND endpoint=$2',
      [req.user.id, endpoint]
    );
    return ok(res, { unsubscribed: true });
  } catch (e) {
    return err(res, 'Failed to remove subscription', 500);
  }
});

// GET /api/push/vapid-public-key
// Returns the VAPID public key so the frontend can subscribe
router.get('/vapid-public-key', (req, res) => {
  const key = process.env.VAPID_PUBLIC_KEY;
  if (!key) return err(res, 'Push notifications not configured', 503);
  return ok(res, { publicKey: key });
});

module.exports = router;
