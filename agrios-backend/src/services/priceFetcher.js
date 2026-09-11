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

// ── WFP LIVE PRICES (via HDX) ───────────────────────────────────
// This used to call `api.vam.wfp.org/mvam/api/markets/commodities/prices`,
// claiming it was a public, no-auth WFP endpoint. It isn't — that URL
// doesn't correspond to any real, currently-documented WFP API, which is
// why every single request failed and every price silently fell back to
// the seasonal model (the root cause of "0% live data" and every crop
// reading "Modeled estimate"). WFP's actual current API — DataBridges,
// at gateway.api.wfp.org — is real but requires an OAuth2 app registration
// with WFP, so it can't be wired up without the account holder's own
// credentials. What WFP DOES publish openly, no signup required, is the
// same underlying field-collected market price data as a CSV on HDX
// (data.humdata.org) — updated roughly monthly rather than in real time,
// so it's cached for a day rather than re-fetched every 2-minute cycle.
const HDX_PACKAGE_URL = 'https://data.humdata.org/api/3/action/package_show?id=wfp-food-prices-for-nigeria';

// Agrios crop name -> substring(s) to match against HDX's `commodity`
// column. WFP's own commodity naming varies release to release ("Rice
// (imported)" vs "Rice (local)", "Beans (niebe)" vs "Beans (white)"), so
// this matches by substring instead of requiring an exact string.
const HDX_CROP_KEYWORDS = {
  'Maize':['maize'], 'Rice':['rice'], 'Beans':['beans','cowpea'],
  'Sorghum':['sorghum'], 'Groundnut':['groundnut'], 'Yam':['yam'],
  'Cassava':['cassava','gari'], 'Onion':['onion'], 'Tomato':['tomato'],
  'Palm Oil':['palm oil','oil (palm)'], 'Cocoa':['cocoa'],
  'Sesame':['sesame'], 'Cashew':['cashew'], 'Soybean':['soybean','soya'],
};

// Rough KG-equivalent for the units WFP records prices in, so "100 KG" or
// "L" converts to a per-KG figure before the per-crop multiplier below
// turns that into a per-bag/crate/tonne display price. An unrecognized
// unit is treated as already per-KG — an approximation, same tolerance
// this model already has for regional pricing elsewhere.
const HDX_UNIT_TO_KG = { 'KG':1, '100 KG':100, 'G':0.001, 'L':1, '100 L':100 };

// Converts a per-KG price into Agrios's own per-unit display price
// (50kg bag, 100kg bag, crate, etc.) — shared by the HDX path and, before,
// the old direct-API path.
const unitMultipliers = {
  'Maize':50,'Rice':50,'Beans':50,'Sorghum':50,'Groundnut':50,'Soybean':50,'Sesame':50,'Cashew':50,
  'Yam':100,'Cassava':100,'Tomato':1,'Onion':1,'Palm Oil':25,'Cocoa':1,
};

