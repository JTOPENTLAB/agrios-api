const { query } = require('../config/db');

// ── BASE PRICES (Nigerian Naira, verified August 2026) ────────
const BASE_PRICES = {
  'Maize':87000,'Rice':145000,'Tomato':28000,'Cassava':42000,
  'Yam':95000,'Beans':118000,'Pepper':19500,'Onion':32000,
  'Cocoa':890000,'Plantain':16500,'Sorghum':78000,'Groundnut':125000,
  'Soybean':135000,'Palm Oil':14500,'Sesame':82000,'Cashew':120000,
};

const MARKET_VARIATION = {
  'Lagos':   {grain:1.08,root:1.12,vegetable:1.15,legume:1.10,cash_crop:1.05,oil:1.08,fruit:1.10},
  'FCT':     {grain:1.06,root:1.10,vegetable:1.12,legume:1.08,cash_crop:1.03,oil:1.06,fruit:1.08},
  'Kano':    {grain:0.95,root:1.02,vegetable:1.05,legume:0.97,cash_crop:0.98,oil:0.96,fruit:1.02},
  'Oyo':     {grain:0.98,root:0.95,vegetable:0.98,legume:0.98,cash_crop:1.02,oil:0.97,fruit:0.96},
  'Abia':    {grain:1.02,root:0.93,vegetable:1.02,legume:1.04,cash_crop:1.08,oil:1.05,fruit:0.98},
  'Rivers':  {grain:1.05,root:1.08,vegetable:1.10,legume:1.06,cash_crop:1.10,oil:1.12,fruit:1.05},
  'Enugu':   {grain:0.99,root:0.96,vegetable:1.00,legume:1.00,cash_crop:1.05,oil:1.02,fruit:0.97},
  'Borno':   {grain:0.93,root:1.05,vegetable:1.08,legume:0.95,cash_crop:0.95,oil:0.98,fruit:1.04},
  'Kaduna':  {grain:0.94,root:1.00,vegetable:1.02,legume:0.96,cash_crop:0.97,oil:0.95,fruit:1.00},
  'Anambra': {grain:1.01,root:0.95,vegetable:1.01,legume:1.02,cash_crop:1.06,oil:1.04,fruit:0.98},
};

// Monthly seasonal factors (Jan=0 ... Dec=11)
// Based on Nigerian agricultural calendar
const SEASONAL = {
  grain:     [0.92,0.93,0.96,1.00,1.05,1.08,1.10,1.10,1.05,0.90,0.88,0.90],
  root:      [1.05,1.08,1.10,0.92,0.90,0.93,0.98,1.02,1.05,1.08,1.10,1.08],
  vegetable: [0.90,0.88,0.90,0.95,1.05,1.08,1.10,1.12,1.08,0.88,0.85,0.88],
  legume:    [0.95,0.97,1.00,1.02,1.05,1.08,1.10,1.10,1.05,0.90,0.88,0.90],
  cash_crop: [1.02,1.00,0.98,0.97,0.98,1.00,1.02,1.05,1.08,1.10,1.08,1.05],
  oil:       [1.00,1.00,1.02,1.02,1.00,0.98,0.98,1.00,1.02,1.05,1.05,1.02],
  fruit:     [1.05,1.08,1.05,0.95,0.90,0.88,0.90,0.95,1.00,1.05,1.08,1.08],
};

// Daily trend — each crop drifts in one direction per day (like a real market)
const dailyTrends = {};
function getDailyTrend(cropName) {
  const day = new Date().toISOString().split('T')[0] + '-' + cropName;
  if (!dailyTrends[day]) {
    // Seed from crop name + date for consistency within a day
    const seed = [...day].reduce((a,c)=>a+c.charCodeAt(0),0);
    const r = (seed % 100) / 100;
    const direction = r < 0.42 ? -1 : r < 0.85 ? 1 : 0;
    const strength = 0.003 + (seed % 20) / 1000; // 0.3-2.3% daily move
    dailyTrends[day] = { direction, strength };
  }
  return dailyTrends[day];
}

// ── WFP PUBLIC API (no credentials required) ──────────────────
// Endpoint: api.vam.wfp.org - publicly accessible per WFP documentation
const WFP_CROP_MAP = {
  'Maize':'Maize (white)', 'Rice':'Rice (milled)', 'Tomato':'Tomatoes',
  'Onion':'Onions', 'Beans':'Beans (black-eyed)', 'Sorghum':'Sorghum',
  'Palm Oil':'Oil (palm)', 'Groundnut':'Groundnuts (shelled)',
  'Yam':'Yam', 'Cassava':'Cassava (fresh)',
};

