// src/services/emailService.js
// Email delivery via Resend API (https://resend.com)

const fetch = require('node-fetch');

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.EMAIL_FROM || 'alerts@useagrios.com';
const RESEND_URL = 'https://api.resend.com/emails';

async function sendAlertEmail({ to, userName, cropName, emoji, message, currentPrice, targetValue, condition, marketName }) {
  if (!RESEND_API_KEY) {
    console.warn('[Email] RESEND_API_KEY not set — skipping email');
    return;
  }

  const conditionLabel = condition === 'above' ? 'risen above' : 'dropped below';
  const priceFormatted = `₦${Number(currentPrice).toLocaleString()}`;
  const targetFormatted = `₦${Number(targetValue).toLocaleString()}`;
  const marketLabel = marketName ? ` at ${marketName}` : '';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f7f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:520px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,.08)">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0a3d25,#1a6b3f);padding:28px 32px">
      <div style="color:#a3e6b0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px">Agrios Price Alert</div>
      <div style="color:#fff;font-size:22px;font-weight:700">${emoji} ${cropName} Alert Triggered</div>
    </div>

    <!-- Body -->
    <div style="padding:28px 32px">
      <p style="margin:0 0 20px;color:#1a2e1a;font-size:15px">Hi ${userName || 'there'},</p>
      <p style="margin:0 0 24px;color:#374c37;font-size:14px;line-height:1.6">
        Your price alert for <strong>${cropName}</strong>${marketLabel} has been triggered — the price has <strong>${conditionLabel} your target</strong>.
      </p>

      <!-- Price box -->
      <div style="background:#f0fdf4;border:1.5px solid #86efac;border-radius:12px;padding:20px 24px;margin-bottom:24px">
        <div style="display:flex;justify-content:space-between;margin-bottom:12px">
          <div>
            <div style="font-size:11px;color:#5a7a67;font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">Current Price</div>
            <div style="font-size:24px;font-weight:800;color:#0a3d25">${priceFormatted}</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:11px;color:#5a7a67;font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">Your Target</div>
            <div style="font-size:24px;font-weight:800;color:#374c37">${targetFormatted}</div>
          </div>
        </div>
        ${marketName ? `<div style="font-size:12px;color:#5a7a67">📍 ${marketName}</div>` : ''}
      </div>

      <p style="margin:0 0 24px;color:#374c37;font-size:13px;line-height:1.6">${message}</p>

      <!-- CTA -->
      <a href="https://useagrios.com/?page=prices"
         style="display:inline-block;background:#0a3d25;color:#fff;text-decoration:none;padding:13px 24px;border-radius:10px;font-size:14px;font-weight:700">
        View live prices →
      </a>
    </div>

    <!-- Footer -->
    <div style="padding:20px 32px;border-top:1px solid #e8f0e8;background:#fafdf8">
      <p style="margin:0;font-size:11px;color:#8fa89a;line-height:1.6">
        You're receiving this because you set a price alert on <a href="https://useagrios.com" style="color:#0a3d25">Agrios Nigeria</a>.<br>
        To manage your alerts, <a href="https://useagrios.com/?page=alerts" style="color:#0a3d25">visit your alerts page</a>.
      </p>
    </div>
  </div>
</body>
</html>`;

  try {
    const res = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Agrios Alerts <${FROM_EMAIL}>`,
        to: [to],
        subject: `${emoji} ${cropName} price alert — ${priceFormatted} ${condition === 'above' ? '↑' : '↓'}`,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[Email] Resend error ${res.status}:`, body);
    } else {
      console.log(`[Email] Sent to ${to}`);
    }
  } catch (e) {
    console.error('[Email] Failed to send:', e.message);
  }
}

module.exports = { sendAlertEmail };
