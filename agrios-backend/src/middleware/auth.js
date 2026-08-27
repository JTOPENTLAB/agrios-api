const jwt = require('jsonwebtoken');
const { query } = require('../config/db');

const authenticate = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await query('SELECT id, email, role, subscription_tier, is_active FROM users WHERE id=$1', [decoded.userId]);
    if (!result.rows.length || !result.rows[0].is_active) {
      return res.status(401).json({ error: 'User not found or inactive' });
    }
    req.user = result.rows[0];
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
  next();
};

const requirePro = (req, res, next) => {
  const allowed = ['pro', 'business'];
  if (!allowed.includes(req.user?.subscription_tier)) {
    return res.status(403).json({ error: 'Pro subscription required', upgrade_url: 'https://useagrios.com/upgrade' });
  }
  next();
};

const optionalAuth = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return next();
  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await query('SELECT id, email, role, subscription_tier FROM users WHERE id=$1', [decoded.userId]);
    if (result.rows.length) req.user = result.rows[0];
  } catch {}
  next();
};

module.exports = { authenticate, requireAdmin, requirePro, optionalAuth };
