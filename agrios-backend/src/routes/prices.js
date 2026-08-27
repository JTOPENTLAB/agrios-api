const router = require('express').Router();
const { query } = require('../config/db');
const { authenticate, optionalAuth, requirePro } = require('../middleware/auth');
const { ok, err, paginate } = require('../utils/response');

// GET /prices — list with filters
router.get('/', optionalAuth, async (req, res) => {
  const { crop, state, market_id, trend, source, limit = 50, page = 1 } = req.query;
  const offset = (page - 1) * limit;
  try {
    let where = ['1=1'];
    let params = [];
    let i = 1;
    if (crop) { where.push(`LOWER(cr.name) LIKE $${i++}`); params.push(`%${crop.toLowerCase()}%`); }
    if (state) { where.push(`LOWER(m.state) = $${i++}`); params.push(state.toLowerCase()); }
    if (market_id) { where.push(`mp.market_id = $${i++}`); params.push(market_id); }
    if (source) { where.push(`mp.source = $${i++}`); params.push(source); }
    if (trend === 'up') where.push(`mp.price_avg > COALESCE(ph_prev.price_avg, mp.price_avg)`);
    if (trend === 'dn') where.push(`mp.price_avg < COALESCE(ph_prev.price_avg, mp.price_avg)`);

    const sql = `
      SELECT mp.id, cr.name as crop_name, cr.emoji, cr.category, cr.is_exportable,
             m.name as market_name, m.city, m.state, m.region,
             mp.price_low, mp.price_avg, mp.price_high, mp.unit,
             mp.confidence_score, mp.source, mp.updated_at,
             ROUND(((mp.price_avg - COALESCE(ph_24h.price_avg, mp.price_avg)) / COALESCE(NULLIF(ph_24h.price_avg,0), mp.price_avg)) * 100, 1) as change_24h_pct,
             ROUND(((mp.price_avg - COALESCE(ph_7d.price_avg, mp.price_avg)) / COALESCE(NULLIF(ph_7d.price_avg,0), mp.price_avg)) * 100, 1) as change_7d_pct
      FROM market_prices mp
      JOIN crops cr ON cr.id = mp.crop_id AND cr.is_active = true
      JOIN markets m ON m.id = mp.market_id AND m.is_active = true
      LEFT JOIN price_history ph_24h ON ph_24h.crop_id = mp.crop_id AND ph_24h.market_id = mp.market_id
        AND ph_24h.recorded_date = CURRENT_DATE - 1
      LEFT JOIN price_history ph_7d ON ph_7d.crop_id = mp.crop_id AND ph_7d.market_id = mp.market_id
        AND ph_7d.recorded_date = CURRENT_DATE - 7
      LEFT JOIN price_history ph_prev ON ph_prev.crop_id = mp.crop_id AND ph_prev.market_id = mp.market_id
        AND ph_prev.recorded_date = CURRENT_DATE - 1
      WHERE ${where.join(' AND ')}
      ORDER BY cr.name, m.state
      LIMIT $${i++} OFFSET $${i++}
    `;
    params.push(limit, offset);
    const countSql = `
      SELECT COUNT(*) FROM market_prices mp
      JOIN crops cr ON cr.id = mp.crop_id AND cr.is_active = true
      JOIN markets m ON m.id = mp.market_id AND m.is_active = true
      WHERE ${where.join(' AND ')}
    `;
    const [rows, countRes] = await Promise.all([
      query(sql, params),
      query(countSql, params.slice(0, -2))
    ]);
    return paginate(res, rows.rows, parseInt(countRes.rows[0].count), page, limit);
  } catch (e) { console.error(e); return err(res, 'Failed to fetch prices', 500); }
});

