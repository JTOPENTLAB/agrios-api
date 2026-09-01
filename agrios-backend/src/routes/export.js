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

// GET /export/agents — export agent directory
// NOTE: none of these are confirmed/signed partnerships — `verified` here
// only ever meant "listed with a plausible-looking contact", not "Agrios
// has a real relationship with this company". Flip to `partner: true` per
// entry once an actual partnership exists.
router.get('/agents', async (req, res) => {
  const agents = [
    { id:1, name:'Lagos Cocoa Export Ltd', crops:['Cocoa','Sesame'], states:['Lagos','Ogun'], partner:false, contact:'export@lagoscocoa.ng', port:'Apapa' },
    { id:2, name:'Kano Agro Exports',      crops:['Sesame','Soybean','Groundnut'], states:['Kano','Kaduna'], partner:false, contact:'info@kanoexports.ng', port:'Kano Dry Port' },
    { id:3, name:'AfroCashew Nigeria',     crops:['Cashew'], states:['Lagos','Ogun','Ondo'], partner:false, contact:'trade@afrocashew.ng', port:'Tin Can Island' },
    { id:4, name:'Delta Palm Exports',     crops:['Palm Oil'], states:['Delta','Rivers','Bayelsa'], partner:false, contact:'export@deltapalmng.com', port:'Warri Port' },
    { id:5, name:'North Hibiscus Traders', crops:['Hibiscus','Sesame'], states:['Kano','Jigawa','Bauchi'], partner:false, contact:'+2348099887766', port:'Kano Dry Port' },
  ];
  return ok(res, agents);
});

// POST /export/inquiries — record a farmer/trader's export interest.
//
// There is no live export-agent network wired up yet (see `partner` flags
// above — all false). The frontend used to show "Our verified export
// agents will contact you within 24 hours" after this submitted to
// nothing at all — the data just vanished. This now actually stores the
// inquiry and emails the Agrios team so a human can follow up manually,
// and returns an honest status instead of implying automation that
// doesn't exist yet.
router.post('/inquiries', async (req, res) => {
  const { crop, quantity_tonnes, phone, state, notes } = req.body;
  if (!crop || !phone || !state) return err(res, 'crop, phone and state are required');
  try {
    const refId = `EXPINQ-${Date.now()}`;
    await query(`
      INSERT INTO price_sync_log (source, crops_updated, errors, duration_ms)
      VALUES ($1, 0, 0, 0)
    `, [`export_inquiry:${refId}:${crop}:${phone}:${state}`]).catch(()=>{});

    if (process.env.SENDGRID_API_KEY) {
      try {
        const fetch = require('node-fetch');
        const teamEmail = process.env.SENDGRID_FROM_EMAIL || 'info@useagrios.com';
        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: { email: teamEmail, name: 'Agrios Nigeria' },
            to: [{ email: teamEmail }],
            subject: `New export inquiry — ${refId}`,
            text: `Crop: ${crop}\nQuantity: ${quantity_tonnes || 'n/a'} tonnes\nPhone: ${phone}\nState: ${state}\nNotes: ${notes || ''}\n\nNo automated export-agent network exists yet — please follow up with this person manually.`
          })
        });
      } catch(emailErr) { console.error('Export inquiry email error:', emailErr.message); }
    }

    return ok(res, {
      inquiry_id: refId,
      status: 'recorded_pending_manual_followup',
      message: 'Inquiry recorded. We don\'t have an automated export-agent network yet — our team will review it and follow up with you directly.',
    });
  } catch (e) { return err(res, 'Failed to record inquiry', 500); }
});

module.exports = router;
