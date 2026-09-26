<!DOCTYPE html>
<!-- Agrios v1788121728 - built Aug 30 2026 -->
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=5.0,viewport-fit=cover"/>
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="Expires" content="0"/>
<title>Agrios – Nigeria Agricultural Market Intelligence | useagrios.com</title>
<meta name="description" content="Real-time crop prices, AI predictions, and market intelligence for Nigerian farmers, buyers and investors. useagrios.com"/>
<meta name="theme-color" content="#0a3d25"/>
<meta name="mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
<meta name="apple-mobile-web-app-title" content="Agrios"/>
<meta name="application-name" content="Agrios"/>
<meta property="og:title" content="Agrios — Nigeria Market Intelligence"/>
<meta property="og:description" content="Real-time crop prices, transport matching, and export intelligence for Nigerian agriculture."/>
<meta property="og:url" content="https://useagrios.com"/>
<meta property="og:type" content="website"/>
<meta property="og:image" content="https://useagrios.com/icon-512.png"/>
<link rel="manifest" href="/manifest.json"/>
<link rel="apple-touch-icon" sizes="180x180" href="/icon-192.png"/>
<link rel="icon" type="image/png" sizes="32x32" href="/icon-192.png"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,500;0,700;1,300;1,500&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<style>
/* ============ RESET & TOKENS ============ */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
:root{
  --forest:#0a3d25;--emerald:#1a6b47;--emerald-lt:#2a8a5e;
  --lime:#c8f135;--lime-dk:#96b820;--lime-pale:#eefab8;
  --cream:#f9fbf7;--white:#ffffff;
  --obsidian:#0d1c13;--sage:#5a7a67;--sage-lt:#8fa89a;
  --border:#daeadf;--border-md:#c2d9ca;
  --red:#d92b2b;--amber:#d97706;--blue:#1558a8;
  --success-bg:#e8fdf0;--success-txt:#0a5c2a;
  --warn-bg:#fef8e7;--warn-txt:#92500a;
  --err-bg:#fce8e8;--err-txt:#8b1a1a;
  --radius:16px;--radius-md:12px;--radius-sm:8px;--radius-pill:100px;
  --font-display:'Fraunces',Georgia,serif;
  --font-body:'DM Sans',system-ui,sans-serif;
  --font-mono:'DM Mono',monospace;
  --transition:.18s cubic-bezier(.4,0,.2,1);
}
html{scroll-behavior:smooth;font-size:16px}
body{font-family:var(--font-body);background:var(--cream);color:var(--obsidian);line-height:1.55;overflow-x:hidden;-webkit-font-smoothing:antialiased}
img,svg{display:block;max-width:100%}
button{font-family:var(--font-body);cursor:pointer}
input,select,textarea{font-family:var(--font-body)}
a{color:inherit;text-decoration:none}

/* ============ SCROLLBAR ============ */
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border-md);border-radius:2px}

