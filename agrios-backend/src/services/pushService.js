// src/services/pushService.js
// Web push notifications via the Web Push Protocol (VAPID)

const webpush = require('web-push');
const { query } = require('../config/db');

const VAPID_PUBLIC  = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
const VAPID_EMAIL   = process.env.VAPID_EMAIL || 'mailto:support@useagrios.com';

if (VAPID_PUBLIC && VAPID_PRIVATE) {
  webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC, VAPID_PRIVATE);
} else {
  console.warn('[Push] VAPID keys not set — web push disabled');
}

/**
 * Send a push notification to all registered subscriptions for a user.
 * Cleans up expired/invalid subscriptions automatically.
 */
async function sendPushNotification({ userId, title, body, url = '/?page=alerts' }) {
  if (!VAPID_PUBLIC || !VAPID_PRIVATE) return;

  let subs;
  try {
    const result = await query(
      'SELECT id, subscription FROM push_subscriptions WHERE user_id = $1',
      [userId]
    );
    subs = result.rows;
  } catch (e) {
    console.error('[Push] Failed to fetch subscriptions:', e.message);
    return;
  }

  if (!subs.length) return;

  const payload = JSON.stringify({ title, body, url });

  for (const sub of subs) {
    try {
      await webpush.sendNotification(sub.subscription, payload);
      console.log(`[Push] Sent to subscription ${sub.id}`);
    } catch (e) {
      // 410 Gone = subscription expired; 404 = not found — remove it
      if (e.statusCode === 410 || e.statusCode === 404) {
        await query('DELETE FROM push_subscriptions WHERE id = $1', [sub.id]).catch(() => {});
        console.log(`[Push] Removed expired subscription ${sub.id}`);
      } else {
        console.error(`[Push] Error sending to ${sub.id}:`, e.message);
      }
    }
  }
}

module.exports = { sendPushNotification };
