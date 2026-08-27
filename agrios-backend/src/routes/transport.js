const router = require('express').Router();
const { query } = require('../config/db');
const { authenticate, optionalAuth } = require('../middleware/auth');
const { ok, err, paginate } = require('../utils/response');

// GET /transport/jobs
router.get('/jobs', optionalAuth, async (req, res) => {
  const { state, vehicle_type, crop, status = 'open', limit = 20, page = 1 } = req.query;
  const offset = (page - 1) * limit;
  let where = [`tj.status = $1`]; let params = [status]; let i = 2;
  if (state) { where.push(`(LOWER(tj.pickup_state)=$${i} OR LOWER(tj.delivery_state)=$${i})`); params.push(state.toLowerCase()); i++; }
  if (vehicle_type) { where.push(`LOWER(tj.vehicle_type) LIKE $${i++}`); params.push(`%${vehicle_type.toLowerCase()}%`); }
  if (crop) { where.push(`LOWER(tj.crop_name) LIKE $${i++}`); params.push(`%${crop.toLowerCase()}%`); }
  try {
    const sql = `
      SELECT tj.*, cr.emoji as crop_emoji, u.full_name as poster_name
      FROM transport_jobs tj
      LEFT JOIN crops cr ON cr.id = tj.crop_id
      LEFT JOIN users u ON u.id = tj.poster_id
      WHERE ${where.join(' AND ')}
      ORDER BY tj.is_urgent DESC, tj.created_at DESC
      LIMIT $${i++} OFFSET $${i++}
    `;
    params.push(limit, offset);
    const [rows, total] = await Promise.all([
      query(sql, params),
      query(`SELECT COUNT(*) FROM transport_jobs tj WHERE ${where.join(' AND ')}`, params.slice(0,-2))
    ]);
    return paginate(res, rows.rows, parseInt(total.rows[0].count), page, limit);
  } catch (e) { return err(res, 'Failed to fetch jobs', 500); }
});

// POST /transport/jobs
router.post('/jobs', authenticate, async (req, res) => {
  const { crop_id, crop_name, quantity, unit, pickup_location, pickup_state,
          delivery_location, delivery_state, vehicle_type, pickup_date, deliver_by, max_budget, notes } = req.body;
  if (!pickup_location || !pickup_state || !delivery_location || !delivery_state) {
    return err(res, 'Pickup and delivery locations are required');
  }
  try {
    const result = await query(
      `INSERT INTO transport_jobs (poster_id, crop_id, crop_name, quantity, unit, pickup_location,
        pickup_state, delivery_location, delivery_state, vehicle_type, pickup_date, deliver_by, max_budget, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
      [req.user.id, crop_id, crop_name, quantity, unit, pickup_location,
       pickup_state, delivery_location, delivery_state, vehicle_type, pickup_date, deliver_by, max_budget, notes]
    );
    return ok(res, result.rows[0]);
  } catch (e) { return err(res, 'Failed to post job', 500); }
});

// PATCH /transport/jobs/:id/accept
router.patch('/jobs/:id/accept', authenticate, async (req, res) => {
  try {
    const job = await query('SELECT * FROM transport_jobs WHERE id=$1', [req.params.id]);
    if (!job.rows.length) return err(res, 'Job not found', 404);
    if (job.rows[0].status !== 'open') return err(res, 'Job is no longer available');
    const result = await query(
      `UPDATE transport_jobs SET status='accepted', driver_id=$1, updated_at=NOW()
       WHERE id=$2 RETURNING *`,
      [req.user.id, req.params.id]
    );
    return ok(res, result.rows[0]);
  } catch (e) { return err(res, 'Failed to accept job', 500); }
});

// POST /transport/vehicles
router.post('/vehicles', authenticate, async (req, res) => {
  const { vehicle_type, make_model, plate_number, capacity_tonnes, base_city, base_state,
          regular_routes, rate_per_km, has_gps, has_insurance, has_refrigeration, is_cross_state,
          driver_name, driver_phone, licence_number } = req.body;
  if (!vehicle_type || !plate_number) return err(res, 'vehicle_type and plate_number are required');
  try {
    const result = await query(
      `INSERT INTO vehicles (owner_id, vehicle_type, make_model, plate_number, capacity_tonnes,
        base_city, base_state, regular_routes, rate_per_km, has_gps, has_insurance,
        has_refrigeration, is_cross_state, driver_name, driver_phone, licence_number)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *`,
      [req.user.id, vehicle_type, make_model, plate_number, capacity_tonnes,
       base_city, base_state, regular_routes, rate_per_km, has_gps, has_insurance,
       has_refrigeration, is_cross_state, driver_name, driver_phone, licence_number]
    );
    return ok(res, result.rows[0]);
  } catch (e) {
    if (e.code === '23505') return err(res, 'Plate number already registered');
    return err(res, 'Failed to register vehicle', 500);
  }
});

// GET /transport/earnings
router.get('/earnings', authenticate, async (req, res) => {
  try {
    const result = await query(
      `SELECT tj.*, cr.name as crop_name, cr.emoji,
              u.full_name as poster_name
       FROM transport_jobs tj
       LEFT JOIN crops cr ON cr.id = tj.crop_id
       LEFT JOIN users u ON u.id = tj.poster_id
       WHERE tj.driver_id = $1
       ORDER BY tj.updated_at DESC LIMIT 50`,
      [req.user.id]
    );
    const stats = await query(
      `SELECT COUNT(*) as total_jobs,
              SUM(CASE WHEN status='completed' THEN quoted_price ELSE 0 END) as total_earned,
              AVG(CASE WHEN status='completed' THEN quoted_price END) as avg_per_job
       FROM transport_jobs WHERE driver_id=$1`,
      [req.user.id]
    );
    return ok(res, { jobs: result.rows, stats: stats.rows[0] });
  } catch (e) { return err(res, 'Failed to fetch earnings', 500); }
});

// GET /transport/quote — instant price estimate
router.get('/quote', async (req, res) => {
  const { from_state, to_state, quantity_tonnes = 5, vehicle_type = 'Heavy Truck' } = req.query;
  if (!from_state || !to_state) return err(res, 'from_state and to_state required');
  // Simplified distance matrix for Nigerian states (km)
  const routes = {
    'Lagos-FCT': 750, 'Lagos-Kano': 1100, 'Lagos-Oyo': 120, 'Lagos-Rivers': 650,
    'FCT-Kano': 400, 'FCT-Enugu': 380, 'FCT-Rivers': 520,
    'Kano-Kaduna': 190, 'Kano-Borno': 680, 'Enugu-Abia': 80,
  };
  const key = `${from_state}-${to_state}`;
  const reverseKey = `${to_state}-${from_state}`;
  const distance = routes[key] || routes[reverseKey] || 500;
  const baseRate = vehicle_type.includes('Heavy') ? 280 : vehicle_type.includes('Medium') ? 220 : 180;
  const baseCost = distance * baseRate;
  const loadFactor = Math.min(2, quantity_tonnes / 10);
  const low = Math.round(baseCost * (0.85 + loadFactor * 0.1));
  const high = Math.round(baseCost * (1.15 + loadFactor * 0.15));
  const mid = Math.round((low + high) / 2);
  return ok(res, { distance_km: distance, quote_low: low, quote_mid: mid, quote_high: high, currency: 'NGN', vehicle_type });
});

module.exports = router;