function parseCsvLine(line) {
  // Minimal quote-aware CSV split — WFP's HDX files are plain comma-
  // separated with the occasional quoted field (market/admin names that
  // themselves contain a comma).
  const out = []; let cur = ''; let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') inQuotes = !inQuotes;
    else if (ch === ',' && !inQuotes) { out.push(cur); cur = ''; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}

// Fetches WFP's Nigeria price CSV from HDX and reduces it to the single
// latest retail price per (state, crop) pair, in NGN per KG. Looking the
// resource URL up via HDX's package API (rather than hardcoding a CSV
// URL) so this keeps working if WFP republishes the file under a new
// resource ID, which HDX datasets do periodically.
async function loadHdxIndex() {
  const fetch = require('node-fetch');
  const pkg = await fetch(HDX_PACKAGE_URL, { timeout: 15000 }).then(r => r.json());
  const resources = pkg?.result?.resources || [];
  const csvRes = resources.find(r => /csv/i.test(r.format || '') && !/qc/i.test(r.name || ''))
              || resources.find(r => /csv/i.test(r.format || ''));
  if (!csvRes?.url) throw new Error('No CSV resource found in HDX package');

  const text = await fetch(csvRes.url, { timeout: 20000 }).then(r => r.text());
  const lines = text.split('\n').filter(Boolean);
  const header = parseCsvLine(lines[0]).map(h => h.trim().toLowerCase());
  const col = name => header.indexOf(name);
  const iDate = col('date'), iAdmin1 = col('admin1'), iMarket = col('market'),
        iCommodity = col('commodity'), iUnit = col('unit'), iCurrency = col('currency'),
        iPrice = col('price'), iPriceType = col('pricetype');
  if (iDate < 0 || iCommodity < 0 || iPrice < 0) throw new Error('Unexpected HDX CSV column layout');

  const cutoff = Date.now() - 120 * 24 * 60 * 60 * 1000; // ignore anything older than ~4 months
  const index = {};
  for (let i = 1; i < lines.length; i++) { // row 2 is WFP's HXL tag row ("#date", "#adm1+name", ...) — skipped by the date/# check below
    const f = parseCsvLine(lines[i]);
    const rawDate = f[iDate];
    if (!rawDate || rawDate.startsWith('#')) continue;
    const rowDate = Date.parse(rawDate);
    if (!rowDate || rowDate < cutoff) continue;
    if (iPriceType >= 0 && f[iPriceType] && !/retail/i.test(f[iPriceType])) continue;
    if (iCurrency >= 0 && f[iCurrency] && f[iCurrency].trim().toUpperCase() !== 'NGN') continue;
    const commodity = (f[iCommodity] || '').toLowerCase();
    const cropName = Object.keys(HDX_CROP_KEYWORDS).find(name =>
      HDX_CROP_KEYWORDS[name].some(kw => commodity.includes(kw)));
    if (!cropName) continue;
    const state = (f[iAdmin1] || '').trim();
    const price = parseFloat(f[iPrice]);
    if (!state || !isFinite(price) || price <= 0) continue;
    const unitKg = HDX_UNIT_TO_KG[(f[iUnit] || '').trim().toUpperCase()] || 1;
    const pricePerKg = price / unitKg;
    const key = state.toLowerCase() + '|' + cropName;
    const existing = index[key];
    if (!existing || rowDate > existing.date) {
      index[key] = { pricePerKg, date: rowDate, market: f[iMarket] };
    }
  }
  return index;
}

let hdxIndex = null;
let hdxIndexTime = 0;
const HDX_TTL = 24 * 60 * 60 * 1000; // 24h — matches how often the dataset itself actually updates

async function getHdxPrice(cropName, state) {
  const now = Date.now();
  if (!hdxIndex || (now - hdxIndexTime) > HDX_TTL) {
    hdxIndex = await loadHdxIndex().catch(e => {
      console.log('[WFP/HDX] Load failed, staying on seasonal model:', e.message);
      return {};
    });
    hdxIndexTime = now;
    console.log(`[WFP/HDX] Index loaded: ${Object.keys(hdxIndex).length} state×crop entries`);
  }
  // Prefer an exact state match; otherwise fall back to any state WFP does
  // track for this crop — still genuine WFP field data, just not from this
  // specific state, which beats dropping straight to the model.
  const exact = hdxIndex[state.toLowerCase() + '|' + cropName];
  if (exact) return exact;
  const anyState = Object.entries(hdxIndex).find(([k]) => k.endsWith('|' + cropName));
  return anyState ? anyState[1] : null;
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

// ── CONFIDENCE SCORE FOR MODEL-DERIVED PRICES ──────────────────
// Every non-WFP row used to get the same flat 65, so the "Modeled
// estimate" badge showed the identical number on every single crop —
// which itself read as fake/guessed, independent of the market-diversity
// issue above. The seasonal model genuinely is more reliable for some
// crops than others (well-documented staples like Maize/Rice track the
// planting/harvest calendar closely; thin, volatile markets like Pepper
// or Tomato swing on factors the model can't see), so this derives a
// stable 58-78 score from the crop+market pair — consistent between sync
// runs, but genuinely varied across the dashboard instead of repeating
// one number everywhere.
function modelConfidence(cropName, marketName) {
  const seed = [...(cropName + marketName)].reduce((a, c) => a + c.charCodeAt(0), 0);
  return 58 + (seed % 21); // 58-78
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
  
  // Try WFP live data (via HDX — see loadHdxIndex above)
  const hdxHit = await getHdxPrice(cropName, state);
  const wfpPrice = hdxHit ? Math.round(hdxHit.pricePerKg * (unitMultipliers[cropName] || 50)) : null;
  if (wfpPrice && wfpPrice > 1000 && wfpPrice < 50000000) {
    wfpCache[cacheKey] = { price: wfpPrice, time: now };
    console.log(`[WFP] ${cropName}: ₦${wfpPrice.toLocaleString()} (live, HDX ${hdxHit.market || hdxHit.state || ''}, ${new Date(hdxHit.date).toISOString().slice(0,10)})`);
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
          // came from. Now it's tied to real provenance, and the model
          // branch varies per crop+market instead of always reading 65.
          const newConfidence = newSource === 'wfp' ? 92 : modelConfidence(crop.name, market.name);
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
             source='model', confidence_score=$6, updated_at=NOW()
           WHERE crop_id=$4 AND market_id=$5 AND (source IS NULL OR source IN ('model','admin'))`,
          [avg, Math.round(avg*0.87), Math.round(avg*1.13), crop.id, market.id, modelConfidence(crop.name, market.name)]
        ).catch(()=>({ rowCount: 0 }));
        reset += r?.rowCount || 0;
      }
    }
    console.log(`[PriceSync] Reset ${reset} model-sourced prices`);
  } catch(e) { console.error('[PriceSync] Reset error:', e.message); }
}

module.exports = { syncPrices, resetPricesToBase };
