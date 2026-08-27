const router = require('express').Router();
const { query } = require('../config/db');
const { optionalAuth } = require('../middleware/auth');
const { ok, err } = require('../utils/response');

// GET /export/prices — local vs international comparison
router.get('/prices', optionalAuth, async (req, res) => {
  try {
    const result = await query(`
      SELECT ep.*, cr.name as crop_name, cr.emoji,
             mp.price_avg as latest_local_price,
             ROUND(((ep.export_price - mp.price_avg) / NULLIF(mp.price_avg,0)) * 100, 1) as live_premium_pct
      FROM export_prices ep
      JOIN crops cr ON cr.id = ep.crop_id
      LEFT JOIN market_prices mp ON mp.crop_id = ep.crop_id
        AND mp.market_id = (SELECT id FROM markets WHERE is_major=true ORDER BY created_at LIMIT 1)
      ORDER BY ep.premium_pct DESC
    `);
    return ok(res, result.rows);
  } catch (e) { return err(res, 'Failed to fetch export prices', 500); }
});

// GET /export/agents — verified export agents
router.get('/agents', async (req, res) => {
  const agents = [
    { id:1, name:'Lagos Cocoa Export Ltd', crops:['Cocoa','Sesame'], states:['Lagos','Ogun'], verified:true, contact:'export@lagoscocoa.ng', port:'Apapa' },
    { id:2, name:'Kano Agro Exports',      crops:['Sesame','Soybean','Groundnut'], states:['Kano','Kaduna'], verified:true, contact:'info@kanoexports.ng', port:'Kano Dry Port' },
    { id:3, name:'AfroCashew Nigeria',     crops:['Cashew'], states:['Lagos','Ogun','Ondo'], verified:true, contact:'trade@afrocashew.ng', port:'Tin Can Island' },
    { id:4, name:'Delta Palm Exports',     crops:['Palm Oil'], states:['Delta','Rivers','Bayelsa'], verified:true, contact:'export@deltapalmng.com', port:'Warri Port' },
    { id:5, name:'North Hibiscus Traders', crops:['Hibiscus','Sesame'], states:['Kano','Jigawa','Bauchi'], verified:false, contact:'+2348099887766', port:'Kano Dry Port' },
  ];
  return ok(res, agents);
});

module.exports = router;
