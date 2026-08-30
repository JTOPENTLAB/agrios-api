// Upload to agrios-api repo at: agrios-backend/src/models/reset_passwords.js
// Then in Render change start command temporarily to:
// node agrios-backend/src/models/reset_passwords.js && node agrios-backend/src/index.js

require('dotenv').config();
const bcrypt = require('bcryptjs');
const { query } = require('../config/db');

async function resetPasswords() {
  console.log('Resetting demo user passwords...');
  
  const demoHash  = await bcrypt.hash('Demo@123456!', 12);
  const adminHash = await bcrypt.hash('Admin@Agrios2025!', 12);

  // Reset ALL demo users passwords
  const updates = [
    { email: 'info@useagrios.com',  hash: adminHash },
    { email: 'admin@useagrios.com', hash: adminHash },
    { email: 'fatima@demo.com',     hash: demoHash  },
    { email: 'adewale@demo.com',    hash: demoHash  },
    { email: 'emeka@demo.com',      hash: demoHash  },
    { email: 'aisha@demo.com',      hash: demoHash  },
    { email: 'driver@demo.com',     hash: demoHash  },
    { email: 'buyer@demo.com',      hash: demoHash  },
  ];

  for (const u of updates) {
    const result = await query(
      'UPDATE users SET password_hash=$1, is_verified=true, updated_at=NOW() WHERE email=$2 RETURNING email',
      [u.hash, u.email]
    );
    if (result.rows.length) {
      console.log(`  ✓ Reset: ${u.email}`);
    } else {
      // User doesn't exist, create them
      if (u.email === 'info@useagrios.com') {
        await query(
          `INSERT INTO users (email, password_hash, full_name, role, subscription_tier, is_verified)
           VALUES ($1,$2,'Agrios Admin','admin','business',true)
           ON CONFLICT (email) DO UPDATE SET password_hash=$2, is_verified=true`,
          [u.email, u.hash]
        );
        console.log(`  ✓ Created admin: ${u.email}`);
      } else if (u.email === 'fatima@demo.com') {
        await query(
          `INSERT INTO users (email, password_hash, full_name, state, role, subscription_tier, is_verified)
           VALUES ($1,$2,'Fatima Kalu','Kaduna','farmer','pro',true)
           ON CONFLICT (email) DO UPDATE SET password_hash=$2, is_verified=true`,
          [u.email, u.hash]
        );
        console.log(`  ✓ Created demo: ${u.email}`);
      }
    }
  }

  // Verify
  const users = await query('SELECT email, role, subscription_tier FROM users ORDER BY role');
  console.log('\nCurrent users:');
  users.rows.forEach(u => console.log(`  ${u.email} (${u.role}, ${u.subscription_tier})`));
  console.log('\n✅ Passwords reset complete!');
  console.log('   fatima@demo.com    / Demo@123456!');
  console.log('   info@useagrios.com / Admin@Agrios2025!');
}

resetPasswords()
  .then(() => process.exit(0))
  .catch(e => { console.error('Failed:', e); process.exit(1); });
