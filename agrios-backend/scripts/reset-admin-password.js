#!/usr/bin/env node
// One-off password reset, run manually via a temporary Start Command swap.
// Reads the target email and new password from environment variables set
// directly in Render's dashboard (Settings > Environment) — never hardcoded,
// never logged, never passed through chat. Delete those env vars from Render
// once you've confirmed the reset worked.
//
// Usage (set in Render's Start Command, temporarily):
//   cd agrios-backend && node scripts/reset-admin-password.js && node src/index.js

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { query } = require('../src/config/db');

async function resetOne() {
  const email = process.env.RESET_EMAIL;
  const password = process.env.RESET_PASSWORD;

  if (!email || !password) {
    console.log('RESET_EMAIL and/or RESET_PASSWORD env vars not set — skipping reset.');
    return;
  }
  if (password.length < 8) {
    console.error('RESET_PASSWORD must be at least 8 characters — skipping reset.');
    return;
  }

  const hash = await bcrypt.hash(password, 12);
  const result = await query(
    'UPDATE users SET password_hash=$1, is_verified=true, updated_at=NOW() WHERE email=$2 RETURNING email',
    [hash, email.toLowerCase()]
  );

  if (result.rows.length) {
    console.log(`✅ Password reset for ${email}. (Value not logged.)`);
  } else {
    console.log(`⚠️  No user found with email ${email} — nothing changed.`);
  }
}

resetOne()
  .then(() => process.exit(0))
  .catch(e => { console.error('Reset failed:', e.message); process.exit(1); });
