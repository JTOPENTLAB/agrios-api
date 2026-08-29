const router = require('express').Router();
const { query } = require('../config/db');
const { authenticate, requirePro } = require('../middleware/auth');
const { ok, err } = require('../utils/response');

// GET /finance/score — user's crop credit score
router.get('/score', authenticate, async (req, res) => {
  try {
    const result = await query(
      `SELECT c.*, u.full_name, u.state, u.created_at as member_since
       FROM contributors c
       JOIN users u ON u.id = c.user_id
       WHERE c.user_id=$1`,
      [req.user.id]
    );
    if (!result.rows.length) return err(res, 'Contributor profile not found', 404);
    const c = result.rows[0];
    // Score breakdown
    const factors = {
      report_count: Math.min(100, c.total_reports * 2),
      accuracy: Math.round(c.accuracy_pct || 100),
      market_presence: Math.min(100, c.market_presence_score || 0),
      account_age_days: Math.min(100, Math.floor((Date.now() - new Date(c.member_since)) / 86400000))
    };
    return ok(res, { ...c, factors });
  } catch (e) { return err(res, 'Failed to fetch credit score', 500); }
});

// GET /finance/lenders — partner lenders list
router.get('/lenders', authenticate, async (req, res) => {
  const lenders = [
    { id:1, name:'Agrifinance Partners', min_score:600, max_amount_ngn:5000000, rate_pa_pct:18, tenure_months:[3,6,12], contact:'loans@agrifinance.ng' },
    { id:2, name:'NIRSAL Microfinance Bank', min_score:500, max_amount_ngn:2000000, rate_pa_pct:21, tenure_months:[6,12,24], contact:'agri@nirsal.com' },
    { id:3, name:'Bank of Agriculture Nigeria', min_score:550, max_amount_ngn:10000000, rate_pa_pct:15, tenure_months:[12,24,36], contact:'loans@boanigeria.com' },
  ];
  return ok(res, lenders);
});

// POST /finance/apply — loan application
router.post('/apply', authenticate, async (req, res) => {
  const { lender_id, amount, tenure_months, purpose } = req.body;
  if (!lender_id || !amount || !tenure_months) return err(res, 'lender_id, amount and tenure_months required');
  try {
    // Fetch score
    const score = await query('SELECT credit_score, credit_grade FROM contributors WHERE user_id=$1', [req.user.id]);
    if (!score.rows.length || score.rows[0].credit_score < 500) {
      return err(res, 'Credit score too low for loan application. Submit more price reports to improve it.', 403);
    }
    const appId = `AGRIOS-${Date.now()}`;
    const creditScore = score.rows[0].credit_score;
    const creditGrade = score.rows[0].credit_grade;

    // Store application in DB
    await query(`
      INSERT INTO price_sync_log (source, crops_updated, errors, duration_ms)
      VALUES ($1, $2, 0, 0)
    `, [`loan_app:${req.user.id}:${lender_id}`, Math.round(amount)]).catch(()=>{});

    // Send notification email via SendGrid (if configured)
    if(process.env.SENDGRID_API_KEY) {
      try {
        const fetch = require('node-fetch');
        const lenderEmails = {
          1: 'loans@agrifinance.ng',
          2: 'agri@nirsal.com',
          3: 'loans@boanigeria.com',
        };
        const lenderEmail = lenderEmails[parseInt(lender_id)] || 'info@useagrios.com';

        // Email to lender
        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: { email: 'info@useagrios.com', name: 'Agrios Nigeria' },
            to: [{ email: lenderEmail }],
            subject: `New Loan Application — ${appId} — Agrios`,
            text: `New working capital application received via Agrios Nigeria.

Application ID: ${appId}
Applicant: ${req.user.full_name || req.user.email}
Email: ${req.user.email}
Amount: ₦${Number(amount).toLocaleString()}
Tenure: ${tenure_months} months
Purpose: ${purpose}
Credit Score: ${creditScore} (${creditGrade})

Please respond within 24 hours.`
          })
        });

        // Confirmation email to applicant
        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: { email: 'info@useagrios.com', name: 'Agrios Nigeria' },
            to: [{ email: req.user.email }],
            subject: 'Loan Application Received — Agrios',
            text: `Dear ${req.user.full_name || 'valued user'},

Your working capital application has been received.

Application ID: ${appId}
Amount: ₦${Number(amount).toLocaleString()}
Tenure: ${tenure_months} months
Credit Score: ${creditScore} (${creditGrade})

The lender will contact you within 24 hours on the email or phone number registered on your account.

Thank you for using Agrios Nigeria.
info@useagrios.com | useagrios.com`
          })
        });
      } catch(emailErr) {
        console.error('Email send error:', emailErr.message);
      }
    }

    return ok(res, {
      application_id: appId,
      status: 'submitted',
      credit_score: creditScore,
      credit_grade: creditGrade,
      amount_requested: amount,
      message: 'Application submitted. Lender will respond within 24 hours.',
      submitted_at: new Date().toISOString()
    });
  } catch (e) { return err(res, 'Failed to submit application', 500); }
});

module.exports = router;
