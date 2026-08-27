require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cron = require('node-cron');

const { syncPrices } = require('./services/priceFetcher');
const { checkAlerts } = require('./services/alertChecker');
const { rescoreAllContributors } = require('./services/creditScorer');

const app = express();
const PORT = process.env.PORT || 3001;

// ── SECURITY ──────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'https://useagrios.com',
    'http://localhost:3000',
    'http://localhost:5173',
  ],
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200, message: { error: 'Too many requests' } });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: { error: 'Too many auth attempts' } });
app.use('/api', limiter);
app.use('/api/auth', authLimiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── REQUEST LOGGING ───────────────────────────────────────────
app.use((req, _res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  }
  next();
});

// ── ROUTES ────────────────────────────────────────────────────
app.use('/api/auth',      require('./routes/auth'));
app.use('/api/prices',    require('./routes/prices'));
app.use('/api/transport', require('./routes/transport'));
app.use('/api/alerts',    require('./routes/alerts'));
app.use('/api/demand',    require('./routes/demand'));
app.use('/api/finance',   require('./routes/finance'));
app.use('/api/export',    require('./routes/export'));
app.use('/api/admin',     require('./routes/admin'));

// ── HEALTH CHECK ──────────────────────────────────────────────
app.get('/health', async (req, res) => {
  try {
    const { query } = require('./config/db');
    const db = await query('SELECT NOW() as now, COUNT(*) as crop_count FROM crops');
    res.json({
      status: 'ok',
      version: '1.0.0',
      env: process.env.NODE_ENV,
      db_time: db.rows[0].now,
      crops: db.rows[0].crop_count,
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    res.status(503).json({ status: 'db_error', error: e.message });
  }
});

app.get('/', (req, res) => res.json({
  name: 'Agrios API',
  version: '1.0.0',
  docs: 'https://useagrios.com/api-docs',
  status: 'operational',
}));

// 404
app.use((req, res) => res.status(404).json({ error: `Route ${req.method} ${req.path} not found` }));

// Error handler
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ── CRON JOBS ─────────────────────────────────────────────────
// Price sync every 2 minutes
cron.schedule('*/2 * * * *', async () => {
  try { await syncPrices(); } catch (e) { console.error('Cron price sync failed:', e.message); }
});

// Alert checker every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  try { await checkAlerts(); } catch (e) { console.error('Cron alert check failed:', e.message); }
});

// Credit re-score daily at 3 AM WAT (UTC+1 = 2 AM UTC)
cron.schedule('0 2 * * *', async () => {
  try { await rescoreAllContributors(); } catch (e) { console.error('Cron credit score failed:', e.message); }
});

// ── START ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌿 Agrios API running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Env:    ${process.env.NODE_ENV || 'development'}`);
  console.log(`   CORS:   ${process.env.FRONTEND_URL || 'https://useagrios.com'}`);
  console.log('\n📡 Cron jobs active:');
  console.log('   Price sync:    every 2 minutes');
  console.log('   Alert checker: every 5 minutes');
  console.log('   Credit scorer: daily 3:00 AM WAT\n');
});

module.exports = app;
