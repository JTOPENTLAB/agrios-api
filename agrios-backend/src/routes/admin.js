// routes/admin.js
// GET  /api/admin/stats  — real-time dashboard stats (admin only)
// GET  /api/admin/users  — paginated user list with search
// POST /api/admin/reports/:id  — approve or reject a pending price report

const express = require('express');
const router  = express.Router();
const { query } = require('../config/db');
const jwt = require('jsonwebtoken');

// ── Auth middleware: admin only ──────────────────────────────────────────────
function requireAdmin(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token  = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Sign in required' });
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    req.user = user;
    next();
  } catch (_) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ── GET /api/admin/stats ─────────────────────────────────────────────────────
router.get('/stats', requireAdmin, async (req, res) => {
  try {
    const [
      userStats,
      reportStats,
      contributors,
      pendingReports,
      farmerStats,
    ] = await Promise.all([
      // Total users by role and subscription
      query(`
        SELECT
          COUNT(*) FILTER (WHERE role = 'farmer')                         AS farmers,
          COUNT(*) FILTER (WHERE role = 'buyer')                          AS buyers,
          COUNT(*) FILTER (WHERE role = 'agent')                          AS agents,
          COUNT(*) FILTER (WHERE role = 'admin')                          AS admins,
          COUNT(*) FILTER (WHERE subscription_tier IN ('pro','business')) AS pro_users,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24h')   AS joined_today,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7d')    AS joined_week,
          COUNT(*)                                                         AS total
        FROM users
        WHERE is_active = true
      `),
      // Price report stats
      query(`
        SELECT
          COUNT(*) FILTER (WHERE status = 'pending')                     AS pending,
          COUNT(*) FILTER (WHERE status = 'flagged')                     AS flagged,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24h')  AS today,
          COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24h'
                           AND created_at >= NOW() - INTERVAL '48h')     AS yesterday,
          ROUND(
            100.0 * COUNT(*) FILTER (WHERE status = 'approved') /
            NULLIF(COUNT(*) FILTER (WHERE status IN ('approved','rejected')), 0)
          ) AS quality_pct
        FROM price_reports
      `).catch(() => ({ rows: [{ pending: 0, flagged: 0, today: 0, yesterday: 0, quality_pct: null }] })),
      // Top contributors
      query(`
        SELECT
          u.id,
          u.full_name,
          u.state,
          COALESCE(c.accepted, 0) AS accepted,
          COALESCE(c.accuracy, 0) AS accuracy
        FROM users u
        LEFT JOIN (
          SELECT
            reporter_id,
            COUNT(*) FILTER (WHERE status = 'approved') AS accepted,
            ROUND(100.0 * COUNT(*) FILTER (WHERE status = 'approved') /
                  NULLIF(COUNT(*), 0)) AS accuracy
          FROM price_reports
          GROUP BY reporter_id
        ) c ON c.reporter_id = u.id
        WHERE u.is_active = true
          AND COALESCE(c.accepted, 0) > 0
        ORDER BY c.accepted DESC
        LIMIT 6
      `).catch(() => ({ rows: [] })),
      // Pending price reports (most recent 10)
      query(`
        SELECT
          pr.id,
          pr.crop,
          pr.market_name,
          pr.price_per_unit,
          pr.unit,
          pr.status,
          pr.flag_reason,
          pr.created_at,
          u.full_name AS reporter_name
        FROM price_reports pr
        JOIN users u ON u.id = pr.reporter_id
        WHERE pr.status IN ('pending', 'flagged')
        ORDER BY pr.created_at DESC
        LIMIT 10
      `).catch(() => ({ rows: [] })),
      // Farmer directory stats
      query(`
        SELECT
          COUNT(*) FILTER (WHERE buyer_contact_consent = true) AS consenting,
          COUNT(*) AS total
        FROM users
        WHERE role = 'farmer' AND is_active = true
      `),
    ]);

    const u  = userStats.rows[0];
    const r  = reportStats.rows[0];
    const ft = farmerStats.rows[0];

    // Calculate day-over-day change for reports
    const todayN     = parseInt(r.today)     || 0;
    const yesterdayN = parseInt(r.yesterday) || 0;
    const reportsDelta = yesterdayN > 0
      ? Math.round(((todayN - yesterdayN) / yesterdayN) * 100)
      : null;

    res.json({
      success: true,
      stats: {
        users: {
          total:        parseInt(u.total)       || 0,
          farmers:      parseInt(u.farmers)     || 0,
          buyers:       parseInt(u.buyers)      || 0,
          agents:       parseInt(u.agents)      || 0,
          pro_users:    parseInt(u.pro_users)   || 0,
          joined_today: parseInt(u.joined_today)|| 0,
          joined_week:  parseInt(u.joined_week) || 0,
        },
        reports: {
          pending:       parseInt(r.pending)     || 0,
          flagged:       parseInt(r.flagged)     || 0,
          today:         todayN,
          reports_delta: reportsDelta,
          quality_pct:   parseInt(r.quality_pct) || null,
        },
        farmers: {
          total:      parseInt(ft.total)      || 0,
          consenting: parseInt(ft.consenting) || 0,
        },
      },
      contributors: contributors.rows.map(c => ({
        id:       c.id,
        name:     c.full_name,
        state:    c.state || '—',
        accepted: parseInt(c.accepted) || 0,
        accuracy: parseInt(c.accuracy) || 0,
        level:    parseInt(c.accepted) >= 100 ? 'Verified Market Agent'
                : parseInt(c.accepted) >= 30  ? 'Trusted Reporter'
                                               : 'Contributor',
      })),
      pending_reports: pendingReports.rows.map(p => ({
        id:       p.id,
        crop:     p.crop,
        market:   p.market_name,
        price:    '₦' + Number(p.price_per_unit).toLocaleString('en-NG') + '/' + (p.unit || 'unit'),
        reporter: p.reporter_name,
        flagged:  p.status === 'flagged',
        flag_reason: p.flag_reason || null,
        created_at: p.created_at,
      })),
    });

  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ error: 'Could not load admin stats' });
  }
});

