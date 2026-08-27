const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');
const { authenticate } = require('../middleware/auth');
const { ok, err } = require('../utils/response');

const signTokens = (userId) => {
  const access = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '15m' });
  const refresh = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' });
  return { access, refresh };
};

// REGISTER
router.post('/register', async (req, res) => {
  const { email, password, full_name, phone, state, role } = req.body;
  if (!email || !password || !full_name) return err(res, 'email, password and full_name are required');
  if (password.length < 8) return err(res, 'Password must be at least 8 characters');
  const allowedRoles = ['farmer','trader','driver','buyer','exporter'];
  const userRole = allowedRoles.includes(role) ? role : 'farmer';
  try {
    const exists = await query('SELECT id FROM users WHERE email=$1', [email.toLowerCase()]);
    if (exists.rows.length) return err(res, 'Email already registered', 409);
    const hash = await bcrypt.hash(password, 12);
    const result = await query(
      `INSERT INTO users (email, password_hash, full_name, phone, state, role)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, email, full_name, role, subscription_tier`,
      [email.toLowerCase(), hash, full_name, phone, state, userRole]
    );
    const user = result.rows[0];
    // create contributor record
    await query('INSERT INTO contributors (user_id) VALUES ($1) ON CONFLICT DO NOTHING', [user.id]);
    const tokens = signTokens(user.id);
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await query('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1,$2,$3)', [user.id, tokens.refresh, expires]);
    return ok(res, { user, tokens });
  } catch (e) { return err(res, 'Registration failed', 500); }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return err(res, 'Email and password required');
  try {
    const result = await query(
      'SELECT id, email, password_hash, full_name, role, subscription_tier, is_active FROM users WHERE email=$1',
      [email.toLowerCase()]
    );
    if (!result.rows.length) return err(res, 'Invalid credentials', 401);
    const user = result.rows[0];
    if (!user.is_active) return err(res, 'Account disabled', 403);
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return err(res, 'Invalid credentials', 401);
    delete user.password_hash;
    const tokens = signTokens(user.id);
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await query('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1,$2,$3)', [user.id, tokens.refresh, expires]);
    return ok(res, { user, tokens });
  } catch (e) { return err(res, 'Login failed', 500); }
});

// REFRESH TOKEN
router.post('/refresh', async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) return err(res, 'Refresh token required');
  try {
    const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
    const stored = await query(
      'SELECT id FROM refresh_tokens WHERE token=$1 AND user_id=$2 AND expires_at > NOW()',
      [refresh_token, decoded.userId]
    );
    if (!stored.rows.length) return err(res, 'Invalid or expired refresh token', 401);
    await query('DELETE FROM refresh_tokens WHERE token=$1', [refresh_token]);
    const tokens = signTokens(decoded.userId);
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await query('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1,$2,$3)', [decoded.userId, tokens.refresh, expires]);
    return ok(res, { tokens });
  } catch (e) { return err(res, 'Token refresh failed', 401); }
});

// LOGOUT
router.post('/logout', authenticate, async (req, res) => {
  const { refresh_token } = req.body;
  if (refresh_token) await query('DELETE FROM refresh_tokens WHERE token=$1', [refresh_token]);
  return ok(res, { message: 'Logged out' });
});

// GET ME
router.get('/me', authenticate, async (req, res) => {
  try {
    const result = await query(
      `SELECT u.id, u.email, u.full_name, u.phone, u.state, u.role, u.subscription_tier, u.is_verified, u.created_at,
              c.total_reports, c.accepted_reports, c.accuracy_pct, c.trust_level, c.credit_score, c.credit_grade,
              s.expires_at as subscription_expires
       FROM users u
       LEFT JOIN contributors c ON c.user_id = u.id
       LEFT JOIN subscriptions s ON s.user_id = u.id AND s.is_active = true
       WHERE u.id=$1`,
      [req.user.id]
    );
    const unread = await query(
      'SELECT COUNT(*) as count FROM alert_notifications WHERE user_id=$1 AND is_read=false',
      [req.user.id]
    );
    const user = result.rows[0];
    user.unread_notifications = parseInt(unread.rows[0].count);
    return ok(res, user);
  } catch (e) { return err(res, 'Failed to fetch profile', 500); }
});

// UPDATE PROFILE
router.patch('/me', authenticate, async (req, res) => {
  const { full_name, phone, state, lga } = req.body;
  try {
    const result = await query(
      `UPDATE users SET full_name=COALESCE($1,full_name), phone=COALESCE($2,phone),
       state=COALESCE($3,state), lga=COALESCE($4,lga), updated_at=NOW()
       WHERE id=$5 RETURNING id, email, full_name, phone, state, lga`,
      [full_name, phone, state, lga, req.user.id]
    );
    return ok(res, result.rows[0]);
  } catch (e) { return err(res, 'Update failed', 500); }
});

// NOTIFICATIONS
router.get('/notifications', authenticate, async (req, res) => {
  try {
    const result = await query(
      `SELECT n.*, pa.condition, pa.target_value,
              cr.name as crop_name, cr.emoji as crop_emoji
       FROM alert_notifications n
       JOIN price_alerts pa ON pa.id = n.alert_id
       JOIN crops cr ON cr.id = pa.crop_id
       WHERE n.user_id=$1
       ORDER BY n.created_at DESC LIMIT 50`,
      [req.user.id]
    );
    await query('UPDATE alert_notifications SET is_read=true WHERE user_id=$1 AND is_read=false', [req.user.id]);
    return ok(res, result.rows);
  } catch (e) { return err(res, 'Failed to fetch notifications', 500); }
});

module.exports = router;
