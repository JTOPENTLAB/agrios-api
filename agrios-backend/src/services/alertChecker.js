const { query } = require('../config/db');

async function checkAlerts() {
  try {
    const alerts = await query(`
      SELECT pa.*, cr.name as crop_name, cr.emoji, u.email as user_email,
             mp.price_avg as current_price, m.name as market_name
      FROM price_alerts pa
      JOIN crops cr ON cr.id = pa.crop_id
      JOIN users u ON u.id = pa.user_id
      LEFT JOIN market_prices mp ON mp.crop_id = pa.crop_id
        AND (pa.market_id IS NULL OR mp.market_id = pa.market_id)
      LEFT JOIN markets m ON m.id = mp.market_id
      WHERE pa.is_active = true AND mp.price_avg IS NOT NULL
    `);

    let triggered = 0;
    for (const alert of alerts.rows) {
      const { current_price, condition, target_value } = alert;
      let shouldFire = false;
      let message = '';

      if (condition === 'above' && current_price > target_value) {
        shouldFire = true;
        message = `${alert.emoji} ${alert.crop_name} is now ₦${current_price.toLocaleString()} — above your ₦${target_value.toLocaleString()} target${alert.market_name ? ` at ${alert.market_name}` : ''}.`;
      } else if (condition === 'below' && current_price < target_value) {
        shouldFire = true;
        message = `${alert.emoji} ${alert.crop_name} is now ₦${current_price.toLocaleString()} — below your ₦${target_value.toLocaleString()} target${alert.market_name ? ` at ${alert.market_name}` : ''}.`;
      }

      if (shouldFire) {
        // Throttle: don't re-fire within 1 hour
        const lastFired = alert.last_triggered_at ? new Date(alert.last_triggered_at) : null;
        if (lastFired && (Date.now() - lastFired.getTime()) < 3600000) continue;

        await query(
          'INSERT INTO alert_notifications (alert_id, user_id, message, current_price) VALUES ($1,$2,$3,$4)',
          [alert.id, alert.user_id, message, current_price]
        );
        await query(
          'UPDATE price_alerts SET last_triggered_at=NOW(), trigger_count=trigger_count+1 WHERE id=$1',
          [alert.id]
        );
        triggered++;
      }
    }
    if (triggered > 0) console.log(`[AlertChecker] ${triggered} alerts triggered`);
  } catch (e) { console.error('Alert check error:', e.message); }
}

module.exports = { checkAlerts };
