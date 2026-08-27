const { query } = require('../config/db');

const WFP_BASE = 'https://api.vam.wfp.org';

async function fetchWFPToken() {
  if (!process.env.WFP_CLIENT_ID) return null;
  try {
    const fetch = require('node-fetch');
    const res = await fetch(`${WFP_BASE}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `client_id=${process.env.WFP_CLIENT_ID}&client_secret=${process.env.WFP_CLIENT_SECRET}&grant_type=client_credentials`
    });
    const data = await res.json();
    return data.access_token;
  } catch { return null; }
}

// Seasonal price adjustment model (replaces WFP when unavailable)
function seasonalPrice(basePrice, cropCategory) {
  const month = new Date().getMonth();
  const harvestMap = { grain:[10,11,0], root:[3,4,5], vegetable:[1,2,9,10], legume:[10,11] };
  const peaks = harvestMap[cropCategory] || [10,11];
  const noise = 1 + (Math.random() - 0.5) * 0.04; // ±2% daily noise
  const seasonal = peaks.includes(month) ? 0.9 : (month >= 5 && month <= 8 ? 1.1 : 1.0);
  return Math.round(basePrice * seasonal * noise);
}

async function syncPrices() {
  const start = Date.now();
  let updated = 0; let errors = 0;

  try {
    const crops = await query('SELECT * FROM crops WHERE is_active=true');
    const markets = await query('SELECT * FROM markets WHERE is_major=true AND is_active=true');
    const currentPrices = await query('SELECT * FROM market_prices');

    // Try WFP first, fallback to seasonal model
    const token = await fetchWFPToken();

    for (const crop of crops.rows) {
      for (const market of markets.rows) {
        try {
          const existing = currentPrices.rows.find(p => p.crop_id === crop.id && p.market_id === market.id);
          if (!existing) continue;

          let newAvg;
          if (token) {
            // Real WFP data
            const fetch = require('node-fetch');
            const resp = await fetch(
              `${WFP_BASE}/api/commodities/prices?CountryName=Nigeria&CommodityName=${encodeURIComponent(crop.name)}&MarketName=${encodeURIComponent(market.city)}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            if (resp.ok) {
              const data = await resp.json();
              if (data.items?.length) {
                newAvg = Math.round(data.items[0].price * 1000); // WFP uses price/kg, convert to per-unit
              }
            }
          }

          // Fallback: seasonal model with small random drift
          if (!newAvg) {
            newAvg = seasonalPrice(existing.price_avg, crop.category);
          }

          const newLow = Math.round(newAvg * 0.87);
          const newHigh = Math.round(newAvg * 1.13);

          await query(`
            UPDATE market_prices SET
              price_avg=$1, price_low=$2, price_high=$3, updated_at=NOW()
            WHERE crop_id=$4 AND market_id=$5
          `, [newAvg, newLow, newHigh, crop.id, market.id]);

          // Write to history (once per day)
          const today = new Date().toISOString().split('T')[0];
          await query(`
            INSERT INTO price_history (crop_id, market_id, price_avg, price_low, price_high, unit, recorded_date, source)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            ON CONFLICT (crop_id, market_id, recorded_date) DO UPDATE SET
              price_avg = EXCLUDED.price_avg, price_low = EXCLUDED.price_low, price_high = EXCLUDED.price_high
          `, [crop.id, market.id, newAvg, newLow, newHigh, existing.unit, today, token ? 'wfp' : 'community']);

          updated++;
        } catch { errors++; }
      }
    }
  } catch (e) { console.error('Price sync error:', e.message); errors++; }

  const duration = Date.now() - start;
  await query(
    'INSERT INTO price_sync_log (source, crops_updated, errors, duration_ms) VALUES ($1,$2,$3,$4)',
    ['cron', updated, errors, duration]
  );
  console.log(`[PriceSync] ${updated} updated, ${errors} errors, ${duration}ms`);
  return { updated, errors, duration };
}

module.exports = { syncPrices };
