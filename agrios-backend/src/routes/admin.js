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

// ── LENDERS — manage the real partner directory ──────────────────────
// The public GET /finance/lenders shows everything here; anything with
// partnership_status != 'active' is rendered as "Illustrative" on the
// frontend. Flip a row to 'active' once a lender is actually signed —
// that's the whole mechanism, no code change or deploy required.

// GET /admin/lenders — full list including inactive rows
router.get('/lenders', async (req, res) => {
  try {
    const result = await query('SELECT * FROM lenders ORDER BY partnership_status DESC, name ASC');
    return ok(res, result.rows);
  } catch (e) { return err(res, 'Failed to fetch lenders', 500); }
});

// POST /admin/lenders — add a new lender
router.post('/lenders', async (req, res) => {
  const { name, min_score, max_amount_ngn, rate_pa_pct, tenure_months, contact, partnership_status } = req.body;
  if (!name || !max_amount_ngn || !rate_pa_pct) return err(res, 'name, max_amount_ngn and rate_pa_pct are required');
  try {
    const result = await query(
      `INSERT INTO lenders (name, min_score, max_amount_ngn, rate_pa_pct, tenure_months, contact, partnership_status)
       VALUES ($1,$2,$3,$4,$5,$6,COALESCE($7,'illustrative'))
       RETURNING *`,
      [name, min_score || 500, max_amount_ngn, rate_pa_pct, tenure_months || [6, 12], contact || null, partnership_status]
    );
    return ok(res, result.rows[0]);
  } catch (e) { return err(res, e.code === '23505' ? 'A lender with that name already exists' : 'Failed to create lender', e.code === '23505' ? 409 : 500); }
});

// PATCH /admin/lenders/:id — edit a lender, including flipping
// partnership_status to 'active' once a real deal is signed
router.patch('/lenders/:id', async (req, res) => {
  const { name, min_score, max_amount_ngn, rate_pa_pct, tenure_months, contact, partnership_status, is_active } = req.body;
  if (partnership_status && !['illustrative', 'active'].includes(partnership_status)) {
    return err(res, "partnership_status must be 'illustrative' or 'active'");
  }
  try {
    const result = await query(
      `UPDATE lenders SET
         name=COALESCE($1,name), min_score=COALESCE($2,min_score),
         max_amount_ngn=COALESCE($3,max_amount_ngn), rate_pa_pct=COALESCE($4,rate_pa_pct),
         tenure_months=COALESCE($5,tenure_months), contact=COALESCE($6,contact),
         partnership_status=COALESCE($7,partnership_status), is_active=COALESCE($8,is_active),
         updated_at=NOW()
       WHERE id=$9 RETURNING *`,
      [name, min_score, max_amount_ngn, rate_pa_pct, tenure_months, contact, partnership_status, is_active, req.params.id]
    );
    if (!result.rows.length) return err(res, 'Lender not found', 404);
    return ok(res, result.rows[0]);
  } catch (e) { return err(res, 'Failed to update lender', 500); }
});

// DELETE /admin/lenders/:id
router.delete('/lenders/:id', async (req, res) => {
  try {
    await query('DELETE FROM lenders WHERE id=$1', [req.params.id]);
    return ok(res, { deleted: true });
  } catch (e) { return err(res, 'Failed to delete lender', 500); }
});

// ── EXPORT AGENTS — same pattern as lenders ───────────────────────────

// GET /admin/export-agents
router.get('/export-agents', async (req, res) => {
  try {
    const result = await query('SELECT * FROM export_agents ORDER BY partner DESC, name ASC');
    return ok(res, result.rows);
  } catch (e) { return err(res, 'Failed to fetch export agents', 500); }
});

// POST /admin/export-agents
router.post('/export-agents', async (req, res) => {
  const { name, crops, states, contact, port, partner } = req.body;
  if (!name) return err(res, 'name is required');
  try {
    const result = await query(
      `INSERT INTO export_agents (name, crops, states, contact, port, partner)
       VALUES ($1,$2,$3,$4,$5,COALESCE($6,false))
       RETURNING *`,
      [name, crops || [], states || [], contact || null, port || null, partner]
    );
    return ok(res, result.rows[0]);
  } catch (e) { return err(res, e.code === '23505' ? 'An export agent with that name already exists' : 'Failed to create export agent', e.code === '23505' ? 409 : 500); }
});

// PATCH /admin/export-agents/:id — flip `partner` to true once signed
router.patch('/export-agents/:id', async (req, res) => {
  const { name, crops, states, contact, port, partner, is_active } = req.body;
  try {
    const result = await query(
      `UPDATE export_agents SET
         name=COALESCE($1,name), crops=COALESCE($2,crops), states=COALESCE($3,states),
         contact=COALESCE($4,contact), port=COALESCE($5,port),
         partner=COALESCE($6,partner), is_active=COALESCE($7,is_active),
         updated_at=NOW()
       WHERE id=$8 RETURNING *`,
      [name, crops, states, contact, port, partner, is_active, req.params.id]
    );
    if (!result.rows.length) return err(res, 'Export agent not found', 404);
    return ok(res, result.rows[0]);
  } catch (e) { return err(res, 'Failed to update export agent', 500); }
});

// DELETE /admin/export-agents/:id
router.delete('/export-agents/:id', async (req, res) => {
  try {
    await query('DELETE FROM export_agents WHERE id=$1', [req.params.id]);
    return ok(res, { deleted: true });
  } catch (e) { return err(res, 'Failed to delete export agent', 500); }
});

module.exports = router;