// ── GET /api/admin/users?page=1&q=search ────────────────────────────────────
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 25;
    const offset = (page - 1) * limit;
    const q = req.query.q ? '%' + req.query.q + '%' : null;

    const params = [];
    let where = 'WHERE 1=1';
    if (q) {
      params.push(q);
      where += ` AND (u.full_name ILIKE $${params.length} OR u.email ILIKE $${params.length})`;
    }
    if (req.query.role) {
      params.push(req.query.role);
      where += ` AND u.role = $${params.length}`;
    }

    const countRes = await query(
      `SELECT COUNT(*) FROM users u ${where}`,
      params
    );

    params.push(limit, offset);
    const usersRes = await query(
      `SELECT
         u.id, u.full_name, u.email, u.phone, u.state, u.role,
         u.subscription_tier, u.is_verified, u.is_active,
         u.created_at,
         COUNT(pr.id) AS report_count
       FROM users u
       LEFT JOIN price_reports pr ON pr.reporter_id = u.id
       ${where}
       GROUP BY u.id
       ORDER BY u.created_at DESC
       LIMIT $${params.length - 1} OFFSET $${params.length}`,
      params
    );

    res.json({
      success: true,
      total:   parseInt(countRes.rows[0].count) || 0,
      page,
      limit,
      users: usersRes.rows,
    });

  } catch (err) {
    console.error('Admin users error:', err);
    res.status(500).json({ error: 'Could not load users' });
  }
});

// ── POST /api/admin/reports/:id ──────────────────────────────────────────────
router.post('/reports/:id', requireAdmin, async (req, res) => {
  const { action } = req.body; // 'approve' | 'reject'
  if (!['approve', 'reject'].includes(action)) {
    return res.status(400).json({ error: 'action must be approve or reject' });
  }
  try {
    const status = action === 'approve' ? 'approved' : 'rejected';
    const result = await query(
      `UPDATE price_reports
       SET status = $1, reviewed_by = $2, reviewed_at = NOW()
       WHERE id = $3
       RETURNING id, crop, status`,
      [status, req.user.id, req.params.id]
    ).catch(() => ({ rows: [] }));

    if (!result.rows.length) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json({ success: true, report: result.rows[0] });
  } catch (err) {
    console.error('Admin report action error:', err);
    res.status(500).json({ error: 'Could not update report' });
  }
});


