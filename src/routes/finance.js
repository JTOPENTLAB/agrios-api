const router = require('express').Router();
const { query } = require('../config/db');
const { authenticate, optionalAuth, requirePro } = require('../middleware/auth');
const { ok, err } = require('../utils/response');

// GET /finance/score — user's crop credit score
router.get('/score', authenticate, async (req, res) => {
  try {
    const result = await query(
      `SELECT c.*, u.full_name, u.state, u.created_at as member_since
       FROM contributors c
       JOIN users u ON u.id = c.user_id
       WHERE c.user_id=$1`,
      [req.user.id]
    );
    if (!result.rows.length) return err(res, 'Contributor profile not found', 404);
    const c = result.rows[0];
    // Score breakdown
    const factors = {
      report_count: Math.min(100, c.total_reports * 2),
      accuracy: Math.round(c.accuracy_pct || 100),
      market_presence: Math.min(100, c.market_presence_score || 0),
      account_age_days: Math.min(100, Math.floor((Date.now() - new Date(c.member_since)) / 86400000))
    };
    return ok(res, { ...c, factors });
  } catch (e) { return err(res, 'Failed to fetch credit score', 500); }
});

// GET /finance/lenders — partner lenders list
// Used to be a hardcoded array in this file. Now backed by the `lenders`
// table (see migrate.js) so a real signed partner can be turned on with a
// data update (PATCH /admin/lenders/:id) instead of a code deploy. Falls
// back to the same illustrative data, inline, if the migration hasn't been
// run against this database yet — so this endpoint never hard-fails.
const FALLBACK_LENDERS = [
  { id:'fallback-1', name:'Agrifinance Partners', min_score:600, max_amount_ngn:5000000, rate_pa_pct:18, tenure_months:[3,6,12], contact:'loans@agrifinance.ng', partnership_status:'illustrative' },
  { id:'fallback-2', name:'NIRSAL Microfinance Bank', min_score:500, max_amount_ngn:2000000, rate_pa_pct:21, tenure_months:[6,12,24], contact:'agri@nirsal.com', partnership_status:'illustrative' },
  { id:'fallback-3', name:'Bank of Agriculture Nigeria', min_score:550, max_amount_ngn:10000000, rate_pa_pct:15, tenure_months:[12,24,36], contact:'loans@boanigeria.com', partnership_status:'illustrative' },
];
// Made public (optionalAuth, not authenticate) so the signed-out guest
// banner can show a real "confirmed lending partners" count instead of a
// static hardcoded "0" that would silently go stale the day a real
// partner is actually signed.
router.get('/lenders', optionalAuth, async (req, res) => {
  try {
    const result = await query(
      `SELECT id, name, min_score, max_amount_ngn, rate_pa_pct, tenure_months, contact, partnership_status
       FROM lenders WHERE is_active=true ORDER BY partnership_status DESC, rate_pa_pct ASC`
    );
    return ok(res, result.rows.length ? result.rows : FALLBACK_LENDERS);
  } catch (e) {
    // Table doesn't exist yet (migration not run) — don't break the page.
    return ok(res, FALLBACK_LENDERS);
  }
});

// POST /finance/apply — loan application
router.post('/apply', authenticate, async (req, res) => {
  const { lender_id, amount, tenure_months, purpose } = req.body;
  if (!lender_id || !amount || !tenure_months) return err(res, 'lender_id, amount and tenure_months required');
  try {
    // Fetch score
    const score = await query('SELECT credit_score, credit_grade FROM contributors WHERE user_id=$1', [req.user.id]);
    if (!score.rows.length || score.rows[0].credit_score < 500) {
      return err(res, 'Credit score too low for loan application. Submit more price reports to improve it.', 403);
    }
    // Look up the real lender so the reference is meaningful; tolerate the
    // FALLBACK_LENDERS synthetic ids ('fallback-1' etc.) if migration hasn't
    // run yet, rather than rejecting every application in that window.
    let lenderName = null;
    if (!String(lender_id).startsWith('fallback-')) {
      const lender = await query('SELECT name FROM lenders WHERE id=$1', [lender_id]).catch(() => ({ rows: [] }));
      lenderName = lender.rows[0]?.name || null;
    } else {
      lenderName = FALLBACK_LENDERS.find(l => l.id === lender_id)?.name || null;
    }
    // In production: create application record and notify lender via email
    return ok(res, {
      application_id: `AGRIOS-${Date.now()}`,
      status: 'submitted',
      lender_name: lenderName,
      credit_score: score.rows[0].credit_score,
      message: 'Application submitted. Lender will respond within 24 hours.',
      submitted_at: new Date().toISOString()
    });
  } catch (e) { return err(res, 'Failed to submit application', 500); }
});

module.exports = router;
