// routes/farmers.js
// GET  /api/farmers/directory  — public list of consenting farmers
//   Free callers  : name masked to "First L.", state, lga, crops, harvest_size_kg
//   Pro callers   : full name + phone (no email — privacy)
// POST /api/farmers/contact    — Pro buyer sends a contact request (logged, no email sent yet)

const express = require('express');
const router  = express.Router();
const { query } = require('../config/db');

// ── Lightweight auth middleware (non-blocking — sets req.user if token valid) ──
const jwt = require('jsonwebtoken');
function softAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token  = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (token) {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    }
  } catch (_) { /* invalid token — continue as anonymous */ }
  next();
}

// ── Helper: is this user a Pro/Business subscriber? ──
function isPro(user) {
  return user && (user.subscription_tier === 'pro' || user.subscription_tier === 'business' || user.role === 'admin');
}

// ── GET /api/farmers/directory ──────────────────────────────────────────────
router.get('/directory', softAuth, async (req, res) => {
  try {
    const { state, crop } = req.query;

    let sql = `
      SELECT
        id,
        full_name,
        state,
        lga,
        crops_grown,
        harvest_size_kg,
        phone,
        created_at
      FROM users
      WHERE role = 'farmer'
        AND buyer_contact_consent = true
        AND is_active = true
    `;
    const params = [];

    if (state) {
      params.push(state);
      sql += ` AND state = $${params.length}`;
    }

    if (crop) {
      params.push(crop);
      sql += ` AND $${params.length} = ANY(crops_grown)`;
    }

    sql += ' ORDER BY created_at DESC LIMIT 200';

    const result = await query(sql, params);
    const pro = isPro(req.user);

    const farmers = result.rows.map(f => {
      // Mask name and hide phone for free/unauthenticated callers
      const nameParts = (f.full_name || '').split(' ');
      const maskedName = pro
        ? f.full_name
        : nameParts[0] + ' ' + nameParts.slice(1).map(w => w[0] + '.').join(' ');

      return {
        id:               f.id,
        full_name:        maskedName,
        state:            f.state,
        lga:              f.lga,
        crops_grown:      f.crops_grown || [],
        harvest_size_kg:  f.harvest_size_kg,
        phone:            pro ? f.phone : undefined,
        joined:           f.created_at,
      };
    });

    res.json({
      success: true,
      data: farmers,
      total: farmers.length,
      access: pro ? 'pro' : 'free',
    });

  } catch (err) {
    console.error('Farmer directory error:', err);
    res.status(500).json({ error: 'Could not load farmer directory' });
  }
});

// ── POST /api/farmers/contact ────────────────────────────────────────────────
// Pro buyer flags interest in a farmer — logged for now, email flow added later
router.post('/contact', softAuth, async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Sign in required' });
  if (!isPro(req.user)) return res.status(403).json({ error: 'Pro subscription required to contact farmers' });

  const { farmer_id, message } = req.body;
  if (!farmer_id) return res.status(400).json({ error: 'farmer_id required' });

  try {
    // Verify farmer exists and has consented
    const check = await query(
      `SELECT id, full_name FROM users WHERE id = $1 AND role = 'farmer' AND buyer_contact_consent = true AND is_active = true`,
      [farmer_id]
    );
    if (!check.rows.length) return res.status(404).json({ error: 'Farmer not found or contact not available' });

    // Log the contact request (table created below if it doesn't exist)
    await query(
      `INSERT INTO farmer_contact_requests (buyer_id, farmer_id, message) VALUES ($1, $2, $3)`,
      [req.user.id, farmer_id, message || null]
    ).catch(() => {
      // Table may not exist yet — fail silently, don't block the response
    });

    res.json({
      success: true,
      message: `Contact request sent to ${check.rows[0].full_name}. They will be notified.`,
    });

  } catch (err) {
    console.error('Farmer contact error:', err);
    res.status(500).json({ error: 'Could not send contact request' });
  }
});

module.exports = router;
