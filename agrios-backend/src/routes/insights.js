const router = require('express').Router();
const { query } = require('../config/db');
const { ok, err } = require('../utils/response');
const { generateWeeklyInsights } = require('../services/marketInsights');

// GET /insights/latest — most recent auto-generated weekly market summary.
// Public (no auth) since this is the SEO-facing "Market Insights" page.
router.get('/latest', async (req, res) => {
  try {
    const result = await query('SELECT * FROM market_insights ORDER BY week_start DESC LIMIT 1');
    if (!result.rows.length) {
      // First boot before the weekly cron has run yet — generate on demand
      // rather than showing an empty page.
      const fresh = await generateWeeklyInsights().catch(() => null);
      if (!fresh) return err(res, 'No insights available yet', 404);
      return ok(res, fresh);
    }
    return ok(res, result.rows[0]);
  } catch (e) { return err(res, 'Failed to fetch insights', 500); }
});

// GET /insights/history — last 12 weeks, for an archive view later.
router.get('/history', async (req, res) => {
  try {
    const result = await query('SELECT * FROM market_insights ORDER BY week_start DESC LIMIT 12');
    return ok(res, result.rows);
  } catch (e) { return err(res, 'Failed to fetch insights history', 500); }
});

module.exports = router;
