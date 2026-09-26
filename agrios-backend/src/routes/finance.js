// routes/finance.js
// GET  /api/finance/score    — real credit score from contributors table
// GET  /api/finance/lenders  — lenders from DB (seeded, admin-editable)
// POST /api/finance/apply    — log a loan application

const express  = require('express');
const router   = express.Router();
const { query } = require('../config/db');
const jwt      = require('jsonwebtoken');

// ── Soft auth (non-blocking) ─────────────────────────────────────────────────
function softAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token  = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (token) req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (_) {}
  next();
}

// ── Hard auth ────────────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token  = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Sign in required' });
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (_) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ── Seed lenders if missing ──────────────────────────────────────────────────
// Called once on first GET /lenders if table is empty
async function seedLenders() {
  const LENDERS = [
    {
      name:           'Bank of Agriculture Nigeria',
      slug:           'boa',
      min_score:      550,
      max_amount_ngn: 10000000,
      rate_pa_pct:    15.00,
      contact_email:  'loans@boanigeria.com',
      contact_url:    'https://www.boanigeria.com',
      description:    'Federal government agricultural development bank offering the lowest rates for smallholder farmers.',
      active:         true,
    },
    {
      name:           'Agrifinance Partners',
      slug:           'agrifinance',
      min_score:      600,
      max_amount_ngn: 5000000,
      rate_pa_pct:    18.00,
      contact_email:  'loans@agrifinance.ng',
      contact_url:    null,
      description:    'Private agri-finance company focusing on mid-scale farmers with at least 6 months of activity.',
      active:         true,
    },
    {
      name:           'NIRSAL Microfinance Bank',
      slug:           'nirsal',
      min_score:      500,
      max_amount_ngn: 2000000,
      rate_pa_pct:    21.00,
      contact_email:  'agri@nirsal.com',
      contact_url:    'https://www.nirsalmfb.com',
      description:    'CBN-backed microfinance bank. Entry-level agri loans for new reporters building their score.',
      active:         true,
    },
  ];

  for (const l of LENDERS) {
    await query(
      `INSERT INTO lenders
         (name, slug, min_score, max_amount_ngn, rate_pa_pct,
          contact_email, contact_url, description, is_active)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       ON CONFLICT (name) DO UPDATE SET
         min_score=EXCLUDED.min_score, max_amount_ngn=EXCLUDED.max_amount_ngn,
         rate_pa_pct=EXCLUDED.rate_pa_pct, contact_email=EXCLUDED.contact_email,
         contact_url=EXCLUDED.contact_url, description=EXCLUDED.description,
         is_active=EXCLUDED.is_active`,
      [l.name, l.slug, l.min_score, l.max_amount_ngn, l.rate_pa_pct,
       l.contact_email, l.contact_url, l.description, l.active]
    );
  }
}

// ── GET /api/finance/score ───────────────────────────────────────────────────
router.get('/score', requireAuth, async (req, res) => {
  try {
    // Pull from contributors table (updated by creditScorer cron)
    const result = await query(
      `SELECT
         c.credit_score,
         c.credit_grade,
         c.total_reports,
         c.accepted_reports,
         c.accuracy_pct,
         c.market_presence_score,
         c.updated_at,
         u.full_name,
         u.state
       FROM contributors c
       JOIN users u ON u.id = c.user_id
       WHERE c.user_id = $1`,
      [req.user.id]
    );

    if (!result.rows.length) {
      // User exists but no contributor record yet — build one on the fly
      // from their actual price_reports
      const prRes = await query(
        `SELECT
           COUNT(*)                                               AS total,
           COUNT(*) FILTER (WHERE status = 'approved')           AS accepted,
           COUNT(DISTINCT market_name)                            AS market_count,
           ROUND(100.0 * COUNT(*) FILTER (WHERE status='approved')
                 / NULLIF(COUNT(*),0))                           AS accuracy
         FROM price_reports
         WHERE reporter_id = $1`,
        [req.user.id]
      );
      const pr = prRes.rows[0];
      const total    = parseInt(pr.total)    || 0;
      const accepted = parseInt(pr.accepted) || 0;
      const accuracy = parseFloat(pr.accuracy) || (total ? 100 : 100);
      const markets  = parseInt(pr.market_count) || 0;

      // Simple score formula (mirrors creditScorer.js)
      const reportScore   = Math.min(300, total * 15);
      const accuracyScore = Math.min(300, Math.round(accuracy * 3));
      const activityScore = Math.min(200, markets * 20);
      const historyScore  = Math.min(200, accepted * 5);
      const rawScore      = 300 + reportScore + accuracyScore * 0.3 + activityScore + historyScore * 0.2;
      const credit_score  = Math.min(1000, Math.round(rawScore));
      const credit_grade  = credit_score >= 850 ? 'Excellent'
                          : credit_score >= 700 ? 'Good'
                          : credit_score >= 550 ? 'Fair'
                          : credit_score >= 400 ? 'Poor'
                          : 'Very Poor';

      const uRes = await query('SELECT full_name, state FROM users WHERE id=$1', [req.user.id]);
      const u = uRes.rows[0] || {};

      return res.json({
        success: true,
        data: {
          credit_score,
          credit_grade,
          total_reports:          total,
          accepted_reports:       accepted,
          accuracy_pct:           accuracy,
          market_presence_score:  activityScore,
          full_name:              u.full_name || '',
          state:                  u.state     || '',
          updated_at:             null,
        },
      });
    }

    res.json({ success: true, data: result.rows[0] });

  } catch (err) {
    console.error('Finance score error:', err);
    res.status(500).json({ error: 'Could not load credit score' });
  }
});

