require('dotenv').config();
const bcrypt = require('bcryptjs');
const { query } = require('../config/db');

// ── SEED DATA ──────────────────────────────────────────────────
const CROPS = [
  { name:'Maize',     hausa:'Masara',   yoruba:'Agbado',  igbo:'Oka',      emoji:'🌽', cat:'grain',     exportable:false, unit:'50kg bag',   avg:87000,  low:72000,  high:102000 },
  { name:'Rice',      hausa:'Shinkafa', yoruba:'Iresi',   igbo:'Osikapa',  emoji:'🍚', cat:'grain',     exportable:false, unit:'50kg bag',   avg:145000, low:128000, high:168000 },
  { name:'Tomato',    hausa:'Tumatir',  yoruba:'Tomati',  igbo:'Tomato',   emoji:'🍅', cat:'vegetable', exportable:false, unit:'crate',      avg:28000,  low:18000,  high:42000  },
  { name:'Cassava',   hausa:'Rogo',     yoruba:'Ege',     igbo:'Ji Akpu',  emoji:'🥔', cat:'root',      exportable:false, unit:'100kg bag',  avg:42000,  low:35000,  high:55000  },
  { name:'Yam',       hausa:'Doya',     yoruba:'Isu',     igbo:'Ji',       emoji:'🍠', cat:'root',      exportable:false, unit:'100kg bag',  avg:95000,  low:80000,  high:118000 },
  { name:'Beans',     hausa:'Wake',     yoruba:'Ewa',     igbo:'Agwa',     emoji:'🫘', cat:'legume',    exportable:false, unit:'50kg bag',   avg:118000, low:105000, high:138000 },
  { name:'Pepper',    hausa:'Barkono',  yoruba:'Ata',     igbo:'Ose',      emoji:'🫑', cat:'vegetable', exportable:false, unit:'basket',     avg:19500,  low:13000,  high:29000  },
  { name:'Onion',     hausa:'Albasa',   yoruba:'Alubosa', igbo:'Yabassi',  emoji:'🧅', cat:'vegetable', exportable:false, unit:'bag',        avg:32000,  low:24000,  high:44000  },
  { name:'Cocoa',     hausa:'Koko',     yoruba:'Koko',    igbo:'Koko',     emoji:'🍫', cat:'cash_crop', exportable:true,  unit:'tonne',      avg:890000, low:820000, high:980000 },
  { name:'Plantain',  hausa:'Ayaba',    yoruba:'Ogede',   igbo:'Unere',    emoji:'🍌', cat:'fruit',     exportable:false, unit:'bunch',      avg:16500,  low:12000,  high:24000  },
  { name:'Sorghum',   hausa:'Dawa',     yoruba:'Oka Baba',igbo:'Okili',    emoji:'🌾', cat:'grain',     exportable:false, unit:'50kg bag',   avg:78000,  low:65000,  high:94000  },
  { name:'Groundnut', hausa:'Gyada',    yoruba:'Epa',     igbo:'Ahụekere', emoji:'🥜', cat:'legume',    exportable:true,  unit:'50kg bag',   avg:125000, low:108000, high:148000 },
  { name:'Soybean',   hausa:'Wake Mai', yoruba:'Ewa Soya',igbo:'Soybean',  emoji:'🫘', cat:'legume',    exportable:true,  unit:'50kg bag',   avg:135000, low:118000, high:160000 },
  { name:'Palm Oil',  hausa:'Mai Jan', yoruba:'Epo Pupa', igbo:'Manu Nri', emoji:'🛢️', cat:'oil',       exportable:true,  unit:'25L can',    avg:14500,  low:11500,  high:19000  },
  { name:'Sesame',    hausa:'Ridi',     yoruba:'Ekuku',   igbo:'Ose Oji',  emoji:'🌿', cat:'cash_crop', exportable:true,  unit:'50kg bag',   avg:82000,  low:72000,  high:95000  },
  { name:'Cashew',    hausa:'Kaju',     yoruba:'Kaju',    igbo:'Kaju',     emoji:'🥜', cat:'cash_crop', exportable:true,  unit:'50kg bag',   avg:120000, low:105000, high:140000 },
];