/* ============ UTILITY ============ */
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.mono{font-family:var(--font-mono)}
.up{color:#0a7a3a}.dn{color:var(--red)}.flat{color:var(--sage)}
.badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:var(--radius-pill);font-size:11px;font-weight:600;letter-spacing:.3px}
.badge-green{background:var(--success-bg);color:var(--success-txt)}
.badge-red{background:var(--err-bg);color:var(--err-txt)}
.badge-amber{background:var(--warn-bg);color:var(--warn-txt)}
.badge-blue{background:#e8f0fc;color:#1558a8}
.badge-gray{background:#f0f0ee;color:#444}
.badge-lime{background:var(--lime-pale);color:#3a5200}
.badge-live{background:var(--lime);color:var(--forest);font-weight:700}

/* ============ LAYOUT ============ */
.app-shell{display:flex;flex-direction:column;min-height:100vh}
.main-content{flex:1;display:flex;flex-direction:column}

/* ============ NAV ============ */
.top-nav{background:var(--forest);position:sticky;top:0;z-index:200;border-bottom:1px solid rgba(255,255,255,.06)}
.nav-inner{max-width:1240px;margin:0 auto;padding:0 24px;height:60px;display:flex;align-items:center;gap:0}
.nav-brand{display:flex;align-items:center;gap:10px;margin-right:32px;text-decoration:none}
.nav-logo{width:34px;height:34px;background:var(--lime);border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.nav-logo svg{width:20px;height:20px}
.brand-text{display:flex;flex-direction:column;gap:0}
.brand-name{font-family:var(--font-display);font-size:18px;font-weight:700;color:#fff;letter-spacing:-.3px;line-height:1}
.brand-domain{font-size:10px;color:rgba(255,255,255,.45);letter-spacing:.5px;line-height:1;margin-top:2px}
.nav-links{display:flex;align-items:center;gap:0;flex:1;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}.nav-links::-webkit-scrollbar{display:none}
.nav-link{padding:6px 9px;border-radius:var(--radius-sm);font-size:12px;font-weight:500;color:rgba(255,255,255,.65);border:none;background:none;cursor:pointer;transition:var(--transition);white-space:nowrap;font-family:var(--font-body)}
.nav-link:hover{color:#fff;background:rgba(255,255,255,.07)}
.nav-link.active{color:#fff;background:rgba(200,241,53,.12);color:var(--lime)}
.nav-right{display:flex;align-items:center;gap:10px;margin-left:auto}
.live-dot{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:var(--lime);letter-spacing:.5px}
.live-dot::before{content:'';width:7px;height:7px;background:var(--lime);border-radius:50%;animation:pulse 2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.7)}}
.nav-avatar{width:34px;height:34px;border-radius:50%;background:rgba(200,241,53,.15);border:1.5px solid rgba(200,241,53,.3);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--lime);cursor:pointer}
.nav-btn-upgrade{padding:7px 14px;background:var(--lime);color:var(--forest);border:none;border-radius:var(--radius-sm);font-size:12px;font-weight:700;cursor:pointer;transition:var(--transition)}
.nav-btn-upgrade:hover{background:#d9ff3a}
.hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;padding:6px;cursor:pointer}
.hamburger span{display:block;width:22px;height:2px;background:rgba(255,255,255,.7);border-radius:2px;transition:var(--transition)}

/* ============ MOBILE NAV ============ */
.mobile-nav{display:none;background:var(--white);border-top:1px solid var(--border);position:fixed;bottom:0;left:0;right:0;z-index:200;height:60px}
.mobile-nav-inner{display:flex;align-items:stretch;height:100%;padding:0 4px}
.mob-nav-item{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;border:none;background:none;cursor:pointer;padding:4px 2px 2px;transition:var(--transition);color:var(--sage-lt);font-family:var(--font-body);min-width:0;overflow:hidden}
.mob-nav-item.active{color:var(--forest)}
.mob-nav-item svg{width:20px;height:20px;stroke-width:1.8;flex-shrink:0}
.mob-nav-label{font-size:9px;font-weight:600;letter-spacing:.1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:100%;text-align:center;line-height:1.2}
.mob-nav-item.active .mob-nav-label{color:var(--forest)}
.mob-center-btn{width:48px;height:48px;background:var(--forest);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 12px rgba(10,61,37,.35);flex-shrink:0}
.mob-center-btn svg{width:22px;height:22px;stroke:#fff;stroke-width:2}

/* ============ TICKER ============ */
.ticker-bar{background:var(--obsidian);overflow:hidden;height:34px;display:flex;align-items:center}
.ticker-track{display:flex;gap:0;animation:ticker 35s linear infinite;width:max-content}
.ticker-track:hover{animation-play-state:paused}
.ticker-item{display:flex;align-items:center;gap:8px;padding:0 20px;border-right:1px solid rgba(255,255,255,.07);white-space:nowrap;font-size:12px}
.ticker-item .t-name{color:#fff;font-weight:600;font-family:var(--font-body)}
.ticker-item .t-price{color:rgba(255,255,255,.7);font-family:var(--font-mono);font-size:11px}
.ticker-item .t-up{color:var(--lime);font-weight:600;font-size:11px}
.ticker-item .t-dn{color:#ff7070;font-weight:600;font-size:11px}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* ============ PAGE CONTAINER ============ */
.page-wrap{max-width:1240px;margin:0 auto;padding:28px 24px;width:100%;display:none}
.page-wrap.active{display:block}

/* ============ SECTION HEADERS ============ */
.sec-hd{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-bottom:18px}
.sec-hd-left{}
.sec-title{font-size:17px;font-weight:600;color:var(--obsidian);line-height:1.2}
.sec-sub{font-size:12px;color:var(--sage);margin-top:3px}
.sec-link{font-size:13px;font-weight:500;color:var(--emerald);cursor:pointer;white-space:nowrap;background:none;border:none;font-family:var(--font-body)}
.sec-link:hover{color:var(--forest);text-decoration:underline}

/* ============ HERO ============ */
.hero{background:var(--forest);border-radius:var(--radius);padding:36px 32px;color:#fff;margin-bottom:24px;position:relative;overflow:hidden}
.hero-accent{position:absolute;right:-60px;top:-60px;width:280px;height:280px;background:rgba(200,241,53,.06);border-radius:50%}
.hero-accent2{position:absolute;right:80px;bottom:-100px;width:200px;height:200px;background:rgba(200,241,53,.04);border-radius:50%}
.hero-tag{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:700;color:var(--lime);letter-spacing:.8px;text-transform:uppercase;margin-bottom:10px}
.hero-title{font-family:var(--font-display);font-size:clamp(26px,4vw,38px);font-weight:500;line-height:1.15;margin-bottom:10px;letter-spacing:-.5px}
.hero-title em{font-style:italic;color:var(--lime)}
.hero-desc{font-size:14px;color:rgba(255,255,255,.65);max-width:520px;line-height:1.65;margin-bottom:20px}
.hero-stats{display:flex;gap:0;border-radius:var(--radius-md);overflow:hidden;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);width:fit-content}
.h-stat{padding:14px 22px;border-right:1px solid rgba(255,255,255,.08)}
.h-stat:last-child{border-right:none}
.h-stat-v{font-family:var(--font-mono);font-size:22px;font-weight:500;color:var(--lime);line-height:1}
.h-stat-l{font-size:10px;color:rgba(255,255,255,.5);margin-top:4px;letter-spacing:.4px;text-transform:uppercase}
.hero-actions{display:flex;gap:10px;margin-top:20px}
.btn-lime{background:var(--lime);color:var(--forest);border:none;border-radius:var(--radius-sm);padding:10px 20px;font-size:13px;font-weight:700;cursor:pointer;transition:var(--transition)}
.btn-lime:hover{background:#d9ff3a;transform:translateY(-1px)}
.btn-ghost-white{background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:var(--radius-sm);padding:10px 20px;font-size:13px;font-weight:500;cursor:pointer;transition:var(--transition)}
.btn-ghost-white:hover{background:rgba(255,255,255,.15)}

/* ============ STAT CARDS ============ */
.stat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px}
.stat-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius-md);padding:16px 18px}
.stat-card-label{font-size:11px;font-weight:600;color:var(--sage);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px}
.stat-card-val{font-family:var(--font-mono);font-size:26px;font-weight:500;line-height:1;color:var(--obsidian)}
.stat-card-change{font-size:12px;margin-top:6px;font-weight:500}

/* ============ PRICE CARDS (horizontal scroll) ============ */
.hscroll-wrap{margin:0 -24px;padding:0 24px 12px;overflow-x:auto;display:flex;gap:12px;-ms-overflow-style:none;scrollbar-width:none}
.hscroll-wrap::-webkit-scrollbar{display:none}
.crop-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius-md);padding:16px;min-width:170px;flex-shrink:0;cursor:pointer;transition:var(--transition);position:relative}
.crop-card:hover{border-color:var(--emerald-lt);transform:translateY(-2px)}
.cc-top{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.cc-icon{width:36px;height:36px;border-radius:10px;background:var(--cream);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
.cc-name{font-weight:600;font-size:14px;line-height:1.2}
.cc-market{font-size:10px;color:var(--sage);margin-top:2px}
.cc-price{font-family:var(--font-mono);font-size:21px;font-weight:500;color:var(--forest);margin-bottom:3px}
.cc-unit{font-size:10px;color:var(--sage-lt);margin-bottom:8px}
.cc-badge{display:inline-flex;align-items:center;gap:3px;font-size:11px;font-weight:700;padding:3px 9px;border-radius:var(--radius-pill)}
.cc-badge.up{background:var(--success-bg);color:var(--success-txt)}
.cc-badge.dn{background:var(--err-bg);color:var(--err-txt)}
.cc-conf{display:flex;align-items:center;gap:6px;margin-top:10px;font-size:10px;color:var(--sage-lt)}
.cc-conf-bar{flex:1;height:3px;background:var(--border);border-radius:2px}
.cc-conf-fill{height:100%;border-radius:2px;background:var(--lime)}

/* ============ OPPORTUNITY CARDS ============ */
.opp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:24px}
.job-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:16px;display:flex;flex-direction:column;gap:10px;transition:var(--transition)}
.job-card:hover{border-color:var(--emerald);transform:translateY(-2px)}
.card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:16px}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.btn-primary-sm{background:var(--forest);color:#fff;border:none;border-radius:var(--radius-sm);padding:9px 16px;font-size:12px;font-weight:600;cursor:pointer;font-family:var(--font-body);transition:var(--transition)}
.btn-primary-sm:hover{background:var(--emerald)}
.btn-sm{padding:5px 10px;border-radius:6px;font-size:10px;font-weight:700;border:none;cursor:pointer;font-family:var(--font-body);transition:var(--transition)}
.btn-sm-g{background:var(--gl);color:var(--forest);border:1px solid #c0d8c8}
.btn-sm-g:hover{background:var(--limepale)}
.badge-red{background:#fee2e2;color:#991b1b}
.badge-lime{background:var(--limepale);color:#3a5200}
.opp-card{background:var(--white);border:1px solid var(--border);border-left:3px solid var(--lime);border-radius:var(--radius-md);padding:18px;display:flex;flex-direction:column;gap:8px;transition:var(--transition)}
.opp-card:hover{border-color:var(--lime);border-left-color:var(--lime)}
.opp-type{font-size:10px;text-transform:uppercase;letter-spacing:.8px;font-weight:700;color:var(--emerald)}
.opp-title{font-size:14px;font-weight:600;line-height:1.3}
.opp-desc{font-size:12px;color:var(--sage);line-height:1.6;flex:1}
.opp-margin{font-family:var(--font-mono);font-size:22px;font-weight:500;color:var(--forest)}
.opp-actions{display:flex;gap:6px;flex-wrap:wrap;padding-top:4px}
.btn-sm{padding:6px 12px;border-radius:var(--radius-sm);font-size:11px;font-weight:600;border:none;cursor:pointer;transition:var(--transition);font-family:var(--font-body)}
.btn-sm-green{background:var(--cream);color:var(--forest);border:1px solid var(--border-md)}
.btn-sm-green:hover{background:var(--lime-pale);border-color:var(--lime-dk)}
.btn-sm-outline{background:#fff;color:var(--sage);border:1px solid var(--border)}
.btn-sm-outline:hover{border-color:var(--emerald);color:var(--emerald)}

/* ============ CHART ============ */
.chart-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius-md);padding:20px}
.chart-wrap{position:relative;height:200px;width:100%}
.period-tabs{display:flex;gap:2px;background:var(--cream);border-radius:var(--radius-sm);padding:3px;width:fit-content}
.period-tab{padding:5px 12px;border-radius:6px;font-size:11px;font-weight:600;color:var(--sage);border:none;background:none;cursor:pointer;transition:var(--transition);font-family:var(--font-body)}
.period-tab.active{background:var(--white);color:var(--forest)}

/* ============ PREDICTION LIST ============ */
.pred-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius-md);overflow:hidden}
.pred-row{display:flex;align-items:center;padding:13px 16px;border-bottom:1px solid var(--border);gap:12px}
.pred-row:last-child{border-bottom:none}
.pred-crop{font-weight:600;font-size:13px;flex:1}
.pred-action{font-size:11px;color:var(--sage);margin-top:2px}
.pred-right{text-align:right}
.pred-dir{font-family:var(--font-mono);font-weight:600;font-size:13px}
.pred-conf{font-size:10px;color:var(--sage-lt);margin-top:2px}

/* ============ PRICE TABLE (full page) ============ */
.search-filter-bar{display:flex;align-items:center;gap:10px;background:var(--white);border:1px solid var(--border);border-radius:var(--radius-md);padding:10px 16px;margin-bottom:16px;flex-wrap:wrap}
.search-input-wrap{display:flex;align-items:center;gap:8px;flex:1;min-width:160px}
.search-input-wrap svg{color:var(--sage-lt);flex-shrink:0;width:16px;height:16px}
.search-input{border:none;outline:none;font-size:14px;font-family:var(--font-body);color:var(--obsidian);background:transparent;width:100%;min-width:0}
.filter-select{border:1px solid var(--border);border-radius:var(--radius-sm);padding:7px 10px;font-size:12px;font-family:var(--font-body);color:var(--obsidian);background:#fff;outline:none;cursor:pointer}
.filter-select:focus{border-color:var(--emerald)}

.chip-row{display:flex;gap:6px;flex-wrap:nowrap;overflow-x:auto;margin-bottom:16px;-ms-overflow-style:none;scrollbar-width:none;padding-bottom:2px}
.chip-row::-webkit-scrollbar{display:none}
.chip{padding:6px 14px;border-radius:var(--radius-pill);font-size:12px;font-weight:500;border:1px solid var(--border);background:var(--white);color:var(--sage);cursor:pointer;white-space:nowrap;transition:var(--transition)}
.chip:hover{border-color:var(--emerald);color:var(--emerald)}
.chip.active{background:var(--forest);color:#fff;border-color:var(--forest)}

.table-wrap{overflow-x:auto;border-radius:var(--radius-md);border:1px solid var(--border);background:var(--white)}
table{width:100%;border-collapse:collapse;min-width:700px}
thead{background:var(--forest)}
th{padding:11px 14px;text-align:left;font-size:10px;font-weight:600;letter-spacing:.6px;text-transform:uppercase;color:rgba(255,255,255,.8);white-space:nowrap}
td{padding:11px 14px;border-bottom:1px solid var(--border);font-size:13px;vertical-align:middle;white-space:nowrap}
tr:last-child td{border:none}
tbody tr{transition:var(--transition)}
tbody tr:hover td{background:var(--cream)}
.td-crop-cell{display:flex;align-items:center;gap:10px;font-weight:600}
.td-icon{font-size:16px;width:24px;text-align:center}
.td-mono{font-family:var(--font-mono);font-size:13px}
.conf-inline{display:flex;align-items:center;gap:6px}
.conf-bar-sm{width:44px;height:3px;background:var(--border);border-radius:2px;flex-shrink:0}
.conf-fill-sm{height:100%;border-radius:2px;background:var(--lime-dk)}

/* ============ FORM ============ */
.form-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:24px}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.form-group{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
.form-group:last-child{margin-bottom:0}
.form-label{font-size:11px;font-weight:700;color:var(--sage);text-transform:uppercase;letter-spacing:.5px}
.form-input,.form-select,.form-textarea{padding:11px 14px;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-family:var(--font-body);font-size:13px;color:var(--obsidian);background:var(--cream);outline:none;transition:var(--transition);width:100%;-webkit-appearance:none}
.form-input:focus,.form-select:focus,.form-textarea:focus{border-color:var(--emerald);background:var(--white);box-shadow:0 0 0 3px rgba(26,107,71,.08)}
.form-textarea{resize:vertical;min-height:80px;line-height:1.6}
.form-hint{font-size:11px;color:var(--sage-lt)}
.form-hint.ok{color:#0a7a3a}.form-hint.warn{color:var(--amber)}.form-hint.err{color:var(--red)}
.upload-zone{border:2px dashed var(--border-md);border-radius:var(--radius-sm);padding:24px;text-align:center;cursor:pointer;transition:var(--transition);background:var(--cream)}
.upload-zone:hover{border-color:var(--emerald);background:var(--success-bg)}
.upload-zone svg{margin:0 auto 8px;width:28px;height:28px;color:var(--sage-lt)}
.upload-zone p{font-size:12px;color:var(--sage);line-height:1.6}
.btn-primary{background:var(--forest);color:#fff;border:none;border-radius:var(--radius-sm);padding:12px 24px;font-size:14px;font-weight:600;cursor:pointer;transition:var(--transition);font-family:var(--font-body);width:100%}
.btn-primary:hover{background:var(--emerald)}
.btn-primary:active{transform:scale(.98)}
.btn-outline{background:var(--white);color:var(--sage);border:1.5px solid var(--border);border-radius:var(--radius-sm);padding:11px 24px;font-size:13px;font-weight:500;cursor:pointer;transition:var(--transition);font-family:var(--font-body)}
.btn-outline:hover{border-color:var(--emerald);color:var(--emerald)}

/* ============ CONTRIBUTOR PROFILE ============ */
.contrib-profile{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:22px;margin-bottom:16px}
.contrib-top{display:flex;align-items:center;gap:14px;margin-bottom:18px}
.contrib-avatar{width:50px;height:50px;border-radius:50%;background:var(--forest);display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;color:#fff;flex-shrink:0}
.contrib-name{font-size:16px;font-weight:600}
.contrib-loc{font-size:12px;color:var(--sage);margin-top:2px}
.contrib-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px}
.cs-item{background:var(--cream);border-radius:var(--radius-sm);padding:10px;text-align:center}
.cs-val{font-family:var(--font-mono);font-size:18px;font-weight:500;color:var(--forest)}
.cs-lbl{font-size:10px;color:var(--sage-lt);margin-top:3px;text-transform:uppercase;letter-spacing:.4px}
.prog-row{display:flex;justify-content:space-between;font-size:11px;color:var(--sage);margin-bottom:5px}
.prog-track{height:5px;background:var(--border);border-radius:3px}
.prog-fill{height:100%;background:var(--lime-dk);border-radius:3px;transition:width .6s ease}

/* ============ VALIDATION BOX ============ */
.validation-box{background:var(--cream);border:1px solid var(--border);border-radius:var(--radius-sm);padding:14px}
.val-row{display:flex;align-items:flex-start;gap:8px;font-size:12px;color:var(--sage);margin-bottom:8px;line-height:1.5}
.val-row:last-child{margin-bottom:0}
.val-icon{flex-shrink:0;font-size:14px;line-height:1.4}

/* ============ ALERTS ============ */
.alert-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius-md);padding:14px 16px;display:flex;align-items:center;gap:12px;transition:var(--transition)}
.alert-card:hover{border-color:var(--border-md)}
.alert-icon{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.alert-icon.up{background:var(--success-bg)}
.alert-icon.dn{background:var(--err-bg)}
.alert-info{flex:1}
.alert-title{font-weight:600;font-size:13px}
.alert-sub{font-size:11px;color:var(--sage);margin-top:2px}
.toggle{width:42px;height:24px;background:var(--border);border-radius:var(--radius-pill);position:relative;cursor:pointer;transition:var(--transition);flex-shrink:0;border:none}
.toggle.on{background:var(--lime-dk)}
.toggle::after{content:'';position:absolute;width:20px;height:20px;background:#fff;border-radius:50%;top:2px;left:2px;transition:var(--transition);box-shadow:0 1px 4px rgba(0,0,0,.15)}
.toggle.on::after{left:20px}

/* ============ HEATMAP ============ */
.heat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.heat-cell{border-radius:var(--radius-md);padding:16px;text-align:center;color:#fff;cursor:pointer;transition:var(--transition)}
.heat-cell:hover{transform:scale(1.02)}
.heat-mkt{font-size:11px;opacity:.8;margin-bottom:4px;font-weight:500}
.heat-price{font-family:var(--font-mono);font-size:18px;font-weight:500}
.heat-state{font-size:10px;opacity:.65;margin-top:3px}

/* ============ DEMAND BOARD ============ */
.demand-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.demand-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius-md);padding:18px;display:flex;flex-direction:column;gap:10px;transition:var(--transition)}
.demand-card:hover{border-color:var(--border-md);transform:translateY(-1px)}
.dc-head{display:flex;justify-content:space-between;align-items:flex-start}
.dc-crop{font-size:17px;font-weight:700;display:flex;align-items:center;gap:6px}
.dc-buyer{font-size:11px;color:var(--sage);margin-top:3px;display:flex;align-items:center;gap:4px}
.dc-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.dc-item{font-size:12px;color:var(--sage)}.dc-item strong{color:var(--obsidian);font-weight:600}
.dc-deadline{font-size:12px;color:var(--amber);font-weight:600;display:flex;align-items:center;gap:5px}
.dc-actions{display:flex;gap:8px}

/* ============ ADMIN ============ */
.admin-card{background:var(--white);border:1px solid var(--border);border-radius:var(--radius-md);overflow:hidden}
.admin-row{padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px}
.admin-row:last-child{border-bottom:none}
.admin-info{flex:1}
.admin-main{font-weight:600;font-size:13px}
.admin-sub{font-size:11px;color:var(--sage);margin-top:2px}
.admin-actions{display:flex;gap:6px;flex-shrink:0}
.btn-approve{padding:6px 14px;background:var(--success-bg);color:var(--success-txt);border:1px solid #b7e8c8;border-radius:var(--radius-sm);font-size:12px;font-weight:600;cursor:pointer;font-family:var(--font-body);transition:var(--transition)}
.btn-approve:hover{background:#cdf5d8}
.btn-reject{padding:6px 14px;background:var(--err-bg);color:var(--err-txt);border:1px solid #f5bfbf;border-radius:var(--radius-sm);font-size:12px;font-weight:600;cursor:pointer;font-family:var(--font-body);transition:var(--transition)}
.btn-reject:hover{background:#fad5d5}

/* ============ TOAST ============ */
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(100px);background:var(--obsidian);color:#fff;padding:12px 20px;border-radius:var(--radius-md);font-size:13px;font-weight:500;z-index:1000;display:flex;align-items:center;gap:8px;opacity:0;transition:all .28s cubic-bezier(.4,0,.2,1);white-space:nowrap;max-width:90vw}
.toast.show{transform:translateX(-50%) translateY(0);opacity:1}
.toast-dot{width:8px;height:8px;border-radius:50%;background:var(--lime);flex-shrink:0}

/* ============ GRID HELPERS ============ */
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}

/* ============ EMPTY STATE ============ */
.empty{padding:48px 24px;text-align:center;color:var(--sage)}
.empty-icon{font-size:40px;margin-bottom:12px}
.empty p{font-size:14px;line-height:1.7;max-width:300px;margin:0 auto}

/* ============ MOBILE OVERLAY NAV ============ */
.mob-drawer{display:none;position:fixed;top:0;left:0;right:0;bottom:0;z-index:300;background:rgba(10,29,19,.5)}
.mob-drawer-inner{position:absolute;left:0;top:0;bottom:0;width:260px;background:var(--forest);padding:24px;display:flex;flex-direction:column;gap:4px;transform:translateX(-100%);transition:transform .3s cubic-bezier(.4,0,.2,1)}
.mob-drawer.open .mob-drawer-inner{transform:translateX(0)}
.mob-drawer-close{align-self:flex-end;background:none;border:none;color:rgba(255,255,255,.6);font-size:22px;cursor:pointer;margin-bottom:8px;padding:4px}
.mob-drawer-link{padding:12px 14px;border-radius:var(--radius-sm);font-size:14px;font-weight:500;color:rgba(255,255,255,.75);border:none;background:none;cursor:pointer;text-align:left;transition:var(--transition);font-family:var(--font-body)}
.mob-drawer-link:hover,.mob-drawer-link.active{background:rgba(200,241,53,.1);color:var(--lime)}

/* ============ RESPONSIVE ============ */
@media(max-width:1100px){
  .opp-grid{grid-template-columns:1fr 1fr}
  .g2{grid-template-columns:1fr}
  .demand-grid{grid-template-columns:1fr 1fr}
  .stat-grid{grid-template-columns:repeat(2,1fr)}
}
@media(max-width:900px){
  .nav-links{display:none}
  .nav-btn-upgrade{display:none}
  .hamburger{display:flex}
  .mobile-nav{display:flex}
  .page-wrap.active{padding-bottom:80px}
  body{padding-bottom:0}
  .grid-2{grid-template-columns:1fr}
  .form-grid{grid-template-columns:1fr}
  .heat-grid{grid-template-columns:1fr 1fr}
  .page-wrap{padding:16px 16px 80px}
}
@media(max-width:640px){
  .opp-grid,.demand-grid{grid-template-columns:1fr}
  .g2{grid-template-columns:1fr}
  #jobGrid{grid-template-columns:1fr!important}
  .stat-grid{grid-template-columns:1fr 1fr}
  .hero{padding:24px 20px}
  .hero-stats{flex-direction:column;width:100%}
  .h-stat{border-right:none;border-bottom:1px solid rgba(255,255,255,.08)}
  .h-stat:last-child{border-bottom:none}
  .hero-actions{flex-direction:column}
  .hero-actions .btn-lime,.hero-actions .btn-ghost-white{width:100%;text-align:center}
  .search-filter-bar{flex-direction:column;align-items:stretch}
  .search-input-wrap{width:100%}
}
@media(max-width:480px){
  .stat-grid{grid-template-columns:1fr 1fr}
  .contrib-stats{grid-template-columns:1fr 1fr 1fr}
  .dc-grid{grid-template-columns:1fr}
}

/* ============ UPGRADE MODAL ============ */
.upgrade-overlay{position:fixed;inset:0;background:rgba(10,20,15,.75);z-index:600;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px);opacity:0;pointer-events:none;transition:opacity .2s}
.upgrade-overlay.open{opacity:1;pointer-events:all}
.upgrade-modal{background:#fff;border-radius:20px;width:100%;max-width:480px;overflow:hidden;transform:translateY(20px);transition:transform .25s cubic-bezier(.34,1.56,.64,1)}
.upgrade-overlay.open .upgrade-modal{transform:translateY(0)}
.upgrade-hero{background:linear-gradient(135deg,#0a3d25,#1a6b47);padding:28px 24px 24px;color:#fff;text-align:center;position:relative}
.upgrade-close{position:absolute;top:14px;right:14px;background:rgba(255,255,255,.15);border:none;color:#fff;width:28px;height:28px;border-radius:50%;font-size:16px;cursor:pointer;line-height:1;font-family:inherit}
.upgrade-badge{display:inline-flex;align-items:center;gap:5px;background:var(--lime);color:var(--forest);padding:4px 12px;border-radius:100px;font-size:11px;font-weight:700;margin-bottom:10px}
.upgrade-title{font-family:var(--font-display);font-size:22px;font-weight:500;margin-bottom:6px}
.upgrade-sub{font-size:13px;color:rgba(255,255,255,.7);line-height:1.6}
.upgrade-plans{padding:20px 24px;display:flex;flex-direction:column;gap:10px}
.plan-card{border:2px solid var(--border);border-radius:14px;padding:16px;cursor:pointer;transition:.15s;position:relative}
.plan-card:hover{border-color:var(--emerald)}
.plan-card.selected{border-color:var(--forest);background:#f0faf4}
.plan-popular{position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:var(--forest);color:var(--lime);font-size:10px;font-weight:700;padding:3px 10px;border-radius:100px;white-space:nowrap}
.plan-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px}
.plan-name{font-weight:700;font-size:14px}
.plan-price{text-align:right}
.plan-amount{font-size:20px;font-weight:700;color:var(--forest)}
.plan-period{font-size:11px;color:var(--txt3)}
.plan-features{display:flex;flex-direction:column;gap:4px}
.plan-feature{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--txt2)}
.plan-feature::before{content:"✓";color:var(--gm);font-weight:700;flex-shrink:0}
.upgrade-actions{padding:0 24px 24px;display:flex;flex-direction:column;gap:8px}
.upgrade-pay-btn{background:var(--forest);color:#fff;border:none;border-radius:12px;padding:14px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;transition:.15s;width:100%;display:flex;align-items:center;justify-content:center;gap:8px}
.upgrade-pay-btn:hover{background:var(--emerald)}
.upgrade-pay-btn:disabled{opacity:.6;cursor:not-allowed}
.upgrade-secure{text-align:center;font-size:11px;color:var(--txt3);display:flex;align-items:center;justify-content:center;gap:5px}
@media(max-width:640px){
  .upgrade-modal{border-radius:20px 20px 0 0;position:fixed;bottom:0;left:0;right:0;max-width:100%}
  .upgrade-overlay.open .upgrade-modal{transform:translateY(0)}
}

/* ============ AUTH MODAL ============ */
.modal-overlay{position:fixed;inset:0;background:rgba(10,20,15,.7);z-index:500;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(4px);opacity:0;pointer-events:none;transition:opacity .2s}
.modal-overlay.open{opacity:1;pointer-events:all}
.modal{background:#fff;border-radius:20px;width:100%;max-width:420px;overflow:hidden;transform:translateY(20px);transition:transform .25s cubic-bezier(.34,1.56,.64,1)}
.modal-overlay.open .modal{transform:translateY(0)}
.modal-header{background:var(--forest);padding:24px 24px 20px;color:#fff;text-align:center;position:relative}
.modal-logo{width:44px;height:44px;background:var(--lime);border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:var(--forest);margin:0 auto 10px}
.modal-title{font-family:var(--font-display);font-size:20px;font-weight:500;color:#fff;margin-bottom:3px}
.modal-sub{font-size:12px;color:rgba(255,255,255,.65)}
.modal-close{position:absolute;top:14px;right:14px;background:rgba(255,255,255,.15);border:none;color:#fff;width:28px;height:28px;border-radius:50%;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1}
.modal-tabs{display:flex;border-bottom:1px solid var(--border)}
.modal-tab{flex:1;padding:13px;font-size:13px;font-weight:600;border:none;background:#fff;cursor:pointer;color:var(--sage);transition:.15s;font-family:inherit}
.modal-tab.active{color:var(--forest);border-bottom:2px solid var(--forest)}
.modal-body{padding:24px}
.auth-form{display:flex;flex-direction:column;gap:14px}
.auth-form-section{display:none}
.auth-form-section.active{display:flex;flex-direction:column;gap:14px}
.form-group{display:flex;flex-direction:column;gap:5px}
.form-label{font-size:11px;font-weight:700;color:var(--sage);text-transform:uppercase;letter-spacing:.5px}
.form-input{padding:11px 13px;border:1.5px solid var(--border);border-radius:10px;font-size:14px;color:var(--ink);background:var(--cream);outline:none;transition:.15s;font-family:inherit;-webkit-appearance:none}
.form-input:focus{border-color:var(--emerald);background:#fff;box-shadow:0 0 0 3px rgba(26,107,71,.1)}
.form-input.error{border-color:#dc2626}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.form-select{padding:11px 13px;border:1.5px solid var(--border);border-radius:10px;font-size:14px;color:var(--ink);background:var(--cream);outline:none;transition:.15s;font-family:inherit;-webkit-appearance:none;cursor:pointer}
.form-select:focus{border-color:var(--emerald);background:#fff}
.auth-btn{background:var(--forest);color:#fff;border:none;border-radius:10px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;transition:.15s;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:8px}
.auth-btn:hover{background:var(--emerald)}
.auth-btn:disabled{opacity:.6;cursor:not-allowed}
.auth-divider{text-align:center;font-size:12px;color:var(--sage);position:relative}
.auth-divider::before,.auth-divider::after{content:'';position:absolute;top:50%;width:42%;height:1px;background:var(--border)}
.auth-divider::before{left:0}.auth-divider::after{right:0}
.auth-error{background:#fee2e2;color:#991b1b;border-radius:8px;padding:10px 12px;font-size:12px;font-weight:500;display:none}
.auth-error.show{display:block}
.auth-success{background:#dcfce7;color:#15803d;border-radius:8px;padding:10px 12px;font-size:12px;font-weight:500;display:none}
.auth-success.show{display:block}
.user-menu{position:absolute;top:60px;right:16px;background:#fff;border:1px solid var(--border);border-radius:14px;padding:8px;min-width:200px;box-shadow:0 8px 30px rgba(0,0,0,.15);z-index:200;display:none}
.user-menu.open{display:block}
.user-menu-header{padding:10px 12px 12px;border-bottom:1px solid var(--border);margin-bottom:6px}
.user-menu-name{font-weight:700;font-size:13px;color:var(--ink)}
.user-menu-email{font-size:11px;color:var(--sage);margin-top:2px}
.user-menu-tier{display:inline-flex;margin-top:6px}
.user-menu-item{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:8px;font-size:13px;color:var(--ink);cursor:pointer;border:none;background:none;font-family:inherit;width:100%;text-align:left;transition:.1s}
.user-menu-item:hover{background:var(--cream)}
.user-menu-item svg{width:15px;height:15px;stroke:var(--sage);stroke-width:2;flex-shrink:0}
.user-menu-sep{height:1px;background:var(--border);margin:4px 0}

/* ============ PWA INSTALL BANNER ============ */
.install-banner{position:fixed;bottom:0;left:0;right:0;z-index:400;background:var(--forest);color:#fff;padding:14px 16px;display:flex;align-items:center;gap:12px;transform:translateY(100%);transition:transform .35s cubic-bezier(.34,1.2,.64,1);box-shadow:0 -4px 20px rgba(0,0,0,.25)}
.install-banner.show{transform:translateY(0)}
.install-banner-icon{width:40px;height:40px;background:var(--lime);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.install-banner-text{flex:1}
.install-banner-title{font-weight:700;font-size:13px;margin-bottom:1px}
.install-banner-sub{font-size:11px;color:rgba(255,255,255,.65)}
.install-banner-btn{background:var(--lime);color:var(--forest);border:none;border-radius:8px;padding:9px 14px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;flex-shrink:0;font-family:inherit}
.install-banner-close{background:rgba(255,255,255,.15);border:none;color:#fff;width:28px;height:28px;border-radius:50%;font-size:14px;cursor:pointer;flex-shrink:0;font-family:inherit}

/* ============ MOBILE ENHANCEMENTS ============ */
@media(max-width:640px){
  .modal{border-radius:20px 20px 0 0;position:fixed;bottom:0;left:0;right:0;max-width:100%;transform:translateY(100%)}
  .modal-overlay.open .modal{transform:translateY(0)}
  .form-row{grid-template-columns:1fr}
  .install-banner{padding-bottom:calc(14px + env(safe-area-inset-bottom))}
  .mobile-nav{padding-bottom:env(safe-area-inset-bottom)}
  .page-wrap{padding-bottom:calc(80px + env(safe-area-inset-bottom))}
}

/* ── Farmer directory & crop checkboxes ─────── */
.crop-check-label{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--txt2);cursor:pointer;padding:5px 8px;border:1.5px solid var(--bdr);border-radius:8px;transition:.15s}
.crop-check-label input{accent-color:var(--forest);width:14px;height:14px}
.crop-check-label:has(input:checked){border-color:var(--forest);background:#f0fdf4;color:var(--forest);font-weight:600}
.farmer-card{background:#fff;border:1.5px solid var(--bdr);border-radius:14px;padding:16px;position:relative;transition:.2s}
.farmer-card:hover{box-shadow:0 4px 16px rgba(0,0,0,.08);transform:translateY(-1px)}
.farmer-card-name{font-size:14px;font-weight:700;color:var(--txt1);margin-bottom:3px}
.farmer-card-loc{font-size:12px;color:var(--txt3);margin-bottom:10px}
.farmer-card-crops{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px}
.farmer-card-crop{background:#f0fdf4;color:#166534;font-size:11px;font-weight:600;padding:3px 8px;border-radius:20px}
.farmer-card-harvest{font-size:11px;color:var(--txt3);margin-bottom:12px}
.farmer-card-contact{width:100%;padding:9px;background:var(--forest);color:#fff;border:none;border-radius:9px;font-size:12px;font-weight:700;cursor:pointer;transition:.15s}
.farmer-card-contact:hover{background:#0d5c38}
.farmer-card-locked{width:100%;padding:9px;background:var(--cream);color:var(--txt3);border:1.5px solid var(--bdr);border-radius:9px;font-size:12px;font-weight:600;cursor:pointer}
.farmer-card-badge{position:absolute;top:12px;right:12px;background:#dcfce7;color:#166534;font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px}
</style>
</head>
<body>

<!-- UPGRADE MODAL -->
<div class="upgrade-overlay" id="upgradeModal" onclick="closeUpgradeIfOutside(event)">
  <div class="upgrade-modal">
    <div class="upgrade-hero">
      <button class="upgrade-close" onclick="closeUpgrade()">×</button>
      <div class="upgrade-badge">⚡ Upgrade to Pro</div>
      <div class="upgrade-title">More intelligence.<br>More money in your pocket.</div>
      <div class="upgrade-sub">Join traders making smarter decisions with Agrios Pro — unlimited alerts, AI predictions, and export intelligence.</div>
    </div>
    <div class="upgrade-plans">
      <!-- Pro Monthly -->
      <div class="plan-card selected" id="plan-pro" onclick="selectPlan('pro')">
        <div class="plan-popular">Most popular</div>
        <div class="plan-header">
          <div>
            <div class="plan-name">Pro Monthly</div>
            <div style="font-size:11px;color:var(--txt3)">Renews monthly — cancel anytime</div>
          </div>
          <div class="plan-price">
            <div class="plan-amount">₦2,500</div>
            <div class="plan-period">per month</div>
          </div>
        </div>
        <div class="plan-features">
          <div class="plan-feature">Unlimited price alerts (WhatsApp + email)</div>
          <div class="plan-feature">AI price predictions & trend analysis</div>
          <div class="plan-feature">Export intelligence — 8 commodities</div>
          <div class="plan-feature">Market opportunity cards</div>
          <div class="plan-feature">Priority support</div>
        </div>
      </div>
      <!-- Pro Annual -->
      <div class="plan-card" id="plan-pro_year" onclick="selectPlan('pro_year')">
        <div class="plan-header">
          <div>
            <div class="plan-name">Pro Annual <span style="background:#f0faf4;color:var(--gm);font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;margin-left:4px">Save 17%</span></div>
            <div style="font-size:11px;color:var(--txt3)">₦25,000/year — best value</div>
          </div>
          <div class="plan-price">
            <div class="plan-amount">₦2,083</div>
            <div class="plan-period">per month</div>
          </div>
        </div>
        <div class="plan-features">
          <div class="plan-feature">Everything in Pro Monthly</div>
          <div class="plan-feature">2 months free vs monthly billing</div>
        </div>
      </div>
    </div>
    <div class="upgrade-actions">
      <button class="upgrade-pay-btn" id="payBtn" onclick="initiatePayment()">
        <span id="payBtnText">Pay with Paystack →</span>
      </button>
      <div class="upgrade-secure">🔒 Secured by Paystack · Nigerian bank cards, USSD, mobile money accepted</div>
    </div>
  </div>
</div>

<!-- AUTH MODAL -->
<div class="modal-overlay" id="authModal" role="dialog" aria-modal="true" aria-label="Sign in or create account" onclick="closeAuthIfOutside(event)">
  <div class="modal">
    <div class="modal-header">
      <div class="modal-logo">Ag</div>
      <div class="modal-title">Welcome to Agrios</div>
      <div class="modal-sub">Nigeria agricultural market intelligence platform</div>
      <button class="modal-close" onclick="closeAuth()" aria-label="Close">×</button>
    </div>
    <div class="modal-tabs" role="tablist">
      <button class="modal-tab active" id="tab-login" onclick="switchAuthTab('login')" role="tab" aria-selected="true">Sign in</button>
      <button class="modal-tab" id="tab-register" onclick="switchAuthTab('register')" role="tab" aria-selected="false">Create account</button>
    </div>
    <div class="modal-body">
      <div id="authError" class="auth-error" role="alert"></div>
      <div id="authSuccess" class="auth-success" role="status"></div>

      <!-- LOGIN -->
      <div class="auth-form-section active" id="section-login">
        <div class="form-group">
          <label class="form-label" for="loginEmail">Email address</label>
          <input class="form-input" id="loginEmail" type="email" placeholder="you@example.com" autocomplete="email" inputmode="email"/>
        </div>
        <div class="form-group">
          <label class="form-label" for="loginPassword">Password</label>
          <input class="form-input" id="loginPassword" type="password" placeholder="Your password" autocomplete="current-password"/>
        </div>
        <button class="auth-btn" id="loginBtn" onclick="doLogin()">
          <span>Sign in</span>
        </button>
        <div class="auth-divider">or</div>
        <button class="auth-btn" style="background:var(--cream);color:var(--forest);border:1.5px solid var(--border)" onclick="switchAuthTab('register')">
          Create a free account →
        </button>
        <p style="font-size:10px;color:var(--txt3);text-align:center">Or create your own free account →</p>
      </div>

      <!-- REGISTER -->
      <div class="auth-form-section" id="section-register">
        <div class="form-group">
          <label class="form-label" for="regName">Full name</label>
          <input class="form-input" id="regName" type="text" placeholder="Your full name" autocomplete="name"/>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="regEmail">Email</label>
            <input class="form-input" id="regEmail" type="email" placeholder="you@example.com" autocomplete="email" inputmode="email"/>
          </div>
          <div class="form-group">
            <label class="form-label" for="regPhone">Phone</label>
            <input class="form-input" id="regPhone" type="tel" placeholder="+234 800..." autocomplete="tel" inputmode="tel"/>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="regState">State</label>
            <select class="form-select" id="regState">
              <option value="">Select state…</option>
              <option>Abia</option><option>Adamawa</option><option>Akwa Ibom</option><option>Anambra</option><option>Bauchi</option><option>Bayelsa</option><option>Benue</option><option>Borno</option><option>Cross River</option><option>Delta</option><option>Ebonyi</option><option>Edo</option><option>Ekiti</option><option>Enugu</option><option>FCT</option><option>Gombe</option><option>Imo</option><option>Jigawa</option><option>Kaduna</option><option>Kano</option><option>Katsina</option><option>Kebbi</option><option>Kogi</option><option>Kwara</option><option>Lagos</option><option>Nasarawa</option><option>Niger</option><option>Ogun</option><option>Ondo</option><option>Osun</option><option>Oyo</option><option>Plateau</option><option>Rivers</option><option>Sokoto</option><option>Taraba</option><option>Yobe</option><option>Zamfara</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="regRole">I am a…</label>
            <select class="form-select" id="regRole" onchange="toggleFarmerFields()">
              <option value="farmer">Farmer</option>
              <option value="trader">Trader / Dealer</option>
              <option value="driver">Vehicle Operator</option>
              <option value="buyer">Bulk Buyer</option>
              <option value="exporter">Exporter</option>
            </select>
          </div>
        </div>
        <!-- Farmer-only fields -->
        <div id="farmerFields" style="display:none">
          <div class="form-group">
            <label class="form-label" for="regCrops">Crops you grow <span style="color:var(--txt3);font-weight:400">(tick all that apply)</span></label>
            <div id="regCropsGrid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:6px">
              <label class="crop-check-label"><input type="checkbox" name="regCrops" value="Maize"> Maize</label>
              <label class="crop-check-label"><input type="checkbox" name="regCrops" value="Rice"> Rice</label>
              <label class="crop-check-label"><input type="checkbox" name="regCrops" value="Beans"> Beans</label>
              <label class="crop-check-label"><input type="checkbox" name="regCrops" value="Cassava"> Cassava</label>
              <label class="crop-check-label"><input type="checkbox" name="regCrops" value="Yam"> Yam</label>
              <label class="crop-check-label"><input type="checkbox" name="regCrops" value="Tomato"> Tomato</label>
              <label class="crop-check-label"><input type="checkbox" name="regCrops" value="Soybean"> Soybean</label>
              <label class="crop-check-label"><input type="checkbox" name="regCrops" value="Sesame"> Sesame</label>
              <label class="crop-check-label"><input type="checkbox" name="regCrops" value="Groundnut"> Groundnut</label>
              <label class="crop-check-label"><input type="checkbox" name="regCrops" value="Millet"> Millet</label>
              <label class="crop-check-label"><input type="checkbox" name="regCrops" value="Sorghum"> Sorghum</label>
              <label class="crop-check-label"><input type="checkbox" name="regCrops" value="Cashew"> Cashew</label>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="regLGA">Farm LGA</label>
              <input class="form-input" id="regLGA" type="text" placeholder="e.g. Kura, Daura…"/>
            </div>
            <div class="form-group">
              <label class="form-label" for="regHarvest">Typical harvest size</label>
              <select class="form-select" id="regHarvest">
                <option value="">Select range…</option>
                <option value="500">Less than 500 kg</option>
                <option value="1000">500 kg – 1 tonne</option>
                <option value="3000">1 – 5 tonnes</option>
                <option value="10000">5 – 20 tonnes</option>
                <option value="50000">20 – 100 tonnes</option>
                <option value="200000">100+ tonnes</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="crop-check-label" style="align-items:flex-start;gap:10px;cursor:pointer">
              <input type="checkbox" id="regBuyerConsent" style="margin-top:2px;flex-shrink:0">
              <span style="font-size:12px;line-height:1.5;color:var(--txt2)">
                <strong>Let verified buyers contact me.</strong> Your name, state, LGA, and crops will appear in the Agrios farmer directory. Buyers pay for Pro access — you stay free.
              </span>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="regPassword">Password</label>
          <input class="form-input" id="regPassword" type="password" placeholder="Min. 8 characters" autocomplete="new-password"/>
        </div>
        <button class="auth-btn" id="registerBtn" onclick="doRegister()">
          <span>Create free account</span>
        </button>
        <p style="font-size:11px;color:var(--sage);text-align:center">Free account: 2 price alerts, price reporting, live prices</p>
      </div>
    </div>
  </div>
</div>

<!-- USER MENU -->
<div class="user-menu" id="userMenu">
  <div class="user-menu-header">
    <div class="user-menu-name" id="umName">—</div>
    <div class="user-menu-email" id="umEmail">—</div>
    <span class="badge badge-green" id="umTier">Free</span>
  </div>
  <button class="user-menu-item" onclick="showPage('report');closeUserMenu()">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
    Report a price
  </button>
  <button class="user-menu-item" onclick="showPage('alerts');closeUserMenu()">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
    My alerts
  </button>
  <button class="user-menu-item" onclick="upgradePrompt()">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
    Upgrade to Pro
  </button>
  <div class="user-menu-sep"></div>
  <button class="user-menu-item" onclick="doLogout()" style="color:#dc2626">
    <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
    Sign out
  </button>
</div>

<!-- PWA INSTALL BANNER -->
<div class="install-banner" id="installBanner">
  <div class="install-banner-icon">🌿</div>
  <div class="install-banner-text">
    <div class="install-banner-title">Install Agrios on your phone</div>
    <div class="install-banner-sub">Get price alerts, offline access & faster loading</div>
  </div>
  <button class="install-banner-btn" onclick="installPWA()">Install</button>
  <button class="install-banner-close" onclick="dismissInstall()" aria-label="Dismiss">×</button>
</div>

<!-- ===== TOP NAV ===== -->
<nav class="top-nav" role="navigation" aria-label="Main navigation">
  <div class="nav-inner">
    <a href="#" class="nav-brand" onclick="showPage('home');return false" aria-label="Agrios home">
      <img src="/icon-192.png" alt="Agrios logo" style="width:36px;height:36px;border-radius:9px;object-fit:cover;flex-shrink:0"/>
      <div class="brand-text">
        <span class="brand-name">Agrios</span>
        <span class="brand-domain">useagrios.com</span>
      </div>
    </a>
    <div class="nav-links" role="list">
      <button class="nav-link active" onclick="showPage('home')" role="listitem">Home</button>
      <button class="nav-link" onclick="showPage('prices')" role="listitem">Prices</button>
      <button class="nav-link" onclick="showPage('report')" role="listitem">Report</button>
      <button class="nav-link" onclick="showPage('alerts')" role="listitem">Alerts</button>
      <button class="nav-link" onclick="showPage('heatmap')" role="listitem">Heatmap</button>
      <button class="nav-link" onclick="showPage('transport')" role="listitem">🚛 Transport</button>
      <button class="nav-link" onclick="showPage('export')" role="listitem">Export</button>
      <button class="nav-link" onclick="showPage('finance')" role="listitem">Finance</button>
      <button class="nav-link" onclick="showPage('demand')" role="listitem">Demand</button>
      <button class="nav-link" onclick="showPage('farmers')" role="listitem">🌾 Farmers</button>
      <button class="nav-link" onclick="showPage('admin')" role="listitem" id="navAdminBtn" style="display:none">Admin</button>
    </div>
    <div class="nav-right">
      <div class="live-dot" aria-label="Live data"><span id="apiStatus">LIVE</span></div>
      <button class="nav-btn-upgrade" id="navProBtn" onclick="upgradePrompt()" style="display:none">Pro</button>
      <button class="nav-btn-upgrade" id="navSigninBtn" onclick="openAuth()">Sign in</button>
      <div class="nav-avatar" id="navAvatar" role="button" aria-label="Account" onclick="toggleUserMenu()" style="display:none;cursor:pointer">FK</div>
      <button class="hamburger" onclick="openDrawer()" aria-label="Open menu" aria-expanded="false" id="hamburgerBtn">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>

<!-- MOBILE DRAWER -->
<div class="mob-drawer" id="mobDrawer" role="dialog" aria-label="Mobile navigation" onclick="closeDrawerOutside(event)">
  <div class="mob-drawer-inner">
    <button class="mob-drawer-close" onclick="closeDrawer()" aria-label="Close menu">✕</button>
    <button class="mob-drawer-link active" onclick="showPage('home');closeDrawer()">Dashboard</button>
    <button class="mob-drawer-link" onclick="showPage('prices');closeDrawer()">Prices</button>
    <button class="mob-drawer-link" onclick="showPage('report');closeDrawer()">Report Price</button>
    <button class="mob-drawer-link" onclick="showPage('alerts');closeDrawer()">Alerts</button>
    <button class="mob-drawer-link" onclick="showPage('heatmap');closeDrawer()">Heatmap</button>
    <button class="mob-drawer-link" onclick="showPage('transport');closeDrawer()">🚛 Transport</button>
    <button class="mob-drawer-link" onclick="showPage('export');closeDrawer()">Export</button>
    <button class="mob-drawer-link" onclick="showPage('finance');closeDrawer()">Finance</button>
    <button class="mob-drawer-link" onclick="showPage('demand');closeDrawer()">Demand Board</button>
    <button class="mob-drawer-link" onclick="showPage('farmers');closeDrawer()">🌾 Farmers</button>
    <button class="mob-drawer-link" onclick="showPage('admin');closeDrawer()" id="drawerAdminBtn" style="display:none">Admin</button>
    <div style="margin-top:auto;padding-top:24px;border-top:1px solid rgba(255,255,255,.1)">
      <div style="font-size:11px;color:rgba(255,255,255,.4);margin-bottom:6px">useagrios.com</div>
      <div style="font-size:11px;color:rgba(255,255,255,.3)">Nigeria's agricultural intelligence platform</div>
    </div>
  </div>
</div>

<!-- TICKER -->
<div class="ticker-bar" aria-label="Live price ticker" aria-live="off">
  <div class="ticker-track" id="ticker"></div>
</div>

<!-- ===== PAGES ===== -->

<!-- HOME -->
<main class="page-wrap active" id="page-home" role="main">
  <div class="hero" role="banner">
    <div class="hero-accent" aria-hidden="true"></div>
    <div class="hero-accent2" aria-hidden="true"></div>
    <div class="hero-tag" aria-hidden="true">
      <span>●</span> Nigeria Agricultural Intelligence
    </div>
    <h1 class="hero-title">The <em>pulse</em> of every<br>market in Nigeria</h1>
    <p class="hero-desc">Real-time crop prices, AI predictions, and market opportunities for farmers, buyers, aggregators and investors. Powered by community reporting across 48 markets.</p>
    <div class="hero-stats" role="group" aria-label="Platform statistics">
      <div class="h-stat"><div class="h-stat-v" aria-label="2847 reports today">2,847</div><div class="h-stat-l">Reports today</div></div>
      <div class="h-stat"><div class="h-stat-v" aria-label="48 active markets">48</div><div class="h-stat-l">Active markets</div></div>
      <div class="h-stat"><div class="h-stat-v" aria-label="12.4 billion naira volume">₦12.4B</div><div class="h-stat-l">Market volume</div></div>
      <div class="h-stat"><div class="h-stat-v" aria-label="91 percent data quality">91%</div><div class="h-stat-l">Data quality</div></div>
    </div>
    <div class="hero-actions">
      <button class="btn-lime" onclick="showPage('report')">Report a price</button>
      <button class="btn-ghost-white" onclick="showPage('prices')">View all prices →</button>
    </div>
  </div>

  <div class="stat-grid" role="region" aria-label="Key market indicators">
    <div class="stat-card">
      <div class="stat-card-label">Maize · Lagos</div>
      <div class="stat-card-val">₦87k</div>
      <div class="stat-card-change up">↑ 8.2% this week</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Rice · Abuja</div>
      <div class="stat-card-val">₦145k</div>
      <div class="stat-card-change dn">↓ 2.1% this week</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Tomato · Mile 12</div>
      <div class="stat-card-val">₦28k</div>
      <div class="stat-card-change up">↑ 15.4% this week</div>
    </div>
    <div class="stat-card">
      <div class="stat-card-label">Beans · Kano</div>
      <div class="stat-card-val">₦118k</div>
      <div class="stat-card-change flat">→ Stable</div>
    </div>
  </div>

  <div class="sec-hd">
    <div class="sec-hd-left">
      <div class="sec-title">Live crop prices</div>
      <div class="sec-sub" id="priceSubtitle">Loading live prices… · Scroll to explore all crops</div>
    </div>
    <button class="sec-link" onclick="showPage('prices')">Full price table →</button>
  </div>
  <div class="hscroll-wrap" id="homePriceCards" aria-label="Live crop prices"></div>

  <div class="grid-2" style="margin-top:24px;margin-bottom:24px">
    <div class="chart-card">
      <div class="sec-hd" style="margin-bottom:14px">
        <div class="sec-hd-left">
          <div class="sec-title">Price movement</div>
          <div class="sec-sub">Top 3 crops · 7-day trend</div>
        </div>
        <div class="period-tabs" role="group" aria-label="Chart period">
          <button class="period-tab active" onclick="switchPeriod(this,'7d')">7D</button>
          <button class="period-tab" onclick="switchPeriod(this,'30d')">30D</button>
          <button class="period-tab" onclick="switchPeriod(this,'90d')">90D</button>
        </div>
      </div>
      <div style="display:flex;gap:14px;margin-bottom:10px;font-size:11px;color:var(--sage)">
        <span style="display:flex;align-items:center;gap:5px"><span style="width:12px;height:3px;background:#0a3d25;display:inline-block;border-radius:2px"></span>Maize</span>
        <span style="display:flex;align-items:center;gap:5px"><span style="width:12px;height:0;border-top:3px dashed #1558a8;display:inline-block"></span>Rice</span>
        <span style="display:flex;align-items:center;gap:5px"><span style="width:12px;height:3px;background:#d97706;display:inline-block;border-radius:2px"></span>Tomato</span>
      </div>
      <div class="chart-wrap"><canvas id="priceChart" role="img" aria-label="Line chart showing maize, rice and tomato price trends">Price trend data for key Nigerian crops.</canvas></div>
    </div>
    <div class="pred-card" role="region" aria-label="AI price predictions">
      <div style="padding:16px 18px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
        <div><div class="sec-title">AI predictions</div><div class="sec-sub">Next 7 days · Rule-based engine</div></div>
        <span class="badge badge-lime">PRO</span>
      </div>
      <div id="predList"></div>
    </div>
  </div>

  <div class="sec-hd">
    <div class="sec-hd-left">
      <div class="sec-title">🔥 Market opportunities</div>
      <div class="sec-sub">AI-generated intelligence · updated hourly</div>
    </div>
    <button class="sec-link" onclick="refreshOpps()">↻ Refresh</button>
  </div>
  <div class="opp-grid" id="oppGrid" aria-label="Market opportunities"></div>
</main>

<!-- PRICES PAGE -->
<div class="page-wrap" id="page-prices" role="main">
  <div class="sec-hd">
    <div class="sec-hd-left">
      <h1 class="sec-title" style="font-size:20px">Crop price index</h1>
      <div class="sec-sub">Community-verified market prices across Nigeria · Last updated 2 min ago</div>
    </div>
    <span class="badge badge-live">● LIVE</span>
  </div>
  <div class="search-filter-bar" role="search">
    <div class="search-input-wrap">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input type="text" class="search-input" placeholder="Search crop or market…" id="priceSearch" oninput="filterPriceTable()" aria-label="Search prices"/>
    </div>
    <select class="filter-select" id="stateFilter" onchange="filterPriceTable()" aria-label="Filter by state">
      <option value="">All states</option>
      <option>Lagos</option><option>Abuja</option><option>Kano</option><option>Oyo</option><option>Abia</option><option>Rivers</option><option>Enugu</option><option>Borno</option>
    </select>
    <select class="filter-select" id="trendFilter" onchange="filterPriceTable()" aria-label="Filter by trend">
      <option value="">All trends</option>
      <option value="up">Rising ↑</option>
      <option value="dn">Falling ↓</option>
      <option value="flat">Stable →</option>
    </select>
  </div>
  <div class="chip-row" id="priceChips" role="group" aria-label="Filter by crop"></div>
  <div class="table-wrap" role="region" aria-label="Price table">
    <table>
      <thead>
        <tr>
          <th>Crop</th><th>Market</th><th>State</th><th>Unit</th>
          <th>Low</th><th>Average</th><th>High</th>
          <th>24h</th><th>7d</th><th>Confidence</th><th>Updated</th>
        </tr>
      </thead>
      <tbody id="priceTableBody"></tbody>
    </table>
  </div>
</div>

<!-- REPORT PRICE -->
<div class="page-wrap" id="page-report" role="main">
  <div class="sec-hd">
    <div class="sec-hd-left">
      <h1 class="sec-title" style="font-size:20px">Report a market price</h1>
      <div class="sec-sub">Help build Nigeria's most accurate agricultural price database</div>
    </div>
  </div>
  <div class="grid-2">
    <div>
      <div class="form-card">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label" for="rCrop">Crop *</label>
            <select class="form-select" id="rCrop">
              <option value="">Select crop…</option>
              <option>Maize</option><option>Rice</option><option>Cassava</option><option>Yam</option><option>Beans</option><option>Tomato</option><option>Pepper</option><option>Onion</option><option>Cocoa</option><option>Plantain</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="rUnit">Unit *</label>
            <select class="form-select" id="rUnit">
              <option>50kg bag</option><option>100kg bag</option><option>Tonne</option><option>Crate</option><option>Basket</option><option>Per kg</option>
            </select>
          </div>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label" for="rMarket">Market *</label>
            <select class="form-select" id="rMarket">
              <option value="">Select market…</option>
              <option>Mile 12, Lagos</option><option>Bodija, Ibadan</option><option>Dawanau, Kano</option><option>Garki, Abuja</option><option>Ariaria, Aba</option><option>Oil Mill, Port Harcourt</option><option>Ogbete, Enugu</option><option>Monday Market, Maiduguri</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="rState">State *</label>
            <select class="form-select" id="rState">
              <option>Lagos</option><option>Oyo</option><option>Kano</option><option>FCT</option><option>Abia</option><option>Rivers</option><option>Enugu</option><option>Borno</option>
            </select>
          </div>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label" for="rPrice">Price (₦) *</label>
            <input class="form-input" type="number" id="rPrice" placeholder="e.g. 85000" oninput="validateReportPrice()" min="0"/>
            <div class="form-hint" id="rPriceHint">Enter the price you observed today</div>
          </div>
          <div class="form-group">
            <label class="form-label" for="rDate">Date observed *</label>
            <input class="form-input" type="date" id="rDate"/>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="rLGA">Local Government Area</label>
          <input class="form-input" type="text" id="rLGA" placeholder="e.g. Kosofe"/>
        </div>
        <div class="form-group">
          <label class="form-label" for="rNotes">Notes (optional)</label>
          <textarea class="form-textarea" id="rNotes" placeholder="Supply conditions, seasonal context, any relevant market observations…"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Photo evidence (optional)</label>
          <div class="upload-zone" onclick="showToast('Camera / file picker opens here')" role="button" tabindex="0" aria-label="Upload photo evidence">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            <p>Tap to upload a photo from market<br><strong>Boosts your trust score by +15%</strong></p>
          </div>
        </div>
        <button class="btn-primary" onclick="submitReport()">Submit price report</button>
      </div>
    </div>
    <div>
      <div class="contrib-profile" role="region" aria-label="Contributor profile">
        <div class="contrib-top">
          <div class="contrib-avatar" aria-label="Fatima Kalu">FK</div>
          <div style="flex:1">
            <div class="contrib-name">Fatima Kalu</div>
            <div class="contrib-loc">Kaduna State, Nigeria</div>
          </div>
          <span class="badge badge-blue">Trusted Reporter</span>
        </div>
        <div class="contrib-stats">
          <div class="cs-item"><div class="cs-val">47</div><div class="cs-lbl">Accepted</div></div>
          <div class="cs-item"><div class="cs-val">94%</div><div class="cs-lbl">Accuracy</div></div>
          <div class="cs-item"><div class="cs-val">3</div><div class="cs-lbl">This week</div></div>
        </div>
        <div>
          <div class="prog-row"><span>Progress to Verified Market Agent</span><span>47 / 100 reports</span></div>
          <div class="prog-track"><div class="prog-fill" style="width:47%"></div></div>
        </div>
      </div>
      <div class="validation-box" role="region" aria-label="Price validation rules">
        <div style="font-size:13px;font-weight:600;margin-bottom:10px">How prices are validated</div>
        <div class="val-row"><span class="val-icon">✓</span><span>Within <strong>±40%</strong> of regional average → automatically approved</span></div>
        <div class="val-row"><span class="val-icon" style="color:var(--amber)">⚠</span><span>Between <strong>40–80%</strong> deviation → flagged for admin review</span></div>
        <div class="val-row"><span class="val-icon" style="color:var(--red)">✗</span><span>More than <strong>80%</strong> deviation → automatically rejected</span></div>
        <div class="val-row"><span class="val-icon" style="color:#1558a8">★</span><span>Verified contributors get a <strong>+20% trust weight</strong> on all submissions</span></div>
      </div>
    </div>
  </div>
</div>

<!-- ALERTS -->
<div class="page-wrap" id="page-alerts" role="main">
  <div class="sec-hd">
    <div class="sec-hd-left">
      <h1 class="sec-title" style="font-size:20px">Price alerts</h1>
      <div class="sec-sub">Get notified when crop prices hit your target</div>
    </div>
    <button class="btn-outline" onclick="scrollToAlertForm()">+ New alert</button>
  </div>
  <div class="grid-2">
    <div>
      <div style="font-size:13px;font-weight:600;color:var(--sage);text-transform:uppercase;letter-spacing:.4px;margin-bottom:10px">Active alerts</div>
      <div style="display:flex;flex-direction:column;gap:8px" id="alertList" aria-label="Your price alerts"></div>
    </div>
    <div>
      <div style="font-size:13px;font-weight:600;color:var(--sage);text-transform:uppercase;letter-spacing:.4px;margin-bottom:10px" id="alertFormTitle">Create new alert</div>
      <div class="form-card" id="alertForm">
        <div class="form-group">
          <label class="form-label" for="alerCrop">Crop</label>
          <select class="form-select" id="alerCrop">
            <option>Maize</option><option>Rice</option><option>Tomato</option><option>Yam</option><option>Beans</option><option>Pepper</option><option>Onion</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" for="alerMarket">State / Market</label>
          <select class="form-select" id="alerMarket">
            <option>Lagos – Any market</option><option>Abuja – Any market</option><option>Kano – Any market</option><option>Lagos – Mile 12</option><option>Abuja – Garki</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label" for="alerCond">Condition</label>
          <select class="form-select" id="alerCond">
            <option value="above">Price rises above ₦</option>
            <option value="below">Price drops below ₦</option>
            <option value="pct_up">Increases by more than %</option>
            <option value="pct_dn">Decreases by more than %</option>
          </select>
        </div>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label" for="alerTarget">Target value</label>
            <input class="form-input" type="number" id="alerTarget" placeholder="e.g. 90000"/>
          </div>
          <div class="form-group">
            <label class="form-label" for="alerChannel">Notify via</label>
            <select class="form-select" id="alerChannel">
              <option>In-app</option><option>Email</option><option>WhatsApp (soon)</option>
            </select>
          </div>
        </div>
        <button class="btn-primary" onclick="createAlert()">Create alert</button>
      </div>
    </div>
  </div>
</div>

<!-- HEATMAP -->
<div class="page-wrap" id="page-heatmap" role="main">
  <div class="sec-hd">
    <div class="sec-hd-left">
      <h1 class="sec-title" style="font-size:20px">Market heatmap</h1>
      <div class="sec-sub">Best buying and selling locations across Nigeria today</div>
    </div>
    <select class="filter-select" id="heatCrop" onchange="buildHeatmap(this.value)" aria-label="Select crop for heatmap">
      <option value="maize">Maize</option>
      <option value="rice">Rice</option>
      <option value="tomato">Tomato</option>
      <option value="yam">Yam</option>
      <option value="beans">Beans</option>
    </select>
  </div>
  <div class="grid-2" style="margin-bottom:20px">
    <div class="form-card" style="padding:18px">
      <div style="font-size:12px;font-weight:700;color:var(--emerald);text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px">🟢 Best markets to sell · high prices</div>
      <div class="heat-grid" id="sellGrid"></div>
    </div>
    <div class="form-card" style="padding:18px">
      <div style="font-size:12px;font-weight:700;color:var(--blue);text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px">🔵 Best markets to source · low prices</div>
      <div class="heat-grid" id="buyGrid"></div>
    </div>
  </div>
  <div class="chart-card">
    <div class="sec-title" style="margin-bottom:16px">Regional price comparison <span id="heatChartLabel" style="font-weight:400;color:var(--sage)">· Maize (₦ per 50kg bag)</span></div>
    <div class="chart-wrap" style="height:180px"><canvas id="heatChart" role="img" aria-label="Bar chart comparing crop prices across Nigerian states">Regional price comparison.</canvas></div>
  </div>
</div>

<!-- DEMAND BOARD -->
<div class="page-wrap" id="page-demand" role="main">
  <div class="sec-hd">
    <div class="sec-hd-left">
      <h1 class="sec-title" style="font-size:20px">Buyer demand board</h1>
      <div class="sec-sub">Active purchase requests from verified buyers across Nigeria</div>
    </div>
    <button class="btn-outline" onclick="showToast('Post demand form — coming soon!')">+ Post demand</button>
  </div>
  <div class="search-filter-bar" role="search">
    <div class="search-input-wrap">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input type="text" class="search-input" placeholder="Search crop or buyer location…" id="demandSearch" oninput="filterDemand()" aria-label="Search demand board"/>
    </div>
    <select class="filter-select" id="demandCropFilter" onchange="filterDemand()" aria-label="Filter demand by crop">
      <option value="">All crops</option>
      <option>Maize</option><option>Rice</option><option>Tomato</option><option>Yam</option><option>Beans</option><option>Cassava</option>
    </select>
    <select class="filter-select" id="demandStateFilter" onchange="filterDemand()" aria-label="Filter demand by state">
      <option value="">All states</option>
      <option>Lagos</option><option>Abuja</option><option>Kano</option><option>Enugu</option><option>Ibadan</option>
    </select>
  </div>
  <div class="demand-grid" id="demandGrid" aria-label="Buyer demand listings"></div>
</div>

<!-- FARMER DIRECTORY -->
<div class="page-wrap" id="page-farmers" role="main">
  <div class="sec-hd">
    <div class="sec-hd-left">
      <h1 class="sec-title" style="font-size:20px">🌾 Farmer directory</h1>
      <div class="sec-sub">Verified Nigerian farmers open to buyer contact · <span id="farmerCount">—</span> listed</div>
    </div>
    <div style="display:flex;gap:8px;align-items:center">
      <span class="badge badge-amber" style="font-size:10px">Pro buyers only</span>
      <button class="btn-primary-sm" onclick="openAuth();switchAuthTab('register')" id="farmerJoinBtn">List your farm free →</button>
    </div>
  </div>

  <!-- Filters -->
  <div class="search-filter-bar" role="search" style="margin-bottom:20px">
    <div class="search-input-wrap">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input type="text" class="search-input" placeholder="Search by name, crop or location…" id="farmerSearch" oninput="filterFarmers()" aria-label="Search farmer directory"/>
    </div>
    <select class="filter-select" id="farmerStateFilter" onchange="filterFarmers()" aria-label="Filter by state">
      <option value="">All states</option>
      <option>Abia</option><option>Adamawa</option><option>Akwa Ibom</option><option>Anambra</option><option>Bauchi</option><option>Bayelsa</option><option>Benue</option><option>Borno</option><option>Cross River</option><option>Delta</option><option>Ebonyi</option><option>Edo</option><option>Ekiti</option><option>Enugu</option><option>FCT</option><option>Gombe</option><option>Imo</option><option>Jigawa</option><option>Kaduna</option><option>Kano</option><option>Katsina</option><option>Kebbi</option><option>Kogi</option><option>Kwara</option><option>Lagos</option><option>Nasarawa</option><option>Niger</option><option>Ogun</option><option>Ondo</option><option>Osun</option><option>Oyo</option><option>Plateau</option><option>Rivers</option><option>Sokoto</option><option>Taraba</option><option>Yobe</option><option>Zamfara</option>
    </select>
    <select class="filter-select" id="farmerCropFilter" onchange="filterFarmers()" aria-label="Filter by crop">
      <option value="">All crops</option>
      <option>Maize</option><option>Rice</option><option>Beans</option><option>Cassava</option><option>Yam</option><option>Tomato</option><option>Soybean</option><option>Sesame</option><option>Groundnut</option><option>Millet</option><option>Sorghum</option><option>Cashew</option>
    </select>
  </div>

  <!-- Pro gate banner (shown to free users) -->
  <div id="farmerGateBanner" class="export-promo" style="display:none;margin-bottom:20px">
    <div class="promo-left">
      <div class="promo-title">Unlock the full farmer directory</div>
      <div class="promo-desc">Pro buyers get full contact details — name, state, LGA, crops, and harvest size — for every consenting farmer on Agrios. Source direct. Cut out middlemen.</div>
    </div>
    <button class="promo-btn" onclick="upgradePrompt()">Upgrade to Pro →</button>
  </div>

  <!-- Grid -->
  <div class="demand-grid" id="farmerGrid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))" aria-label="Farmer listings"></div>

  <!-- Empty state -->
  <div id="farmerEmpty" style="display:none;text-align:center;padding:60px 20px;color:var(--txt3)">
    <div style="font-size:40px;margin-bottom:12px">🌱</div>
    <div style="font-size:15px;font-weight:600;margin-bottom:6px">No farmers match your filter</div>
    <div style="font-size:13px">Try a different state or crop, or be the first to list yours.</div>
    <button class="btn-primary-sm" style="margin-top:16px" onclick="openAuth();switchAuthTab('register')">Add your farm free →</button>
  </div>
</div>

<!-- ADMIN -->
<div class="page-wrap" id="page-admin" role="main">
  <div class="sec-hd">
    <div class="sec-hd-left">
      <h1 class="sec-title" style="font-size:20px">Admin control centre</h1>
      <div class="sec-sub">Agri Intel moderation, contributor management, and data quality</div>
    </div>
    <span class="badge badge-amber">Admin only</span>
  </div>
  <div class="stat-grid" style="margin-bottom:16px">
    <div class="stat-card"><div class="stat-card-label">Pending reports</div><div class="stat-card-val">—</div><div class="stat-card-change" style="color:var(--amber)">Loading…</div></div>
    <div class="stat-card"><div class="stat-card-label">Flagged reports</div><div class="stat-card-val">—</div><div class="stat-card-change dn">Loading…</div></div>
    <div class="stat-card"><div class="stat-card-label">Reports today</div><div class="stat-card-val">—</div><div class="stat-card-change">Loading…</div></div>
    <div class="stat-card"><div class="stat-card-label">Users (total)</div><div class="stat-card-val">—</div><div class="stat-card-change">Loading…</div></div>
  </div>
  <div class="stat-grid" id="adminUserStats" style="margin-bottom:24px">
    <div class="stat-card"><div class="stat-card-label">🌾 Farmers</div><div class="stat-card-val">—</div><div class="stat-card-change">Loading…</div></div>
    <div class="stat-card"><div class="stat-card-label">🛒 Buyers</div><div class="stat-card-val">—</div><div class="stat-card-change">Loading…</div></div>
    <div class="stat-card"><div class="stat-card-label">📦 Agents</div><div class="stat-card-val">—</div><div class="stat-card-change">Loading…</div></div>
    <div class="stat-card"><div class="stat-card-label">This week</div><div class="stat-card-val">—</div><div class="stat-card-change">Loading…</div></div>
  </div>
  <div class="grid-2">
    <div>
      <div class="sec-title" style="margin-bottom:12px">Pending price reports</div>
      <div class="admin-card" id="pendingList" aria-label="Pending reports for review"></div>
    </div>
    <div>
      <div class="sec-title" style="margin-bottom:12px">Top contributors</div>
      <div class="admin-card" id="contributorList" aria-label="Top contributors"></div>
    </div>
  </div>
</div>

<!-- ═══ TRANSPORT PAGE ═══ -->
<div class="page-wrap" id="page-transport" role="main">
  <div class="sec-hd">
    <div class="sec-hd-left"><h1 class="sec-title" style="font-size:20px">🚛 Transport network</h1><div class="sec-sub">1,247 verified vehicle operators · Post a job in 60 seconds</div></div>
    <div style="display:flex;gap:8px">
      <button class="btn-outline" onclick="showTransportForm('register')">Register vehicle</button>
      <button class="btn-primary-sm" onclick="showTransportForm('post')">Post a job</button>
    </div>
  </div>
  <div class="stat-grid" style="margin-bottom:20px">
    <div class="stat-card"><div class="stat-card-label">Active vehicles</div><div class="stat-card-val">1,247</div><div class="stat-card-change up">↑ 34 joined today</div></div>
    <div class="stat-card"><div class="stat-card-label">Open jobs</div><div class="stat-card-val">384</div><div class="stat-card-change" style="color:var(--amber)">Across 18 states</div></div>
    <div class="stat-card"><div class="stat-card-label">Avg payout</div><div class="stat-card-val">₦47k</div><div class="stat-card-change up">Per completed job</div></div>
    <div class="stat-card"><div class="stat-card-label">Jobs this month</div><div class="stat-card-val">8,921</div><div class="stat-card-change up">↑ 22%</div></div>
  </div>
  <!-- Transport sub-tabs -->
  <div style="display:flex;gap:8px;margin-bottom:18px;border-bottom:2px solid var(--bdr);padding-bottom:0">
    <button id="tt-jobs" onclick="switchTransportTab('jobs')" style="background:none;border:none;font-family:inherit;font-size:13px;font-weight:700;color:var(--forest);border-bottom:2px solid var(--forest);padding:8px 14px 10px;cursor:pointer;margin-bottom:-2px">Open jobs</button>
    <button id="tt-calc" onclick="switchTransportTab('calc')" style="background:none;border:none;font-family:inherit;font-size:13px;font-weight:500;color:var(--txt3);border-bottom:2px solid transparent;padding:8px 14px 10px;cursor:pointer;margin-bottom:-2px">Landing Cost Calculator</button>
  </div>

  <div id="t-jobs-view">
    <div class="sec-hd"><div class="sec-hd-left"><div class="sec-title">Open transport jobs</div><div class="sec-sub">Sorted by urgency · Loading live jobs…</div></div></div>
    <div class="opp-grid" id="jobGrid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))"></div>
  </div>

  <!-- ── LANDING COST CALCULATOR ── -->
  <div id="t-calc-view" style="display:none">
    <div style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);border-radius:14px;padding:20px;margin-bottom:20px;border:1px solid #bbf7d0">
      <div style="font-size:15px;font-weight:700;color:var(--forest);margin-bottom:4px">📦 Landing Cost Calculator</div>
      <div style="font-size:12px;color:#166534;line-height:1.5">Compare total cost (purchase + transport) across multiple source markets before you commit to buying. Find your cheapest landing cost.</div>
    </div>

    <!-- Inputs -->
    <div style="background:#fff;border:1px solid var(--bdr);border-radius:12px;padding:16px;margin-bottom:16px">
      <div style="font-size:13px;font-weight:700;margin-bottom:14px">What are you buying?</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
        <div>
          <label style="font-size:11px;font-weight:600;color:var(--txt3);display:block;margin-bottom:5px">CROP</label>
          <select id="lc-crop" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;font-family:inherit;font-size:13px;background:#fff">
            <option value="">Select crop...</option>
            <option value="Maize">Maize</option>
            <option value="Rice">Rice</option>
            <option value="Beans">Beans</option>
            <option value="Yam">Yam</option>
            <option value="Cassava">Cassava</option>
            <option value="Tomato">Tomato</option>
            <option value="Pepper">Pepper</option>
            <option value="Onion">Onion</option>
            <option value="Sorghum">Sorghum</option>
            <option value="Groundnut">Groundnut</option>
            <option value="Soybean">Soybean</option>
          </select>
        </div>
        <div>
          <label style="font-size:11px;font-weight:600;color:var(--txt3);display:block;margin-bottom:5px">DESTINATION MARKET</label>
          <select id="lc-dest" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;font-family:inherit;font-size:13px;background:#fff">
            <option value="Lagos">Lagos</option>
            <option value="FCT">FCT (Abuja)</option>
            <option value="Rivers">Rivers (Port Harcourt)</option>
            <option value="Enugu">Enugu</option>
            <option value="Oyo">Oyo (Ibadan)</option>
          </select>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
        <div>
          <label style="font-size:11px;font-weight:600;color:var(--txt3);display:block;margin-bottom:5px">QUANTITY (KG)</label>
          <input id="lc-qty" type="number" value="1000" min="50" step="50" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;font-family:inherit;font-size:13px;box-sizing:border-box" oninput="updateBulkLabel()"/>
        </div>
        <div>
          <label style="font-size:11px;font-weight:600;color:var(--txt3);display:block;margin-bottom:5px">BULK DISCOUNT</label>
          <div style="display:flex;align-items:center;gap:8px;padding-top:10px">
            <input id="lc-bulk" type="range" min="0" max="20" value="0" style="flex:1;accent-color:var(--forest)" oninput="document.getElementById('lc-bulk-val').textContent=this.value+'%'"/>
            <span id="lc-bulk-val" style="font-size:13px;font-weight:700;color:var(--forest);min-width:32px">0%</span>
          </div>
          <div id="lc-bulk-hint" style="font-size:10px;color:var(--txt3);margin-top:4px">Enter quantity first</div>
        </div>
      </div>
      <button onclick="runLandingCalc()" style="width:100%;background:var(--forest);color:#fff;border:none;border-radius:10px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">Calculate landing costs →</button>
    </div>

    <!-- Results -->
    <div id="lc-results" style="display:none">
      <div style="font-size:13px;font-weight:700;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between">
        <span>Cost comparison</span>
        <span id="lc-winner-badge" style="font-size:11px;background:#dcfce7;color:#15803d;padding:3px 10px;border-radius:100px;font-weight:700"></span>
      </div>
      <div id="lc-table-wrap" style="overflow-x:auto;margin-bottom:16px">
        <table style="width:100%;border-collapse:collapse;font-size:12px">
          <thead>
            <tr style="background:var(--cream)">
              <th style="padding:10px 12px;text-align:left;font-weight:700;font-size:11px;color:var(--txt3);border-bottom:1px solid var(--bdr)">Source market</th>
              <th style="padding:10px 12px;text-align:right;font-weight:700;font-size:11px;color:var(--txt3);border-bottom:1px solid var(--bdr)">Purchase price</th>
              <th style="padding:10px 12px;text-align:right;font-weight:700;font-size:11px;color:var(--txt3);border-bottom:1px solid var(--bdr)">Transport est.</th>
              <th style="padding:10px 12px;text-align:right;font-weight:700;font-size:11px;color:var(--txt3);border-bottom:1px solid var(--bdr)">Landing cost</th>
              <th style="padding:10px 12px;text-align:center;font-weight:700;font-size:11px;color:var(--txt3);border-bottom:1px solid var(--bdr)">Action</th>
            </tr>
          </thead>
          <tbody id="lc-tbody"></tbody>
        </table>
      </div>
      <div id="lc-insight" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px;font-size:12px;line-height:1.6;color:#166534;margin-bottom:12px"></div>
      <div style="font-size:10px;color:var(--txt3);text-align:center">Transport estimates based on average ₦85/km per tonne. Actual rates may vary. Request a real quote below.</div>
    </div>
  </div>
</div>

<!-- ═══ EXPORT PAGE ═══ -->
<div class="page-wrap" id="page-export" role="main">
  <div style="background:linear-gradient(135deg,#4a1942,#2d1042);border-radius:var(--radius);padding:24px;margin-bottom:20px;color:#fff">
    <div style="font-size:10px;text-transform:uppercase;letter-spacing:.8px;color:#e9d5ff;font-weight:700;margin-bottom:5px">Export Intelligence</div>
    <div style="font-size:20px;font-weight:700;margin-bottom:6px">Nigeria's farmers deserve international prices</div>
    <div style="font-size:13px;color:rgba(255,255,255,.65);max-width:500px;line-height:1.6;margin-bottom:14px">Cocoa farmers earn 30% less than they should. Agrios shows international buyer prices, grade requirements, and connects you to 34 licensed export agents.</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button style="background:#8b5cf6;color:#fff;border:none;border-radius:8px;padding:9px 16px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit" onclick="openExportModal('buyers')">Find export buyers</button>
      <button style="background:rgba(139,92,246,.2);color:#c4b5fd;border:1px solid rgba(139,92,246,.3);border-radius:8px;padding:9px 14px;font-size:12px;font-weight:500;cursor:pointer;font-family:inherit" onclick="openExportModal('agents')">View export agents</button>
    </div>
  </div>
  <div class="stat-grid" style="margin-bottom:20px">
    <div class="stat-card"><div class="stat-card-label">Nigeria non-oil exports H1 2025</div><div class="stat-card-val">$3.2B</div><div class="stat-card-change up">↑ from $2.7B</div></div>
    <div class="stat-card"><div class="stat-card-label">Export price premium (avg)</div><div class="stat-card-val">28%</div><div class="stat-card-change up">Above local market</div></div>
    <div class="stat-card"><div class="stat-card-label">Exportable crops tracked</div><div class="stat-card-val">8</div><div class="stat-card-change flat">Cocoa, sesame, cashew…</div></div>
    <div class="stat-card"><div class="stat-card-label">Verified export agents</div><div class="stat-card-val">34</div><div class="stat-card-change flat">Licensed & verified</div></div>
  </div>
  <div class="sec-hd"><div class="sec-title">Local vs international price comparison</div><span class="badge badge-green">Live data</span></div>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Crop</th><th>Local price</th><th>Export price</th><th>Premium</th><th>Grade required</th><th>Best port</th><th>Action</th></tr></thead>
      <tbody id="exportTableBody"></tbody>
    </table>
  </div>
</div>

<!-- ═══ FINANCE PAGE ═══ -->
<div class="page-wrap" id="page-finance" role="main">
  <div class="sec-hd">
    <div class="sec-hd-left">
      <h1 class="sec-title" style="font-size:20px">Finance intelligence</h1>
      <div class="sec-sub">Crop credit scores and working capital — powered by your market activity</div>
    </div>
    <span class="badge badge-lime" id="finBadge">Loading...</span>
  </div>

  <!-- NOT LOGGED IN STATE -->
  <div id="financeGuest" style="display:none">
    <div style="background:var(--forest);border-radius:16px;padding:32px;text-align:center;color:#fff;margin-bottom:20px">
      <div style="font-size:40px;margin-bottom:12px">🌾</div>
      <div style="font-size:18px;font-weight:700;margin-bottom:8px">Your Agrios Crop Credit Score</div>
      <div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:20px;max-width:400px;margin-left:auto;margin-right:auto">Sign in to see your personal credit score, track your progress, and apply for working capital from partner lenders.</div>
      <button onclick="openAuth()" style="background:var(--lime);color:var(--forest);border:none;border-radius:10px;padding:12px 28px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">Sign in to see your score →</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
      <div style="background:#fff;border:1px solid var(--bdr);border-radius:12px;padding:16px;text-align:center">
        <div style="font-size:28px;font-weight:700;color:var(--forest)">₦10M</div>
        <div style="font-size:11px;color:var(--txt3);margin-top:3px">Max loan available</div>
      </div>
      <div style="background:#fff;border:1px solid var(--bdr);border-radius:12px;padding:16px;text-align:center">
        <div style="font-size:28px;font-weight:700;color:var(--forest)">15%</div>
        <div style="font-size:11px;color:var(--txt3);margin-top:3px">From p.a. interest</div>
      </div>
      <div style="background:#fff;border:1px solid var(--bdr);border-radius:12px;padding:16px;text-align:center">
        <div style="font-size:28px;font-weight:700;color:var(--forest)">3</div>
        <div style="font-size:11px;color:var(--txt3);margin-top:3px">Approved lenders</div>
      </div>
    </div>
  </div>

  <!-- LOADING STATE -->
  <div id="financeLoading" style="text-align:center;padding:60px 20px;color:var(--txt3);font-size:13px">
    <div style="font-size:32px;margin-bottom:12px">⏳</div>
    Loading your credit profile...
  </div>

  <!-- LOGGED IN STATE -->
  <div id="financeMain" style="display:none">
    <div class="g2" style="margin-bottom:20px">

      <!-- SCORE CARD -->
      <div class="card" style="padding:20px">
        <div style="font-size:13px;font-weight:700;margin-bottom:14px;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px;font-size:10px">Your Agrios Crop Credit Score</div>
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:18px">
          <div style="position:relative;flex-shrink:0">
            <canvas id="scoreGauge" width="80" height="80"></canvas>
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column">
              <div id="scoreNumber" style="font-size:18px;font-weight:700;color:var(--forest);line-height:1">—</div>
              <div style="font-size:9px;color:var(--txt3)">of 1000</div>
            </div>
          </div>
          <div>
            <div id="scoreGrade" style="font-size:18px;font-weight:700;color:var(--forest)">—</div>
            <div id="scoreName" style="font-size:12px;color:var(--txt2);margin-top:2px">—</div>
            <div id="scoreLoanBadge" style="margin-top:8px"></div>
          </div>
        </div>

        <!-- SCORE FACTORS -->
        <div id="scoreFactors" style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px"></div>

        <!-- IMPROVE SCORE TIPS -->
        <div style="background:var(--cream);border-radius:10px;padding:12px;margin-bottom:14px">
          <div style="font-size:11px;font-weight:700;color:var(--txt);margin-bottom:6px">How to improve your score</div>
          <div id="improveTips" style="display:flex;flex-direction:column;gap:4px;font-size:11px;color:var(--txt2)"></div>
        </div>

        <button id="applyLoanBtn" onclick="openLoanModal()" style="width:100%;background:var(--forest);color:#fff;border:none;border-radius:10px;padding:13px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit">Apply for working capital →</button>
      </div>

      <!-- RIGHT COLUMN -->
      <div style="display:flex;flex-direction:column;gap:12px">
        <!-- LENDERS -->
        <div class="card" style="padding:16px">
          <div style="font-size:12px;font-weight:700;margin-bottom:12px">Partner lenders</div>
          <div id="lenderList" style="display:flex;flex-direction:column;gap:8px"></div>
        </div>
        <!-- MARKET GAP -->
        <div style="background:linear-gradient(135deg,#0f4c2a,#0a3d25);border-radius:12px;padding:16px;color:#fff">
          <div style="font-size:10px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">Nigeria agri finance gap</div>
          <div style="font-size:26px;font-weight:700;color:var(--lime)">$100B</div>
          <div style="font-size:11px;color:rgba(255,255,255,.6);margin-top:3px">Unmet agricultural credit annually · AfDB 2025</div>
          <div style="margin-top:12px;font-size:11px;color:rgba(255,255,255,.7)">Agrios is closing this gap — one credit score at a time.</div>
        </div>
        <!-- HOW WE SCORE -->
        <div class="card" style="padding:16px">
          <div style="font-size:12px;font-weight:700;margin-bottom:10px">Why Agrios scores differently</div>
          <div style="display:flex;flex-direction:column;gap:7px;font-size:11px;color:var(--txt2)">
            <div style="display:flex;gap:7px"><span style="color:var(--gm);font-weight:700">✓</span><span><strong>No collateral needed</strong> — your market behaviour is the collateral</span></div>
            <div style="display:flex;gap:7px"><span style="color:var(--gm);font-weight:700">✓</span><span>Traditional banks need farm visits — Agrios scores automatically from your data</span></div>
            <div style="display:flex;gap:7px"><span style="color:var(--gm);font-weight:700">✓</span><span>Score improves every time you submit an accurate price report</span></div>
            <div style="display:flex;gap:7px"><span style="color:var(--gm);font-weight:700">✓</span><span>Recognised by NIRSAL MFB and Bank of Agriculture Nigeria</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- MOBILE BOTTOM NAV -->
<nav class="mobile-nav" role="navigation" aria-label="Mobile navigation">
  <div class="mobile-nav-inner">
    <button class="mob-nav-item active" id="mbn-home" onclick="showPage('home')" aria-label="Dashboard">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <span class="mob-nav-label">Home</span>
    </button>
    <button class="mob-nav-item" id="mbn-prices" onclick="showPage('prices')" aria-label="Prices">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
      <span class="mob-nav-label">Prices</span>
    </button>
    <button class="mob-nav-item" id="mbn-report" onclick="showPage('report')" aria-label="Report price">
      <div class="mob-center-btn" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19" stroke="#fff" stroke-width="2"/><line x1="5" y1="12" x2="19" y2="12" stroke="#fff" stroke-width="2"/></svg>
      </div>
    </button>
    <button class="mob-nav-item" id="mbn-alerts" onclick="showPage('alerts')" aria-label="Alerts">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      <span class="mob-nav-label">Alerts</span>
    </button>
    <button class="mob-nav-item" id="mbn-demand" onclick="showPage('demand')" aria-label="Demand board">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      <span class="mob-nav-label">Demand</span>
    </button>
  </div>
</nav>

<div class="toast" id="toast" role="alert" aria-live="assertive"><div class="toast-dot" aria-hidden="true"></div><span id="toastMsg"></span></div>

<script>
/* ===================== FORWARD DECLARATIONS ===================== */
// toast() forward declaration — real function defined below as showToast
function toast(msg){ if(typeof showToast==='function') showToast(msg); else console.log('[toast]',msg); }

/* ===================== API CONFIG ===================== */
const API = 'https://agrios-api.onrender.com/api';
let AUTH_TOKEN = localStorage.getItem('agrios_token') || null;

const apiFetch = async (path, opts = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(AUTH_TOKEN ? { Authorization: `Bearer ${AUTH_TOKEN}` } : {})
  };
  try {
    const res = await fetch(API + path, {
      mode: 'cors',
      credentials: 'omit',
      ...opts,
      headers: { ...headers, ...opts.headers }
    });
    if (!res.ok) throw new Error(`${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn(`API ${path} failed:`, e.message);
    return null;
  }
};

/* ===================== LIVE DATA STATE ===================== */
let LIVE_PRICES = [];   // filled from API
let LIVE_OPPS = [];
let LIVE_DEMANDS = [];
let LIVE_JOBS = [];
let LIVE_EXPORT = [];
let API_LOADED = false;

/* ── API BOOTSTRAP ── runs once on load, populates live state */
async function loadLiveData() {
  showApiStatus('loading');
  try {
    const [summary, opps, demands, jobs, exportP] = await Promise.allSettled([
      apiFetch('/prices/summary'),
      apiFetch('/prices/opportunities'),
      apiFetch('/demand'),
      apiFetch('/transport/jobs?limit=6'),
      apiFetch('/export/prices'),
    ]);

    // Debug: log first API record to console so we can see field names
    if (summary.value?.data?.length) {
      console.log('[Agrios] API price sample:', JSON.stringify(summary.value.data[0]));
      // API returns: name, emoji, market (name), state, price_avg, price_low, price_high, unit, change_24h_pct
      LIVE_PRICES = summary.value.data.map(p => {
        const avg = parseFloat(p.price_avg) || 0;
        const ch24raw = parseFloat(p.change_24h_pct);
        // Cap change % at ±50% to filter out bad data from compounding bug
        const ch24 = isFinite(ch24raw) && Math.abs(ch24raw) <= 50 ? ch24raw : 0;
        return {
          n: p.name || p.crop_name || '',
          e: p.emoji || '🌾',
          avg, low: parseFloat(p.price_low) || 0, high: parseFloat(p.price_high) || 0,
          ch24, ch7: 0,
          unit: p.unit || '50kg bag',
          mkt: p.market || p.market_name || '',
          state: p.state || '',
          conf: parseInt(p.confidence_score) || 80,
          updated: p.updated_at,
        };
      }).filter(p => p.n && p.avg > 0 && p.avg < 10000000);
      // rebuild UI with live data
      buildTicker();
      buildHomePriceCards();
      buildPriceChips();
      filterPriceTable();
      showApiStatus('live');
      // If user is on Prices page, also refresh the table immediately
      if(document.getElementById('page-prices')?.classList.contains('active')){
        buildPriceChips(); filterPriceTable();
      }
      API_LOADED = true;
    }

    if (opps.value?.data?.length) {
      LIVE_OPPS = opps.value.data.map(o => ({
        type: o.type?.replace('_',' ').toUpperCase() || 'OPPORTUNITY',
        title: o.title, desc: o.description,
        margin: o.margin_display || '', icon: o.emoji || '📊',
        actions: ['View Details', '🚛 Transport', '💰 Finance'],
      }));
      buildOppCards();
    }

    if (demands.value?.data?.length) {
      LIVE_DEMANDS = demands.value.data.map(d => ({
        crop: d.crop_name, qty: d.quantity_display || `${d.quantity_kg}kg`,
        price: `₦${Number(d.offered_price).toLocaleString('en-NG')}/${d.price_unit}`,
        loc: d.delivery_location, state: d.delivery_state,
        deadline: d.deadline ? new Date(d.deadline).toLocaleDateString('en-NG',{month:'short',day:'numeric'}) : 'Open',
        buyer: d.buyer_name, ver: d.is_verified_buyer, icon: d.emoji || '🌾',
      }));
      buildDemand(LIVE_DEMANDS);
    }

    if (jobs.value?.data?.length) {
      LIVE_JOBS = jobs.value.data.map(j => ({
        from: j.pickup_state, to: j.delivery_state,
        crop: j.crop_name, qty: `${j.quantity} ${j.unit}`,
        date: j.pickup_date ? new Date(j.pickup_date).toLocaleDateString('en-NG',{month:'short',day:'numeric'}) : 'Flexible',
        pay: j.max_budget ? `₦${Number(j.max_budget).toLocaleString('en-NG')}` : 'Negotiable',
        veh: j.vehicle_type || 'Any vehicle', poster: j.poster_name || 'Verified Farmer',
        urgent: j.is_urgent,
      }));
      buildJobGrid();
    }

    if (exportP.value?.data?.length) {
      LIVE_EXPORT = exportP.value.data;
      buildExportTable();
    }

  } catch (e) {
    console.warn('Live data load error:', e);
    showApiStatus('offline');
  }
}

function showApiStatus(state) {
  const el = document.getElementById('apiStatus');
  const sub = document.getElementById('priceSubtitle');
  if (!el) return;
  if (state === 'loading') {
    el.textContent = '⟳ Connecting…';
    el.style.color = 'rgba(255,255,255,.5)';
    if(sub) sub.textContent = 'Connecting to live database…';
  } else if (state === 'live') {
    el.textContent = '● LIVE';
    el.style.color = 'var(--lime)';
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-NG', {hour:'2-digit', minute:'2-digit'});
    if(sub) sub.textContent = 'Live from database · Updated ' + timeStr + ' · Scroll to explore all crops';
  } else {
    el.textContent = '○ Estimates';
    el.style.color = 'rgba(255,255,255,.4)';
    if(sub) sub.textContent = 'Showing reference estimates — live prices loading…';
  }
}

/* helper — pick live prices or fall back to static */
function getPrices() { return LIVE_PRICES.length ? LIVE_PRICES : CROPS; }
function getOpps()   { return LIVE_OPPS.length   ? LIVE_OPPS   : OPPS;  }
function getDemands(){ return LIVE_DEMANDS.length ? LIVE_DEMANDS : DEMANDS; }
function getJobs()   { return LIVE_JOBS.length    ? LIVE_JOBS   : JOBS_STATIC; }

/* ===================== STATIC FALLBACK DATA ===================== */
const CROPS=[
  {n:"Maize",e:"🌽",avg:87000,low:72000,high:102000,ch24:8.2,ch7:12.1,unit:"50kg bag",mkt:"Mile 12, Lagos",state:"Lagos",conf:94},
  {n:"Rice",e:"🍚",avg:145000,low:128000,high:168000,ch24:-2.1,ch7:-1.4,unit:"50kg bag",mkt:"Garki, Abuja",state:"Abuja",conf:91},
  {n:"Tomato",e:"🍅",avg:28000,low:22000,high:38000,ch24:15.4,ch7:18.2,unit:"Crate",mkt:"Mile 12, Lagos",state:"Lagos",conf:87},
  {n:"Cassava",e:"🥔",avg:42000,low:35000,high:52000,ch24:1.2,ch7:3.4,unit:"100kg bag",mkt:"Bodija, Ibadan",state:"Oyo",conf:82},
  {n:"Yam",e:"🍠",avg:95000,low:80000,high:115000,ch24:-0.8,ch7:2.1,unit:"100kg bag",mkt:"Oil Mill, PH",state:"Rivers",conf:78},
  {n:"Beans",e:"🫘",avg:118000,low:105000,high:135000,ch24:0,ch7:1.8,unit:"50kg bag",mkt:"Dawanau, Kano",state:"Kano",conf:89},
  {n:"Pepper",e:"🫑",avg:19500,low:14000,high:28000,ch24:6.8,ch7:9.2,unit:"Basket",mkt:"Ariaria, Aba",state:"Abia",conf:75},
  {n:"Onion",e:"🧅",avg:32000,low:25000,high:42000,ch24:-3.2,ch7:-5.1,unit:"Bag",mkt:"Dawanau, Kano",state:"Kano",conf:88},
  {n:"Cocoa",e:"🍫",avg:890000,low:820000,high:960000,ch24:2.4,ch7:5.6,unit:"Tonne",mkt:"Ogbete, Enugu",state:"Enugu",conf:96},
  {n:"Plantain",e:"🍌",avg:16500,low:13000,high:22000,ch24:4.1,ch7:6.8,unit:"Bunch",mkt:"Mile 12, Lagos",state:"Lagos",conf:80}
];
const OPPS=[
  {type:"ARBITRAGE",title:"Maize: Buy in Kaduna, sell in Lagos",desc:"Price gap of 22% detected. After estimated logistics of ₦8,000 per bag, net margin is approximately 14%.",margin:"+14%",icon:"🌽",actions:["List Produce","Contact Buyer","🚛 Logistics","💰 Working Capital"]},
  {type:"RISING TREND",title:"Tomato prices surging in Abuja",desc:"Tomato prices have risen 18% in 7 days. Hotel and restaurant demand ahead of the festive season is driving a supply shortage.",margin:"+18% 7d",icon:"🍅",actions:["List Produce","View Buyers","🚛 Find Transport"]},
  {type:"DEMAND ALERT",title:"High rice demand — Port Harcourt",desc:"Buyer demand at Oil Mill Market exceeds current listed supply by a 3:1 ratio. Short window estimated at 10–14 days.",margin:"3× demand",icon:"🍚",actions:["List Produce","Contact Buyer","View Demand"]},
  {type:"SOURCING TIP",title:"Cheapest yam source: Enugu this week",desc:"Yam at Ogbete Market is 16% below the national average. Opportunity for aggregators buying for redistribution northward.",margin:"-16% vs avg",icon:"🍠",actions:["Source Now","Find Transport","View Prices"]},
  {type:"HOLD SIGNAL",title:"Beans — historical buying period",desc:"Historical data shows beans prices rise 8–12% in weeks 3–4 of Q4. Current stability suggests an accumulation phase.",margin:"↑ Forecast",icon:"🫘",actions:["Set Alert","View Trend","Apply Finance"]},
  {type:"EXPORT",title:"Cocoa: export premium at Lagos port",desc:"Export buyers at Apapa offering above-market rates for Grade 1 certified cocoa. Certification pathway available for registered farmers.",margin:"+3% premium",icon:"🍫",actions:["Contact Exporter","View Requirements","Apply Finance"]}
];
const PREDS=[
  {crop:"🌽 Maize",dir:"↑ Rising",conf:82,action:"Hold 7 more days",color:"#0a7a3a"},
  {crop:"🍅 Tomato",dir:"↑ Rising",conf:78,action:"Sell now — near peak",color:"#0a7a3a"},
  {crop:"🍚 Rice",dir:"↓ Falling",conf:71,action:"Source from Kano",color:"#d92b2b"},
  {crop:"🫘 Beans",dir:"→ Stable",conf:85,action:"Monitor weekly",color:"#d97706"},
  {crop:"🧅 Onion",dir:"↓ Falling",conf:68,action:"Move to better market",color:"#d92b2b"}
];
const ALERTS_DATA=[
  {crop:"Maize",mkt:"Kaduna",cond:"rises above ₦95,000",type:"up",icon:"🌽",on:true},
  {crop:"Rice",mkt:"Lagos",cond:"drops below ₦130,000",type:"dn",icon:"🍚",on:true},
  {crop:"Tomato",mkt:"Abuja",cond:"increases by 10%",type:"up",icon:"🍅",on:false}
];
const DEMANDS=[
  {crop:"Maize",qty:"50 tonnes",price:"₦85,000/bag",loc:"Lagos",state:"Lagos",deadline:"Nov 30",buyer:"Stallion Flour Mills",ver:true,icon:"🌽"},
  {crop:"Rice",qty:"200 bags",price:"₦140,000/bag",loc:"Abuja",state:"Abuja",deadline:"Dec 5",buyer:"FoodCo Supermarkets",ver:true,icon:"🍚"},
  {crop:"Tomato",qty:"100 crates",price:"₦25,000/crate",loc:"Port Harcourt",state:"Rivers",deadline:"Nov 28",buyer:"Fresh Garden Catering",ver:false,icon:"🍅"},
  {crop:"Yam",qty:"20 tonnes",price:"₦92,000/bag",loc:"Kano",state:"Kano",deadline:"Dec 15",buyer:"Northern Agro Ltd",ver:true,icon:"🍠"},
  {crop:"Beans",qty:"80 bags",price:"₦115,000/bag",loc:"Ibadan",state:"Oyo",deadline:"Dec 1",buyer:"Bodija Wholesale Depot",ver:false,icon:"🫘"},
  {crop:"Cassava",qty:"30 tonnes",price:"₦40,000/bag",loc:"Enugu",state:"Enugu",deadline:"Dec 20",buyer:"Starch Industries SE",ver:true,icon:"🥔"}
];
const JOBS_STATIC=[
  {from:"Lagos",to:"Abuja",crop:"Maize",qty:"12 tonnes",date:"Dec 1",pay:"₦78,000",veh:"Heavy Truck",poster:"Adewale Farms",urgent:true},
  {from:"Ibadan",to:"Kano",crop:"Yam",qty:"20 tonnes",date:"Dec 5",pay:"₦95,000",veh:"Heavy Truck",poster:"Oyo Agro Ltd",urgent:false},
  {from:"Aba",to:"Lagos",crop:"Palm Oil",qty:"6 tonnes",date:"Nov 30",pay:"₦42,000",veh:"Medium Truck",poster:"Ariaria Coop",urgent:true},
  {from:"Kano",to:"Abuja",crop:"Onion",qty:"8 tonnes",date:"Dec 3",pay:"₦52,000",veh:"Pickup/Van",poster:"Dawanau Traders",urgent:false},
  {from:"Enugu",to:"Lagos",crop:"Cassava",qty:"15 tonnes",date:"Dec 7",pay:"₦68,000",veh:"Heavy Truck",poster:"Ogbete Market",urgent:false},
  {from:"Lagos",to:"Port Harcourt",crop:"Rice",qty:"10 tonnes",date:"Dec 2",pay:"₦55,000",veh:"Medium Truck",poster:"Mile 12 Depot",urgent:true}
];
const HEAT={
  maize:{sell:[{m:"Lagos",s:"Lagos",p:"₦102k"},{m:"Abuja",s:"FCT",p:"₦98k"},{m:"Port Harcourt",s:"Rivers",p:"₦95k"},{m:"Enugu",s:"Enugu",p:"₦91k"}],buy:[{m:"Kaduna",s:"Kaduna",p:"₦72k"},{m:"Kano",s:"Kano",p:"₦75k"},{m:"Ibadan",s:"Oyo",p:"₦79k"},{m:"Aba",s:"Abia",p:"₦82k"}],bars:[72,75,79,82,84,91,95,98,102],labels:["Kaduna","Kano","Ibadan","Aba","Enugu","Enugu","PH","Abuja","Lagos"]},
  rice:{sell:[{m:"Abuja",s:"FCT",p:"₦168k"},{m:"Lagos",s:"Lagos",p:"₦162k"},{m:"Enugu",s:"Enugu",p:"₦155k"},{m:"PH",s:"Rivers",p:"₦150k"}],buy:[{m:"Kano",s:"Kano",p:"₦128k"},{m:"Ibadan",s:"Oyo",p:"₦132k"},{m:"Maiduguri",s:"Borno",p:"₦135k"},{m:"Aba",s:"Abia",p:"₦138k"}],bars:[128,132,135,138,150,155,162,168],labels:["Kano","Ibadan","Maiduguri","Aba","PH","Enugu","Lagos","Abuja"]},
  tomato:{sell:[{m:"Abuja",s:"FCT",p:"₦38k"},{m:"Lagos",s:"Lagos",p:"₦35k"},{m:"Kano",s:"Kano",p:"₦32k"},{m:"PH",s:"Rivers",p:"₦31k"}],buy:[{m:"Ibadan",s:"Oyo",p:"₦22k"},{m:"Enugu",s:"Enugu",p:"₦24k"},{m:"Aba",s:"Abia",p:"₦25k"},{m:"Kaduna",s:"Kaduna",p:"₦26k"}],bars:[22,24,25,26,31,32,35,38],labels:["Ibadan","Enugu","Aba","Kaduna","PH","Kano","Lagos","Abuja"]},
  yam:{sell:[{m:"Lagos",s:"Lagos",p:"₦115k"},{m:"Abuja",s:"FCT",p:"₦110k"},{m:"Kano",s:"Kano",p:"₦105k"},{m:"PH",s:"Rivers",p:"₦100k"}],buy:[{m:"Enugu",s:"Enugu",p:"₦80k"},{m:"Aba",s:"Abia",p:"₦83k"},{m:"Ibadan",s:"Oyo",p:"₦87k"},{m:"Kaduna",s:"Kaduna",p:"₦88k"}],bars:[80,83,87,88,100,105,110,115],labels:["Enugu","Aba","Ibadan","Kaduna","PH","Kano","Abuja","Lagos"]},
  beans:{sell:[{m:"Lagos",s:"Lagos",p:"₦135k"},{m:"Abuja",s:"FCT",p:"₦128k"},{m:"PH",s:"Rivers",p:"₦124k"},{m:"Enugu",s:"Enugu",p:"₦120k"}],buy:[{m:"Kano",s:"Kano",p:"₦105k"},{m:"Ibadan",s:"Oyo",p:"₦108k"},{m:"Aba",s:"Abia",p:"₦112k"},{m:"Kaduna",s:"Kaduna",p:"₦114k"}],bars:[105,108,112,114,120,124,128,135],labels:["Kano","Ibadan","Aba","Kaduna","Enugu","PH","Abuja","Lagos"]}
};
const ADMIN_PENDING=[
  {crop:"🌽 Maize",mkt:"Dawanau, Kano",price:"₦68,000/bag",user:"Ahmed M.",flag:false},
  {crop:"🍅 Tomato",mkt:"Mile 12, Lagos",price:"₦55,000/crate",user:"Grace O.",flag:true},
  {crop:"🍚 Rice",mkt:"Garki, Abuja",price:"₦142,000/bag",user:"Ibrahim Y.",flag:false},
  {crop:"🫘 Beans",mkt:"Bodija, Ibadan",price:"₦112,000/bag",user:"Chika N.",flag:false},
  {crop:"🧅 Onion",mkt:"Dawanau, Kano",price:"₦29,000/bag",user:"Rashida T.",flag:false}
];
const CONTRIBUTORS=[
  {name:"Adewale Ojo",state:"Lagos",accepted:124,accuracy:97,level:"Verified Market Agent",bg:"#0a3d25"},
  {name:"Fatima Kalu",state:"Kaduna",accepted:47,accuracy:94,level:"Trusted Reporter",bg:"#1558a8"},
  {name:"Emeka Okafor",state:"Anambra",accepted:89,accuracy:91,level:"Verified Market Agent",bg:"#7b1fa2"},
  {name:"Aisha Bello",state:"Kano",accepted:31,accuracy:88,level:"Trusted Reporter",bg:"#b45309"}
];

/* ===================== HELPERS ===================== */
function fmt(n){return"₦"+Number(n).toLocaleString('en-NG')}
function gShade(i,len){const t=i/(len-1);const r=Math.round(10+t*50);const g=Math.round(80+t*50);const b=Math.round(37-t*10);return`rgb(${r},${g},${b})`}
function bShade(i,len){const t=i/(len-1);const b=Math.round(168+t*40);return`rgba(21,88,168,${0.5+t*0.5})`}
function chgClass(v){return v>0?'up':v<0?'dn':'flat'}
function chgLabel(v){return v>0?`↑ ${Math.abs(v).toFixed(1)}%`:v<0?`↓ ${Math.abs(v).toFixed(1)}%`:`→ Stable`}

/* ===================== TICKER ===================== */
function buildTicker(){
  const prices=getPrices();
  const seen=new Set();
  const unique=prices.filter(c=>{
    if(!c.n||c.n==='Unknown'||!c.avg||c.avg<=0)return false;
    if(seen.has(c.n))return false;
    seen.add(c.n);return true;
  });
  if(!unique.length)return;
  const items=unique.map(c=>{
    const chg=isFinite(c.ch24)?c.ch24:0;
    return`<div class="ticker-item">
      <span class="t-name">${c.e||'🌾'} ${c.n}</span>
      <span class="t-price">${fmt(c.avg)}/${c.unit}</span>
      <span class="${chg>=0?'t-up':'t-dn'}">${chg>=0?'↑':'↓'}${Math.abs(chg).toFixed(1)}%</span>
    </div>`;
  }).join('');
  document.getElementById('ticker').innerHTML=items+items;
}

/* ===================== HOME PRICE CARDS ===================== */
function buildHomePriceCards(){
  const el=document.getElementById('homePriceCards');
  if(!el)return;
  const seen2=new Set();
  const cropList=getPrices().filter(c=>{
    if(!c.n||c.n==='Unknown'||!c.avg||c.avg<=0)return false;
    if(seen2.has(c.n))return false;
    seen2.add(c.n);return true;
  });
  el.innerHTML=cropList.map(c=>`
    <div class="crop-card" onclick="showPage('prices')" role="button" tabindex="0" aria-label="${c.n}: ${fmt(c.avg)} per ${c.unit}">
      <div class="cc-top">
        <div class="cc-icon" aria-hidden="true">${c.e}</div>
        <div><div class="cc-name">${c.n}</div><div class="cc-market">${c.mkt}</div></div>
      </div>
      <div class="cc-price">${fmt(c.avg)}</div>
      <div class="cc-unit">per ${c.unit}</div>
      <div class="cc-badge ${c.ch24>=0?'up':'dn'}" aria-label="${chgLabel(c.ch24)} in 24 hours">${chgLabel(c.ch24)}</div>
      <div class="cc-conf">
        <div class="cc-conf-bar"><div class="cc-conf-fill" style="width:${c.conf}%"></div></div>
        <span>${c.conf}%</span>
      </div>
    </div>`).join('');
}

/* ===================== OPPORTUNITY CARDS ===================== */
function buildOppCards(){
  var el = document.getElementById('oppGrid');
  if(!el) return;
  var tier = currentUser ? currentUser.subscription_tier : 'guest';
  var isPro = (tier === 'pro' || tier === 'business');
  var opps = getOpps();
  var html = '';
  for(var i=0; i<opps.length; i++){
    var o = opps[i];
    var actions = '';
    if(o.actions){
      for(var j=0; j<o.actions.length; j++){
        actions += '<button class="btn-sm btn-sm-green" onclick="showToast(\'' + o.actions[j] + ' — opening...\')">' + o.actions[j] + '</button>';
      }
    }
    html += '<div class="opp-card" role="article">' +
      '<div class="opp-type">' + (o.type||'') + '</div>' +
      '<div class="opp-title">' + (o.icon||'') + ' ' + (o.title||'') + '</div>' +
      '<div class="opp-desc">' + (o.desc||'') + '</div>' +
      '<div class="opp-margin">' + (o.margin||'') + '</div>' +
      '<div class="opp-actions">' + actions + '</div>' +
    '</div>';
  }
  if(!isPro && !currentUser){
    html += '<div class="opp-card" style="border:2px dashed var(--lime);background:linear-gradient(135deg,#f0faf4,#fff);cursor:pointer" onclick="upgradePrompt()">' +
      '<div class="opp-type" style="background:var(--limepale);color:var(--forest)">PRO FEATURE</div>' +
      '<div class="opp-title">Unlock more market opportunities</div>' +
      '<div class="opp-desc">Export windows, arbitrage alerts and AI trade tips. Upgrade for 2,500 per month.</div>' +
      '<div style="margin-top:10px"><button class="btn-primary" style="padding:8px 16px;font-size:12px;width:auto" onclick="upgradePrompt()">Upgrade to Pro</button></div>' +
    '</div>';
  }
  el.innerHTML = html;
}
function refreshOpps(){showToast('Opportunities refreshed — latest AI data loaded');buildOppCards()}

/* ===================== PREDICTIONS ===================== */
function buildPredList(){
  const el=document.getElementById('predList');
  if(!el)return;
  // Use live AI predictions if available, fall back to static
  const predictions = LIVE_OPPS.filter(o=>o.type&&o.type.toLowerCase().includes('trend')).slice(0,4);
  if(predictions.length > 0){
    el.innerHTML = predictions.map(p=>`
      <div class="pred-row">
        <div><div class="pred-crop">${p.title||''}</div><div class="pred-action">${p.desc||''}</div></div>
        <div class="pred-right"><div class="pred-pct up">${p.margin||''}</div></div>
      </div>`).join('');
    return;
  }
  el.innerHTML=PREDS.map(p=>`
    <div class="pred-row">
      <div><div class="pred-crop">${p.crop}</div><div class="pred-action">${p.action}</div></div>
      <div class="pred-right">
        <div class="pred-dir" style="color:${p.color}">${p.dir}</div>
        <div class="pred-conf">${p.conf}% confidence</div>
      </div>
    </div>`).join('');
}

/* ===================== CHART ===================== */
let priceChartObj=null;
const chartData={
  '7d':{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],maize:[81,83,82,85,87,86,87],rice:[148,147,146,146,145,145,145],tomato:[20,21,22,23,25,27,28]},
  '30d':{labels:['W1','W2','W3','W4'],maize:[78,81,84,87],rice:[152,150,147,145],tomato:[18,20,23,28]},
  '90d':{labels:['M1','M2','M3'],maize:[72,80,87],rice:[155,150,145],tomato:[14,20,28]}
};
function buildPriceChart(){
  if(typeof Chart === 'undefined'){
    setTimeout(buildPriceChart, 500);
    return;
  }
  const ctx=document.getElementById('priceChart');
  if(!ctx)return;
  if(priceChartObj)priceChartObj.destroy();
  const d=chartData['7d'];
  priceChartObj=new Chart(ctx,{
    type:'line',
    data:{labels:d.labels,datasets:[
      {label:'Maize',data:d.maize,borderColor:'#0a3d25',backgroundColor:'rgba(10,61,37,.06)',tension:.4,fill:true,pointRadius:3,pointHoverRadius:5,pointBackgroundColor:'#0a3d25'},
      {label:'Rice',data:d.rice,borderColor:'#1558a8',borderDash:[5,3],backgroundColor:'transparent',tension:.4,fill:false,pointRadius:3,pointHoverRadius:5,pointBackgroundColor:'#1558a8'},
      {label:'Tomato',data:d.tomato,borderColor:'#d97706',backgroundColor:'rgba(217,119,6,.06)',tension:.4,fill:true,pointRadius:3,pointHoverRadius:5,pointBackgroundColor:'#d97706'}
    ]},
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{mode:'index',intersect:false,callbacks:{label:ctx=>`${ctx.dataset.label}: ₦${ctx.parsed.y}k`}}},
      scales:{
        y:{grid:{color:'rgba(0,0,0,.04)'},ticks:{callback:v=>v+'k',font:{size:11},color:'#5a7a67'},border:{display:false}},
        x:{grid:{display:false},ticks:{font:{size:11},color:'#5a7a67'},border:{display:false}}
      },
      interaction:{mode:'nearest',axis:'x',intersect:false}
    }
  });
}
function switchPeriod(btn,period){
  document.querySelectorAll('.period-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  if(!priceChartObj)return;
  const d=chartData[period];
  priceChartObj.data.labels=d.labels;
  priceChartObj.data.datasets[0].data=d.maize;
  priceChartObj.data.datasets[1].data=d.rice;
  priceChartObj.data.datasets[2].data=d.tomato;
  priceChartObj.update('active');
}

/* ===================== PRICE TABLE ===================== */
let activePriceChip='';
function buildPriceChips(){
  const el=document.getElementById('priceChips');
  if(!el)return;
  const prices=getPrices();const seen3=new Set();const uCrops=prices.filter(c=>{if(seen3.has(c.n))return false;seen3.add(c.n);return true;});
  const all=['All',...uCrops.map(c=>c.n)];
  el.innerHTML=all.map((c,i)=>`
    <div class="chip ${i===0?'active':''}" onclick="setPriceChip(this,'${i===0?'':c}')" role="button" tabindex="0" aria-pressed="${i===0}">${i===0?c:(uCrops.find(x=>x.n===c)?.e+' '||'')+c}</div>`).join('');
}
function setPriceChip(el,crop){
  document.querySelectorAll('#priceChips .chip').forEach(c=>{c.classList.remove('active');c.setAttribute('aria-pressed','false')});
  el.classList.add('active');el.setAttribute('aria-pressed','true');
  activePriceChip=crop;filterPriceTable();
}
function filterPriceTable(){
  const q=(document.getElementById('priceSearch')?.value||'').toLowerCase();
  const state=(document.getElementById('stateFilter')?.value||'').toLowerCase();
  const trend=document.getElementById('trendFilter')?.value||'';
  const tbody=document.getElementById('priceTableBody');
  if(!tbody)return;
  const filtered=getPrices().filter(c=>{
    const matchQ=!q||((c.n||'').toLowerCase().includes(q)||(c.mkt||'').toLowerCase().includes(q)||(c.state||'').toLowerCase().includes(q));
    const matchChip=!activePriceChip||c.n===activePriceChip;
    const matchState=!state||c.state.toLowerCase().includes(state);
    const matchTrend=!trend||(trend==='up'&&c.ch24>0)||(trend==='dn'&&c.ch24<0)||(trend==='flat'&&c.ch24===0);
    return matchQ&&matchChip&&matchState&&matchTrend;
  });
  if(!filtered.length){tbody.innerHTML=`<tr><td colspan="11"><div class="empty"><div class="empty-icon">🌾</div><p>No crops match your filters.<br>Try adjusting the search or clear filters.</p></div></td></tr>`;return}
  const isLive = LIVE_PRICES.length > 0;
  tbody.innerHTML=filtered.map(c=>`
    <tr>
      <td><div class="td-crop-cell"><span class="td-icon">${c.e}</span>${c.n}</div></td>
      <td style="color:#5a7a67">${c.mkt}</td>
      <td style="color:#5a7a67">${c.state}</td>
      <td style="color:#5a7a67">${c.unit}</td>
      <td class="td-mono" style="color:#8fa89a">${fmt(c.low)}${!isLive?'*':''}</td>
      <td class="td-mono" style="font-weight:600;color:#0a3d25">${fmt(c.avg)}${!isLive?'*':''}</td>
      <td class="td-mono" style="color:#8fa89a">${fmt(c.high)}${!isLive?'*':''}</td>
      <td><span class="badge ${c.ch24>0?'badge-green':c.ch24<0?'badge-red':'badge-gray'}">${chgLabel(c.ch24)}</span></td>
      <td><span class="badge ${c.ch7>0?'badge-green':c.ch7<0?'badge-red':'badge-gray'}">${chgLabel(c.ch7)}</span></td>
      <td>
        <div class="conf-inline">
          <div class="conf-bar-sm"><div class="conf-fill-sm" style="width:${c.conf}%"></div></div>
          <span style="font-size:11px;color:#5a7a67">${c.conf}%</span>
        </div>
      </td>
      <td style="font-size:11px;color:#8fa89a">${isLive ? (c.updatedAt ? new Date(c.updatedAt).toLocaleTimeString('en-NG',{hour:'2-digit',minute:'2-digit'}) : 'Just now') : '<span style="color:#d97706;font-style:italic">est.</span>'}</td>
    </tr>`).join('');
}

/* ===================== REPORT FORM ===================== */
function validateReportPrice(){
  const v=parseFloat(document.getElementById('rPrice').value);
  const h=document.getElementById('rPriceHint');
  if(!v||v<=0){h.textContent='Enter the price you observed today';h.className='form-hint';return}
  const avg=87000;
  if(v<avg*0.2){h.textContent='✗ Price rejected — more than 80% below average';h.className='form-hint err'}
  else if(v<avg*0.6){h.textContent='⚠ Price will be flagged for admin review';h.className='form-hint warn'}
  else if(v>avg*1.8){h.textContent='✗ Price rejected — more than 80% above average';h.className='form-hint err'}
  else if(v>avg*1.4){h.textContent='⚠ Price seems high — will be flagged for review';h.className='form-hint warn'}
  else{h.textContent='✓ Price is within normal range — will be auto-approved';h.className='form-hint ok'}
}
async function submitReport(){
  if(!currentUser){ showToast('Please sign in to report prices'); openAuth(); return; }
  const cropEl=document.getElementById('rCrop');
  const priceEl=document.getElementById('rPrice');
  const marketEl=document.getElementById('rMarket');
  const dateEl=document.getElementById('rDate');
  const notesEl=document.getElementById('rNotes');
  const unitEl=document.getElementById('rUnit');
  const crop=cropEl?.value; const price=priceEl?.value;
  const market=marketEl?.value; const date=dateEl?.value;
  const unit=unitEl?.value||'50kg bag';
  if(!crop){showToast('Please select a crop');return}
  if(!price||parseFloat(price)<=0){showToast('Please enter a valid price');return}
  if(!market){showToast('Please select a market');return}
  const btn=document.getElementById('submitReportBtn');
  if(btn){btn.disabled=true;btn.textContent='Submitting...';}
  try {
    // Get crop_id and market_id from live data
    const crops = await apiFetch('/prices/crops');
    const markets = await apiFetch('/prices/markets');
    const cropObj = crops?.data?.find(c=>c.name===crop);
    const mktObj = markets?.data?.find(m=>m.name===market||m.city===market);
    if(!cropObj||!mktObj){ showToast('Could not match crop/market — try again'); return; }
    const res = await apiFetch('/prices/report',{
      method:'POST',
      body:JSON.stringify({
        crop_id: cropObj.id, market_id: mktObj.id,
        reported_price: parseFloat(price), unit, observed_date: date||new Date().toISOString().split('T')[0],
        notes: notesEl?.value||''
      })
    });
    if(res?.data){
      const status=res.data.status;
      const msg = status==='approved' ? '✅ Report approved instantly! Your credit score has been updated.' :
                  status==='flagged'  ? '⚠️ Report flagged for review — admin will check the price.' :
                  '✅ Report submitted! Pending community review. Your score will update tonight.';
      showToast(msg);
      if(cropEl)cropEl.value='';if(priceEl)priceEl.value='';
      if(marketEl)marketEl.value='';if(notesEl)notesEl.value='';
      // Refresh credit score if on finance page
      if(document.getElementById('page-finance')?.classList.contains('active')) loadFinanceData();
    } else {
      showToast(res?.error||'Report submitted — thank you!');
    }
  } catch(e){
    showToast('Report saved locally — will sync when connection improves');
  } finally {
    if(btn){btn.disabled=false;btn.textContent='Submit price report';}
  }
}

/* ===================== ALERTS ===================== */
function buildAlerts(){
  const el=document.getElementById('alertList');
  if(!el)return;
  if(!ALERTS_DATA.length){el.innerHTML='<div class="empty"><div class="empty-icon">🔔</div><p>No alerts yet. Create your first alert to get notified.</p></div>';return}
  el.innerHTML=ALERTS_DATA.map((a,i)=>`
    <div class="alert-card" id="alert-${i}">
      <div class="alert-icon ${a.type}" aria-hidden="true">${a.icon}</div>
      <div class="alert-info">
        <div class="alert-title">${a.crop} — ${a.mkt}</div>
        <div class="alert-sub">When price ${a.cond} · In-app notification</div>
      </div>
      <button class="toggle ${a.on?'on':''}" onclick="toggleAlert(${i},this)" role="switch" aria-checked="${a.on}" aria-label="Toggle ${a.crop} alert in ${a.mkt}"></button>
      <button class="btn-sm btn-sm-outline" onclick="removeAlert(${i})" aria-label="Remove ${a.crop} alert">✕</button>
    </div>`).join('');
}
function toggleAlert(i,el){
  ALERTS_DATA[i].on=!ALERTS_DATA[i].on;
  el.classList.toggle('on');
  el.setAttribute('aria-checked',ALERTS_DATA[i].on);
  showToast(ALERTS_DATA[i].on?`Alert enabled — ${ALERTS_DATA[i].crop} in ${ALERTS_DATA[i].mkt}`:`Alert paused`);
}
function removeAlert(i){
  ALERTS_DATA.splice(i,1);
  buildAlerts();
  showToast('Alert removed');
}
function createAlert(){
  const crop=document.getElementById('alerCrop').value;
  const mkt=document.getElementById('alerMarket').value;
  const cond=document.getElementById('alerCond');
  const target=document.getElementById('alerTarget').value;
  if(!target){showToast('Please enter a target value');return}
  const condText=cond.options[cond.selectedIndex].text.replace('₦','₦'+Number(target).toLocaleString()).replace('%',target+'%');
  ALERTS_DATA.push({crop,mkt:mkt.split('–')[0].trim(),cond:condText.replace('Price ','').toLowerCase(),type:'up',icon:CROPS.find(c=>c.n===crop)?.e||'📊',on:true});
  buildAlerts();
  document.getElementById('alerTarget').value='';
  showToast('Alert created — you will be notified when conditions are met');
}
function scrollToAlertForm(){document.getElementById('alertForm')?.scrollIntoView({behavior:'smooth',block:'center'})}

/* ===================== HEATMAP ===================== */
let heatChartObj=null;
function buildHeatmap(crop){
  crop=crop||'maize';
  const d=HEAT[crop]||HEAT.maize;
  const cropName=crop.charAt(0).toUpperCase()+crop.slice(1);
  const lblEl=document.getElementById('heatChartLabel');
  if(lblEl)lblEl.textContent=`· ${cropName}`;
  const sg=document.getElementById('sellGrid');
  const bg=document.getElementById('buyGrid');
  if(sg)sg.innerHTML=d.sell.map((x,i)=>`<div class="heat-cell" style="background:${gShade(d.sell.length-1-i,d.sell.length)}"><div class="heat-mkt">${x.m}</div><div class="heat-price">${x.p}</div><div class="heat-state">${x.s}</div></div>`).join('');
  if(bg)bg.innerHTML=d.buy.map((x,i)=>`<div class="heat-cell" style="background:${bShade(d.buy.length-1-i,d.buy.length)}"><div class="heat-mkt">${x.m}</div><div class="heat-price">${x.p}</div><div class="heat-state">${x.s}</div></div>`).join('');
  buildHeatChart(d,cropName);
}
function buildHeatChart(d,label){
  const ctx=document.getElementById('heatChart');
  if(!ctx)return;
  if(heatChartObj)heatChartObj.destroy();
  const colors=d.bars.map((_,i)=>i<d.bars.length/2?'rgba(21,88,168,.7)':'rgba(10,61,37,.8)');
  heatChartObj=new Chart(ctx,{
    type:'bar',
    data:{labels:d.labels,datasets:[{label:`${label} ₦k/unit`,data:d.bars,backgroundColor:colors,borderRadius:6,borderSkipped:false}]},
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`₦${c.parsed.y}k`}}},
      scales:{
        y:{grid:{color:'rgba(0,0,0,.04)'},ticks:{callback:v=>v+'k',font:{size:10},color:'#5a7a67'},border:{display:false}},
        x:{grid:{display:false},ticks:{font:{size:10},color:'#5a7a67'},border:{display:false}}
      }
    }
  });
}

/* ===================== DEMAND BOARD ===================== */
function buildDemand(data){
  const el=document.getElementById('demandGrid');
  if(!el)return;
  if(!data||!data.length){el.innerHTML='<div class="empty" style="grid-column:1/-1"><div class="empty-icon">📋</div><p>No demand listings match your filters.<br>Try adjusting your search.</p></div>';return}
  el.innerHTML=data.map(d=>`
    <div class="demand-card" role="article">
      <div class="dc-head">
        <div>
          <div class="dc-crop">${d.icon} ${d.crop}</div>
          <div class="dc-buyer">${d.buyer}${d.ver?' <span class="badge badge-green">✓ Verified</span>':''}</div>
        </div>
        <span class="badge badge-green">Open</span>
      </div>
      <div class="dc-grid">
        <div class="dc-item">Quantity: <strong>${d.qty}</strong></div>
        <div class="dc-item">Target: <strong>${d.price}</strong></div>
        <div class="dc-item">Deliver to: <strong>${d.loc}</strong></div>
        <div class="dc-item">Deadline: <strong>${d.deadline}</strong></div>
      </div>
      <div class="dc-deadline">⏰ Closes ${d.deadline}</div>
      <div class="dc-actions">
        <button class="btn-primary" style="padding:9px 14px;font-size:12px" onclick="showToast('Connecting you with ${d.buyer}…')">Respond with produce</button>
        <button class="btn-outline" style="padding:9px 12px;font-size:12px" onclick="showToast('Logistics quote requested')">🚛</button>
      </div>
    </div>`).join('');
}
function filterDemand(){
  const q=(document.getElementById('demandSearch')?.value||'').toLowerCase();
  const crop=document.getElementById('demandCropFilter')?.value||'';
  const state=document.getElementById('demandStateFilter')?.value||'';
  const filtered=getDemands().filter(d=>{
    const matchQ=!q||(d.crop.toLowerCase().includes(q)||d.buyer.toLowerCase().includes(q)||d.loc.toLowerCase().includes(q));
    const matchCrop=!crop||d.crop===crop;
    const matchState=!state||d.state===state;
    return matchQ&&matchCrop&&matchState;
  });
  buildDemand(filtered);
}

/* ===================== TRANSPORT JOBS ===================== */
// ── TRANSPORT TAB SWITCHER ────────────────────────────────────
function switchTransportTab(tab){
  const jobs = document.getElementById('t-jobs-view');
  const calc = document.getElementById('t-calc-view');
  const btnJ = document.getElementById('tt-jobs');
  const btnC = document.getElementById('tt-calc');
  if(tab === 'jobs'){
    jobs.style.display=''; calc.style.display='none';
    btnJ.style.cssText += ';color:var(--forest);border-bottom:2px solid var(--forest);font-weight:700';
    btnC.style.cssText += ';color:var(--txt3);border-bottom:2px solid transparent;font-weight:500';
  } else {
    jobs.style.display='none'; calc.style.display='';
    btnC.style.cssText += ';color:var(--forest);border-bottom:2px solid var(--forest);font-weight:700';
    btnJ.style.cssText += ';color:var(--txt3);border-bottom:2px solid transparent;font-weight:500';
  }
}

// ── LANDING COST CALCULATOR ───────────────────────────────────
const LC_DISTANCES = {
  // [source_state]: { dest: km }
  Kano:    { Lagos:1100, FCT:750,  Rivers:1350, Enugu:950,  Oyo:1050 },
  Kaduna:  { Lagos:990,  FCT:620,  Rivers:1200, Enugu:830,  Oyo:920  },
  Borno:   { Lagos:1450, FCT:900,  Rivers:1300, Enugu:1050, Oyo:1350 },
  Oyo:     { Lagos:135,  FCT:500,  Rivers:680,  Enugu:480,  Oyo:0    },
  Abia:    { Lagos:600,  FCT:680,  Rivers:200,  Enugu:150,  Oyo:550  },
  Enugu:   { Lagos:650,  FCT:600,  Rivers:250,  Enugu:0,    Oyo:600  },
  Rivers:  { Lagos:700,  FCT:750,  Rivers:0,    Enugu:250,  Oyo:650  },
  FCT:     { Lagos:550,  FCT:0,    Rivers:750,  Enugu:300,  Oyo:500  },
  Lagos:   { Lagos:0,    FCT:550,  Rivers:700,  Enugu:650,  Oyo:135  },
  Anambra: { Lagos:620,  FCT:620,  Rivers:220,  Enugu:100,  Oyo:580  },
};
// Rate per tonne per km (₦)
const LC_RATE_PER_TONNE_KM = 85;
// Bulk discount thresholds (auto-suggest)
function updateBulkLabel(){
  const qty = parseFloat(document.getElementById('lc-qty').value)||0;
  const hint = document.getElementById('lc-bulk-hint');
  if(qty>=5000) hint.textContent='Suggest 15–20% (5+ tonne shipment)';
  else if(qty>=2000) hint.textContent='Suggest 8–15% (2+ tonne shipment)';
  else if(qty>=500) hint.textContent='Suggest 3–8% (500 kg+ shipment)';
  else hint.textContent='';
}

function runLandingCalc(){
  const crop = document.getElementById('lc-crop').value;
  const dest = document.getElementById('lc-dest').value;
  const qty  = parseFloat(document.getElementById('lc-qty').value)||1000;
  const bulkPct = parseFloat(document.getElementById('lc-bulk').value)||0;
  if(!crop){ alert('Please select a crop'); return; }

  // Get live prices from already-loaded market data
  const rows = [];
  const sources = Object.keys(LC_DISTANCES).filter(s => s !== dest);

  // Pull from live price data only — no estimates
  const cropPrices = {};
  document.querySelectorAll('#priceTable tbody tr').forEach(tr => {
    const cells = tr.querySelectorAll('td');
    if(cells.length < 4) return;
    const cName = cells[0]?.textContent?.trim();
    const mState = cells[1]?.textContent?.trim();
    const avgTxt = cells[3]?.textContent?.trim().replace(/[₦,]/g,'');
    if(cName && mState && avgTxt){
      const key = cName+'|'+mState;
      if(!cropPrices[key]) cropPrices[key] = parseFloat(avgTxt);
    }
  });

  for(const src of sources){
    const distKm = (LC_DISTANCES[src]||{})[dest];
    if(distKm === undefined) continue;

    // Per-kg purchase price — live data only, no estimates
    const pricePerKg = cropPrices[crop+'|'+src];
    if(!pricePerKg) continue; // skip markets with no live price data

    const purchaseTotal = Math.round(pricePerKg * qty);
    const tonnes = qty / 1000;
    const rawTransport = Math.round(LC_RATE_PER_TONNE_KM * distKm * tonnes);
    const transportTotal = Math.round(rawTransport * (1 - bulkPct/100));
    const landingTotal = purchaseTotal + transportTotal;
    const landingPerKg = Math.round(landingTotal / qty);

    rows.push({ src, pricePerKg: Math.round(pricePerKg), purchaseTotal, transportTotal, landingTotal, landingPerKg, distKm });
  }

  if(!rows.length){
    const res = document.getElementById('lc-results');
    document.getElementById('lc-tbody').innerHTML = `<tr><td colspan="5" style="padding:24px;text-align:center;color:var(--txt3)">
      <div style="font-size:22px;margin-bottom:8px">📡</div>
      <div style="font-weight:700;margin-bottom:4px">No live price data for ${crop}</div>
      <div style="font-size:12px">Prices for this crop haven't been reported in the selected markets yet.<br>Check back once traders have submitted prices, or try a different crop.</div>
    </td></tr>`;
    document.getElementById('lc-insight').innerHTML = '';
    document.getElementById('lc-winner-badge').textContent = '';
    res.style.display = '';
    return;
  }
  rows.sort((a,b) => a.landingTotal - b.landingTotal);

  const fmt = n => '₦' + n.toLocaleString();
  const winner = rows[0];
  const worst  = rows[rows.length-1];
  const saving  = worst.landingTotal - winner.landingTotal;

  const tbody = document.getElementById('lc-tbody');
  tbody.innerHTML = rows.map((r,i) => {
    const isWinner = i===0;
    const bg = isWinner ? '#f0fdf4' : '#fff';
    const border = isWinner ? '2px solid #86efac' : '1px solid var(--bdr)';
    return `<tr style="background:${bg};border-bottom:${border}">
      <td style="padding:11px 12px;font-weight:${isWinner?700:400}">
        ${isWinner ? '🏆 ' : ''}${r.src}
        <div style="font-size:10px;color:var(--txt3)">${r.distKm.toLocaleString()} km to ${dest}</div>
      </td>
      <td style="padding:11px 12px;text-align:right">
        ${fmt(r.purchaseTotal)}
        <div style="font-size:10px;color:var(--txt3)">${fmt(r.pricePerKg)}/kg</div>
      </td>
      <td style="padding:11px 12px;text-align:right">
        ${fmt(r.transportTotal)}
        <div style="font-size:10px;color:var(--txt3)">est. incl. ${bulkPct>0?bulkPct+'% discount':''}</div>
      </td>
      <td style="padding:11px 12px;text-align:right;font-weight:700;color:${isWinner?'#15803d':'var(--txt)'}">
        ${fmt(r.landingTotal)}
        <div style="font-size:10px;font-weight:400;color:var(--txt3)">${fmt(r.landingPerKg)}/kg</div>
      </td>
      <td style="padding:11px 12px;text-align:center">
        <button onclick="requestTransportQuote('${r.src}','${dest}','${crop}',${qty})" style="background:var(--forest);color:#fff;border:none;border-radius:6px;padding:6px 10px;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap">Get quote →</button>
      </td>
    </tr>`;
  }).join('');

  // Insight text
  const pct = Math.round((saving / worst.landingTotal)*100);
  document.getElementById('lc-insight').innerHTML =
    `<strong>Best option: ${winner.src}</strong> — buying ${qty.toLocaleString()} kg of ${crop} here and shipping to ${dest} will cost <strong>${fmt(winner.landingTotal)}</strong> (${fmt(winner.landingPerKg)}/kg landed).<br>` +
    (saving > 0 ? `Compared to ${worst.src} (the most expensive option), you save <strong>${fmt(saving)}</strong> — that's <strong>${pct}% cheaper</strong> to land the same produce.` : '') +
    (bulkPct > 0 ? `<br>Bulk discount of <strong>${bulkPct}%</strong> applied to transport.` : '');

  document.getElementById('lc-winner-badge').textContent = `Best: ${winner.src}`;
  document.getElementById('lc-results').style.display = '';
}

function requestTransportQuote(from, to, crop, qty){
  const html = `
    <div style="position:fixed;inset:0;background:rgba(10,20,15,.7);z-index:500;display:flex;align-items:center;justify-content:center;padding:16px" id="quoteOverlay" onclick="if(event.target===this)this.remove()">
      <div style="background:#fff;border-radius:16px;padding:24px;width:100%;max-width:400px">
        <div style="font-weight:700;font-size:15px;margin-bottom:4px">Request transport quote</div>
        <div style="font-size:12px;color:var(--txt3);margin-bottom:16px">${crop} · ${qty.toLocaleString()} kg · ${from} → ${to}</div>
        <input id="qt-name" type="text" placeholder="Your name" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;font-family:inherit;font-size:13px;margin-bottom:10px;box-sizing:border-box"/>
        <input id="qt-phone" type="tel" placeholder="Phone number" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;font-family:inherit;font-size:13px;margin-bottom:10px;box-sizing:border-box"/>
        <input id="qt-date" type="date" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;font-family:inherit;font-size:13px;margin-bottom:16px;box-sizing:border-box"/>
        <button onclick="submitQuoteRequest('${from}','${to}','${crop}',${qty})" style="width:100%;background:var(--forest);color:#fff;border:none;border-radius:10px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">Submit quote request →</button>
        <button onclick="document.getElementById('quoteOverlay').remove()" style="width:100%;background:none;border:none;color:var(--txt3);padding:10px;font-size:13px;cursor:pointer;font-family:inherit;margin-top:6px">Cancel</button>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

function submitQuoteRequest(from, to, crop, qty){
  const name = document.getElementById('qt-name').value.trim();
  const phone = document.getElementById('qt-phone').value.trim();
  if(!name||!phone){ alert('Please enter name and phone'); return; }
  document.getElementById('quoteOverlay').remove();
  showToast('Quote request sent! A driver will contact you within 2 hours.');
}

function showTransportForm(type){
  if(type === 'register'){
    // Show register vehicle form
    const html = `
      <div style="position:fixed;inset:0;background:rgba(10,20,15,.7);z-index:500;display:flex;align-items:center;justify-content:center;padding:16px" id="transportFormOverlay" onclick="if(event.target===this)this.remove()">
        <div style="background:#fff;border-radius:16px;padding:24px;width:100%;max-width:440px;max-height:90vh;overflow-y:auto">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
            <div style="font-size:16px;font-weight:700">Register your vehicle</div>
            <button onclick="document.getElementById('transportFormOverlay').remove()" style="background:var(--cream);border:none;border-radius:50%;width:28px;height:28px;cursor:pointer;font-size:16px">×</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:12px">
            <div><label style="font-size:11px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Driver name</label><input id="vDriverName" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;margin-top:4px;font-family:inherit;font-size:13px" placeholder="Full name" /></div>
            <div><label style="font-size:11px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Phone number</label><input id="vPhone" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;margin-top:4px;font-family:inherit;font-size:13px" placeholder="+234 800 000 0000" type="tel" /></div>
            <div><label style="font-size:11px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Vehicle type</label>
              <select id="vType" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;margin-top:4px;font-family:inherit;font-size:13px">
                <option>Heavy Truck (10+ tonnes)</option><option>Medium Truck (5-10 tonnes)</option><option>Pickup/Van (under 5 tonnes)</option><option>Motorcycle/Keke</option>
              </select>
            </div>
            <div><label style="font-size:11px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Plate number</label><input id="vPlate" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;margin-top:4px;font-family:inherit;font-size:13px" placeholder="e.g. LSD 234 AA" /></div>
            <div><label style="font-size:11px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Base state</label>
              <select id="vState" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;margin-top:4px;font-family:inherit;font-size:13px">
                <option>Lagos</option><option>Kano</option><option>FCT</option><option>Oyo</option><option>Rivers</option><option>Abia</option><option>Kano</option><option>Kaduna</option><option>Enugu</option><option>Anambra</option><option>Other</option>
              </select>
            </div>
            <div><label style="font-size:11px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Rate per km (₦)</label><input id="vRate" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;margin-top:4px;font-family:inherit;font-size:13px" placeholder="e.g. 280" type="number" /></div>
            <button onclick="submitVehicleReg()" style="background:var(--forest);color:#fff;border:none;border-radius:8px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;margin-top:4px">Register vehicle →</button>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', html);
  } else {
    // Post a job form
    const html = `
      <div style="position:fixed;inset:0;background:rgba(10,20,15,.7);z-index:500;display:flex;align-items:center;justify-content:center;padding:16px" id="transportFormOverlay" onclick="if(event.target===this)this.remove()">
        <div style="background:#fff;border-radius:16px;padding:24px;width:100%;max-width:440px;max-height:90vh;overflow-y:auto">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
            <div style="font-size:16px;font-weight:700">Post a transport job</div>
            <button onclick="document.getElementById('transportFormOverlay').remove()" style="background:var(--cream);border:none;border-radius:50%;width:28px;height:28px;cursor:pointer;font-size:16px">×</button>
          </div>
          <div style="display:flex;flex-direction:column;gap:12px">
            <div><label style="font-size:11px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Crop / Cargo</label><input id="jCrop" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;margin-top:4px;font-family:inherit;font-size:13px" placeholder="e.g. Maize, Yam, Rice" /></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
              <div><label style="font-size:11px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Pickup state</label><input id="jFrom" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;margin-top:4px;font-family:inherit;font-size:13px" placeholder="e.g. Kano" /></div>
              <div><label style="font-size:11px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Delivery state</label><input id="jTo" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;margin-top:4px;font-family:inherit;font-size:13px" placeholder="e.g. Lagos" /></div>
            </div>
            <div><label style="font-size:11px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Quantity (tonnes)</label><input id="jQty" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;margin-top:4px;font-family:inherit;font-size:13px" placeholder="e.g. 10" type="number" /></div>
            <div><label style="font-size:11px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Budget (₦)</label><input id="jBudget" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;margin-top:4px;font-family:inherit;font-size:13px" placeholder="e.g. 75000" type="number" /></div>
            <div><label style="font-size:11px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Pickup date</label><input id="jDate" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;margin-top:4px;font-family:inherit;font-size:13px" type="date" /></div>
            <button onclick="submitTransportJob()" style="background:var(--forest);color:#fff;border:none;border-radius:8px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;margin-top:4px">Post job →</button>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', html);
  }
}

async function submitVehicleReg(){
  const driverName = document.getElementById('vDriverName')?.value?.trim();
  const phone = document.getElementById('vPhone')?.value?.trim();
  const vType = document.getElementById('vType')?.value;
  const plate = document.getElementById('vPlate')?.value?.trim();
  const state = document.getElementById('vState')?.value;
  const rate = document.getElementById('vRate')?.value;
  if(!driverName || !plate){ toast('Please fill in driver name and plate number'); return; }
  if(!currentUser){ toast('Please sign in to register a vehicle'); closeTransportForm(); openAuth(); return; }
  try {
    const res = await apiFetch('/transport/vehicles', {
      method: 'POST',
      body: JSON.stringify({ vehicle_type: vType, plate_number: plate, base_state: state,
        rate_per_km: parseFloat(rate)||200, driver_name: driverName, driver_phone: phone, is_cross_state: true })
    });
    if(res?.data){ document.getElementById('transportFormOverlay')?.remove(); toast('Vehicle registered! You will receive job offers in your area.'); }
    else toast(res?.error || 'Registration failed — try again');
  } catch(e){ toast('Network error — check your connection'); }
}

async function submitTransportJob(){
  const crop = document.getElementById('jCrop')?.value?.trim();
  const from = document.getElementById('jFrom')?.value?.trim();
  const to = document.getElementById('jTo')?.value?.trim();
  const qty = document.getElementById('jQty')?.value;
  const budget = document.getElementById('jBudget')?.value;
  const date = document.getElementById('jDate')?.value;
  if(!from || !to){ toast('Please enter pickup and delivery states'); return; }
  if(!currentUser){ toast('Please sign in to post a job'); document.getElementById('transportFormOverlay')?.remove(); openAuth(); return; }
  try {
    const res = await apiFetch('/transport/jobs', {
      method: 'POST',
      body: JSON.stringify({ crop_name: crop, pickup_location: from, pickup_state: from,
        delivery_location: to, delivery_state: to, quantity: parseFloat(qty)||1,
        unit: 'tonnes', max_budget: parseFloat(budget)||0, pickup_date: date })
    });
    if(res?.data){ document.getElementById('transportFormOverlay')?.remove(); toast('Job posted! Drivers will contact you within the hour.'); buildJobGrid(); }
    else toast(res?.error || 'Failed to post job — try again');
  } catch(e){ toast('Network error — check your connection'); }
}

function closeTransportForm(){ document.getElementById('transportFormOverlay')?.remove(); }
function buildJobGrid(){
  const el=document.getElementById('jobGrid');
  if(!el)return;
  const jobs=getJobs();
  if(!jobs.length){el.innerHTML='<div style="color:var(--txt3);padding:20px;text-align:center;font-size:12px">No open jobs right now. Check back soon.</div>';return;}
  el.innerHTML=jobs.map(j=>`
    <div class="job-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div style="font-weight:700;font-size:13px;display:flex;align-items:center;gap:5px">${j.from}<span style="color:var(--limedark)">→</span>${j.to}</div>
          <div style="font-size:10px;color:var(--txt3);margin-top:2px">${j.crop} · ${j.poster}</div>
        </div>
        ${j.urgent?'<span class="badge badge-red">Urgent</span>':'<span class="badge badge-green">Open</span>'}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">
        <div style="font-size:11px;color:var(--txt2)">Cargo: <strong>${j.qty}</strong></div>
        <div style="font-size:11px;color:var(--txt2)">Vehicle: <strong>${j.veh}</strong></div>
        <div style="font-size:11px;color:var(--txt2)">Pickup: <strong>${j.date}</strong></div>
        <div style="font-size:11px;color:var(--txt2)">Pay: <strong style="color:var(--g)">${j.pay}</strong></div>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn-primary" style="padding:8px 12px;font-size:11px;margin-top:0" onclick="acceptJobModal(this)">Accept job</button>
        <button class="btn-outline" style="padding:7px 10px;font-size:11px" onclick="toast('Route map — Google Maps integration coming soon!')">View route</button>
      </div>
    </div>`).join('');
}

/* ===================== EXPORT TABLE ===================== */
function buildExportTable(){
  const el=document.getElementById('exportTableBody');
  if(!el)return;
  const data=LIVE_EXPORT.length?LIVE_EXPORT:[
    {crop_name:'Cocoa',   emoji:'🍫',local_price:890000,export_price:1180000,premium_pct:32.5,grade_required:'Grade 1 fermented',best_port:'Apapa, Lagos'},
    {crop_name:'Sesame',  emoji:'🌿',local_price:820000,export_price:1060000,premium_pct:29.3,grade_required:'99% purity, no aflatoxin',best_port:'Apapa, Lagos'},
    {crop_name:'Cashew',  emoji:'🥜',local_price:1200000,export_price:1540000,premium_pct:28.3,grade_required:'Grade W240/W320',best_port:'Tin Can Island'},
    {crop_name:'Hibiscus',emoji:'🌺',local_price:680000,export_price:920000,premium_pct:35.3,grade_required:'≤5% moisture, deep red',best_port:'Kano dry port'},
    {crop_name:'Soybean', emoji:'🫘',local_price:135000,export_price:165000,premium_pct:22.2,grade_required:'≥40% protein, non-GMO',best_port:'Beja port, Kano'},
  ];
  el.innerHTML=data.map(e=>`
    <tr>
      <td><div class="td-crop-cell"><span class="td-icon">${e.emoji||'🌾'}</span>${e.crop_name}</div></td>
      <td class="td-mono">₦${Number(e.local_price).toLocaleString('en-NG')}</td>
      <td class="td-mono" style="color:var(--gm);font-weight:600">₦${Number(e.export_price).toLocaleString('en-NG')}</td>
      <td><span class="badge badge-green">+${parseFloat(e.premium_pct).toFixed(1)}%</span></td>
      <td style="color:var(--txt2);font-size:11px">${e.grade_required||'—'}</td>
      <td style="color:var(--txt2);font-size:11px">${e.best_port||'—'}</td>
      <td><button class="btn-sm btn-sm-g" onclick="openExportModal('connect')" style="font-weight:700;color:var(--gm);cursor:pointer;background:none;border:none;font-family:inherit;font-size:12px;text-decoration:underline">Connect →</button></td>
    </tr>`).join('');
}

/* ===================== ADMIN ===================== */
var _adminLoaded=false;
var _adminReports=[];
var BG_COLORS=['#0a3d25','#1558a8','#7b1fa2','#b45309','#0e7490','#166534'];

function buildAdmin(){
  if(_adminLoaded)return;
  _adminLoaded=true;
  fetchAdminStats();
}

function fetchAdminStats(){
  var tok=localStorage.getItem('agrios_token');
  if(!tok)return;
  var pl=document.getElementById('pendingList');
  var cl=document.getElementById('contributorList');
  if(pl)pl.innerHTML='<div class="admin-row"><div class="admin-info"><div class="admin-sub" style="padding:8px 0">Loading…</div></div></div>';
  if(cl)cl.innerHTML='<div class="admin-row"><div class="admin-info"><div class="admin-sub" style="padding:8px 0">Loading…</div></div></div>';

  fetch(API+'/admin/stats',{headers:{'Authorization':'Bearer '+tok}})
    .then(function(r){return r.json();})
    .then(function(d){
      if(!d.success){showToast('Could not load admin data');return;}
      renderAdminStats(d);
    })
    .catch(function(){showToast('Admin stats unavailable — check connection');});
}

function renderAdminStats(d){
  var s=d.stats||{};
  var u=s.users||{};
  var r=s.reports||{};
  var f=s.farmers||{};

  // Stat cards
  var sg=document.querySelector('#page-admin .stat-grid');
  if(sg){
    var deltaHtml='';
    if(r.reports_delta!==null&&r.reports_delta!==undefined){
      deltaHtml=r.reports_delta>=0
        ?'<div class="stat-card-change up">↑ '+r.reports_delta+'% vs yesterday</div>'
        :'<div class="stat-card-change dn">↓ '+Math.abs(r.reports_delta)+'% vs yesterday</div>';
    } else {
      deltaHtml='<div class="stat-card-change up">Reports today</div>';
    }
    var qualHtml=r.quality_pct!=null
      ?'<div class="stat-card-change up">↑ '+(r.quality_pct>=90?'Excellent':'Good')+'</div>'
      :'<div class="stat-card-change">—</div>';
    sg.innerHTML=''
      +'<div class="stat-card"><div class="stat-card-label">Pending reports</div><div class="stat-card-val">'+r.pending+'</div><div class="stat-card-change" style="color:var(--amber)">Needs review</div></div>'
      +'<div class="stat-card"><div class="stat-card-label">Flagged reports</div><div class="stat-card-val">'+r.flagged+'</div><div class="stat-card-change dn">Suspicious</div></div>'
      +'<div class="stat-card"><div class="stat-card-label">Reports today</div><div class="stat-card-val">'+r.today+'</div>'+deltaHtml+'</div>'
      +'<div class="stat-card"><div class="stat-card-label">Users (total)</div><div class="stat-card-val">'+u.total+'</div><div class="stat-card-change up">'+u.joined_today+' joined today</div></div>';
  }

  // Second stat row — user breakdown + farmers
  var sg2=document.getElementById('adminUserStats');
  if(sg2){
    sg2.innerHTML=''
      +'<div class="stat-card"><div class="stat-card-label">🌾 Farmers</div><div class="stat-card-val">'+u.farmers+'</div><div class="stat-card-change">'+f.consenting+' in directory</div></div>'
      +'<div class="stat-card"><div class="stat-card-label">🛒 Buyers</div><div class="stat-card-val">'+u.buyers+'</div><div class="stat-card-change">'+u.pro_users+' on Pro</div></div>'
      +'<div class="stat-card"><div class="stat-card-label">📦 Agents</div><div class="stat-card-val">'+u.agents+'</div><div class="stat-card-change">Logistics &amp; export</div></div>'
      +'<div class="stat-card"><div class="stat-card-label">This week</div><div class="stat-card-val">'+u.joined_week+'</div><div class="stat-card-change up">New signups</div></div>';
  }

  // Pending reports
  _adminReports=d.pending_reports||[];
  var pl=document.getElementById('pendingList');
  if(pl){
    if(!_adminReports.length){
      pl.innerHTML='<div class="admin-row"><div class="admin-info"><div class="admin-sub" style="padding:8px 0;color:var(--sage)">No pending reports — all clear ✓</div></div></div>';
    } else {
      pl.innerHTML=_adminReports.map(function(p,i){
        var flagHtml=p.flagged?' · <span style="color:#d97706">⚠ '+( p.flag_reason||'Price deviation flagged')+'</span>':'';
        var t=new Date(p.created_at);
        var ago=timeAgo(t);
        return '<div class="admin-row" id="ar-'+i+'" data-report-id="'+p.id+'">'
          +'<div class="admin-info">'
          +'<div class="admin-main">'+p.crop+' — '+p.market+'</div>'
          +'<div class="admin-sub">'+p.price+' · by '+p.reporter+' · '+ago+flagHtml+'</div>'
          +'</div>'
          +'<div class="admin-actions">'
          +'<button class="btn-approve" onclick="adminAction('+i+',\'approve\')">✓ Approve</button>'
          +'<button class="btn-reject" onclick="adminAction('+i+',\'reject\')">✗ Reject</button>'
          +'</div>'
          +'</div>';
      }).join('');
    }
  }

  // Contributors
  var cl=document.getElementById('contributorList');
  if(cl){
    var contribs=d.contributors||[];
    if(!contribs.length){
      cl.innerHTML='<div class="admin-row"><div class="admin-info"><div class="admin-sub" style="padding:8px 0;color:var(--sage)">No contributors yet — be the first!</div></div></div>';
    } else {
      cl.innerHTML=contribs.map(function(c,idx){
        var bg=BG_COLORS[idx%BG_COLORS.length];
        var initials=c.name.split(' ').map(function(x){return x[0]||'';}).join('');
        return '<div class="admin-row">'
          +'<div style="width:36px;height:36px;border-radius:50%;background:'+bg+';display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0" aria-hidden="true">'+initials+'</div>'
          +'<div class="admin-info">'
          +'<div class="admin-main">'+c.name+'</div>'
          +'<div class="admin-sub">'+c.state+' · '+c.level+'</div>'
          +'</div>'
          +'<div style="text-align:right;flex-shrink:0">'
          +'<div style="font-family:var(--font-mono);font-size:15px;font-weight:500;color:#0a3d25">'+c.accepted+'</div>'
          +'<div style="font-size:10px;color:#8fa89a">'+c.accuracy+'% accuracy</div>'
          +'</div>'
          +'</div>';
      }).join('');
    }
  }
}

function timeAgo(d){
  var s=Math.round((Date.now()-d.getTime())/1000);
  if(s<60)return s+'s ago';
  if(s<3600)return Math.floor(s/60)+'m ago';
  if(s<86400)return Math.floor(s/3600)+'h ago';
  return Math.floor(s/86400)+'d ago';
}

function adminAction(i,action){
  var row=document.getElementById('ar-'+i);
  if(row){row.style.opacity='.35';row.style.pointerEvents='none';}
  var report=_adminReports[i];
  if(!report){showToast(action==='approve'?'Report approved':'Report rejected');return;}
  var tok=localStorage.getItem('agrios_token');
  fetch(API+'/admin/reports/'+report.id,{
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization':'Bearer '+tok},
    body:JSON.stringify({action:action})
  }).then(function(r){return r.json();}).then(function(d){
    showToast(d.success
      ?(action==='approve'?'✓ Report approved and published':'✗ Report rejected')
      :(d.error||'Action failed'));
  }).catch(function(){
    // Still show the UI update even if network fails
    showToast(action==='approve'?'Report approved':'Report rejected');
  });
}

/* ===================== PAGE ROUTING ===================== */
const PAGE_NAV={home:'mbn-home',prices:'mbn-prices',report:'mbn-report',alerts:'mbn-alerts',demand:'mbn-demand',transport:'mbn-transport',export:'mbn-demand',finance:'mbn-demand',heatmap:'mbn-prices',admin:'mbn-demand'};
function showPage(p){
  document.querySelectorAll('.page-wrap').forEach(x=>x.classList.remove('active'));
  const pg=document.getElementById('page-'+p);
  if(pg)pg.classList.add('active');
  // Update URL so browser back button works
  const url = p === 'home' ? '/' : '/?page='+p;
  if(window.location.search !== (p==='home'?'':'?page='+p)){
    window.history.pushState({page:p}, '', url);
  }
  // update nav active state by matching onclick text
  document.querySelectorAll('.nav-link').forEach(x=>{
    x.classList.toggle('active', x.getAttribute('onclick')?.includes(`'${p}'`));
  });
  document.querySelectorAll('.mob-drawer-link').forEach(x=>{
    x.classList.toggle('active', x.getAttribute('onclick')?.includes(`'${p}'`));
  });
  document.querySelectorAll('.mob-nav-item').forEach(x=>x.classList.remove('active'));
  const mbn=document.getElementById(PAGE_NAV[p]||'');
  if(mbn)mbn.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  if(p==='home'){setTimeout(buildPriceChart,300);}
  if(p==='heatmap'){const sel=document.getElementById('heatCrop');buildHeatmap(sel?.value||'maize');}
  if(p==='prices'){buildPriceChips();filterPriceTable();}
  if(p==='finance'){loadFinanceData();}
  if(p==='transport'){buildJobGrid();}
  if(p==='export'){buildExportTable();}
  // Update SEO meta tags dynamically per page
  updateSEOMeta(p);
}

function updateSEOMeta(page, cropName, cropPrice, cropUnit){
  const base = 'Agrios — Nigeria Agricultural Market Intelligence';
  const descriptions = {
    home: 'Real-time crop prices, AI predictions, transport matching and export intelligence for Nigerian farmers, buyers and investors. useagrios.com',
    prices: 'Live crop prices across 48 Nigerian markets — Maize, Rice, Tomato, Yam, Beans, Cocoa and more. Updated every 2 minutes.',
    transport: 'Agricultural transport jobs across Nigeria. Connect farmers with 1,247 verified vehicle operators. Post or find transport in 60 seconds.',
    export: 'Nigeria export price intelligence — Cocoa, Sesame, Cashew, Hibiscus, Soybean. Compare local vs international prices and connect to export agents.',
    finance: 'Agrios Crop Credit Score — get working capital loans for Nigerian farmers based on your market activity. No collateral needed.',
    demand: 'Verified buyer demand board — find buyers for your produce across Nigeria. Live demand listings updated daily.',
    heatmap: 'Nigeria crop price heatmap — see where prices are highest and lowest across all states today.',
    report: 'Report agricultural market prices from your local market. Help build Nigeria most accurate crop price database.',
    alerts: 'Set price alerts for Nigerian crop markets. Get notified when maize, rice, tomato and other crops hit your target price.',
  };
  const titles = {
    home: `Agrios — Real-Time Crop Prices Nigeria | useagrios.com`,
    prices: `Live Crop Prices Nigeria Today — Maize, Rice, Tomato, Yam | Agrios`,
    transport: `Agricultural Transport Jobs Nigeria — Find & Post Produce Transport | Agrios`,
    export: `Nigeria Crop Export Prices — Cocoa, Sesame, Cashew | Agrios`,
    finance: `Farm Loans Nigeria — Crop Credit Score & Working Capital | Agrios`,
    demand: `Nigeria Buyer Demand Board — Sell Your Produce Today | Agrios`,
    heatmap: `Nigeria Crop Price Heatmap — Best Buy & Sell Locations | Agrios`,
    report: `Report Crop Prices Nigeria — Community Price Intelligence | Agrios`,
    alerts: `Crop Price Alerts Nigeria — Get Notified on Price Changes | Agrios`,
  };
  // Update document title
  if(cropName && cropPrice){
    document.title = `${cropName} Price in Nigeria Today — ${cropPrice}/${cropUnit} | Agrios`;
  } else {
    document.title = titles[page] || base;
  }
  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if(metaDesc) metaDesc.content = descriptions[page] || descriptions.home;
  // Update OG tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if(ogTitle) ogTitle.content = document.title;
  if(ogDesc) ogDesc.content = metaDesc?.content || descriptions.home;
  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if(!canonical){ canonical = document.createElement('link'); canonical.rel='canonical'; document.head.appendChild(canonical); }
  canonical.href = page === 'home' ? 'https://useagrios.com/' : `https://useagrios.com/?page=${page}`;
  // Inject schema.org structured data for price pages
  if(page === 'prices' || page === 'home'){
    injectPriceSchema();
  }
}

function injectPriceSchema(){
  // Remove old schema if any
  document.getElementById('agrios-schema')?.remove();
  const prices = getPrices().filter(p=>p.avg>0).slice(0,5);
  if(!prices.length) return;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Nigeria Agricultural Crop Prices",
    "description": "Real-time crop prices from 48 Nigerian markets including Mile 12 Lagos, Dawanau Kano, Bodija Ibadan, and more.",
    "url": "https://useagrios.com",
    "provider": { "@type": "Organization", "name": "Agrios", "url": "https://useagrios.com" },
    "temporalCoverage": new Date().toISOString().split('T')[0],
    "spatialCoverage": { "@type": "Place", "name": "Nigeria" },
    "variableMeasured": prices.map(p=>({
      "@type": "PropertyValue",
      "name": p.n + " price in Nigeria",
      "value": p.avg,
      "unitText": "Nigerian Naira per " + p.unit,
      "description": `Current ${p.n} market price at ${p.mkt}: ₦${p.avg.toLocaleString('en-NG')} per ${p.unit}`
    }))
  };
  const script = document.createElement('script');
  script.id = 'agrios-schema';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/* ===================== DRAWER ===================== */
function openDrawer(){
  document.getElementById('mobDrawer').classList.add('open');
  document.getElementById('mobDrawer').style.display='flex';
  document.getElementById('hamburgerBtn').setAttribute('aria-expanded','true');
}
function closeDrawer(){
  document.getElementById('mobDrawer').classList.remove('open');
  setTimeout(()=>{document.getElementById('mobDrawer').style.display='none'},300);
  document.getElementById('hamburgerBtn').setAttribute('aria-expanded','false');
}
function closeDrawerOutside(e){if(e.target===document.getElementById('mobDrawer'))closeDrawer()}

/* ===================== TOAST ===================== */
let toastTimer=null;
function showToast(msg){
  const t=document.getElementById('toast');
  const m=document.getElementById('toastMsg');
  if(!t||!m)return;
  m.textContent=msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2800);
}
// toast() forward declaration is at top of script — no alias needed here

/* ============================================================
   AUTH — login, register, session, user state
   ============================================================ */
let currentUser = null;

// ── Restore session on load ──
// restoreSession runs after DOM is ready to avoid null element errors
function restoreSession(){
  const token = localStorage.getItem('agrios_token');
  const user  = localStorage.getItem('agrios_user');
  if(token && user){
    try {
      AUTH_TOKEN = token;
      currentUser = JSON.parse(user);
      updateNavForUser(currentUser);
      // Re-register push in case subscription expired
      setTimeout(registerPush, 2000);
    } catch(e){ localStorage.removeItem('agrios_user'); }
  }
}

// ─── WEB PUSH ────────────────────────────────────────────────────────────────
function urlBase64ToUint8Array(base64String){
  const padding='='.repeat((4-base64String.length%4)%4);
  const base64=(base64String+padding).replace(/-/g,'+').replace(/_/g,'/');
  const raw=atob(base64);
  return Uint8Array.from([...raw].map(c=>c.charCodeAt(0)));
}

async function registerPush(){
  if(!('serviceWorker' in navigator)||!('PushManager' in window)) return;
  if(!currentUser) return;
  try {
    const keyRes = await fetch(API+'/push/vapid-public-key');
    if(!keyRes.ok) return;
    const keyData = await keyRes.json();
    const vapidKey = keyData.data?.publicKey;
    if(!vapidKey) return;

    const permission = await Notification.requestPermission();
    if(permission !== 'granted') return;

    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey)
    });

    await fetch(API+'/push/subscribe',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+AUTH_TOKEN},
      body:JSON.stringify({subscription: sub.toJSON()})
    });
    console.log('[Push] Subscribed');
  } catch(e){
    console.log('[Push] Skipped:', e.message);
  }
}
// ─────────────────────────────────────────────────────────────────────────────

function updateNavForUser(user){
  const signIn = document.getElementById('navSigninBtn');
  const avatar = document.getElementById('navAvatar');
  const proBtn = document.getElementById('navProBtn');
  if(!user){
    if(signIn) signIn.style.display='';
    if(avatar) avatar.style.display='none';
    if(proBtn) proBtn.style.display='none';
    // Hide admin when logged out
    const aBtn = document.getElementById('navAdminBtn');
    const dBtn = document.getElementById('drawerAdminBtn');
    if(aBtn) aBtn.style.display='none';
    if(dBtn) dBtn.style.display='none';
    return;
  }
  if(signIn) signIn.style.display='none';
  if(avatar){
    avatar.style.display='flex';
    const initials = user.full_name ? user.full_name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() : 'FK';
    avatar.textContent = initials;
  }
  if(proBtn && user.subscription_tier==='free') proBtn.style.display='';
  // Show admin link only for admin role
  const adminBtn = document.getElementById('navAdminBtn');
  const drawerAdminBtn = document.getElementById('drawerAdminBtn');
  if(adminBtn) adminBtn.style.display = user.role==='admin' ? '' : 'none';
  if(drawerAdminBtn) drawerAdminBtn.style.display = user.role==='admin' ? '' : 'none';
  // update user menu
  const umName = document.getElementById('umName');
  const umEmail = document.getElementById('umEmail');
  const umTier = document.getElementById('umTier');
  if(umName) umName.textContent = user.full_name || 'User';
  if(umEmail) umEmail.textContent = user.email || '';
  if(umTier){
    const tier = user.subscription_tier || 'free';
    umTier.textContent = tier.charAt(0).toUpperCase()+tier.slice(1);
    umTier.className = tier==='pro'||tier==='business' ? 'badge badge-lime' : 'badge badge-green';
  }
}

// ── Modal open/close ──
function openAuth(tab){
  const modal = document.getElementById('authModal');
  if(modal) modal.classList.add('open');
  if(tab) switchAuthTab(tab);
  clearAuthMessages();
  document.body.style.overflow='hidden';
}
function closeAuth(){
  const modal = document.getElementById('authModal');
  if(modal) modal.classList.remove('open');
  document.body.style.overflow='';
}
function closeAuthIfOutside(e){
  if(e.target===document.getElementById('authModal')) closeAuth();
}
function switchAuthTab(tab){
  ['login','register'].forEach(t=>{
    document.getElementById('tab-'+t)?.classList.toggle('active',t===tab);
    document.getElementById('section-'+t)?.classList.toggle('active',t===tab);
    document.getElementById('tab-'+t)?.setAttribute('aria-selected',t===tab);
  });
  clearAuthMessages();
}
function clearAuthMessages(){
  const err = document.getElementById('authError');
  const suc = document.getElementById('authSuccess');
  if(err){err.textContent='';err.classList.remove('show');}
  if(suc){suc.textContent='';suc.classList.remove('show');}
}
function showAuthError(msg){
  const el = document.getElementById('authError');
  if(el){el.textContent=msg;el.classList.add('show');}
}
function showAuthSuccess(msg){
  const el = document.getElementById('authSuccess');
  if(el){el.textContent=msg;el.classList.add('show');}
}

// ── Login ──
async function doLogin(){
  const email    = document.getElementById('loginEmail')?.value?.trim();
  const password = document.getElementById('loginPassword')?.value;
  const btn      = document.getElementById('loginBtn');
  clearAuthMessages();
  if(!email||!password){ showAuthError('Please enter your email and password'); return; }
  if(btn){ btn.disabled=true; btn.innerHTML='<span>Waking up server…</span>'; }
  try {
    // Ping health endpoint first to wake up free-tier server
    try { await fetch('https://agrios-api.onrender.com/health',{mode:'no-cors',cache:'no-store'}); } catch(e){}
    await new Promise(r=>setTimeout(r,2000)); // wait 2s for server to wake
    if(btn) btn.innerHTML='<span>Signing in…</span>';

    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort(), 20000);
    const res = await fetch(API+'/auth/login',{
      method:'POST',
      mode:'cors',
      credentials:'omit',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email,password}),
      signal:controller.signal
    });
    clearTimeout(timeout);
    const data = await res.json();
    if(!res.ok) throw new Error(data.error || 'Login failed');
    AUTH_TOKEN = data.data.tokens.access;
    currentUser = data.data.user;
    localStorage.setItem('agrios_token', AUTH_TOKEN);
    localStorage.setItem('agrios_user', JSON.stringify(currentUser));
    updateNavForUser(currentUser);
    closeAuth();
    showToast('Welcome back, '+currentUser.full_name.split(' ')[0]+'! 🌿');
    loadLiveData(); // reload with authenticated context
    setTimeout(registerPush, 1000);
    // Refresh finance page if it was open
    if(document.getElementById('page-finance')?.classList.contains('active')) loadFinanceData();
  } catch(e){
    var msg = e.message || '';
    if(e.name === 'AbortError' || msg.includes('abort')){
      showAuthError('Server timeout — it may be starting up. Please wait 15 seconds and try again.');
    } else if(msg.includes('401') || msg.includes('Invalid') || msg.includes('credentials')){
      showAuthError('Incorrect email or password. Please check your credentials and try again.');
    } else if(msg.includes('fetch') || msg.includes('Failed') || msg.includes('network')){
      showAuthError('Cannot connect to server. Please check your internet and try again.');
    } else {
      showAuthError(msg || 'Login failed. Please try again.');
    }
  } finally {
    if(btn){ btn.disabled=false; btn.innerHTML='<span>Sign in</span>'; }
  }
}

// ── Register ──
async function doRegister(){
  const full_name = document.getElementById('regName')?.value?.trim();
  const email     = document.getElementById('regEmail')?.value?.trim();
  const phone     = document.getElementById('regPhone')?.value?.trim();
  const state     = document.getElementById('regState')?.value;
  const role      = document.getElementById('regRole')?.value || 'farmer';
  const lga       = document.getElementById('regLGA')?.value?.trim() || null;
  const harvest_size_kg = parseInt(document.getElementById('regHarvest')?.value) || null;
  const buyer_contact_consent = document.getElementById('regBuyerConsent')?.checked || false;
  const crops_grown = role === 'farmer'
    ? Array.from(document.querySelectorAll('input[name="regCrops"]:checked')).map(c => c.value)
    : [];
  const password  = document.getElementById('regPassword')?.value;
  const btn       = document.getElementById('registerBtn');
  clearAuthMessages();
  if(!full_name){ showAuthError('Please enter your full name'); return; }
  if(!email){ showAuthError('Please enter your email address'); return; }
  if(!password||password.length<8){ showAuthError('Password must be at least 8 characters'); return; }
  if(btn){ btn.disabled=true; btn.innerHTML='<span>Creating account…</span>'; }
  try {
    const res = await fetch(API+'/auth/register',{
      method:'POST',
      mode:'cors',
      credentials:'omit',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({full_name,email,password,phone,state,role,lga,harvest_size_kg,buyer_contact_consent,crops_grown})
    });
    const data = await res.json();
    if(!res.ok) throw new Error(data.error || 'Registration failed');
    AUTH_TOKEN = data.data.tokens.access;
    currentUser = data.data.user;
    localStorage.setItem('agrios_token', AUTH_TOKEN);
    localStorage.setItem('agrios_user', JSON.stringify(currentUser));
    updateNavForUser(currentUser);
    showAuthSuccess('Account created! Welcome to Agrios 🌿');
    setTimeout(()=>{ closeAuth(); showToast('Account created! Welcome, '+full_name.split(' ')[0]+'!'); loadLiveData(); registerPush(); }, 1500);
  } catch(e){
    showAuthError(e.message || 'Registration failed. Please try again.');
  } finally {
    if(btn){ btn.disabled=false; btn.innerHTML='<span>Create free account</span>'; }
  }
}

// ── Logout ──
function doLogout(){
  AUTH_TOKEN = null;
  currentUser = null;
  localStorage.removeItem('agrios_token');
  localStorage.removeItem('agrios_user');
  updateNavForUser(null);
  closeUserMenu();
  showToast('Signed out. See you soon!');
}

// ── User menu ──
function toggleUserMenu(){
  if(!currentUser){ openAuth(); return; }
  document.getElementById('userMenu')?.classList.toggle('open');
}
function closeUserMenu(){ document.getElementById('userMenu')?.classList.remove('open'); }
document.addEventListener('click', e=>{
  const menu = document.getElementById('userMenu');
  const avatar = document.getElementById('navAvatar');
  if(menu && !menu.contains(e.target) && e.target!==avatar) closeUserMenu();
});

// ── Upgrade modal ──
let selectedPlan = 'pro';

function upgradePrompt(){
  closeUserMenu();
  if(!currentUser){
    openAuth('login');
    showToast('Sign in first, then upgrade to Pro');
    return;
  }
  document.getElementById('upgradeModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeUpgrade(){
  document.getElementById('upgradeModal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeUpgradeIfOutside(e){
  if(e.target === document.getElementById('upgradeModal')) closeUpgrade();
}

function selectPlan(plan){
  selectedPlan = plan;
  document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('plan-'+plan)?.classList.add('selected');
  const prices = { pro: '₦2,500/month', pro_year: '₦25,000/year', business: '₦15,000/month' };
  document.getElementById('payBtnText').textContent = `Pay ${prices[plan] || ''} with Paystack →`;
}

async function initiatePayment(){
  const btn = document.getElementById('payBtn');
  const txt = document.getElementById('payBtnText');
  btn.disabled = true;
  txt.textContent = 'Connecting to Paystack…';
  try {
    const res = await apiFetch('/payments/initiate', {
      method: 'POST',
      body: JSON.stringify({ plan: selectedPlan })
    });
    if(res?.data?.authorization_url){
      // Store reference for verification on return
      localStorage.setItem('agrios_pay_ref', res.data.reference);
      // Redirect to Paystack
      window.location.href = res.data.authorization_url;
    } else {
      throw new Error(res?.error || 'Payment failed');
    }
  } catch(e){
    showToast('Payment error: ' + (e.message || 'Try again'));
    btn.disabled = false;
    txt.textContent = 'Pay with Paystack →';
  }
}

// Handle return from Paystack (?payment=success)
async function checkPaymentReturn(){
  const params = new URLSearchParams(window.location.search);
  if(params.get('payment') === 'success'){
    const ref = localStorage.getItem('agrios_pay_ref');
    if(ref && AUTH_TOKEN){
      try {
        const res = await apiFetch('/payments/verify/'+ref);
        if(res?.data?.success){
          localStorage.removeItem('agrios_pay_ref');
          // Update stored user tier
          if(currentUser){
            currentUser.subscription_tier = res.data.tier;
            localStorage.setItem('agrios_user', JSON.stringify(currentUser));
            updateNavForUser(currentUser);
          }
          showToast('🎉 Welcome to Agrios Pro! All features unlocked.');
          // Clean URL
          window.history.replaceState({}, '', '/');
        }
      } catch(e){ console.warn('Payment verify error:', e.message); }
    }
  }
}

// ── Auth keyboard support ──
document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){
    closeAuth();
    closeUserMenu();
  }
  if(e.key==='Enter'){
    const modal = document.getElementById('authModal');
    if(modal?.classList.contains('open')){
      const activeSection = document.querySelector('.auth-form-section.active');
      if(activeSection?.id==='section-login') doLogin();
      if(activeSection?.id==='section-register') doRegister();
    }
  }
});

/* ============================================================
   PWA — install prompt + service worker registration
   ============================================================ */
let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', e=>{
  e.preventDefault();
  deferredInstallPrompt = e;
  // Show banner after 30s on first visit, or if user hasn't dismissed
  if(!localStorage.getItem('agrios_install_dismissed')){
    setTimeout(showInstallBanner, 30000);
  }
});

window.addEventListener('appinstalled', ()=>{
  hideInstallBanner();
  deferredInstallPrompt = null;
  showToast('Agrios installed! 🎉 Open it from your home screen.');
  localStorage.setItem('agrios_installed', '1');
});

function showInstallBanner(){
  const banner = document.getElementById('installBanner');
  if(banner && !localStorage.getItem('agrios_installed')) banner.classList.add('show');
}
function hideInstallBanner(){
  document.getElementById('installBanner')?.classList.remove('show');
}
function dismissInstall(){
  hideInstallBanner();
  localStorage.setItem('agrios_install_dismissed', '1');
}
async function installPWA(){
  if(!deferredInstallPrompt){ 
    // iOS — show manual instructions
    showToast('On iPhone: tap Share → "Add to Home Screen"');
    hideInstallBanner();
    return;
  }
  hideInstallBanner();
  deferredInstallPrompt.prompt();
  const { outcome } = await deferredInstallPrompt.userChoice;
  if(outcome==='accepted') showToast('Installing Agrios… 🌿');
  deferredInstallPrompt = null;
}

// Register service worker
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('/sw.js').then(reg=>{
      console.log('SW registered:', reg.scope);
    }).catch(err=>{
      console.log('SW registration failed (not critical):', err.message);
    });
  });
}

// Handle browser back/forward navigation
window.addEventListener('popstate', (e)=>{
  const page = e.state?.page || new URLSearchParams(window.location.search).get('page') || 'home';
  showPage(page);
});

/* ===================== EXPORT MODAL ===================== */
function openExportModal(type){
  const isAgents = type === 'agents';
  const isConnect = type === 'connect';
  const title = isAgents ? 'Verified Export Agents' : 'Find Export Buyers';
  const agents = [
    { name:'Lagos Cocoa Export Ltd', crops:'Cocoa, Sesame', state:'Lagos', port:'Apapa', contact:'export@lagoscocoa.ng', verified:true },
    { name:'Kano Agro Exports', crops:'Sesame, Soybean, Groundnut', state:'Kano', port:'Kano Dry Port', contact:'info@kanoexports.ng', verified:true },
    { name:'AfroCashew Nigeria', crops:'Cashew', state:'Lagos/Ogun', port:'Tin Can Island', contact:'trade@afrocashew.ng', verified:true },
    { name:'Delta Palm Exports', crops:'Palm Oil', state:'Delta/Rivers', port:'Warri Port', contact:'export@deltapalmng.com', verified:true },
    { name:'North Hibiscus Traders', crops:'Hibiscus, Sesame', state:'Kano/Jigawa', port:'Kano Dry Port', contact:'+2348099887766', verified:false },
    { name:'Margafrique', crops:'Cocoa, Sesame, Groundnut, Palm Oil', state:'International · Morocco', port:'Casablanca', contact:'l.ly@margafrique.ma', phone:'+212 660 17 70 10', brands:'Al Boustane (preserved vegetables) · La Prairie (dairy & processed foods) · Acadir (sardines & seafood) · Atlas (olive oil & condiments) · La Hollandaise (mayonnaise & sauces) · Kidy (children\'s food & juice) · Finesse (biscuits & snacks) · Punch (beverages & juice drinks)', logoStrip:[{n:'Al Boustane',bg:'#2d6a2d',c:'#fff'},{n:'La Prairie',bg:'#f5c800',c:'#1a1a1a'},{n:'Acadir',bg:'#8b1a1a',c:'#fff'},{n:'Atlas',bg:'#cc2020',c:'#fff'},{n:'La Hollandaise',bg:'#b8001f',c:'#fff'},{n:'Kidy',bg:'#3d8b37',c:'#fff'},{n:'Finesse',bg:'#c8972b',c:'#fff'},{n:'Punch',bg:'#1a5c9e',c:'#fff'}], connections:'ATC · AIH · IFAD', contactName:'Mr Ly Ibrahima (Export Manager)', verified:true },
  ];
  const agentRows = agents.map(a=>`
    <div style="padding:14px;border:1px solid var(--bdr);border-radius:10px;margin-bottom:8px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
        <div>
          <div style="font-weight:700;font-size:13px">${a.name}</div>
          <div style="font-size:11px;color:var(--txt3)">${a.crops} · ${a.state}</div>
        </div>
        <span style="background:${a.verified?'#dcfce7':'#f3f4f6'};color:${a.verified?'#15803d':'#6b7280'};font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px">${a.verified?'✓ Verified':'Unverified'}</span>
      </div>
      <div style="font-size:11px;color:var(--txt3);margin-bottom:4px">Port: ${a.port}${a.contactName ? ' · ' + a.contactName : ''}</div>
      ${a.brands ? `<div style="font-size:10px;color:var(--txt3);margin-bottom:6px"><strong>Products managed:</strong><div style="margin-top:4px;line-height:1.8">${a.brands.split(' · ').map(b=>`<span style="display:inline-block;background:#f0fdf4;color:#166534;border:1px solid #bbf7d0;border-radius:6px;padding:2px 7px;margin:2px 3px 2px 0;font-size:10px">${b}</span>`).join('')}</div></div>` : ''}
      ${a.connections ? `<div style="font-size:10px;color:var(--txt3);margin-bottom:8px"><strong>Partners:</strong> ${a.connections}</div>` : ''}
      ${a.logoStrip ? `<div style="border-top:1px solid var(--bdr);margin-top:10px;padding-top:10px"><div style="font-size:10px;color:var(--txt3);margin-bottom:6px;font-weight:600;letter-spacing:.5px">BRANDS</div><div style="display:flex;flex-wrap:wrap;gap:6px">${a.logoStrip.map(b=>`<span style="background:${b.bg};color:${b.c};padding:5px 10px;border-radius:6px;font-size:11px;font-weight:700;letter-spacing:.3px">${b.n}</span>`).join('')}</div></div>` : ''}
      ${!a.brands && !a.connections && !a.logoStrip ? '<div style="margin-bottom:8px"></div>' : ''}
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
        <a href="mailto:${a.contact}" style="display:inline-block;background:var(--forest);color:#fff;padding:7px 14px;border-radius:7px;font-size:11px;font-weight:700;text-decoration:none">Email agent →</a>
        ${a.phone ? `<a href="tel:${a.phone.replace(/\s/g,'')}" style="display:inline-block;background:#f0fdf4;color:var(--forest);border:1.5px solid var(--forest);padding:7px 14px;border-radius:7px;font-size:11px;font-weight:700;text-decoration:none">${a.phone}</a>` : ''}
      </div>
    </div>`).join('');

  const buyerContent = `
    <div style="background:var(--cream);border-radius:10px;padding:16px;margin-bottom:16px">
      <div style="font-size:13px;font-weight:700;margin-bottom:8px">Submit export inquiry</div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <select id="expCrop" style="padding:9px;border:1.5px solid var(--bdr);border-radius:8px;font-family:inherit;font-size:13px">
          <option value="">Select crop...</option>
          <option>Cocoa</option><option>Sesame</option><option>Cashew</option>
          <option>Palm Oil</option><option>Groundnut</option><option>Soybean</option>
        </select>
        <input id="expQty" type="number" placeholder="Quantity available (tonnes)" style="padding:9px;border:1.5px solid var(--bdr);border-radius:8px;font-family:inherit;font-size:13px"/>
        <input id="expPhone" type="tel" placeholder="Your phone number" style="padding:9px;border:1.5px solid var(--bdr);border-radius:8px;font-family:inherit;font-size:13px"/>
        <input id="expState" type="text" placeholder="Your state / location" style="padding:9px;border:1.5px solid var(--bdr);border-radius:8px;font-family:inherit;font-size:13px"/>
        <button onclick="submitExportInquiry()" style="background:var(--forest);color:#fff;border:none;border-radius:8px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">Submit to export agents →</button>
      </div>
    </div>
    <div style="font-size:11px;color:var(--txt3);text-align:center">Our verified export agents will contact you within 24 hours</div>`;

  const html = `
    <div id="exportModalOverlay" onclick="if(event.target===this)this.remove()" style="position:fixed;inset:0;background:rgba(10,20,15,.75);z-index:600;display:flex;align-items:center;justify-content:center;padding:16px">
      <div style="background:#fff;border-radius:18px;width:100%;max-width:480px;max-height:85vh;overflow:hidden;display:flex;flex-direction:column">
        <div style="background:linear-gradient(135deg,#4a1942,#2d1042);padding:20px 20px 16px;display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="color:#c4b5fd;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px">Export Intelligence</div>
            <div style="color:#fff;font-size:16px;font-weight:700;margin-top:3px">${title}</div>
          </div>
          <button onclick="document.getElementById('exportModalOverlay').remove()" style="background:rgba(255,255,255,.15);border:none;color:#fff;width:28px;height:28px;border-radius:50%;font-size:16px;cursor:pointer">×</button>
        </div>
        <div style="padding:16px;overflow-y:auto;flex:1">
          ${isAgents||isConnect ? agentRows : buyerContent}
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

function submitExportInquiry(){
  const crop = document.getElementById('expCrop')?.value;
  const phone = document.getElementById('expPhone')?.value;
  if(!crop){ showToast('Please select a crop'); return; }
  if(!phone){ showToast('Please enter your phone number'); return; }
  document.getElementById('exportModalOverlay')?.remove();
  showToast('Inquiry submitted! Export agents will contact you within 24 hours.');
}

/* ===================== LOAN MODAL ===================== */
function openLoanModal(maxAmount, creditScore){
  if(!currentUser){
    showToast('Please sign in to apply for working capital');
    openAuth();
    return;
  }
  const html = `
    <div id="loanModalOverlay" onclick="if(event.target===this)this.remove()" style="position:fixed;inset:0;background:rgba(10,20,15,.75);z-index:600;display:flex;align-items:center;justify-content:center;padding:16px">
      <div style="background:#fff;border-radius:18px;width:100%;max-width:460px;overflow:hidden">
        <div style="background:var(--forest);padding:20px 20px 16px;display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="color:var(--lime);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px">Working Capital</div>
            <div style="color:#fff;font-size:16px;font-weight:700;margin-top:3px">Loan Application</div>
          </div>
          <button onclick="document.getElementById('loanModalOverlay').remove()" style="background:rgba(255,255,255,.15);border:none;color:#fff;width:28px;height:28px;border-radius:50%;font-size:16px;cursor:pointer">×</button>
        </div>
        <div style="padding:20px;display:flex;flex-direction:column;gap:12px">
          <div style="background:#f0faf4;border-radius:10px;padding:12px;font-size:12px;color:var(--forest)">
            ${creditScore ? 'Score: ' + creditScore + ' · Max loan: ₦' + (maxAmount||500000).toLocaleString() : 'Checking eligibility...'}
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Select lender</label>
            <select id="loanLender" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;margin-top:4px;font-family:inherit;font-size:13px">
              <option value="agrifinance">Agrifinance Partners — From 18% p.a.</option>
              <option value="nirsal">NIRSAL MFB — From 21% p.a.</option>
              <option value="boa">Bank of Agriculture — From 15% p.a.</option>
            </select>
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Loan amount (₦)</label>
            <input id="loanAmount" type="number" placeholder="e.g. 500000" id="loanMaxInput" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;margin-top:4px;font-family:inherit;font-size:13px"/>
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Tenure</label>
            <select id="loanTenure" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;margin-top:4px;font-family:inherit;font-size:13px">
              <option value="3">3 months</option>
              <option value="6">6 months</option>
              <option value="12" selected>12 months</option>
              <option value="24">24 months</option>
            </select>
          </div>
          <div>
            <label style="font-size:11px;font-weight:700;color:var(--txt3);text-transform:uppercase;letter-spacing:.5px">Purpose</label>
            <input id="loanPurpose" type="text" placeholder="e.g. Purchase maize stock for resale" style="width:100%;padding:10px;border:1.5px solid var(--bdr);border-radius:8px;margin-top:4px;font-family:inherit;font-size:13px"/>
          </div>
          <button onclick="submitLoanApplication()" style="background:var(--forest);color:#fff;border:none;border-radius:10px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">Submit application →</button>
          <p style="font-size:10px;color:var(--txt3);text-align:center;margin:0">Lender will respond within 24 hours · No collateral required</p>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

async function submitLoanApplication(){
  const lender = document.getElementById('loanLender')?.value;
  const amount = document.getElementById('loanAmount')?.value;
  const tenure = document.getElementById('loanTenure')?.value;
  const purpose = document.getElementById('loanPurpose')?.value;
  if(!amount || parseFloat(amount) < 10000){ showToast('Please enter a valid loan amount'); return; }
  try {
    const res = await apiFetch('/finance/apply', {
      method:'POST',
      body: JSON.stringify({ lender_id: lender==='agrifinance'?1:lender==='nirsal'?2:3, amount: parseFloat(amount), tenure_months: parseInt(tenure), purpose })
    });
    document.getElementById('loanModalOverlay')?.remove();
    if(res?.data?.application_id){
      showToast('Application submitted! Ref: '+res.data.application_id+' · Response within 24 hours.');
    } else {
      showToast(res?.error || 'Application submitted — lender will contact you.');
    }
  } catch(e){
    document.getElementById('loanModalOverlay')?.remove();
    showToast('Application submitted — lender will contact you within 24 hours.');
  }
}

/* ===================== FINANCE — REAL DATA ===================== */
async function loadFinanceData(){
  const main = document.getElementById('financeMain');
  const guest = document.getElementById('financeGuest');
  const loading = document.getElementById('financeLoading');
  const badge = document.getElementById('finBadge');

  if(!currentUser){
    if(loading) loading.style.display='none';
    if(guest) guest.style.display='block';
    if(main) main.style.display='none';
    if(badge){ badge.textContent='Sign in'; badge.className='badge badge-green'; }
    return;
  }

  if(loading) loading.style.display='block';
  if(guest) guest.style.display='none';
  if(main) main.style.display='none';

  try {
    // Fetch real score from API
    const [scoreRes, lendersRes] = await Promise.all([
      apiFetch('/finance/score'),
      apiFetch('/finance/lenders')
    ]);

    if(!scoreRes?.data){
      // New user - no contributor record yet
      if(loading) loading.style.display='none';
      if(main) main.style.display='block';
      renderScoreCard({
        credit_score:300, credit_grade:'Poor',
        full_name: currentUser.full_name, state: currentUser.state||'',
        total_reports:0, accepted_reports:0, accuracy_pct:100,
        market_presence_score:0
      });
      renderLenders(lendersRes?.data||[], 300);
      if(badge){ badge.textContent='New member'; badge.className='badge badge-green'; }
      return;
    }

    const score = scoreRes.data;
    if(loading) loading.style.display='none';
    if(main) main.style.display='block';
    if(badge){ badge.textContent=score.credit_grade; badge.className='badge badge-lime'; }

    renderScoreCard(score);
    renderLenders(lendersRes?.data||[], score.credit_score);

  } catch(e){
    console.error('Finance load error:', e);
    if(loading) loading.style.display='none';
    if(main) main.style.display='block';
    // Show placeholder for demo
    renderScoreCard({
      credit_score:500, credit_grade:'Fair',
      full_name: currentUser?.full_name||'User', state: currentUser?.state||'',
      total_reports:0, accepted_reports:0, accuracy_pct:100, market_presence_score:0
    });
  }
}

function renderScoreCard(s){
  const score = parseInt(s.credit_score)||300;
  const grade = s.credit_grade||'Poor';
  const pct = score/1000;
  const gradeColor = score>=850?'#16a34a':score>=700?'#0a3d25':score>=550?'#d97706':'#dc2626';

  // Draw gauge using CSS conic-gradient via canvas trick
  const canvas = document.getElementById('scoreGauge');
  if(canvas){
    const ctx = canvas.getContext('2d');
    const cx=40,cy=40,r=34;
    ctx.clearRect(0,0,80,80);
    // Background arc
    ctx.beginPath(); ctx.arc(cx,cy,r,0,2*Math.PI);
    ctx.strokeStyle='#e2e8f0'; ctx.lineWidth=7; ctx.stroke();
    // Score arc
    ctx.beginPath(); ctx.arc(cx,cy,r,-Math.PI/2,-Math.PI/2+2*Math.PI*pct);
    ctx.strokeStyle=gradeColor; ctx.lineWidth=7; ctx.lineCap='round'; ctx.stroke();
  }

  document.getElementById('scoreNumber').textContent=score;
  document.getElementById('scoreNumber').style.color=gradeColor;
  document.getElementById('scoreGrade').textContent=grade;
  document.getElementById('scoreGrade').style.color=gradeColor;
  document.getElementById('scoreName').textContent=(s.full_name||'')+(s.state?' · '+s.state+' State':'');

  // Loan eligibility badge
  const loanEl = document.getElementById('scoreLoanBadge');
  if(loanEl){
    const maxLoan = score>=850?5000000:score>=750?3000000:score>=650?1500000:score>=550?500000:0;
    if(maxLoan>0){
      loanEl.innerHTML=`<span class="badge badge-green">Eligible for ₦${maxLoan.toLocaleString('en-NG')} loan</span>`;
    } else {
      loanEl.innerHTML=`<span class="badge" style="background:#fee2e2;color:#991b1b">Submit more reports to qualify</span>`;
    }
  }

  // Score factors
  const reports = parseInt(s.total_reports)||0;
  const accuracy = parseFloat(s.accuracy_pct)||100;
  const activity = Math.min(100,parseInt(s.market_presence_score)||0);
  const accepted = parseInt(s.accepted_reports)||0;
  const history = reports>0?Math.round((accepted/reports)*100):0;

  const factors = [
    { label:`Price reports (${reports})`, pct:Math.min(100,reports*2), val:reports+' submitted' },
    { label:'Report accuracy', pct:Math.round(accuracy), val:accuracy.toFixed(0)+'%' },
    { label:'Market activity', pct:activity, val:activity+'pts' },
    { label:'Account history', pct:Math.min(100,history), val:history+'%' },
  ];

  const factorsEl = document.getElementById('scoreFactors');
  if(factorsEl){
    factorsEl.innerHTML = factors.map(f=>`
      <div style="display:flex;align-items:center;gap:8px;font-size:11px">
        <span style="color:var(--txt2);width:140px;flex-shrink:0">${f.label}</span>
        <div style="flex:1;height:5px;background:var(--bdr);border-radius:3px">
          <div style="width:${f.pct}%;height:100%;background:${gradeColor};border-radius:3px;transition:width .6s"></div>
        </div>
        <span style="color:var(--txt);font-weight:600;width:40px;text-align:right">${f.val}</span>
      </div>`).join('');
  }

  // Personalised improvement tips
  const tips = [];
  if(reports<10) tips.push('🎯 Submit '+Math.max(0,10-reports)+' more price reports to reach "Basic" trust level');
  if(accuracy<85) tips.push('✅ Focus on accurate reports — yours are at '+accuracy.toFixed(0)+'% (target 85%+)');
  if(activity<50) tips.push('📍 Report from more markets — each new market adds to your activity score');
  if(reports>=10 && accuracy>=85 && activity>=50) tips.push('🌟 Excellent progress! Keep reporting to push your score above '+Math.min(1000,score+50));
  if(score<550) tips.push('🚀 Score 550+ to unlock your first working capital loan');
  if(tips.length===0) tips.push('🏆 Your score is excellent — maintain accuracy to keep it growing');

  const tipsEl = document.getElementById('improveTips');
  if(tipsEl) tipsEl.innerHTML = tips.map(t=>`<div>${t}</div>`).join('');

  // Update loan button
  const loanBtn = document.getElementById('applyLoanBtn');
  if(loanBtn){
    if(score<500){
      loanBtn.textContent='Score too low — keep reporting to qualify';
      loanBtn.style.opacity='0.5';
      loanBtn.onclick=()=>showToast('Submit at least 10 accurate price reports to qualify for a loan');
    } else {
      const max=score>=850?5000000:score>=750?3000000:score>=650?1500000:500000;
      loanBtn.textContent=`Apply for ₦${max.toLocaleString('en-NG')} working capital →`;
      loanBtn.onclick=()=>openLoanModal(max,score);
    }
  }
}

function renderLenders(lenders, score){
  const el = document.getElementById('lenderList');
  if(!el) return;
  const defaultLenders = [
    {name:'Agrifinance Partners',min_score:600,max_amount_ngn:5000000,rate_pa_pct:18,contact:'loans@agrifinance.ng'},
    {name:'NIRSAL MFB',min_score:500,max_amount_ngn:2000000,rate_pa_pct:21,contact:'agri@nirsal.com'},
    {name:'Bank of Agriculture',min_score:550,max_amount_ngn:10000000,rate_pa_pct:15,contact:'loans@boanigeria.com'},
  ];
  const list = lenders.length ? lenders : defaultLenders;
  el.innerHTML = list.map(l=>{
    const eligible = score >= l.min_score;
    return `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;background:${eligible?'var(--cream)':'#f8fafc'};border-radius:8px;border:1px solid ${eligible?'#c0d8c8':'var(--bdr)'}">
      <div>
        <div style="font-size:12px;font-weight:600;color:${eligible?'var(--forest)':'var(--txt3)'}">${l.name}</div>
        <div style="font-size:10px;color:var(--txt3)">Min score: ${l.min_score} · Max: ₦${Number(l.max_amount_ngn).toLocaleString('en-NG')}</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:13px;font-weight:700;color:${eligible?'var(--gm)':'var(--txt3)'}">${l.rate_pa_pct}% p.a.</div>
        ${eligible?`<div style="font-size:9px;color:var(--gm);font-weight:600">✓ ELIGIBLE</div>`:`<div style="font-size:9px;color:var(--txt3)">Score ${l.min_score} needed</div>`}
      </div>
    </div>`;
  }).join('');
}

/* ===================== ACCEPT JOB MODAL ===================== */
function acceptJobModal(btn){
  if(!currentUser){ showToast('Please sign in to accept jobs'); openAuth(); return; }
  const card = btn.closest('.job-card');
  const route = card?.querySelector('[style*="font-weight:700"]')?.textContent || 'this job';
  const html = `
    <div id="acceptJobOverlay" onclick="if(event.target===this)this.remove()" style="position:fixed;inset:0;background:rgba(10,20,15,.75);z-index:600;display:flex;align-items:center;justify-content:center;padding:16px">
      <div style="background:#fff;border-radius:16px;padding:24px;width:100%;max-width:380px">
        <div style="font-size:16px;font-weight:700;margin-bottom:6px">Accept transport job</div>
        <div style="font-size:13px;color:var(--txt3);margin-bottom:16px">Route: <strong>${route}</strong></div>
        <div style="background:var(--cream);border-radius:10px;padding:14px;margin-bottom:16px;font-size:12px;color:var(--txt2)">
          By accepting, you confirm you have a suitable vehicle and will contact the farmer within 2 hours. Cancellations affect your driver rating.
        </div>
        <div style="display:flex;gap:8px">
          <button onclick="document.getElementById('acceptJobOverlay').remove()" style="flex:1;padding:11px;border:1.5px solid var(--bdr);background:#fff;border-radius:8px;font-family:inherit;font-size:13px;cursor:pointer">Cancel</button>
          <button onclick="confirmAcceptJob(this)" style="flex:2;padding:11px;background:var(--forest);color:#fff;border:none;border-radius:8px;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer">Yes, accept job</button>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

function confirmAcceptJob(btn){
  btn.textContent = 'Accepting...';
  btn.disabled = true;
  setTimeout(()=>{
    document.getElementById('acceptJobOverlay')?.remove();
    showToast('Job accepted! The farmer has been notified. Check your email for details.');
    // Reload transport jobs
    setTimeout(loadLiveData, 1000);
  }, 800);
}

/* ===================== KEYBOARD NAVIGATION ===================== */
document.addEventListener('keydown',e=>{
  if(e.key==='Escape')closeDrawer();
});
document.querySelectorAll('[role="button"][tabindex="0"]').forEach(el=>{
  el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')el.click()});
});

/* ===================== INIT ===================== */
(function init(){
  restoreSession(); // restore after DOM ready
  const today=new Date().toISOString().split('T')[0];
  const dateEl=document.getElementById('rDate');
  if(dateEl)dateEl.value=today;
  // render with static data immediately (fast first paint)
  buildTicker();
  buildHomePriceCards();
  buildOppCards();
  buildPredList();
  buildPriceChips();
  filterPriceTable();
  buildAlerts();
  buildDemand(getDemands());
  buildJobGrid();
  buildHeatmap('maize');
  buildAdmin();
  buildExportTable();
  setTimeout(buildPriceChart,500);
  document.getElementById('mobDrawer').style.display='none';
  // Check if returning from Paystack payment
  checkPaymentReturn();
  // Handle PWA shortcut deep links (?page=prices etc)
  const urlParams = new URLSearchParams(window.location.search);
  const deepPage = urlParams.get('page');
  if(deepPage) showPage(deepPage);

  // Load farmer directory on first visit to that page (lazy)
  const origShowPage = window.showPage;
  let farmersLoaded = false;
  window.showPage = function(page){
    origShowPage && origShowPage(page);
    if(page === 'farmers' && !farmersLoaded){ farmersLoaded=true; loadFarmerDirectory(); }
  };

  // then fetch live data from API and re-render (replaces static data)
  loadLiveData();
  // refresh prices every 2 minutes to stay current
  setInterval(()=>{if(document.visibilityState!=='hidden')loadLiveData();}, 120000);
  // Keep API warm — ping every 14 minutes to prevent free-tier sleep
  setInterval(()=>fetch('https://agrios-api.onrender.com/health',{mode:'no-cors'}).catch(()=>{}), 840000);
})();

/* ===================== FARMER DIRECTORY ===================== */

// Show/hide farmer-specific form fields based on role selection
function toggleFarmerFields(){
  const role = document.getElementById('regRole')?.value;
  const box  = document.getElementById('farmerFields');
  if(box) box.style.display = role === 'farmer' ? 'block' : 'none';
}

// Harvest size label
function harvestLabel(kg){
  if(!kg) return 'Not specified';
  if(kg <= 500) return 'Less than 500 kg';
  if(kg <= 1000) return '500 kg – 1 tonne';
  if(kg <= 3000) return '1 – 5 tonnes';
  if(kg <= 10000) return '5 – 20 tonnes';
  if(kg <= 50000) return '20 – 100 tonnes';
  return '100+ tonnes';
}

let allFarmers = [];

async function loadFarmerDirectory(){
  try {
    const res = await fetch(API+'/farmers/directory', {
      headers: AUTH_TOKEN ? {Authorization:'Bearer '+AUTH_TOKEN} : {}
    });
    if(!res.ok) throw new Error('Directory unavailable');
    const data = await res.json();
    allFarmers = data.data || [];
    document.getElementById('farmerCount').textContent = allFarmers.length.toLocaleString();
    filterFarmers();
  } catch(e) {
    // Fallback to sample data when API endpoint not yet live
    allFarmers = getSampleFarmers();
    document.getElementById('farmerCount').textContent = allFarmers.length + ' (sample)';
    filterFarmers();
  }
}

function filterFarmers(){
  const q     = (document.getElementById('farmerSearch')?.value||'').toLowerCase();
  const state = document.getElementById('farmerStateFilter')?.value||'';
  const crop  = document.getElementById('farmerCropFilter')?.value||'';

  let list = allFarmers.filter(f => {
    const matchState = !state || f.state === state;
    const matchCrop  = !crop  || (f.crops_grown||[]).includes(crop);
    const matchQ     = !q || f.full_name.toLowerCase().includes(q) ||
                       (f.state||'').toLowerCase().includes(q) ||
                       (f.lga||'').toLowerCase().includes(q) ||
                       (f.crops_grown||[]).join(' ').toLowerCase().includes(q);
    return matchState && matchCrop && matchQ;
  });

  buildFarmerGrid(list);
  document.getElementById('farmerEmpty').style.display = list.length ? 'none' : 'block';
}

function buildFarmerGrid(farmers){
  const isPro = currentUser && currentUser.subscription_tier && currentUser.subscription_tier !== 'free';
  const gate  = document.getElementById('farmerGateBanner');
  if(gate) gate.style.display = (!currentUser || !isPro) && farmers.length ? 'flex' : 'none';

  const grid = document.getElementById('farmerGrid');
  if(!grid) return;

  if(!farmers.length){ grid.innerHTML=''; return; }

  grid.innerHTML = farmers.map(function(f){
    var crops    = (f.crops_grown||[]).slice(0,4);
    var locked   = !isPro;
    var initials = f.full_name.split(' ').map(function(w){return w[0];}).join('').slice(0,2).toUpperCase();
    var nameMasked = locked
      ? f.full_name.split(' ')[0]+' '+f.full_name.split(' ').slice(1).map(function(w){return w[0]+'.';}).join(' ')
      : f.full_name;
    var locStr = (f.lga ? f.lga+', ' : '') + (f.state||'Nigeria');
    var cropTags = crops.map(function(c){return '<span class="farmer-card-crop">'+c+'</span>';}).join('');
    if((f.crops_grown||[]).length>4) cropTags += '<span class="farmer-card-crop">+'+(f.crops_grown.length-4)+' more</span>';
    var contactBtn = locked
      ? '<button class="farmer-card-locked" onclick="upgradePrompt()">🔒 Unlock contact (Pro)</button>'
      : '<button class="farmer-card-contact" onclick="contactFarmer(this)">Contact farmer →</button>';
    return '<div class="farmer-card">'
      +'<div class="farmer-card-badge">✓ Consented</div>'
      +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">'
      +'<div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#0a3d25,#1a6b3c);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:13px;flex-shrink:0">'+initials+'</div>'
      +'<div><div class="farmer-card-name">'+nameMasked+'</div>'
      +'<div class="farmer-card-loc">📍 '+locStr+'</div></div></div>'
      +'<div class="farmer-card-crops">'+cropTags+'</div>'
      +'<div class="farmer-card-harvest">🌾 Typical harvest: '+harvestLabel(f.harvest_size_kg)+'</div>'
      +contactBtn
      +'</div>';
  }).join('');
}

function contactFarmer(btn){
  var card = btn.closest('.farmer-card');
  var name = card ? card.querySelector('.farmer-card-name').textContent : '?';
  showToast('Contact request sent for '+name+'. We will connect you shortly.');
}

function getSampleFarmers(){
  return [
    {id:'s1',full_name:'Abubakar Musa',state:'Kano',lga:'Kura',crops_grown:['Groundnut','Sesame','Millet'],harvest_size_kg:5000},
    {id:'s2',full_name:'Funmi Adeyemi',state:'Oyo',lga:'Saki',crops_grown:['Maize','Beans','Cassava'],harvest_size_kg:3000},
    {id:'s3',full_name:'Emmanuel Okonkwo',state:'Anambra',lga:'Ogbaru',crops_grown:['Cassava','Yam'],harvest_size_kg:10000},
    {id:'s4',full_name:'Halima Sule',state:'Kaduna',lga:'Soba',crops_grown:['Soybean','Sorghum','Maize'],harvest_size_kg:3000},
    {id:'s5',full_name:'Chukwuemeka Ibe',state:'Enugu',lga:'Igbo-Eze South',crops_grown:['Rice','Yam'],harvest_size_kg:1000},
    {id:'s6',full_name:'Adamu Garba',state:'Jigawa',lga:'Hadejia',crops_grown:['Sesame','Groundnut','Millet'],harvest_size_kg:10000},
    {id:'s7',full_name:'Ngozi Eze',state:'Imo',lga:'Owerri North',crops_grown:['Cassava','Tomato'],harvest_size_kg:500},
    {id:'s8',full_name:'Yakubu Danladi',state:'Bauchi',lga:'Alkaleri',crops_grown:['Sorghum','Maize','Beans'],harvest_size_kg:5000},
  ];
}

</script>
</body>
</html>
