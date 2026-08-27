const { query } = require('../config/db');

async function rescoreAllContributors() {
  try {
    const contribs = await query('SELECT * FROM contributors');
    let updated = 0;

    for (const c of contribs.rows) {
      // Score components (0-1000)
      const reportScore = Math.min(250, c.total_reports * 5);           // max 250 at 50 reports
      const accuracyScore = Math.round((c.accuracy_pct || 100) * 2.5);  // max 250 at 100%
      const activityScore = Math.min(250, c.market_presence_score * 2.5);
      const historyScore = Math.min(250, c.total_reports > 0 ?
        Math.round((c.accepted_reports / c.total_reports) * 250) : 125);

      const rawScore = reportScore + accuracyScore + activityScore + historyScore;
      const score = Math.min(1000, Math.max(300, rawScore));
      const grade =
        score >= 850 ? 'Excellent' :
        score >= 750 ? 'Very Good' :
        score >= 650 ? 'Good' :
        score >= 550 ? 'Fair' : 'Poor';
      const trust =
        c.accepted_reports >= 100 ? 'master_agent' :
        c.accepted_reports >= 50  ? 'verified_agent' :
        c.accepted_reports >= 20  ? 'trusted' :
        c.accepted_reports >= 5   ? 'basic' : 'new';

      await query(
        `UPDATE contributors SET credit_score=$1, credit_grade=$2, trust_level=$3,
         accuracy_pct=CASE WHEN total_reports > 0 THEN ROUND((accepted_reports::decimal/total_reports)*100,1) ELSE 100 END,
         updated_at=NOW() WHERE user_id=$4`,
        [score, grade, trust, c.user_id]
      );
      updated++;
    }
    console.log(`[CreditScorer] ${updated} contributors re-scored`);
  } catch (e) { console.error('Credit scoring error:', e.message); }
}

module.exports = { rescoreAllContributors };
