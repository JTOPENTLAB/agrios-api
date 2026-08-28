const { query } = require('../config/db');

// Base prices (Nigerian Naira) — used as anchor to prevent drift
// The seasonal model adjusts FROM these anchors, not from the current DB value
const BASE_PRICES = {
  'Maize':87000, 'Rice':145000, 'Tomato':28000, 'Cassava':42000,
  'Yam':95000, 'Beans':118000, 'Pepper':19500, 'Onion':32000,
  'Cocoa':890000, 'Plantain':16500, 'Sorghum':78000, 'Groundnut':125000,
  'Soybean':135000, 'Palm Oil':14500, 'Sesame':82000, 'Cashew':120000,
};

// Market price variation by region (±% from base)
const MARKET_VARIATION = {
  'Lagos':    { grain: 1.08, root: 1.12, vegetable: 1.15, legume: 1.10, cash_crop: 1.05, oil: 1.08, fruit: 1.10 },
  'FCT':      { grain: 1.06, root: 1.10, vegetable: 1.12, legume: 1.08, cash_crop: 1.03, oil: 1.06, fruit: 1.08 },
  'Kano':     { grain: 0.95, root: 1.02, vegetable: 1.05, legume: 0.97, cash_crop: 0.98, oil: 0.96, fruit: 1.02 },
  'Oyo':      { grain: 0.98, root: 0.95, vegetable: 0.98, legume: 0.98, cash_crop: 1.02, oil: 0.97, fruit: 0.96 },
  'Abia':     { grain: 1.02, root: 0.93, vegetable: 1.02, legume: 1.04, cash_crop: 1.08, oil: 1.05, fruit: 0.98 },
  'Rivers':   { grain: 1.05, root: 1.08, vegetable: 1.10, legume: 1.06, cash_crop: 1.10, oil: 1.12, fruit: 1.05 },
  'Enugu':    { grain: 0.99, root: 0.96, vegetable: 1.00, legume: 1.00, cash_crop: 1.05, oil: 1.02, fruit: 0.97 },
  'Borno':    { grain: 0.93, root: 1.05, vegetable: 1.08, legume: 0.95, cash_crop: 0.95, oil: 0.98, fruit: 1.04 },
  'Kaduna':   { grain: 0.94, root: 1.00, vegetable: 1.02, legume: 0.96, cash_crop: 0.97, oil: 0.95, fruit: 1.00 },
  'Anambra':  { grain: 1.01, root: 0.95, vegetable: 1.01, legume: 1.02, cash_crop: 1.06, oil: 1.04, fruit: 0.98 },
};

function getStateVariation(state, category) {
  const v = MARKET_VARIATION[state] || { grain:1.0, root:1.0, vegetable:1.0, legume:1.0, cash_crop:1.0, oil:1.0, fruit:1.0 };
  return v[category] || 1.0;
}

// Seasonal adjustment — anchored to calendar month
function seasonalFactor(cropCategory) {
  const month = new Date().getMonth(); // 0-11
  const harvestMap = { grain:[10,11,0], root:[3,4,5], vegetable:[1,2,9,10], legume:[10,11] };
  const peaks = harvestMap[cropCategory] || [10,11];
  if (peaks.includes(month)) return 0.90; // harvest = cheaper
  if (month >= 5 && month <= 8)  return 1.10; // lean season = dearer
  return 1.0;
}

// Price for a specific crop+market — always calculated from the BASE_PRICES anchor
function computePrice(cropName, cropCategory, state) {
  const base = BASE_PRICES[cropName];
  if (!base) return null;
  const seasonal = seasonalFactor(cropCategory);
  const regional = getStateVariation(state, cropCategory);
  const noise    = 1 + (Math.random() - 0.5) * 0.03; // ±1.5% daily noise only
  return Math.round(base * seasonal * regional * noise);
}

async function syncPrices() {
  const start = Date.now();
  let updated = 0; let errors = 0;

  try {
    const crops   = await query('SELECT * FROM crops WHERE is_active=true');
    const markets = await query('SELECT * FROM markets WHERE is_major=true AND is_active=true');

    for (const crop of crops.rows) {
      for (const market of markets.rows) {
        try {
          // Always compute from base anchor — never from current DB value
          const newAvg = computePrice(crop.name, crop.category, market.state);
          if (!newAvg) continue;

          const newLow  = Math.round(newAvg * 0.87);
          const newHigh = Math.round(newAvg * 1.13);

          await query(`
            UPDATE market_prices SET
              price_avg=$1, price_low=$2, price_high=$3,
              source='community', updated_at=NOW()
            WHERE crop_id=$4 AND market_id=$5
          `, [newAvg, newLow, newHigh, crop.id, market.id]);

          // Write to history once per day
          const today = new Date().toISOString().split('T')[0];
          await query(`
            INSERT INTO price_history (crop_id, market_id, price_avg, price_low, price_high, unit, recorded_date, source)
            SELECT $1,$2,$3,$4,$5,unit,$6,'community'
            FROM market_prices WHERE crop_id=$1 AND market_id=$2
            ON CONFLICT (crop_id, market_id, recorded_date) DO UPDATE SET
              price_avg=EXCLUDED.price_avg,
              price_low=EXCLUDED.price_low,
              price_high=EXCLUDED.price_high
          `, [crop.id, market.id, newAvg, newLow, newHigh, today]);

          updated++;
        } catch(e) { errors++; }
      }
    }
  } catch(e) { console.error('Price sync error:', e.message); errors++; }

  const duration = Date.now() - start;
  await query(
    'INSERT INTO price_sync_log (source, crops_updated, errors, duration_ms) VALUES ($1,$2,$3,$4)',
    ['cron', updated, errors, duration]
  ).catch(()=>{});

  console.log(`[PriceSync] ${updated} updated, ${errors} errors, ${duration}ms`);
  return { updated, errors, duration };
}

// Re-seed current prices to correct values immediately
async function resetPricesToBase() {
  console.log('[PriceSync] Resetting prices to base anchors...');
  const crops   = await query('SELECT * FROM crops WHERE is_active=true');
  const markets = await query('SELECT * FROM markets WHERE is_major=true AND is_active=true');
  let reset = 0;
  for (const crop of crops.rows) {
    for (const market of markets.rows) {
      const avg = computePrice(crop.name, crop.category, market.state);
      if (!avg) continue;
      await query(`
        UPDATE market_prices SET price_avg=$1, price_low=$2, price_high=$3, updated_at=NOW()
        WHERE crop_id=$4 AND market_id=$5
      `, [avg, Math.round(avg*0.87), Math.round(avg*1.13), crop.id, market.id]).catch(()=>{});
      reset++;
    }
  }
  console.log(`[PriceSync] Reset ${reset} prices to correct base values`);
}

module.exports = { syncPrices, resetPricesToBase };