// GET /prices/summary — headline stats for dashboard
router.get('/summary', async (req, res) => {
  try {
    const result = await query(`
      SELECT cr.name, cr.emoji, m.name as market, m.state,
             mp.price_avg, mp.price_low, mp.price_high, mp.unit,
             mp.confidence_score, mp.updated_at,
             ROUND(((mp.price_avg - COALESCE(ph.price_avg, mp.price_avg)) / COALESCE(NULLIF(ph.price_avg,0), mp.price_avg)) * 100, 1) as change_24h_pct
      FROM market_prices mp
      JOIN crops cr ON cr.id = mp.crop_id AND cr.is_active = true
      JOIN markets m ON m.id = mp.market_id AND m.is_major = true
      LEFT JOIN price_history ph ON ph.crop_id = mp.crop_id AND ph.market_id = mp.market_id
        AND ph.recorded_date = CURRENT_DATE - 1
      ORDER BY cr.name, m.state
      LIMIT 100
    `);
    return ok(res, result.rows);
  } catch (e) { return err(res, 'Failed to fetch summary', 500); }
});

// GET /prices/history/:cropId — price history chart data
router.get('/history/:cropId', async (req, res) => {
  const { cropId } = req.params;
  const { market_id, days = 30 } = req.query;
  try {
    let where = [`ph.crop_id = $1`, `ph.recorded_date >= CURRENT_DATE - $2`];
    let params = [cropId, parseInt(days)];
    if (market_id) { where.push(`ph.market_id = $3`); params.push(market_id); }
    const result = await query(`
      SELECT ph.recorded_date, ROUND(AVG(ph.price_avg),2) as price_avg,
             ROUND(AVG(ph.price_low),2) as price_low, ROUND(AVG(ph.price_high),2) as price_high,
             ph.unit, m.state
      FROM price_history ph
      JOIN markets m ON m.id = ph.market_id
      WHERE ${where.join(' AND ')}
      GROUP BY ph.recorded_date, ph.unit, m.state
      ORDER BY ph.recorded_date ASC
    `, params);
    return ok(res, result.rows);
  } catch (e) { return err(res, 'Failed to fetch history', 500); }
});

// GET /prices/heatmap — best buy/sell by region
router.get('/heatmap', async (req, res) => {
  const { crop_name } = req.query;
  if (!crop_name) return err(res, 'crop_name is required');
  try {
    const result = await query(`
      SELECT m.state, m.region, m.name as market_name,
             mp.price_avg, mp.unit, cr.name as crop_name,
             RANK() OVER (PARTITION BY cr.id ORDER BY mp.price_avg DESC) as sell_rank,
             RANK() OVER (PARTITION BY cr.id ORDER BY mp.price_avg ASC) as buy_rank
      FROM market_prices mp
      JOIN crops cr ON cr.id = mp.crop_id AND LOWER(cr.name) = LOWER($1)
      JOIN markets m ON m.id = mp.market_id AND m.is_major = true
      ORDER BY mp.price_avg DESC
    `, [crop_name]);
    const data = result.rows;
    return ok(res, {
      sell: data.slice(0, 4),
      buy: data.slice(-4).reverse(),
      all: data
    });
  } catch (e) { return err(res, 'Failed to fetch heatmap', 500); }
});

// GET /prices/opportunities — AI-generated market opportunities
router.get('/opportunities', optionalAuth, async (req, res) => {
  try {
    const result = await query(`
      SELECT io.*, cr.name as crop_name, cr.emoji,
             bm.name as buy_market, bm.state as buy_state,
             sm.name as sell_market, sm.state as sell_state
      FROM intel_opportunities io
      LEFT JOIN crops cr ON cr.id = io.crop_id
      LEFT JOIN markets bm ON bm.id = io.buy_market_id
      LEFT JOIN markets sm ON sm.id = io.sell_market_id
      WHERE (io.expires_at IS NULL OR io.expires_at > NOW())
        AND (io.is_pro_only = false OR $1 = true)
      ORDER BY io.created_at DESC
      LIMIT 20
    `, [req.user?.subscription_tier === 'pro' || req.user?.subscription_tier === 'business']);
    return ok(res, result.rows);
  } catch (e) { return err(res, 'Failed to fetch opportunities', 500); }
});

