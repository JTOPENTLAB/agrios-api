const router = require('express').Router();
const { query } = require('../config/db');
const { authenticate } = require('../middleware/auth');
const { ok, err } = require('../utils/response');

// GET /alerts
router.get('/', authenticate, async (req, res) => {
  try {
    const result = await query(
      `SELECT pa.*, cr.name as crop_name, cr.emoji, m.name as market_name, m.state as market_state
       FROM price_alerts pa
       JOIN crops cr ON cr.id = pa.crop_id
       LEFT JOIN markets m ON m.id = pa.market_id
       WHERE pa.user_id=$1 ORDER BY pa.created_at DESC`,
      [req.user.id]
    );
    return ok(res, result.rows);
  } catch (e) { return err(res, 'Failed to fetch alerts', 500); }
});

// POST /alerts
router.post('/', authenticate, async (req, res) => {
  const { crop_id, market_id, condition, target_value, notify_email, notify_inapp, notify_whatsapp } = req.body;
  if (!crop_id || !condition || !target_value) return err(res, 'crop_id, condition and target_value required');
  const allowed = ['above','below','increase_pct','decrease_pct','export_premium'];
  if (!allowed.includes(condition)) return err(res, `condition must be one of: ${allowed.join(', ')}`);
  // Free tier max 2 alerts
  const count = await query('SELECT COUNT(*) FROM price_alerts WHERE user_id=$1 AND is_active=true', [req.user.id]);
  if (parseInt(count.rows[0].count) >= 2 && req.user.subscription_tier === 'free') {
    return err(res, 'Free accounts limited to 2 active alerts. Upgrade to Pro for unlimited alerts.', 403);
  }
  try {
    const result = await query(
      `INSERT INTO price_alerts (user_id, crop_id, market_id, condition, target_value, notify_email, notify_inapp, notify_whatsapp)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [req.user.id, crop_id, market_id || null, condition, target_value,
       notify_email !== false, notify_inapp !== false, !!notify_whatsapp]
    );
    return ok(res, result.rows[0]);
  } catch (e) { return err(res, 'Failed to create alert', 500); }
});

// PATCH /alerts/:id
router.patch('/:id', authenticate, async (req, res) => {
  const { is_active, target_value, notify_email, notify_inapp } = req.body;
  try {
    const result = await query(
      `UPDATE price_alerts SET
         is_active=COALESCE($1,is_active),
         target_value=COALESCE($2,target_value),
         notify_email=COALESCE($3,notify_email),
         notify_inapp=COALESCE($4,notify_inapp)
       WHERE id=$5 AND user_id=$6 RETURNING *`,
      [is_active, target_value, notify_email, notify_inapp, req.params.id, req.user.id]
    );
    if (!result.rows.length) return err(res, 'Alert not found', 404);
    return ok(res, result.rows[0]);
  } catch (e) { return err(res, 'Failed to update alert', 500); }
});

// DELETE /alerts/:id
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const result = await query('DELETE FROM price_alerts WHERE id=$1 AND user_id=$2 RETURNING id', [req.params.id, req.user.id]);
    if (!result.rows.length) return err(res, 'Alert not found', 404);
    return ok(res, { deleted: true });
  } catch (e) { return err(res, 'Failed to delete alert', 500); }
});

module.exports = router;