const MARKETS = [
  { name:'Mile 12 Market',          city:'Lagos',      state:'Lagos',  region:'south_west',   lat:6.6041,  lng:3.3908,  major:true  },
  { name:'Bodija Market',           city:'Ibadan',     state:'Oyo',    region:'south_west',   lat:7.4189,  lng:3.9026,  major:true  },
  { name:'Dawanau Market',          city:'Kano',       state:'Kano',   region:'north_west',   lat:11.9943, lng:8.5917,  major:true  },
  { name:'Garki Model Market',      city:'Abuja',      state:'FCT',    region:'north_central', lat:9.0238, lng:7.4918,  major:true  },
  { name:'Ariaria International',   city:'Aba',        state:'Abia',   region:'south_east',   lat:5.1000,  lng:7.3500,  major:true  },
  { name:'Oil Mill Market',         city:'Port Harcourt',state:'Rivers',region:'south_south',  lat:4.8156, lng:7.0498,  major:true  },
  { name:'Ogbete Main Market',      city:'Enugu',      state:'Enugu',  region:'south_east',   lat:6.4527,  lng:7.5004,  major:true  },
  { name:'Monday Market',           city:'Maiduguri',  state:'Borno',  region:'north_east',   lat:11.8311, lng:13.1509, major:true  },
  { name:'Sabon Gari Market',       city:'Kano',       state:'Kano',   region:'north_west',   lat:12.0022, lng:8.5277,  major:false },
  { name:'Sura Shopping Complex',   city:'Lagos',      state:'Lagos',  region:'south_west',   lat:6.4526,  lng:3.3896,  major:false },
  { name:'Eke Awka Market',         city:'Awka',       state:'Anambra',region:'south_east',   lat:6.2104,  lng:7.0676,  major:false },
  { name:'Kasuwancin Yan Koli',     city:'Kaduna',     state:'Kaduna', region:'north_west',   lat:10.5167, lng:7.4381,  major:false },
];

const EXPORT_DATA = [
  { crop:'Cocoa',    local:890000,  export_p:1180000, premium:32.5, grade:'Grade 1 fermented, 7.5% max moisture', dest:'Netherlands', port:'Apapa, Lagos' },
  { crop:'Sesame',   local:82000,   export_p:106000,  premium:29.3, grade:'99% purity, aflatoxin <10ppb',          dest:'China',       port:'Apapa, Lagos' },
  { crop:'Cashew',   local:120000,  export_p:154000,  premium:28.3, grade:'Grade W240/W320, max 5% defects',        dest:'India',       port:'Tin Can Island' },
  { crop:'Soybean',  local:135000,  export_p:165000,  premium:22.2, grade:'≥40% protein, non-GMO certificate',     dest:'China',       port:'Beja dry port' },
  { crop:'Palm Oil', local:14500,   export_p:18000,   premium:24.1, grade:'RSPO certified, <5% FFA',               dest:'Malaysia',    port:'Apapa, Lagos' },
  { crop:'Groundnut',local:125000,  export_p:155000,  premium:24.0, grade:'Sound, bold, uniform size',             dest:'Europe',      port:'Apapa, Lagos' },
];

// ── HELPERS ────────────────────────────────────────────────────
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function priceWithNoise(base, spread = 0.12) {
  const factor = 1 + (Math.random() - 0.5) * spread * 2;
  return Math.round(base * factor);
}

function seasonalFactor(date, crop) {
  const month = new Date(date).getMonth(); // 0-11
  // Harvest months vary by crop - simplified model
  const harvestMonths = { grain: [10,11,0], root:[3,4,5], vegetable:[1,2,3,9,10] };
  const cat = crop.cat || 'grain';
  const peaks = harvestMonths[cat] || [10,11,0];
  const isHarvest = peaks.includes(month);
  return isHarvest ? 0.88 : (month >= 6 && month <= 8 ? 1.12 : 1.0); // cheap at harvest, costly mid-year
}

