require('dotenv').config();
const { query } = require('../config/db');

async function migrate() {
  console.log('🌱 Running Agrios database migrations...');

  // USERS
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      state VARCHAR(100),
      lga VARCHAR(100),
      role VARCHAR(20) DEFAULT 'farmer' CHECK (role IN ('farmer','trader','driver','admin','buyer','exporter')),
      subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free','pro','business')),
      is_verified BOOLEAN DEFAULT false,
      is_active BOOLEAN DEFAULT true,
      avatar_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // REFRESH TOKENS
  await query(`
    CREATE TABLE IF NOT EXISTS refresh_tokens (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token TEXT NOT NULL UNIQUE,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // CROPS
  await query(`
    CREATE TABLE IF NOT EXISTS crops (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(100) NOT NULL UNIQUE,
      name_hausa VARCHAR(100),
      name_yoruba VARCHAR(100),
      name_igbo VARCHAR(100),
      emoji VARCHAR(10),
      category VARCHAR(50) CHECK (category IN ('grain','root','vegetable','legume','cash_crop','oil','fruit')),
      is_exportable BOOLEAN DEFAULT false,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // MARKETS
  await query(`
    CREATE TABLE IF NOT EXISTS markets (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(150) NOT NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      region VARCHAR(50) CHECK (region IN ('north_west','north_east','north_central','south_west','south_east','south_south')),
      latitude DECIMAL(10,7),
      longitude DECIMAL(10,7),
      is_major BOOLEAN DEFAULT false,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // MARKET PRICES (current)
  await query(`
    CREATE TABLE IF NOT EXISTS market_prices (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      crop_id UUID NOT NULL REFERENCES crops(id),
      market_id UUID NOT NULL REFERENCES markets(id),
      price_low DECIMAL(12,2) NOT NULL,
      price_avg DECIMAL(12,2) NOT NULL,
      price_high DECIMAL(12,2) NOT NULL,
      unit VARCHAR(50) NOT NULL,
      confidence_score INTEGER DEFAULT 80 CHECK (confidence_score BETWEEN 0 AND 100),
      source VARCHAR(30) DEFAULT 'community' CHECK (source IN ('community','wfp','admin','api','model')),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(crop_id, market_id)
    );
  `);

  // PRICE HISTORY
  await query(`
    CREATE TABLE IF NOT EXISTS price_history (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      crop_id UUID NOT NULL REFERENCES crops(id),
      market_id UUID NOT NULL REFERENCES markets(id),
      price_avg DECIMAL(12,2) NOT NULL,
      price_low DECIMAL(12,2),
      price_high DECIMAL(12,2),
      unit VARCHAR(50) NOT NULL,
      recorded_date DATE NOT NULL,
      source VARCHAR(30) DEFAULT 'community',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(crop_id, market_id, recorded_date)
    );
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_price_history_date ON price_history(recorded_date DESC);`);
  await query(`CREATE INDEX IF NOT EXISTS idx_price_history_crop ON price_history(crop_id, recorded_date DESC);`);

  // PRICE REPORTS (community submissions)
  await query(`
    CREATE TABLE IF NOT EXISTS price_reports (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE SET NULL,
      crop_id UUID NOT NULL REFERENCES crops(id),
      market_id UUID NOT NULL REFERENCES markets(id),
      reported_price DECIMAL(12,2) NOT NULL,
      unit VARCHAR(50) NOT NULL,
      observed_date DATE NOT NULL,
      notes TEXT,
      photo_url TEXT,
      status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected','flagged')),
      rejection_reason TEXT,
      deviation_pct DECIMAL(5,2),
      reviewed_by UUID REFERENCES users(id) ON DELETE SET NULL,
      reviewed_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_price_reports_status ON price_reports(status, created_at DESC);`);

  // CONTRIBUTORS
  await query(`
    CREATE TABLE IF NOT EXISTS contributors (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      total_reports INTEGER DEFAULT 0,
      accepted_reports INTEGER DEFAULT 0,
      rejected_reports INTEGER DEFAULT 0,
      accuracy_pct DECIMAL(5,2) DEFAULT 100.0,
      trust_level VARCHAR(30) DEFAULT 'new' CHECK (trust_level IN ('new','basic','trusted','verified_agent','master_agent')),
      credit_score INTEGER DEFAULT 500 CHECK (credit_score BETWEEN 0 AND 1000),
      credit_grade VARCHAR(20) DEFAULT 'Fair' CHECK (credit_grade IN ('Poor','Fair','Good','Very Good','Excellent')),
      market_presence_score INTEGER DEFAULT 0,
      last_report_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // PRICE ALERTS
  await query(`
    CREATE TABLE IF NOT EXISTS price_alerts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      crop_id UUID NOT NULL REFERENCES crops(id),
      market_id UUID REFERENCES markets(id),
      condition VARCHAR(30) NOT NULL CHECK (condition IN ('above','below','increase_pct','decrease_pct','export_premium')),
      target_value DECIMAL(12,2) NOT NULL,
      notify_email BOOLEAN DEFAULT true,
      notify_whatsapp BOOLEAN DEFAULT false,
      notify_inapp BOOLEAN DEFAULT true,
      is_active BOOLEAN DEFAULT true,
      last_triggered_at TIMESTAMPTZ,
      trigger_count INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // ALERT NOTIFICATIONS
  await query(`
    CREATE TABLE IF NOT EXISTS alert_notifications (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      alert_id UUID NOT NULL REFERENCES price_alerts(id) ON DELETE CASCADE,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      message TEXT NOT NULL,
      current_price DECIMAL(12,2),
      is_read BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_alert_notif_user ON alert_notifications(user_id, is_read, created_at DESC);`);

  // PUSH SUBSCRIPTIONS (web push / VAPID)
  await query(`
    CREATE TABLE IF NOT EXISTS push_subscriptions (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      endpoint     TEXT UNIQUE NOT NULL,
      subscription JSONB NOT NULL,
      created_at   TIMESTAMPTZ DEFAULT NOW(),
      updated_at   TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_push_subscriptions_user_id ON push_subscriptions(user_id);`);

  // TRANSPORT JOBS
  await query(`
    CREATE TABLE IF NOT EXISTS transport_jobs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      poster_id UUID REFERENCES users(id) ON DELETE SET NULL,
      crop_id UUID REFERENCES crops(id),
      crop_name VARCHAR(100),
      quantity DECIMAL(10,2),
      unit VARCHAR(50),
      pickup_location TEXT NOT NULL,
      pickup_state VARCHAR(100) NOT NULL,
      delivery_location TEXT NOT NULL,
      delivery_state VARCHAR(100) NOT NULL,
      distance_km INTEGER,
      vehicle_type VARCHAR(50),
      pickup_date DATE,
      deliver_by DATE,
      max_budget DECIMAL(12,2),
      quoted_price DECIMAL(12,2),
      status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open','accepted','in_transit','completed','cancelled')),
      driver_id UUID REFERENCES users(id) ON DELETE SET NULL,
      is_urgent BOOLEAN DEFAULT false,
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_transport_jobs_status ON transport_jobs(status, created_at DESC);`);

  // VEHICLES
  await query(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      vehicle_type VARCHAR(50) NOT NULL,
      make_model VARCHAR(150),
      plate_number VARCHAR(30) UNIQUE,
      capacity_tonnes DECIMAL(8,2),
      base_city VARCHAR(100),
      base_state VARCHAR(100),
      regular_routes TEXT[],
      rate_per_km DECIMAL(8,2),
      has_gps BOOLEAN DEFAULT false,
      has_insurance BOOLEAN DEFAULT false,
      has_refrigeration BOOLEAN DEFAULT false,
      is_cross_state BOOLEAN DEFAULT false,
      driver_name VARCHAR(255),
      driver_phone VARCHAR(20),
      licence_number VARCHAR(50),
      rating DECIMAL(3,2) DEFAULT 5.00,
      total_jobs INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT true,
      is_verified BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // BUYER DEMANDS
  await query(`
    CREATE TABLE IF NOT EXISTS buyer_demands (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      buyer_id UUID REFERENCES users(id) ON DELETE SET NULL,
      buyer_name VARCHAR(255) NOT NULL,
      crop_id UUID NOT NULL REFERENCES crops(id),
      quantity_kg DECIMAL(12,2),
      quantity_display VARCHAR(100),
      offered_price DECIMAL(12,2) NOT NULL,
      price_unit VARCHAR(50) NOT NULL,
      delivery_location TEXT NOT NULL,
      delivery_state VARCHAR(100) NOT NULL,
      deadline DATE,
      is_verified_buyer BOOLEAN DEFAULT false,
      status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open','filled','expired','cancelled')),
      contact_email VARCHAR(255),
      contact_phone VARCHAR(20),
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      expires_at TIMESTAMPTZ
    );
  `);

  // EXPORT DATA
  await query(`
    CREATE TABLE IF NOT EXISTS export_prices (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      crop_id UUID NOT NULL REFERENCES crops(id),
      local_price DECIMAL(12,2) NOT NULL,
      export_price DECIMAL(12,2) NOT NULL,
      premium_pct DECIMAL(5,2) NOT NULL,
      currency VARCHAR(10) DEFAULT 'NGN',
      grade_required TEXT,
      destination_country VARCHAR(100),
      best_port VARCHAR(150),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(crop_id, destination_country)
    );
  `);

  // SUBSCRIPTIONS
  await query(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      tier VARCHAR(20) NOT NULL CHECK (tier IN ('free','pro','business')),
      paystack_reference VARCHAR(255),
      amount_ngn DECIMAL(10,2),
      started_at TIMESTAMPTZ DEFAULT NOW(),
      expires_at TIMESTAMPTZ,
      is_active BOOLEAN DEFAULT true,
      auto_renew BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // INTEL OPPORTUNITIES
  await query(`
    CREATE TABLE IF NOT EXISTS intel_opportunities (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      type VARCHAR(30) NOT NULL CHECK (type IN ('arbitrage','rising_trend','demand_alert','export_window','sourcing_tip','climate_alert')),
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      crop_id UUID REFERENCES crops(id),
      buy_market_id UUID REFERENCES markets(id),
      sell_market_id UUID REFERENCES markets(id),
      margin_display VARCHAR(30),
      is_pro_only BOOLEAN DEFAULT false,
      expires_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // LENDERS
  await query(`
    CREATE TABLE IF NOT EXISTS lenders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(150) NOT NULL UNIQUE,
      min_score INTEGER DEFAULT 500,
      max_amount_ngn DECIMAL(12,2) NOT NULL,
      rate_pa_pct DECIMAL(5,2) NOT NULL,
      tenure_months INTEGER[] DEFAULT '{6,12}',
      contact VARCHAR(255),
      partnership_status VARCHAR(20) NOT NULL DEFAULT 'illustrative' CHECK (partnership_status IN ('illustrative','active')),
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await query(`
    INSERT INTO lenders (name, min_score, max_amount_ngn, rate_pa_pct, tenure_months, contact, partnership_status) VALUES
      ('Agrifinance Partners', 600, 5000000, 18, '{3,6,12}', 'loans@agrifinance.ng', 'illustrative'),
      ('NIRSAL Microfinance Bank', 500, 2000000, 21, '{6,12,24}', 'agri@nirsal.com', 'illustrative'),
      ('Bank of Agriculture Nigeria', 550, 10000000, 15, '{12,24,36}', 'loans@boanigeria.com', 'illustrative')
    ON CONFLICT (name) DO NOTHING;
  `);

  // EXPORT AGENTS
  await query(`
    CREATE TABLE IF NOT EXISTS export_agents (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(150) NOT NULL UNIQUE,
      crops TEXT[] NOT NULL DEFAULT '{}',
      states TEXT[] NOT NULL DEFAULT '{}',
      contact VARCHAR(255),
      port VARCHAR(150),
      partner BOOLEAN NOT NULL DEFAULT false,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await query(`
    INSERT INTO export_agents (name, crops, states, contact, port, partner) VALUES
      ('Lagos Cocoa Export Ltd', '{Cocoa,Sesame}', '{Lagos,Ogun}', 'export@lagoscocoa.ng', 'Apapa', false),
      ('Kano Agro Exports', '{Sesame,Soybean,Groundnut}', '{Kano,Kaduna}', 'info@kanoexports.ng', 'Kano Dry Port', false),
      ('AfroCashew Nigeria', '{Cashew}', '{Lagos,Ogun,Ondo}', 'trade@afrocashew.ng', 'Tin Can Island', false),
      ('Delta Palm Exports', '{"Palm Oil"}', '{Delta,Rivers,Bayelsa}', 'export@deltapalmng.com', 'Warri Port', false),
      ('North Hibiscus Traders', '{Hibiscus,Sesame}', '{Kano,Jigawa,Bauchi}', '+2348099887766', 'Kano Dry Port', false),
      ('Margafrique (Morocco)', '{Sesame,Hibiscus,"Palm Oil",Groundnut,"Dried Ginger",Cashew}', '{Kano,Lagos,Ogun,Kaduna,Zamfara,Jigawa}', 'l.ly@margafrique.ma', 'Casablanca Port', false)
    ON CONFLICT (name) DO NOTHING;
  `);

  // MARKET INSIGHTS
  await query(`
    CREATE TABLE IF NOT EXISTS market_insights (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      week_start DATE NOT NULL UNIQUE,
      gainers JSONB NOT NULL DEFAULT '[]',
      fallers JSONB NOT NULL DEFAULT '[]',
      summary TEXT,
      generated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // PRICE SYNC LOG
  await query(`
    CREATE TABLE IF NOT EXISTS price_sync_log (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      source VARCHAR(30) NOT NULL,
      crops_updated INTEGER DEFAULT 0,
      markets_updated INTEGER DEFAULT 0,
      errors INTEGER DEFAULT 0,
      duration_ms INTEGER,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // FIX: add 'model' to market_prices source check constraint
  await query(`ALTER TABLE market_prices DROP CONSTRAINT IF EXISTS market_prices_source_check;`);
  await query(`
    ALTER TABLE market_prices ADD CONSTRAINT market_prices_source_check
      CHECK (source IN ('community','wfp','admin','api','model'));
  `);

  // FARMER DIRECTORY: add new columns to users table (idempotent — column exists = no-op)
  await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS crops_grown TEXT[] DEFAULT '{}';`);
  await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS harvest_size_kg INTEGER;`);
  await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS buyer_contact_consent BOOLEAN DEFAULT false;`);
  await query(`CREATE INDEX IF NOT EXISTS idx_users_farmer_directory ON users(role, buyer_contact_consent, state) WHERE role = 'farmer' AND buyer_contact_consent = true;`);

  // FARMER CONTACT REQUESTS
  await query(`
    CREATE TABLE IF NOT EXISTS farmer_contact_requests (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      buyer_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      farmer_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      message    TEXT,
      status     VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','viewed','responded')),
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_fcr_farmer ON farmer_contact_requests(farmer_id, created_at DESC);`);
  await query(`CREATE INDEX IF NOT EXISTS idx_fcr_buyer  ON farmer_contact_requests(buyer_id,  created_at DESC);`);

  // SEED: Morocco export prices
  await query(`
    INSERT INTO export_prices (crop_id, local_price, export_price, premium_pct, currency, grade_required, destination_country, best_port)
    SELECT c.id, 850000, 1200000, 41.18, 'NGN', 'Grade A, moisture <8%', 'Morocco', 'Apapa Port, Lagos'
    FROM crops c WHERE c.name = 'Sesame'
    ON CONFLICT (crop_id, destination_country) DO NOTHING;
  `);

  await query(`
    INSERT INTO export_prices (crop_id, local_price, export_price, premium_pct, currency, grade_required, destination_country, best_port)
    SELECT c.id, 420000, 680000, 61.90, 'NGN', 'Dried, Grade 1', 'Morocco', 'Apapa Port, Lagos'
    FROM crops c WHERE c.name = 'Hibiscus'
    ON CONFLICT (crop_id, destination_country) DO NOTHING;
  `);

  await query(`
    INSERT INTO export_prices (crop_id, local_price, export_price, premium_pct, currency, grade_required, destination_country, best_port)
    SELECT c.id, 1100000, 1550000, 40.91, 'NGN', 'Refined, FFA <3%', 'Morocco', 'Tin Can Island, Lagos'
    FROM crops c WHERE c.name = 'Palm Oil'
    ON CONFLICT (crop_id, destination_country) DO NOTHING;
  `);

  // LENDERS — add columns introduced in finance.js v2
  await query(`ALTER TABLE lenders ADD COLUMN IF NOT EXISTS slug VARCHAR(60) UNIQUE;`);
  await query(`ALTER TABLE lenders ADD COLUMN IF NOT EXISTS contact_email VARCHAR(255);`);
  await query(`ALTER TABLE lenders ADD COLUMN IF NOT EXISTS contact_url TEXT;`);
  await query(`ALTER TABLE lenders ADD COLUMN IF NOT EXISTS description TEXT;`);
  await query(`ALTER TABLE lenders ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;`);

  // Back-fill slugs and extra details for the 3 seeded lenders
  await query(`UPDATE lenders SET slug='boa',         active=true, contact_email='loans@boanigeria.com',  contact_url='https://www.boanigeria.com',   description='Federal government agricultural development bank offering the lowest rates for smallholder farmers.'     WHERE name='Bank of Agriculture Nigeria' AND slug IS NULL;`);
  await query(`UPDATE lenders SET slug='agrifinance', active=true, contact_email='loans@agrifinance.ng',                                              description='Private agri-finance company focusing on mid-scale farmers with at least 6 months of activity.'          WHERE name='Agrifinance Partners'        AND slug IS NULL;`);
  await query(`UPDATE lenders SET slug='nirsal',      active=true, contact_email='agri@nirsal.com',       contact_url='https://www.nirsalmfb.com',   description='CBN-backed microfinance bank. Entry-level agri loans for new reporters building their score.'            WHERE name='NIRSAL Microfinance Bank'    AND slug IS NULL;`);

  // LOAN APPLICATIONS
  await query(`
    CREATE TABLE IF NOT EXISTS loan_applications (
      id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id              UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      lender_id            UUID REFERENCES lenders(id),
      amount_ngn           DECIMAL(14,2) NOT NULL,
      tenure_months        INTEGER DEFAULT 12,
      purpose              TEXT,
      status               VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted','under_review','approved','rejected','disbursed')),
      credit_score_at_apply INTEGER,
      notes                TEXT,
      created_at           TIMESTAMPTZ DEFAULT NOW(),
      updated_at           TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_loan_apps_user ON loan_applications(user_id, created_at DESC);`);

  console.log('✅ All migrations complete — 19 tables + farmer directory + lender v2 + loan applications');
}

module.exports = migrate;

if (require.main === module) {
  migrate().then(() => process.exit(0)).catch(err => { console.error('Migration failed:', err); process.exit(1); });
}