async function fetchWFPPrice(cropName) {
  try {
    const fetch = require('node-fetch');
    const wfpName = WFP_CROP_MAP[cropName];
    if (!wfpName) return null;
    
    // WFP public endpoint - no auth required for commodity prices
    const url = `https://api.vam.wfp.org/mvam/api/markets/commodities/prices?CountryCode=NGA&commodityName=${encodeURIComponent(wfpName)}&page=1&pageSize=5&format=json`;
    const res = await fetch(url, {
      timeout: 8000,
      headers: { 'Accept': 'application/json', 'User-Agent': 'Agrios-Nigeria/1.0' }
    });
    
    if (!res.ok) return null;
    const data = await res.json();
    
    // WFP returns prices in USD/kg - convert to NGN per local unit
    // Exchange rate: ~1600 NGN/USD (approximate)
    const NGN_PER_USD = 1600;
    if (data && data.length > 0) {
      const latest = data[0];
      const pricePerKg_ngn = latest.price * NGN_PER_USD;
      // Convert to per-unit price (50kg bag, tonne, etc.)
      const unitMultipliers = {
        'Maize':50,'Rice':50,'Beans':50,'Sorghum':50,'Groundnut':50,
        'Yam':100,'Cassava':100,'Tomato':1,'Onion':1,'Palm Oil':25,
      };
      const multiplier = unitMultipliers[cropName] || 50;
      return Math.round(pricePerKg_ngn * multiplier);
    }
    return null;
  } catch (e) {
    return null; // silently fall back to model
  }
}

// ── COMPUTE PRICE (model fallback) ────────────────────────────
function computeModelPrice(cropName, cropCategory, state) {
  const base = BASE_PRICES[cropName];
  if (!base) return null;
  const month = new Date().getMonth();
  const seasonal = (SEASONAL[cropCategory] || SEASONAL.grain)[month];
  const regional = (MARKET_VARIATION[state] || {})[cropCategory] || 1.0;
  const trend = getDailyTrend(cropName);
  const trendFactor = 1 + (trend.direction * trend.strength);
  const microNoise = 1 + (Math.random() - 0.5) * 0.006;
  return Math.round(base * seasonal * regional * trendFactor * microNoise);
}

// ── WFP PRICE CACHE (refresh every 6 hours) ───────────────────
const wfpCache = {};
const CACHE_TTL = 6 * 60 * 60 * 1000;

async function getPrice(cropName, cropCategory, state) {
  const cacheKey = cropName;
  const now = Date.now();
  
  // Check cache
  if (wfpCache[cacheKey] && (now - wfpCache[cacheKey].time) < CACHE_TTL) {
    const wfpBase = wfpCache[cacheKey].price;
    const regional = (MARKET_VARIATION[state] || {})[cropCategory] || 1.0;
    const trend = getDailyTrend(cropName);
    const noise = 1 + (Math.random() - 0.5) * 0.006;
    return Math.round(wfpBase * regional * (1 + trend.direction * trend.strength) * noise);
  }
  
  // Try WFP live data
  const wfpPrice = await fetchWFPPrice(cropName);
  if (wfpPrice && wfpPrice > 5000 && wfpPrice < 50000000) {
    wfpCache[cacheKey] = { price: wfpPrice, time: now };
    console.log(`[WFP] ${cropName}: ₦${wfpPrice.toLocaleString()} (live)`);
    const regional = (MARKET_VARIATION[state] || {})[cropCategory] || 1.0;
    const trend = getDailyTrend(cropName);
    const noise = 1 + (Math.random() - 0.5) * 0.006;
    return Math.round(wfpPrice * regional * (1 + trend.direction * trend.strength) * noise);
  }
  
  // Fallback to seasonal model
  return computeModelPrice(cropName, cropCategory, state);
}