// ── GET /api/finance/lenders ─────────────────────────────────────────────────
router.get('/lenders', softAuth, async (req, res) => {
  try {
    let result = await query(
      `SELECT id, name, slug, min_score, max_amount_ngn, rate_pa_pct,
              contact_email, contact_url, description
       FROM lenders
       WHERE is_active = true
       ORDER BY min_score ASC`
    );

    // Seed on first call if empty
    if (!result.rows.length) {
      await seedLenders().catch(e => console.error('Lender seed error:', e));
      result = await query(
        `SELECT id, name, slug, min_score, max_amount_ngn, rate_pa_pct,
                contact_email, contact_url, description
         FROM lenders WHERE is_active = true ORDER BY min_score ASC`
      );
    }

    res.json({ success: true, data: result.rows });

  } catch (err) {
    console.error('Finance lenders error:', err);
    // Return hardcoded fallback so frontend never breaks
    res.json({
      success: true,
      data: [
        { name:'Bank of Agriculture Nigeria', slug:'boa',        min_score:550, max_amount_ngn:10000000, rate_pa_pct:15, contact_email:'loans@boanigeria.com' },
        { name:'Agrifinance Partners',        slug:'agrifinance',min_score:600, max_amount_ngn:5000000,  rate_pa_pct:18, contact_email:'loans@agrifinance.ng' },
        { name:'NIRSAL Microfinance Bank',    slug:'nirsal',     min_score:500, max_amount_ngn:2000000,  rate_pa_pct:21, contact_email:'agri@nirsal.com' },
      ],
    });
  }
});

// ── POST /api/finance/apply ──────────────────────────────────────────────────
router.post('/apply', requireAuth, async (req, res) => {
  try {
    const { lender_id, amount, tenure_months, purpose } = req.body;

    if (!lender_id || !amount) {
      return res.status(400).json({ error: 'lender_id and amount are required' });
    }
    if (amount < 50000) {
      return res.status(400).json({ error: 'Minimum loan amount is ₦50,000' });
    }

    // Check user's current score
    const scoreRes = await query(
      'SELECT credit_score FROM contributors WHERE user_id = $1',
      [req.user.id]
    ).catch(() => ({ rows: [] }));
    const userScore = scoreRes.rows[0]?.credit_score || 300;

    // Check lender minimum
    const lenderRes = await query(
      'SELECT name, min_score, max_amount_ngn FROM lenders WHERE id = $1 AND active = true',
      [lender_id]
    );
    if (!lenderRes.rows.length) {
      return res.status(404).json({ error: 'Lender not found' });
    }
    const lender = lenderRes.rows[0];
    if (userScore < lender.min_score) {
      return res.status(403).json({
        error: `Your credit score (${userScore}) is below the minimum required (${lender.min_score}) for ${lender.name}`,
      });
    }
    if (amount > lender.max_amount_ngn) {
      return res.status(400).json({
        error: `Maximum loan from ${lender.name} is ₦${Number(lender.max_amount_ngn).toLocaleString('en-NG')}`,
      });
    }

    // Log the application
    await query(
      `INSERT INTO loan_applications
         (user_id, lender_id, amount_ngn, tenure_months, purpose, credit_score_at_apply)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [req.user.id, lender_id, amount, tenure_months || 12, purpose || null, userScore]
    ).catch(e => console.error('Loan application log error (non-fatal):', e.message));

    res.json({
      success: true,
      message: `Application submitted to ${lender.name}. They will contact you within 24–48 hours.`,
    });

  } catch (err) {
    console.error('Finance apply error:', err);
    res.status(500).json({ error: 'Could not submit application' });
  }
});

module.exports = router;
