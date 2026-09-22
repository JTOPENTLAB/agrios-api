// src/services/whatsappService.js
// WhatsApp notifications via Termii API

const fetch = require('node-fetch');

const TERMII_API_KEY  = process.env.TERMII_API_KEY;
const TERMII_SENDER   = process.env.TERMII_SENDER_ID || 'Agrios';
const TERMII_SMS_URL  = 'https://v3.api.termii.com/api/sms/send';

/**
 * Send a WhatsApp message via Termii.
 * Falls back to SMS channel if WhatsApp is unavailable.
 * @param {string} phone  - E.164 format (e.g. +2348012345678) or local (08012345678)
 * @param {string} message
 */
async function sendWhatsApp({ phone, message }) {
  if (!TERMII_API_KEY) {
    console.warn('[WhatsApp] TERMII_API_KEY not set — skipping WhatsApp');
    return;
  }
  if (!phone) {
    console.warn('[WhatsApp] No phone number — skipping');
    return;
  }

  // Normalise Nigerian numbers: 08012345678 → 2348012345678
  let to = phone.replace(/\s+/g, '').replace(/^\+/, '');
  if (to.startsWith('0')) to = '234' + to.slice(1);

  const body = {
    api_key: TERMII_API_KEY,
    to,
    from: TERMII_SENDER,
    sms: message,
    type: 'unicode',
    channel: 'whatsapp',
  };

  try {
    const res = await fetch(TERMII_SMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (data.code === 'ok' || res.ok) {
      console.log(`[WhatsApp] Sent to ${to}`);
    } else {
      // Termii may reject WhatsApp if recipient hasn't opted-in; fall back to SMS
      if (data.message && data.message.toLowerCase().includes('whatsapp')) {
        console.warn(`[WhatsApp] WhatsApp failed (${data.message}), falling back to SMS`);
        await sendSMSFallback({ to, message });
      } else {
        console.error('[WhatsApp] Termii error:', JSON.stringify(data));
      }
    }
  } catch (e) {
    console.error('[WhatsApp] Request failed:', e.message);
  }
}

async function sendSMSFallback({ to, message }) {
  try {
    const res = await fetch(TERMII_SMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: TERMII_API_KEY,
        to,
        from: TERMII_SENDER,
        sms: message,
        type: 'plain',
        channel: 'generic',
      }),
    });
    const data = await res.json();
    if (data.code === 'ok' || res.ok) {
      console.log(`[SMS fallback] Sent to ${to}`);
    } else {
      console.error('[SMS fallback] Error:', JSON.stringify(data));
    }
  } catch (e) {
    console.error('[SMS fallback] Failed:', e.message);
  }
}

module.exports = { sendWhatsApp };