// GET /prices/trends — AI predictions (Pro only)
router.get('/trends', authenticate, requirePro, async (req, res) => {
  try {
    // Generate predictions from recent price movement
    const result = await query(`
      SELECT cr.name, cr.emoji, cr.id as crop_id,
             mp.price_avg as current_price, mp.unit,
             ph_7d.price_avg as price_7d_ago,
             ph_30d.price_avg as price_30d_ago,
             ROUND(((mp.price_avg - ph_7d.price_avg) / NULLIF(ph_7d.price_avg, 0)) * 100, 1) as momentum_7d
      FROM market_prices mp
      JOIN crops cr ON cr.id = mp.crop_id AND cr.is_active = true
      JOIN markets m ON m.id = mp.market_id AND m.is_major = true
      LEFT JOIN price_history ph_7d ON ph_7d.crop_id = mp.crop_id AND ph_7d.market_id = mp.market_id
        AND ph_7d.recorded_date = CURRENT_DATE - 7
      LEFT JOIN price_history ph_30d ON ph_30d.crop_id = mp.crop_id AND ph_30d.market_id = mp.market_id
        AND ph_30d.recorded_date = CURRENT_DATE - 30
      ORDER BY ABS(ROUND(((mp.price_avg - ph_7d.price_avg) / NULLIF(ph_7d.price_avg, 0)) * 100, 1)) DESC
      LIMIT 10
    `);
    const predictions = result.rows.map(r => ({
      ...r,
      direction: r.momentum_7d > 0 ? 'rising' : r.momentum_7d < 0 ? 'falling' : 'stable',
      confidence: Math.min(95, Math.max(60, 75 + Math.abs(r.momentum_7d || 0))),
      forecast_7d_pct: r.momentum_7d ? (r.momentum_7d * 0.6).toFixed(1) : '0.0'
    }));
    return ok(res, predictions);
  } catch (e) { return err(res, 'Failed to fetch trends', 500); }
});

// POST /prices/report — submit a community price report
router.post('/report', authenticate, async (req, res) => {
  const { crop_id, market_id, reported_price, unit, observed_date, notes, photo_url } = req.body;
  if (!crop_id || !market_id || !reported_price || !unit || !observed_date) {
    return err(res, 'crop_id, market_id, reported_price, unit and observed_date are required');
  }
  try {
    // Get current avg price for deviation check
    const current = await query('SELECT price_avg FROM market_prices WHERE crop_id=$1 AND market_id=$2', [crop_id, market_id]);
    let deviation = null;
    let status = 'pending';
    if (current.rows.length) {
      const avg = current.rows[0].price_avg;
      deviation = Math.abs(((reported_price - avg) / avg) * 100);
      if (deviation <= 40) status = 'approved';
      else if (deviation > 80) status = 'rejected';
      else status = 'flagged';
    }
    const result = await query(
      `INSERT INTO price_reports (user_id, crop_id, market_id, reported_price, unit, observed_date, notes, photo_url, status, deviation_pct)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [req.user.id, crop_id, market_id, reported_price, unit, observed_date, notes, photo_url, status, deviation]
    );
    // Update contributor stats
    await query(`
      UPDATE contributors SET total_reports = total_reports + 1,
        accepted_reports = accepted_reports + $1,
        last_report_at = NOW(), updated_at = NOW()
      WHERE user_id = $2
    `, [status === 'approved' ? 1 : 0, req.user.id]);
    // If approved, update market price
    if (status === 'approved') {
      await query(`
        UPDATE market_prices SET
          price_avg = ROUND((price_avg * 0.7 + $1 * 0.3)::numeric, 2),
          source = 'community', updated_at = NOW()
        WHERE crop_id = $2 AND market_id = $3
      `, [reported_price, crop_id, market_id]);
    }
    return ok(res, result.rows[0]);
  } catch (e) { return err(res, 'Failed to submit report', 500); }
});

// GET /prices/crops — list all active crops
router.get('/crops', async (req, res) => {
  try {
    const result = await query('SELECT * FROM crops WHERE is_active=true ORDER BY name');
    return ok(res, result.rows);
  } catch (e) { return err(res, 'Failed to fetch crops', 500); }
});

// GET /prices/markets — list all active markets
router.get('/markets', async (req, res) => {
  try {
    const result = await query('SELECT * FROM markets WHERE is_active=true ORDER BY state, name');
    return ok(res, result.rows);
  } catch (e) { return err(res, 'Failed to fetch markets', 500); }
});

module.exports = router;