// ── SYNC PRICES ───────────────────────────────────────────────
async function syncPrices() {
  const start = Date.now();
  let updated = 0; let errors = 0;

  try {
    const crops   = await query('SELECT * FROM crops WHERE is_active=true');
    const markets = await query('SELECT * FROM markets WHERE is_major=true AND is_active=true');

    for (const crop of crops.rows) {
      for (const market of markets.rows) {
        try {
          const newAvg = await getPrice(crop.name, crop.category, market.state);
          if (!newAvg) continue;
          const newLow  = Math.round(newAvg * (0.84 + Math.random() * 0.06));
          const newHigh = Math.round(newAvg * (1.10 + Math.random() * 0.08));
          const newSource = wfpCache[crop.name] ? 'wfp' : 'model';
          // Confidence used to be a static number set once at seed time and
          // never touched again, regardless of where the price actually
          // came from. Now it's tied to real provenance.
          const newConfidence = newSource === 'wfp' ? 92 : 65;
          // A community-submitted price report (source='community') used to
          // get silently overwritten by this automated sync on the very
          // next 2-minute cycle — a farmer's real, human-verified report
          // erased and replaced with a modeled/WFP number within minutes,
          // with nothing telling them it happened. Protect it for 24h.
          const COMMUNITY_GUARD = `NOT (source='community' AND updated_at > NOW() - INTERVAL '24 hours')`;

          await query(`
            UPDATE market_prices SET price_avg=$1, price_low=$2, price_high=$3,
              source=$4, confidence_score=$5, updated_at=NOW()
            WHERE crop_id=$6 AND market_id=$7 AND ${COMMUNITY_GUARD}
          `, [newAvg, newLow, newHigh, newSource, newConfidence, crop.id, market.id]);

          const today = new Date().toISOString().split('T')[0];
          await query(`
            INSERT INTO price_history (crop_id, market_id, price_avg, price_low, price_high, unit, recorded_date, source)
            SELECT $1,$2,$3,$4,$5,unit,$6,$7
            FROM market_prices WHERE crop_id=$1 AND market_id=$2 AND ${COMMUNITY_GUARD}
            ON CONFLICT (crop_id, market_id, recorded_date) DO UPDATE SET
              price_avg=EXCLUDED.price_avg, price_low=EXCLUDED.price_low, price_high=EXCLUDED.price_high
          `, [crop.id, market.id, newAvg, newLow, newHigh, today, newSource]);

          updated++;
        } catch(e) { errors++; }
      }
    }
  } catch(e) { console.error('Price sync error:', e.message); errors++; }

  const duration = Date.now() - start;
  const wfpCount = Object.keys(wfpCache).length;
  console.log(`[PriceSync] ${updated} updated (${wfpCount} WFP live), ${errors} errors, ${duration}ms`);
  await query('INSERT INTO price_sync_log (source,crops_updated,errors,duration_ms) VALUES ($1,$2,$3,$4)',
    [wfpCount > 0 ? 'wfp+model' : 'model', updated, errors, duration]).catch(()=>{});
  return { updated, errors, duration };
}

// ── RESET TO CORRECT VALUES ───────────────────────────────────
// Runs once on every server boot. This used to overwrite every price row
// unconditionally — including ones genuinely sourced from WFP or a
// community report — with a freshly computed model number, WITHOUT
// touching the row's `source` label. So after a restart/redeploy, a price
// could read "Live · WFP" or a community-verified figure while actually
// showing a made-up number, until the next sync cycle quietly fixed the
// number (but by then the mislabeled figure had already been served).
// Now this only ever touches rows that are already on the model fallback.
async function resetPricesToBase() {
  console.log('[PriceSync] Resetting model-sourced prices to current values (leaving WFP/community prices untouched)...');
  try {
    const crops   = await query('SELECT * FROM crops WHERE is_active=true');
    const markets = await query('SELECT * FROM markets WHERE is_major=true AND is_active=true');
    let reset = 0;
    for (const crop of crops.rows) {
      for (const market of markets.rows) {
        const avg = computeModelPrice(crop.name, crop.category, market.state);
        if (!avg) continue;
        const r = await query(
          `UPDATE market_prices SET price_avg=$1, price_low=$2, price_high=$3,
             source='model', confidence_score=65, updated_at=NOW()
           WHERE crop_id=$4 AND market_id=$5 AND (source IS NULL OR source IN ('model','admin'))`,
          [avg, Math.round(avg*0.87), Math.round(avg*1.13), crop.id, market.id]
        ).catch(()=>({ rowCount: 0 }));
        reset += r?.rowCount || 0;
      }
    }
    console.log(`[PriceSync] Reset ${reset} model-sourced prices`);
  } catch(e) { console.error('[PriceSync] Reset error:', e.message); }
}

module.exports = { syncPrices, resetPricesToBase };
