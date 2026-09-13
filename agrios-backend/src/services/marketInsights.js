const { query } = require('../config/db');

// ── MARKET INSIGHTS — the SEO "autopilot" content flywheel ─────────────
// Generates a plain-language weekly summary of real price movement,
// computed from price_history (which the existing sync cron already
// populates daily). No manual writing, no LLM call — just arithmetic on
// data the product collects anyway. This is what turns real prices into
// genuinely new, indexable content every week instead of a static page.

function mondayOf(date) {
  const d = new Date(date);
  const day = d.getUTCDay(); // 0=Sun..6=Sat
  const diff = (day === 0 ? -6 : 1) - day; // shift to Monday
  d.setUTCDate(d.getUTCDate() + diff);
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString().split('T')[0];
}

function sentence(m, direction) {
  const verb = direction === 'up' ? 'rose' : 'fell';
  const pct = Math.abs(m.pct_change).toFixed(1);
  return `${m.crop} prices in ${m.market} (${m.state}) ${verb} ${pct}% this week, from ₦${Math.round(m.price_then).toLocaleString('en-NG')} to ₦${Math.round(m.price_now).toLocaleString('en-NG')} per ${m.unit}.`;
}

async function generateWeeklyInsights() {
  const weekStart = mondayOf(new Date());
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekAgoStr = weekAgo.toISOString().split('T')[0];

  // For each crop×market pair, compare the most recent recorded price to
  // the one closest to 7 days ago. Requires at least 2 distinct dates of
  // history for that pair so a single day's noise can't masquerade as a
  // "weekly" move.
  const result = await query(`
    WITH recent AS (
      SELECT DISTINCT ON (ph.crop_id, ph.market_id)
        ph.crop_id, ph.market_id, ph.price_avg, ph.unit, ph.recorded_date
      FROM price_history ph
      ORDER BY ph.crop_id, ph.market_id, ph.recorded_date DESC
    ),
    past AS (
      SELECT DISTINCT ON (ph.crop_id, ph.market_id)
        ph.crop_id, ph.market_id, ph.price_avg, ph.recorded_date
      FROM price_history ph
      WHERE ph.recorded_date <= $1
      ORDER BY ph.crop_id, ph.market_id, ph.recorded_date DESC
    )
    SELECT
      cr.name AS crop, m.name AS market, m.state, r.unit,
      past.price_avg AS price_then, r.price_avg AS price_now,
      ROUND(((r.price_avg - past.price_avg) / NULLIF(past.price_avg, 0)) * 100, 1) AS pct_change
    FROM recent r
    JOIN past ON past.crop_id = r.crop_id AND past.market_id = r.market_id
    JOIN crops cr ON cr.id = r.crop_id
    JOIN markets m ON m.id = r.market_id
    WHERE r.recorded_date > past.recorded_date
      AND past.price_avg > 0
    ORDER BY pct_change DESC
  `, [weekAgoStr]);

  const rows = result.rows.filter(r => r.pct_change !== null && isFinite(Number(r.pct_change)));
  const gainers = rows.filter(r => r.pct_change > 0).slice(0, 5);
  const fallers = rows.filter(r => r.pct_change < 0).sort((a, b) => a.pct_change - b.pct_change).slice(0, 5);

  const summaryParts = [
    ...gainers.slice(0, 3).map(m => sentence(m, 'up')),
    ...fallers.slice(0, 3).map(m => sentence(m, 'down')),
  ];
  const summary = summaryParts.length
    ? summaryParts.join(' ')
    : 'Not enough week-over-week price history yet to report a market summary — check back after a few more days of data collection.';

  await query(`
    INSERT INTO market_insights (week_start, gainers, fallers, summary)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (week_start) DO UPDATE SET
      gainers = EXCLUDED.gainers, fallers = EXCLUDED.fallers,
      summary = EXCLUDED.summary, generated_at = NOW()
  `, [weekStart, JSON.stringify(gainers), JSON.stringify(fallers), summary]);

  console.log(`[Insights] Week of ${weekStart}: ${gainers.length} gainers, ${fallers.length} fallers computed`);
  return { weekStart, gainers, fallers, summary };
}

module.exports = { generateWeeklyInsights };
