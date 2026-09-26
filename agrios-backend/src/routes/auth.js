const express  = require('express');
const router   = express.Router();
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const { query } = require('../config/db');

const JWT_SECRET  = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || '7d';

// ── Helpers ──────────────────────────────────────────────────────────────────
function signToken(user) {
  return jwt.sign(
    {
      id:                user.id,
      email:             user.email,
      role:              user.role,
      subscription_tier: user.subscription_tier,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
}

function safeUser(user) {
  const { password_hash, ...safe } = user;
  return safe;
}

// ── POST /api/auth/register ───────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const {
      full_name, email, password, phone, state, role,
      lga, harvest_size_kg, crops_grown, buyer_contact_consent
    } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ error: 'full_name, email and password are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters' });
    }

    // Check duplicate email
    const existing = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase().trim()]);
    if (existing.rows.length) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await query(
      `INSERT INTO users
         (full_name, email, password_hash, phone, state, lga, role,
          crops_grown, harvest_size_kg, buyer_contact_consent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id, full_name, email, phone, state, lga, role,
                 crops_grown, harvest_size_kg, buyer_contact_consent,
                 subscription_tier, is_verified, created_at`,
      [
        full_name.trim(),
        email.toLowerCase().trim(),
        passwordHash,
        phone           || null,
        state           || null,
        lga             || null,
        role            || 'farmer',
        crops_grown     && crops_grown.length ? crops_grown : '{}',
        harvest_size_kg ? parseInt(harvest_size_kg) : null,
        buyer_contact_consent === true || buyer_contact_consent === 'true',
      ]
    );

    const user  = result.rows[0];
    const token = signToken(user);

    res.status(201).json({
      success: true,
      token,
      user: safeUser(user),
    });

  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed — please try again' });
  }
});

// ── POST /api/auth/login ──────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await query(
      `SELECT id, full_name, email, password_hash, phone, state, lga, role,
              subscription_tier, is_verified, is_active, created_at
       FROM users WHERE email = $1`,
      [email.toLowerCase().trim()]
    );

    if (!result.rows.length) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return res.status(403).json({ error: 'Account suspended — contact support' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = signToken(user);

    res.json({
      success: true,
      token,
      user: safeUser(user),
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed — please try again' });
  }
});

// ── GET /api/auth/me ──────────────────────────────────────────────────────────
router.get('/me', async (req, res) => {
  try {
    const header = req.headers.authorization || '';
    const token  = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (_) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const result = await query(
      `SELECT id, full_name, email, phone, state, lga, role,
              crops_grown, harvest_size_kg, buyer_contact_consent,
              subscription_tier, is_verified, is_active, created_at
       FROM users WHERE id = $1 AND is_active = true`,
      [payload.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ success: true, user: result.rows[0] });

  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ error: 'Could not fetch profile' });
  }
});

// ── POST /api/auth/change-password ───────────────────────────────────────────
router.post('/change-password', async (req, res) => {
  try {
    const header = req.headers.authorization || '';
    const token  = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (_) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const { current_password, new_password } = req.body;
    if (!current_password || !new_password) {
      return res.status(400).json({ error: 'current_password and new_password are required' });
    }
    if (new_password.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters' });
    }

    const result = await query('SELECT password_hash FROM users WHERE id = $1', [payload.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'User not found' });

    const match = await bcrypt.compare(current_password, result.rows[0].password_hash);
    if (!match) return res.status(401).json({ error: 'Current password is incorrect' });

    const newHash = await bcrypt.hash(new_password, 12);
    await query('UPDATE users SET password_hash = $1 WHERE id = $2', [newHash, payload.id]);

    res.json({ success: true, message: 'Password updated successfully' });

  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ error: 'Could not update password' });
  }
});

module.exports = router;