// ── POST /api/admin/seed-demands ─────────────────────────────────────────────
// One-time endpoint to seed the demand board with realistic sample data.
// Protected by SEED_SECRET env var. Delete or disable after first use.
router.post('/seed-demands', async (req, res) => {
  const secret = req.headers['x-seed-secret'] || req.query.secret;
  const ALLOWED = process.env.SEED_SECRET || "agrios-seed-2024-xk9p";
  if (!secret || secret !== ALLOWED) {
    return res.status(401).json({ error: 'Invalid seed secret' });
  }
  try {
    const seeds = [
      {
        buyer_name: 'Dangote Foods Ltd',
        crop_name: 'maize',
        quantity_display: '50 tonnes',
        offered_price: 99000,
        price_unit: '50kg bag',
        delivery_location: 'Mile 12 Market, Lagos',
        delivery_state: 'Lagos',
        days: 14,
        email: 'procurement@dangotefoods.example.ng',
        phone: '08031234567',
        notes: 'Grade A maize only. Must be dry, <14% moisture. Bulk preferred. Payment within 48h of delivery.',
        verified: true,
      },
      {
        buyer_name: 'Northern Groundnut Exporters',
        crop_name: 'groundnut',
        quantity_display: '20 tonnes',
        offered_price: 90000,
        price_unit: '50kg bag',
        delivery_location: 'Kano Free Trade Zone',
        delivery_state: 'Kano',
        days: 21,
        email: 'buy@ngexport.example.ng',
        phone: '08057891234',
        notes: 'Sound bold groundnuts, aflatoxin-tested. Export quality only. Willing to pay premium for certified stock.',
        verified: true,
      },
      {
        buyer_name: 'Abuja Farm Fresh Ltd',
        crop_name: 'tomato',
        quantity_display: '500 baskets',
        offered_price: 24000,
        price_unit: 'basket',
        delivery_location: 'Wuse Market, Abuja',
        delivery_state: 'FCT',
        days: 7,
        email: 'orders@abujafarmfresh.example.ng',
        phone: '08096543210',
        notes: 'Fresh tomatoes, ripe but firm. Weekly standing order — reliable suppliers only.',
        verified: false,
      },
      {
        buyer_name: 'Enugu Milling Co.',
        crop_name: 'cassava',
        quantity_display: '30 tonnes',
        offered_price: 44000,
        price_unit: '50kg bag',
        delivery_location: 'New Market, Enugu',
        delivery_state: 'Enugu',
        days: 10,
        email: 'mill@enugumill.example.ng',
        phone: '08112233445',
        notes: 'Cassava for industrial starch processing. Must meet moisture standard. Regular contract possible.',
        verified: true,
      },
      {
        buyer_name: 'PH Grocery Wholesalers',
        crop_name: 'rice',
        quantity_display: '200 bags',
        offered_price: 64000,
        price_unit: '50kg bag',
        delivery_location: 'Rumuola Market, Port Harcourt',
        delivery_state: 'Rivers',
        days: 5,
        email: 'bulk@phgrocery.example.ng',
        phone: '08167890123',
        notes: 'Long grain parboiled rice. Must be sorted, stone-free. Payment on delivery.',
        verified: false,
      },
    ];

    // Get admin user id as placeholder buyer
    const adminRes = await query(`SELECT id FROM users WHERE role='admin' LIMIT 1`);
    const buyerId = adminRes.rows[0]?.id;
    if (!buyerId) return res.status(400).json({ error: 'No admin user found to use as placeholder buyer' });

    let inserted = 0;
    const errors = [];
    for (const s of seeds) {
      try {
        const cropRes = await query(`SELECT id FROM crops WHERE LOWER(name)=$1 LIMIT 1`, [s.crop_name]);
        if (!cropRes.rows[0]) { errors.push(`Crop not found: ${s.crop_name}`); continue; }
        const cropId = cropRes.rows[0].id;
        await query(
          `INSERT INTO buyer_demands
            (buyer_id, buyer_name, crop_id, quantity_display, offered_price, price_unit,
             delivery_location, delivery_state, deadline, contact_email, contact_phone,
             notes, status, is_verified_buyer, expires_at)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW()+($9||' days')::interval,$10,$11,$12,'open',$13,NOW()+($9||' days')::interval)`,
          [buyerId, s.buyer_name, cropId, s.quantity_display, s.offered_price, s.price_unit,
           s.delivery_location, s.delivery_state, String(s.days), s.email, s.phone, s.notes, s.verified]
        );
        inserted++;
      } catch (e) {
        errors.push(`${s.buyer_name}: ${e.message}`);
      }
    }
    res.json({ success: true, inserted, errors });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── Lender management ────────────────────────────────────────────────────────

// GET /admin/lenders — list all lenders (including inactive)
router.get('/lenders', requireAdmin, async (req, res) => {
  try {
    const result = await query(
      `SELECT id, name, slug, min_score, max_amount_ngn, rate_pa_pct,
              contact_email, contact_url, description, is_active
       FROM lenders
       ORDER BY min_score ASC, name ASC`
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('Admin lenders GET error:', err);
    res.status(500).json({ error: 'Could not load lenders' });
  }
});

// POST /admin/lenders — create a new lender
router.post('/lenders', requireAdmin, async (req, res) => {
  try {
    const { name, slug, min_score, max_amount_ngn, rate_pa_pct,
            contact_email, contact_url, description, is_active } = req.body;

    if (!name || min_score == null || max_amount_ngn == null || rate_pa_pct == null) {
      return res.status(400).json({ error: 'name, min_score, max_amount_ngn and rate_pa_pct are required' });
    }

    const derivedSlug = slug ||
      name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const result = await query(
      `INSERT INTO lenders
         (name, slug, min_score, max_amount_ngn, rate_pa_pct,
          contact_email, contact_url, description, is_active)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       ON CONFLICT (name) DO UPDATE SET
         slug=EXCLUDED.slug, min_score=EXCLUDED.min_score,
         max_amount_ngn=EXCLUDED.max_amount_ngn, rate_pa_pct=EXCLUDED.rate_pa_pct,
         contact_email=EXCLUDED.contact_email, contact_url=EXCLUDED.contact_url,
         description=EXCLUDED.description, is_active=EXCLUDED.is_active
       RETURNING *`,
      [name, derivedSlug, min_score, max_amount_ngn, rate_pa_pct,
       contact_email || null, contact_url || null, description || null,
       is_active !== false]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('Admin lenders POST error:', err);
    res.status(500).json({ error: 'Could not create lender' });
  }
});

// PUT /admin/lenders/:id — full update
router.put('/lenders/:id', requireAdmin, async (req, res) => {
  try {
    const { name, slug, min_score, max_amount_ngn, rate_pa_pct,
            contact_email, contact_url, description, is_active } = req.body;
    const { id } = req.params;

    if (!name || min_score == null || max_amount_ngn == null || rate_pa_pct == null) {
      return res.status(400).json({ error: 'name, min_score, max_amount_ngn and rate_pa_pct are required' });
    }

    const derivedSlug = slug ||
      name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const result = await query(
      `UPDATE lenders SET
         name=$1, slug=$2, min_score=$3, max_amount_ngn=$4, rate_pa_pct=$5,
         contact_email=$6, contact_url=$7, description=$8, is_active=$9
       WHERE id=$10
       RETURNING *`,
      [name, derivedSlug, min_score, max_amount_ngn, rate_pa_pct,
       contact_email || null, contact_url || null, description || null,
       is_active !== false, id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Lender not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('Admin lenders PUT error:', err);
    res.status(500).json({ error: 'Could not update lender' });
  }
});

// PATCH /admin/lenders/:id — partial update (toggle active, etc.)
router.patch('/lenders/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const fields = [];
    const vals = [];
    let i = 1;

    const allowed = ['name','slug','min_score','max_amount_ngn','rate_pa_pct',
                     'contact_email','contact_url','description','is_active'];
    for (const key of allowed) {
      if (req.body[key] !== undefined) {
        fields.push(`${key}=$${i++}`);
        vals.push(req.body[key]);
      }
    }
    if (!fields.length) return res.status(400).json({ error: 'No fields to update' });

    vals.push(id);
    const result = await query(
      `UPDATE lenders SET ${fields.join(',')} WHERE id=$${i} RETURNING *`,
      vals
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Lender not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error('Admin lenders PATCH error:', err);
    res.status(500).json({ error: 'Could not update lender' });
  }
});

module.exports = router;
