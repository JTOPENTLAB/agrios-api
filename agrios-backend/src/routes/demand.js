const router = require('express').Router();
const { query } = require('../config/db');
const { authenticate, optionalAuth } = require('../middleware/auth');
const { ok, err, paginate } = require('../utils/response');

// GET /demand
router.get('/', optionalAuth, async (req, res) => {
  const { crop, state, limit = 20, page = 1 } = req.query;
  const offset = (page - 1) * limit;
  let where = [`bd.status='open'`, `(bd.expires_at IS NULL OR bd.expires_at > NOW())`];
  let params = []; let i = 1;
  if (crop) { where.push(`LOWER(cr.name) LIKE $${i++}`); params.push(`%${crop.toLowerCase()}%`); }
  if (state) { where.push(`LOWER(bd.delivery_state) = $${i++}`); params.push(state.toLowerCase()); }
  try {
    const sql = `
      SELECT bd.*, cr.name as crop_name, cr.emoji
      FROM buyer_demands bd
      JOIN crops cr ON cr.id = bd.crop_id
      WHERE ${where.join(' AND ')}
      ORDER BY bd.is_verified_buyer DESC, bd.deadline ASC
      LIMIT $${i++} OFFSET $${i++}
    `;
    params.push(limit, offset);
    const [rows, total] = await Promise.all([
      query(sql, params),
      query(`SELECT COUNT(*) FROM buyer_demands bd JOIN crops cr ON cr.id=bd.crop_id WHERE ${where.join(' AND ')}`, params.slice(0,-2))
    ]);
    return paginate(res, rows.rows, parseInt(total.rows[0].count), page, limit);
  } catch (e) { return err(res, 'Failed to fetch demand board', 500); }
});

// POST /demand
router.post('/', authenticate, async (req, res) => {
  const { buyer_name, crop_id, quantity_display, offered_price, price_unit,
          delivery_location, delivery_state, deadline, contact_email, contact_phone, notes } = req.body;
  if (!crop_id || !offered_price || !delivery_location || !delivery_state) {
    return err(res, 'crop_id, offered_price, delivery_location and delivery_state required');
  }
  try {
    const expires = deadline ? new Date(deadline) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const result = await query(
      `INSERT INTO buyer_demands (buyer_id, buyer_name, crop_id, quantity_display, offered_price, price_unit,
        delivery_location, delivery_state, deadline, contact_email, contact_phone, notes, expires_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [req.user.id, buyer_name || req.user.full_name, crop_id, quantity_display,
       offered_price, price_unit || '50kg bag', delivery_location, delivery_state,
       deadline, contact_email, contact_phone, notes, expires]
    );
    return ok(res, result.rows[0]);
  } catch (e) { return err(res, 'Failed to post demand', 500); }
});

module.exports = router;
