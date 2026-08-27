const router = require('express').Router();
const { query } = require('../config/db');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { ok, err, paginate } = require('../utils/response');

router.use(authenticate, requireAdmin);

// GET /admin/reports/pending
router.get('/reports/pending', async (req, res) => {
  const { limit = 30, page = 1 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const [rows, total] = await Promise.all([
      query(`
        SELECT pr.*, cr.name as crop_name, cr.emoji, m.name as market_name, m.state,
               u.full_name as reporter_name, u.email as reporter_email,
               mp.price_avg as current_avg
        FROM price_reports pr
        JOIN crops cr ON cr.id = pr.crop_id
        JOIN markets m ON m.id = pr.market_id
        LEFT JOIN users u ON u.id = pr.user_id
        LEFT JOIN market_prices mp ON mp.crop_id = pr.crop_id AND mp.market_id = pr.market_id
        WHERE pr.status IN ('pending','flagged')
        ORDER BY CASE WHEN pr.status='flagged' THEN 0 ELSE 1 END, pr.created_at ASC
        LIMIT $1 OFFSET $2`, [limit, offset]),
      query(`SELECT COUNT(*) FROM price_reports WHERE status IN ('pending','flagged')`)
    ]);
    return paginate(res, rows.rows, parseInt(total.rows[0].count), page, limit);
  } catch (e) { return err(res, 'Failed to fetch pending reports', 500); }
});

// PATCH /admin/reports/:id/approve
router.patch('/reports/:id/approve', async (req, res) => {
  try {
    const report = await query('SELECT * FROM price_reports WHERE id=$1', [req.params.id]);
    if (!report.rows.length) return err(res, 'Report not found', 404);
    const r = report.rows[0];
    await query(
      `UPDATE price_reports SET status='approved', reviewed_by=$1, reviewed_at=NOW() WHERE id=$2`,
      [req.user.id, req.params.id]
    );
    // Update price
    await query(`
      UPDATE market_prices SET price_avg=ROUND((price_avg*0.6+$1*0.4)::numeric,2), source='community', updated_at=NOW()
      WHERE crop_id=$2 AND market_id=$3
    `, [r.reported_price, r.crop_id, r.market_id]);
    // Update contributor
    if (r.user_id) {
      await query(`
        UPDATE contributors SET accepted_reports=accepted_reports+1,
          accuracy_pct=ROUND((accepted_reports::decimal/(total_reports+0.01))*100,1), updated_at=NOW()
        WHERE user_id=$1`, [r.user_id]);
    }
    return ok(res, { approved: true });
  } catch (e) { return err(res, 'Failed to approve report', 500); }
});

// PATCH /admin/reports/:id/reject
router.patch('/reports/:id/reject', async (req, res) => {
  const { reason } = req.body;
  try {
    await query(
      `UPDATE price_reports SET status='rejected', rejection_reason=$1, reviewed_by=$2, reviewed_at=NOW() WHERE id=$3`,
      [reason, req.user.id, req.params.id]
    );
    return ok(res, { rejected: true });
  } catch (e) { return err(res, 'Failed to reject report', 500); }
});

// GET /admin/stats
router.get('/stats', async (req, res) => {
  try {
    const [users, reports, prices, transport] = await Promise.all([
      query('SELECT COUNT(*) as total, SUM(CASE WHEN subscription_tier=\'pro\' THEN 1 ELSE 0 END) as pro FROM users'),
      query('SELECT status, COUNT(*) as count FROM price_reports GROUP BY status'),
      query('SELECT COUNT(*) as total, MAX(updated_at) as last_update FROM market_prices'),
      query('SELECT status, COUNT(*) as count FROM transport_jobs GROUP BY status'),
    ]);
    return ok(res, { users: users.rows[0], reports: reports.rows, prices: prices.rows[0], transport: transport.rows });
  } catch (e) { return err(res, 'Failed to fetch stats', 500); }
});

// GET /admin/contributors
router.get('/contributors', async (req, res) => {
  try {
    const result = await query(`
      SELECT c.*, u.full_name, u.email, u.state
      FROM contributors c JOIN users u ON u.id=c.user_id
      ORDER BY c.accepted_reports DESC LIMIT 50
    `);
    return ok(res, result.rows);
  } catch (e) { return err(res, 'Failed to fetch contributors', 500); }
});

module.exports = router;