// ── MAIN SEED FUNCTION ─────────────────────────────────────────
async function seed() {
  console.log('🌱 Seeding Agrios database...');

  // Clear in safe order
  await query(`DELETE FROM intel_opportunities`);
  await query(`DELETE FROM export_prices`);
  await query(`DELETE FROM buyer_demands`);
  await query(`DELETE FROM alert_notifications`);
  await query(`DELETE FROM price_alerts`);
  await query(`DELETE FROM price_sync_log`);
  await query(`DELETE FROM price_reports`);
  await query(`DELETE FROM price_history`);
  await query(`DELETE FROM market_prices`);
  await query(`DELETE FROM contributors`);
  await query(`DELETE FROM transport_jobs`);
  await query(`DELETE FROM vehicles`);
  await query(`DELETE FROM subscriptions`);
  await query(`DELETE FROM refresh_tokens`);
  await query(`DELETE FROM users`);
  await query(`DELETE FROM markets`);
  await query(`DELETE FROM crops`);
  console.log('  Cleared existing data');

  // CROPS
  const cropIds = {};
  for (const c of CROPS) {
    const res = await query(
      `INSERT INTO crops (name, name_hausa, name_yoruba, name_igbo, emoji, category, is_exportable)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
      [c.name, c.hausa, c.yoruba, c.igbo, c.emoji, c.cat, c.exportable]
    );
    cropIds[c.name] = res.rows[0].id;
  }
  console.log(`  ✓ ${CROPS.length} crops seeded`);

  // MARKETS
  const marketIds = {};
  for (const m of MARKETS) {
    const res = await query(
      `INSERT INTO markets (name, city, state, region, latitude, longitude, is_major)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
      [m.name, m.city, m.state, m.region, m.lat, m.lng, m.major]
    );
    marketIds[m.name] = res.rows[0].id;
  }
  console.log(`  ✓ ${MARKETS.length} markets seeded`);

  // ADMIN USER
  const adminHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@Agrios2025!', 12);
  const adminRes = await query(
    `INSERT INTO users (email, password_hash, full_name, role, subscription_tier, is_verified)
     VALUES ($1,$2,$3,'admin','business',true) RETURNING id`,
    [process.env.ADMIN_EMAIL || 'admin@useagrios.com', adminHash, 'Agrios Admin']
  );
  const adminId = adminRes.rows[0].id;

  // DEMO USERS
  const demoUsers = [
    { email:'fatima@demo.com', name:'Fatima Kalu',    state:'Kaduna', role:'farmer',  tier:'pro'   },
    { email:'adewale@demo.com',name:'Adewale Ojo',    state:'Lagos',  role:'trader',  tier:'pro'   },
    { email:'emeka@demo.com',  name:'Emeka Okafor',   state:'Anambra',role:'farmer',  tier:'free'  },
    { email:'aisha@demo.com',  name:'Aisha Bello',    state:'Kano',   role:'trader',  tier:'free'  },
    { email:'driver@demo.com', name:'Musa Ibrahim',   state:'Lagos',  role:'driver',  tier:'free'  },
    { email:'buyer@demo.com',  name:'FoodCo Nigeria', state:'Lagos',  role:'buyer',   tier:'business'},
  ];
  const demoHash = await bcrypt.hash('Demo@123456!', 12);
  const userIds = {};
  for (const u of demoUsers) {
    const res = await query(
      `INSERT INTO users (email, password_hash, full_name, state, role, subscription_tier, is_verified)
       VALUES ($1,$2,$3,$4,$5,$6,true) RETURNING id`,
      [u.email, demoHash, u.name, u.state, u.role, u.tier]
    );
    userIds[u.email] = res.rows[0].id;
  }
  console.log(`  ✓ ${demoUsers.length + 1} users seeded (admin + demo)`);

  // CONTRIBUTORS
  const contribData = [
    { email:'fatima@demo.com',  total:47, accepted:44, accuracy:93.6, trust:'trusted',        score:782 },
    { email:'adewale@demo.com', total:124,accepted:120,accuracy:96.8, trust:'verified_agent',  score:891 },
    { email:'emeka@demo.com',   total:89, accepted:81, accuracy:91.0, trust:'verified_agent',  score:834 },
    { email:'aisha@demo.com',   total:31, accepted:27, accuracy:87.1, trust:'trusted',         score:712 },
  ];
  for (const c of contribData) {
    const grade = c.score >= 800 ? 'Excellent' : c.score >= 700 ? 'Very Good' : 'Good';
    await query(
      `INSERT INTO contributors (user_id, total_reports, accepted_reports, accuracy_pct, trust_level, credit_score, credit_grade, market_presence_score)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [userIds[c.email], c.total, c.accepted, c.accuracy, c.trust, c.score, grade, randomBetween(60,95)]
    );
  }
  console.log(`  ✓ ${contribData.length} contributors seeded`);

  // CURRENT MARKET PRICES (all crops × first 8 markets)
  const majorMarkets = MARKETS.filter(m => m.major).slice(0, 8);
  let priceCount = 0;
  for (const crop of CROPS) {
    for (const market of majorMarkets) {
      const sf = seasonalFactor(new Date(), crop);
      const avg = Math.round(crop.avg * sf);
      const low = Math.round(crop.low * sf);
      const high = Math.round(crop.high * sf);
      const conf = randomBetween(72, 97);
      await query(
        `INSERT INTO market_prices (crop_id, market_id, price_low, price_avg, price_high, unit, confidence_score, source)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
         ON CONFLICT (crop_id, market_id) DO UPDATE SET
           price_low=$3, price_avg=$4, price_high=$5, confidence_score=$7, updated_at=NOW()`,
        [cropIds[crop.name], marketIds[market.name], low, avg, high, crop.unit, conf, 'admin']
      );
      priceCount++;
    }
  }
  console.log(`  ✓ ${priceCount} current market prices seeded`);

  // PRICE HISTORY — 90 days
  let historyCount = 0;
  for (const crop of CROPS) {
    for (const market of majorMarkets.slice(0, 4)) { // 4 major markets for history
      for (let d = 89; d >= 0; d--) {
        const date = new Date();
        date.setDate(date.getDate() - d);
        const dateStr = date.toISOString().split('T')[0];
        const sf = seasonalFactor(date, crop);
        const trendFactor = 1 + (d * 0.0005); // slight upward trend over 90 days
        const avg = priceWithNoise(crop.avg * sf * trendFactor);
        const low = Math.round(avg * 0.86);
        const high = Math.round(avg * 1.14);
        await query(
          `INSERT INTO price_history (crop_id, market_id, price_avg, price_low, price_high, unit, recorded_date, source)
           VALUES ($1,$2,$3,$4,$5,$6,$7,'admin')
           ON CONFLICT (crop_id, market_id, recorded_date) DO NOTHING`,
          [cropIds[crop.name], marketIds[market.name], avg, low, high, crop.unit, dateStr]
        );
        historyCount++;
      }
    }
  }
  console.log(`  ✓ ${historyCount} price history records seeded (90 days)`);

  // EXPORT PRICES
  for (const e of EXPORT_DATA) {
    if (!cropIds[e.crop]) continue;
    await query(
      `INSERT INTO export_prices (crop_id, local_price, export_price, premium_pct, grade_required, destination_country, best_port)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       ON CONFLICT (crop_id, destination_country) DO UPDATE SET
         local_price=$2, export_price=$3, premium_pct=$4, updated_at=NOW()`,
      [cropIds[e.crop], e.local, e.export_p, e.premium, e.grade, e.dest, e.port]
    );
  }
  console.log(`  ✓ ${EXPORT_DATA.length} export price records seeded`);

  // BUYER DEMANDS
  const demands = [
    { buyer:'Stallion Flour Mills', crop:'Maize',    qty:50000, unit:'kg',      price:85000, punit:'50kg bag', loc:'Apapa, Lagos',    state:'Lagos',  days:10, verified:true  },
    { buyer:'FoodCo Supermarkets',  crop:'Rice',     qty:10000, unit:'kg',      price:140000,punit:'50kg bag', loc:'Abuja',           state:'FCT',    days:14, verified:true  },
    { buyer:'Fresh Garden Catering',crop:'Tomato',   qty:200,   unit:'crates',  price:25000, punit:'crate',    loc:'Port Harcourt',   state:'Rivers', days:5,  verified:false },
    { buyer:'Northern Agro Ltd',    crop:'Yam',      qty:20000, unit:'kg',      price:92000, punit:'100kg bag',loc:'Kano',            state:'Kano',   days:20, verified:true  },
    { buyer:'Bodija Depot',         crop:'Beans',    qty:4000,  unit:'kg',      price:115000,punit:'50kg bag', loc:'Ibadan',          state:'Oyo',    days:8,  verified:false },
    { buyer:'Starch Industries SE', crop:'Cassava',  qty:30000, unit:'kg',      price:40000, punit:'100kg bag',loc:'Enugu',           state:'Enugu',  days:25, verified:true  },
    { buyer:'Lagos Cocoa Export',   crop:'Cocoa',    qty:5000,  unit:'kg',      price:890000,punit:'tonne',    loc:'Apapa, Lagos',    state:'Lagos',  days:30, verified:true  },
  ];
  for (const d of demands) {
    if (!cropIds[d.crop]) continue;
    const deadline = new Date(); deadline.setDate(deadline.getDate() + d.days);
    await query(
      `INSERT INTO buyer_demands (buyer_id, buyer_name, crop_id, quantity_kg, quantity_display, offered_price, price_unit, delivery_location, delivery_state, deadline, is_verified_buyer, expires_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [userIds['buyer@demo.com'], d.buyer, cropIds[d.crop], d.qty,
       `${(d.qty/1000).toFixed(0)} tonnes`, d.price, d.punit,
       d.loc, d.state, deadline.toISOString().split('T')[0], d.verified,
       deadline.toISOString()]
    );
  }
  console.log(`  ✓ ${demands.length} buyer demands seeded`);

  // TRANSPORT JOBS
  const jobs = [
    { crop:'Maize',   from:'Lagos',from_st:'Lagos', to:'Abuja',     to_st:'FCT',    qty:12, unit:'tonnes', veh:'Heavy Truck', days:2, budget:78000, urgent:true  },
    { crop:'Yam',     from:'Ibadan',from_st:'Oyo',  to:'Kano',      to_st:'Kano',   qty:20, unit:'tonnes', veh:'Heavy Truck', days:6, budget:95000, urgent:false },
    { crop:'Palm Oil',from:'Aba',  from_st:'Abia',  to:'Lagos',     to_st:'Lagos',  qty:6,  unit:'tonnes', veh:'Medium Truck',days:1, budget:42000, urgent:true  },
    { crop:'Onion',   from:'Kano', from_st:'Kano',  to:'Abuja',     to_st:'FCT',    qty:8,  unit:'tonnes', veh:'Pickup/Van',  days:4, budget:52000, urgent:false },
    { crop:'Cassava', from:'Enugu',from_st:'Enugu', to:'Lagos',     to_st:'Lagos',  qty:15, unit:'tonnes', veh:'Heavy Truck', days:8, budget:68000, urgent:false },
    { crop:'Rice',    from:'Lagos',from_st:'Lagos', to:'Port Harcourt',to_st:'Rivers',qty:10,unit:'tonnes',veh:'Medium Truck',days:3, budget:55000, urgent:true  },
  ];
  for (const j of jobs) {
    if (!cropIds[j.crop]) continue;
    const pickup = new Date(); pickup.setDate(pickup.getDate() + j.days);
    await query(
      `INSERT INTO transport_jobs (poster_id, crop_id, crop_name, quantity, unit, pickup_location, pickup_state, delivery_location, delivery_state, vehicle_type, pickup_date, max_budget, is_urgent, status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,'open')`,
      [userIds['fatima@demo.com'], cropIds[j.crop], j.crop, j.qty, j.unit,
       j.from, j.from_st, j.to, j.to_st, j.veh,
       pickup.toISOString().split('T')[0], j.budget, j.urgent]
    );
  }
  console.log(`  ✓ ${jobs.length} transport jobs seeded`);

  // VEHICLE (driver)
  await query(
    `INSERT INTO vehicles (owner_id, vehicle_type, make_model, plate_number, capacity_tonnes, base_city, base_state, rate_per_km, has_gps, has_insurance, is_cross_state, driver_name, driver_phone, is_active, is_verified)
     VALUES ($1,'Heavy Truck','Mercedes Actros 2658','LSD-234-AA',15,'Lagos','Lagos',280,true,true,true,'Musa Ibrahim','+2348012345678',true,true)`,
    [userIds['driver@demo.com']]
  );
  console.log('  ✓ 1 vehicle seeded');

  // PRICE ALERTS for demo user
  await query(
    `INSERT INTO price_alerts (user_id, crop_id, market_id, condition, target_value, notify_email, notify_inapp, is_active)
     VALUES ($1,$2,$3,'above',$4,true,true,true)`,
    [userIds['fatima@demo.com'], cropIds['Maize'], marketIds['Garki Model Market'], 95000]
  );
  await query(
    `INSERT INTO price_alerts (user_id, crop_id, condition, target_value, notify_email, notify_inapp, is_active)
     VALUES ($1,$2,'below',$3,true,true,true)`,
    [userIds['fatima@demo.com'], cropIds['Rice'], 130000]
  );
  console.log('  ✓ 2 price alerts seeded');

  // SUBSCRIPTIONS
  await query(
    `INSERT INTO subscriptions (user_id, tier, amount_ngn, expires_at)
     VALUES ($1,'pro',2500,NOW() + INTERVAL '30 days')`,
    [userIds['fatima@demo.com']]
  );
  await query(
    `INSERT INTO subscriptions (user_id, tier, amount_ngn, expires_at)
     VALUES ($1,'business',15000,NOW() + INTERVAL '30 days')`,
    [userIds['buyer@demo.com']]
  );
  console.log('  ✓ 2 subscriptions seeded');

  // INTEL OPPORTUNITIES
  const opps = [
    { type:'arbitrage',     title:'Maize: Buy Kaduna, sell Lagos',      desc:'22% price gap detected. After ₦8k/bag logistics, net margin ~14%.',      margin:'+14%', crop:'Maize', pro:false },
    { type:'rising_trend',  title:'Tomato prices surging — festive demand', desc:'Up 18% in 7 days. Lagos supply shortage. Sell now or hold 5 more days.', margin:'+18% 7d', crop:'Tomato', pro:false },
    { type:'demand_alert',  title:'High rice demand — Port Harcourt',    desc:'Buyer demand at Oil Mill exceeds supply 3:1. WFP-verified buyer in queue.', margin:'3× demand', crop:'Rice', pro:false },
    { type:'export_window', title:'Cocoa: 32% export premium at Apapa',  desc:'International buyers paying ₦1.18M/t vs local ₦890k. Grade 1 only.',     margin:'+32%', crop:'Cocoa', pro:true  },
    { type:'sourcing_tip',  title:'Cheapest yam: Enugu this week',       desc:'Yam at Ogbete is 16% below national average. Move fast.',                margin:'-16% avg', crop:'Yam', pro:false },
    { type:'climate_alert', title:'Sell tomato — flood risk Kogi',       desc:'NIMET 14-day forecast: severe flooding in Kogi, Niger, Anambra. Prices to spike 25–40%.', margin:'↑25-40%', crop:'Tomato', pro:false },
  ];
  for (const o of opps) {
    const expires = new Date(); expires.setHours(expires.getHours() + 24);
    await query(
      `INSERT INTO intel_opportunities (type, title, description, crop_id, margin_display, is_pro_only, expires_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [o.type, o.title, o.desc, cropIds[o.crop] || null, o.margin, o.pro, expires.toISOString()]
    );
  }
  console.log(`  ✓ ${opps.length} intelligence opportunities seeded`);

  console.log('\n🎉 Seed complete! Database is ready.');
  console.log('   Admin:  admin@useagrios.com / Admin@Agrios2025!');
  console.log('   Demo:   fatima@demo.com / Demo@123456!');
  console.log('   Driver: driver@demo.com / Demo@123456!');
}

seed().then(() => process.exit(0)).catch(err => { console.error('Seed failed:', err); process.exit(1); });
