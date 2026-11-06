"use client";

import { useEffect, useState } from "react";

const whatsappNumber = "9779821618622";
const webAppUrl = "https://ripple.psinepal.com.np";
const demoAccountUrl = "https://ripple.psinepal.com.np/login?demo=1";

const featureGroups = [
  {
    number: "01",
    eyebrow: "Front of house",
    title: "Every order, exactly where it belongs.",
    copy: "Give your team a calmer service flow with tables, modifiers, split bills, and instant payments in one fast workspace.",
    bullets: ["Table merge, split & transfer", "Quick checkout with modifiers", "Offline-ready POS"],
    tone: "red",
  },
  {
    number: "02",
    eyebrow: "Back of house",
    title: "Know your stock before it runs out.",
    copy: "Ripple connects purchasing, receiving, valuation, and real-time stock movement so the numbers stay useful, not just accurate.",
    bullets: ["Purchase order management", "Low-stock rules & alerts", "Supplier and receiving logs"],
    tone: "ink",
  },
  {
    number: "03",
    eyebrow: "Your bigger picture",
    title: "Close every shift with confidence.",
    copy: "Bring sales, expenses, ledgers, loyalty, and multi-branch reporting into one clear operating picture.",
    bullets: ["Daily sales and P&L snapshots", "Role-based access control", "Multi-branch comparisons"],
    tone: "cream",
  },
];

const trustItems = [
  "Built for busy service",
  "Multi-branch ready",
  "Role-based access",
  "Real-time stock tracking",
  "Offline POS support",
  "Clean daily close",
];

function RippleMark({ className = "" }) {
  return <img src="/restroelite/FAVICON-V2.png" alt="" aria-hidden="true" className={`ripple-mark ${className}`} />;
}

function RippleLogo({ className = "" }) {
  return <img src="/restroelite/ICON-FULL-V2.svg" alt="Ripple" className={`ripple-logo ${className}`} />;
}

function CheckIcon() {
  return <span className="check-icon" aria-hidden="true">✓</span>;
}

function ProductPreview() {
  return (
    <div className="product-preview" aria-label="Ripple product preview">
      <div className="preview-toolbar">
        <div className="window-dots" aria-hidden="true"><span /><span /><span /></div>
        <div className="preview-url">ripple.psinepal.com.np</div>
        <div className="preview-avatar">A</div>
      </div>
      <img className="dashboard-preview-image" src="/restroelite/previewpage.png" alt="Ripple hospitality management dashboard" />
      <div className="preview-body">
        <aside className="preview-sidebar">
          <div className="mini-brand"><RippleMark /><span>ripple</span></div>
          <div className="sidebar-label">Workspace</div>
          {["Overview", "Orders", "Inventory", "Reports"].map((item, index) => (
            <div className={`sidebar-item${index === 0 ? " active" : ""}`} key={item}>
              <span className="sidebar-icon">{["⌂", "↗", "◫", "◌"][index]}</span>{item}
            </div>
          ))}
          <div className="sidebar-spacer" />
          <div className="sidebar-item"><span className="sidebar-icon">⚙</span>Settings</div>
        </aside>
        <div className="preview-main">
          <div className="preview-heading">
            <div><p className="preview-kicker">Wednesday, 12 June 2025</p><h3>Good morning, Aastha</h3></div>
            <button className="preview-action">+ New order</button>
          </div>
          <div className="preview-stats">
            <div className="preview-stat highlight"><span>Today&apos;s sales</span><strong>NPR 184,200</strong><small>↗ 12.4% from yesterday</small></div>
            <div className="preview-stat"><span>Orders today</span><strong>148</strong><small>24 currently open</small></div>
            <div className="preview-stat"><span>Tables occupied</span><strong>14 / 20</strong><small>70% occupancy</small></div>
          </div>
          <div className="preview-lower">
            <div className="sales-panel">
              <div className="panel-heading"><strong>Sales overview</strong><span>Today ▾</span></div>
              <div className="chart-area">
                <div className="chart-lines"><i /><i /><i /><i /></div>
                <svg viewBox="0 0 460 130" role="img" aria-label="Sales trend chart">
                  <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#d12128" stopOpacity=".24" /><stop offset="1" stopColor="#d12128" stopOpacity="0" /></linearGradient></defs>
                  <path d="M4 112 C42 106 48 84 82 91 S122 48 160 67 S206 39 238 58 S279 74 313 36 S359 51 392 25 S431 35 456 8 L456 130 L4 130 Z" fill="url(#chartFill)" />
                  <path d="M4 112 C42 106 48 84 82 91 S122 48 160 67 S206 39 238 58 S279 74 313 36 S359 51 392 25 S431 35 456 8" fill="none" stroke="#d12128" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="chart-labels"><span>8 AM</span><span>10 AM</span><span>12 PM</span><span>2 PM</span><span>4 PM</span><span>6 PM</span></div>
            </div>
            <div className="orders-panel">
              <div className="panel-heading"><strong>Live orders</strong><span className="live-dot">● Live</span></div>
              {["Table 04 · 3 items", "Table 12 · 6 items", "Takeaway · 2 items"].map((item, index) => (
                <div className="order-row" key={item}><span className={`order-state state-${index + 1}`} /><span>{item}</span><b>{["NPR 1,840", "NPR 4,260", "NPR 620"][index]}</b></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RippleLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [email, setEmail] = useState("");
  const demoUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi Ripple, I would like to request a free demo.${email ? ` My email is ${email}.` : ""}`)}`;

  useEffect(() => {
    document.title = "Ripple - Nepal’s Trusted Hospitality Management Software";
    const favicon = document.querySelector("link[rel='icon']") || document.createElement("link");
    favicon.rel = "icon";
    favicon.href = "/restroelite/favicon.ico";
    document.head.appendChild(favicon);
  }, []);

  const submitTrial = (event) => {
    event.preventDefault();
    window.open(demoUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="ripple-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .ripple-page, .ripple-page * { box-sizing: border-box; }
        .ripple-page { --red: #d12128; --red-dark: #a9181e; --ink: #171719; --muted: #68656a; --line: #e9e6e2; --cream: #fbfaf7; --soft: #f3efea; min-height: 100vh; background: var(--cream); color: var(--ink); font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 400; overflow: hidden; }
        .ripple-page a { color: inherit; text-decoration: none; }.ripple-page button, .ripple-page input { font: inherit; }.ripple-page h1, .ripple-page h2, .ripple-page h3, .ripple-page p { margin: 0; }
        .site-nav { height: 82px; padding: 0 clamp(24px, 5vw, 80px); display: flex; align-items: center; justify-content: space-between; border: 0; background: transparent !important; box-shadow: none; backdrop-filter: none; position: relative; z-index: 10; }
        .brand { display: inline-flex; align-items: center; gap: 11px; font: 800 24px/1 'Manrope', sans-serif; letter-spacing: -.06em; }.brand .ripple-mark { width: 28px; height: 28px; }.ripple-mark { object-fit: contain; border-radius: 50%; }.ripple-logo { display: block; width: 145px; height: auto; }
        .nav-links { display: flex; gap: clamp(22px, 3vw, 46px); align-items: center; color: #555158; font-size: 14px; font-weight: 600; }.nav-links a { transition: color .2s; }.nav-links a:hover { color: var(--red); }
        .nav-cta, .preview-action { border: 0; background: var(--red); color: white !important; padding: 13px 21px; border-radius: 9px; font-size: 13px; font-weight: 700; cursor: pointer; box-shadow: 0 7px 18px rgba(209,33,40,.18); transition: transform .2s, background .2s; }.nav-cta:hover, .preview-action:hover { background: var(--red-dark); transform: translateY(-2px); }.menu-toggle { display: none; border: 0; background: none; font-size: 24px; cursor: pointer; }
        .hero { position: relative; padding: 86px 24px 0; text-align: center; background: radial-gradient(circle at 50% 25%, rgba(209,33,40,.08), transparent 26%), linear-gradient(rgba(255,255,255,.6), rgba(255,255,255,.6)), repeating-linear-gradient(0deg, transparent 0, transparent 89px, rgba(24,24,30,.045) 90px), repeating-linear-gradient(90deg, transparent 0, transparent 89px, rgba(24,24,30,.045) 90px); }.hero:before, .hero:after { content: ''; position: absolute; border-radius: 50%; filter: blur(2px); pointer-events: none; will-change: transform, opacity; animation: softRedFloat 10s ease-in-out infinite; }.hero:before { width: 340px; height: 340px; top: 160px; left: -220px; background: rgba(209,33,40,.07); }.hero:after { width: 300px; height: 300px; top: 430px; right: -190px; background: rgba(209,33,40,.045); animation-delay: -5s; animation-duration: 13s; }
        @keyframes labelGradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } } @keyframes contactPop { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } } @keyframes softRedFloat { 0%, 100% { opacity: .55; transform: translate3d(0, 0, 0) scale(1); } 50% { opacity: .9; transform: translate3d(46px, 22px, 0) scale(1.08); } }
        .hero-intro { width: 100%; max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; text-align: center; }.eyebrow { display: inline-block; color: transparent; background: linear-gradient(90deg, var(--red), #f06a4c, #8d2bb8, var(--red)); background-size: 240% auto; background-clip: text; -webkit-background-clip: text; font-size: clamp(14px, 1.1vw, 16px); line-height: 1.4; letter-spacing: .04em; font-weight: 600; animation: labelGradient 5s ease-in-out infinite; }.hero h1 { max-width: 760px; margin: 32px auto 0; font: 700 34px/1.2 'Plus Jakarta Sans', sans-serif; letter-spacing: -.03em; }.hero h1 em { color: var(--red); font-style: normal; }.hero-copy { display: block; width: 100%; max-width: 760px; margin: 24px auto 0 !important; color: var(--muted); font-size: 14px; font-weight: 400; line-height: 1.65; text-align: center; }.ripple-word { color: var(--red); font-weight: 600; }
        .hero-actions { display: flex; align-items: center; justify-content: center; gap: 10px; max-width: 920px; margin: 28px auto 0; }.hero-form { display: flex; flex: 1; min-width: 0; gap: 7px; padding: 6px; background: white; border: 1px solid var(--line); border-radius: 11px; box-shadow: 0 12px 30px rgba(67,44,22,.1); }.hero-form input { flex: 1; min-width: 0; border: 0; outline: 0; padding: 0 14px; color: var(--ink); background: transparent; font-size: 14px; }.hero-form input::placeholder { color: #a6a1a0; }.hero-form button { white-space: nowrap; border: 0; padding: 11px 21px; border-radius: 7px; background: linear-gradient(135deg, #e02a31, #a9181e); color: white; font-size: 13px; font-weight: 700; cursor: pointer; box-shadow: 0 6px 14px rgba(209,33,40,.2); transition: transform .2s, box-shadow .2s; }.hero-form button:hover { transform: translateY(-1px); box-shadow: 0 9px 18px rgba(209,33,40,.28); }.demo-account-button { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 52px; padding: 0 21px; border: 2px solid var(--red); border-radius: 8px; background: transparent; color: var(--red); font-size: 13px; font-weight: 700; white-space: nowrap; transition: transform .2s, background .2s; }.demo-account-button:hover { background: rgba(209,33,40,.08); transform: translateY(-2px); }.hero-benefits { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 18px; margin-top: 12px; color: var(--red); font-size: 12px; font-weight: 600; }.hero-benefit { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }.hero-benefit::before { content: '✓'; display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border: 1px solid currentColor; border-radius: 50%; font-size: 10px; font-weight: 700; }
        .preview-wrap { position: relative; z-index: 1; max-width: 1180px; margin: 18px auto 0; text-align: left; }.preview-caption { display: flex; justify-content: space-between; align-items: center; padding: 0 8px 13px; color: #8a8581; font-size: 11px; letter-spacing: .12em; text-transform: uppercase; font-weight: 700; }.preview-caption span:last-child { color: var(--red); }.product-preview { overflow: hidden; border: 1px solid #d8d4d0; border-radius: 16px 16px 0 0; background: #f5f7fa; box-shadow: 0 25px 75px rgba(48,34,24,.18); }
        .preview-toolbar { height: 48px; padding: 0 18px; display: flex; align-items: center; gap: 18px; background: #202126; color: #9a999e; }.window-dots { display: flex; gap: 6px; }.window-dots span { width: 9px; height: 9px; border-radius: 50%; background: #e8b24a; }.window-dots span:first-child { background: #e46565; }.window-dots span:last-child { background: #6bbb69; }.preview-url { flex: 1; max-width: 300px; margin: auto; text-align: center; padding: 6px 13px; border-radius: 5px; background: #2b2c31; font-size: 10px; }.preview-avatar { display: flex; align-items: center; justify-content: center; width: 25px; height: 25px; border-radius: 50%; background: #f0c5a4; color: #7b4630; font-size: 11px; font-weight: 700; }
        .dashboard-preview-image { display: block; width: 100%; height: auto; }.preview-body { display: none; }.preview-sidebar { width: 188px; padding: 23px 12px; display: flex; flex-direction: column; background: #fff; border-right: 1px solid #e6e8ed; color: #737780; font-size: 12px; }.mini-brand { display: flex; align-items: center; gap: 7px; padding: 0 10px 28px; color: var(--ink); font: 800 16px 'Manrope', sans-serif; letter-spacing: -.07em; }.mini-brand .ripple-mark { width: 19px; height: 19px; }.sidebar-label { padding: 0 10px 10px; color: #a5a8ae; font-size: 9px; letter-spacing: .13em; text-transform: uppercase; font-weight: 700; }.sidebar-item { display: flex; align-items: center; gap: 10px; padding: 11px 10px; margin: 2px 0; border-radius: 7px; }.sidebar-item.active { background: #fbe9e9; color: var(--red); font-weight: 700; }.sidebar-icon { width: 16px; text-align: center; color: currentColor; font-size: 15px; }.sidebar-spacer { flex: 1; }
        .preview-main { flex: 1; padding: 28px 32px; min-width: 0; }.preview-heading { display: flex; justify-content: space-between; align-items: center; gap: 20px; }.preview-kicker { color: #969ba2; font-size: 10px; margin-bottom: 6px !important; }.preview-heading h3 { font: 700 22px 'Manrope', sans-serif; letter-spacing: -.04em; }.preview-action { padding: 10px 14px; font-size: 11px; }.preview-stats { display: grid; grid-template-columns: 1.2fr 1fr 1fr; gap: 13px; margin-top: 28px; }.preview-stat { padding: 17px; border: 1px solid #e1e4e8; border-radius: 10px; background: white; }.preview-stat.highlight { color: white; border-color: var(--red); background: var(--red); }.preview-stat span { display: block; font-size: 10px; color: #969ba2; }.preview-stat.highlight span { color: #f4c6c8; }.preview-stat strong { display: block; margin: 11px 0 5px; font: 700 clamp(17px, 2vw, 24px) 'Manrope', sans-serif; letter-spacing: -.04em; }.preview-stat small { font-size: 10px; color: #54a669; }.preview-stat.highlight small { color: #ffd6d6; }
        .preview-lower { display: grid; grid-template-columns: 1.35fr 1fr; gap: 13px; margin-top: 13px; }.sales-panel, .orders-panel { padding: 18px; min-height: 235px; border: 1px solid #e1e4e8; border-radius: 10px; background: white; }.panel-heading { display: flex; justify-content: space-between; align-items: center; color: #868b92; font-size: 10px; }.panel-heading strong { color: #34363b; font-size: 12px; }.live-dot { color: #42a85e; font-size: 10px; }.chart-area { position: relative; height: 150px; margin-top: 13px; }.chart-lines { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-around; }.chart-lines i { border-top: 1px dashed #ecedf0; }.chart-area svg { position: absolute; inset: 7px 0 0; width: 100%; height: calc(100% - 7px); }.chart-labels { display: flex; justify-content: space-between; color: #b1b4b9; font-size: 8px; }.orders-panel .panel-heading { margin-bottom: 18px; }.order-row { display: grid; grid-template-columns: 9px 1fr auto; align-items: center; gap: 9px; padding: 14px 0; border-bottom: 1px solid #f0f1f2; color: #686c73; font-size: 10px; }.order-row:last-child { border: 0; }.order-row b { color: #34363b; font-size: 10px; }.order-state { width: 7px; height: 7px; border-radius: 50%; background: #e8ae49; }.state-2 { background: #62ad70; }.state-3 { background: #aa9bd7; }
        .trust-strip { position: relative; z-index: 2; display: flex; justify-content: center; flex-wrap: wrap; gap: 0; border-bottom: 1px solid var(--line); background: rgba(255,255,255,.76); }.trust-item { display: inline-flex; align-items: center; gap: 9px; padding: 21px 25px; color: #726d6b; font-size: 12px; font-weight: 600; }.trust-item:before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: var(--red); }
        .section { max-width: 1180px; margin: auto; padding: 125px 24px; }.section-header { max-width: 630px; }.section-label { color: var(--red); font-size: 11px; text-transform: uppercase; letter-spacing: .16em; font-weight: 700; }.section h2 { margin-top: 16px; font: 800 clamp(35px, 5vw, 61px)/1.04 'Manrope', sans-serif; letter-spacing: -.075em; }.section-sub { margin-top: 18px; color: var(--muted); font-size: 17px; line-height: 1.65; }
        .feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 58px; }.feature-card { min-height: 370px; padding: 30px; border: 1px solid var(--line); border-radius: 16px; background: #fff; position: relative; overflow: hidden; transition: transform .25s, box-shadow .25s; }.feature-card:hover { transform: translateY(-6px); box-shadow: 0 20px 45px rgba(67,44,22,.1); }.feature-card:after { content: ''; position: absolute; width: 160px; height: 160px; right: -75px; bottom: -75px; border-radius: 50%; background: rgba(209,33,40,.07); }.feature-card.ink { color: white; background: var(--ink); border-color: var(--ink); }.feature-card.ink .feature-copy, .feature-card.ink .feature-list { color: #a9a7aa; }.feature-card.cream { background: #f0e7db; border-color: #e7dbca; }.feature-number { display: flex; align-items: center; justify-content: center; width: 39px; height: 39px; border-radius: 10px; color: var(--red); background: #fbe9e9; font-size: 12px; font-weight: 700; }.feature-card.ink .feature-number { background: #333236; }.feature-eyebrow { margin-top: 48px; color: var(--red); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; font-weight: 700; }.feature-card h3 { max-width: 280px; margin-top: 10px; font: 700 25px/1.1 'Manrope', sans-serif; letter-spacing: -.06em; }.feature-copy { max-width: 300px; margin-top: 15px; color: var(--muted); font-size: 14px; line-height: 1.65; }.feature-list { display: flex; flex-direction: column; gap: 8px; margin-top: 20px; padding: 0; color: #4d4949; list-style: none; font-size: 12px; }.feature-list li { display: flex; align-items: center; gap: 8px; }.check-icon { color: var(--red); font-size: 13px; font-weight: 700; }
        .workflow { padding-top: 0; }.workflow-inner { display: grid; grid-template-columns: .8fr 1.2fr; gap: clamp(50px, 10vw, 150px); align-items: center; }.workflow-copy h2 { max-width: 500px; }.workflow-steps { display: flex; flex-direction: column; gap: 0; }.workflow-step { display: grid; grid-template-columns: 45px 1fr; gap: 18px; padding: 23px 0; border-bottom: 1px solid var(--line); }.workflow-step:first-child { border-top: 1px solid var(--line); }.step-number { display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border: 1px solid #e7b5b7; border-radius: 50%; color: var(--red); font-size: 12px; font-weight: 700; }.workflow-step h3 { font: 700 19px 'Manrope', sans-serif; letter-spacing: -.04em; }.workflow-step p { margin-top: 7px; color: var(--muted); font-size: 14px; line-height: 1.6; }
        .cta-section { position: relative; max-width: 1320px; margin: 20px auto 0; padding: 98px 24px; overflow: hidden; border-radius: 22px 22px 0 0; color: white; text-align: center; background: var(--red); }.cta-section:before, .cta-section:after { content: ''; position: absolute; border: 1px solid rgba(255,255,255,.18); border-radius: 50%; }.cta-section:before { width: 560px; height: 560px; top: -350px; right: -110px; }.cta-section:after { width: 400px; height: 400px; bottom: -275px; left: -70px; }.cta-section .section-label { color: #ffd6d6; }.cta-section h2 { position: relative; z-index: 1; max-width: 700px; margin: 18px auto 0; font: 800 clamp(40px, 6vw, 72px)/1.02 'Manrope', sans-serif; letter-spacing: -.075em; }.cta-section p { position: relative; z-index: 1; max-width: 500px; margin: 20px auto 0; color: #ffd6d6; line-height: 1.6; }.cta-button { position: relative; z-index: 1; display: inline-block; margin-top: 33px; border: 0; border-radius: 9px; padding: 15px 25px; background: white; color: var(--red); font-size: 14px; font-weight: 700; cursor: pointer; transition: transform .2s; }.cta-button:hover { transform: translateY(-2px); }
        .site-footer { display: flex; justify-content: space-between; gap: 30px; padding: 42px max(24px, calc((100% - 1180px) / 2)); background: var(--ink); color: white; }.footer-brand { max-width: 320px; }.footer-brand .brand { font-size: 22px; }.footer-brand p { margin-top: 15px; color: #8c898d; font-size: 13px; line-height: 1.6; }.footer-links { display: flex; gap: 26px; align-items: flex-start; color: #aaa7aa; font-size: 12px; }.footer-links a:hover { color: white; }.footer-note { padding: 20px max(24px, calc((100% - 1180px) / 2)); border-top: 1px solid #302f32; background: var(--ink); color: #68656a; font-size: 11px; }
        @media (max-width: 850px) { .nav-links, .site-nav > .nav-cta { display: none; }.menu-toggle { display: block; }.nav-links.open { position: absolute; top: 73px; left: 16px; right: 16px; display: flex; flex-direction: column; align-items: stretch; gap: 0; padding: 10px; border: 1px solid var(--line); border-radius: 12px; background: white; box-shadow: 0 16px 35px rgba(0,0,0,.1); }.nav-links.open a { padding: 12px; }.feature-grid { grid-template-columns: 1fr; }.feature-card { min-height: 310px; }.workflow-inner { grid-template-columns: 1fr; gap: 45px; }.site-footer { flex-direction: column; }.footer-links { flex-wrap: wrap; } }
        @media (max-width: 600px) { .hero { padding-top: 60px; }.hero h1 { font-size: 28px; }.hero-copy { font-size: 14px; }.hero-actions { flex-direction: column; width: 100%; }.hero-form { width: 100%; flex-direction: column; background: transparent; border: 0; box-shadow: none; padding: 0; }.hero-form input { width: 100%; min-height: 46px; padding: 0 14px; border: 1px solid var(--line); border-radius: 8px; background: white; }.hero-form button, .demo-account-button { width: 100%; min-height: 46px; }.preview-wrap { margin-top: 20px; }.preview-caption { font-size: 9px; }.preview-body { min-height: 390px; }.preview-sidebar { width: 52px; padding: 18px 8px; }.mini-brand span, .sidebar-label, .sidebar-item:not(.active) { display: none; }.mini-brand { justify-content: center; padding: 0 0 24px; }.sidebar-item.active { justify-content: center; padding: 11px 0; }.preview-main { padding: 18px 13px; }.preview-heading h3 { font-size: 16px; }.preview-kicker { font-size: 8px; }.preview-action { padding: 8px 9px; font-size: 9px; }.preview-stats { grid-template-columns: 1fr; gap: 7px; margin-top: 18px; }.preview-stat { padding: 10px; }.preview-stat strong { margin: 5px 0 2px; font-size: 16px; }.preview-stat small { font-size: 8px; }.preview-stat:nth-child(n+2) { display: none; }.preview-lower { grid-template-columns: 1fr; }.orders-panel { display: none; }.sales-panel { min-height: 190px; }.chart-area { height: 120px; }.trust-item { padding: 13px 10px; font-size: 10px; }.section { padding: 82px 24px; }.section-sub { font-size: 15px; }.feature-grid { margin-top: 35px; }.workflow { padding-top: 0; }.cta-section { border-radius: 0; }.site-footer { padding-top: 34px; }.footer-note { line-height: 1.5; } }
        .ripple-page, .ripple-page * { font-family: 'Plus Jakarta Sans', sans-serif; } @media (max-width: 600px) { .contact-widget { right: 14px; bottom: 14px; }.contact-popover { width: min(285px, calc(100vw - 28px)); } }
        .contact-widget { position: fixed; right: 24px; bottom: 24px; z-index: 50; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }.contact-popover { width: 285px; padding: 20px; border: 1px solid var(--line); border-radius: 15px; background: white; box-shadow: 0 18px 45px rgba(37,24,17,.18); animation: contactPop .2s ease-out both; }.contact-popover-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }.contact-popover h3 { color: var(--ink); font-size: 16px; font-weight: 700; line-height: 1.25; }.contact-popover p { margin-top: 8px; color: var(--muted); font-size: 12px; line-height: 1.55; }.contact-close { border: 0; background: transparent; color: #999; font-size: 20px; line-height: 1; cursor: pointer; }.contact-link { display: flex; align-items: center; justify-content: center; margin-top: 15px; padding: 11px 14px; border-radius: 8px; background: var(--red); color: white !important; font-size: 12px; font-weight: 700; }.contact-toggle { display: inline-flex; align-items: center; gap: 9px; border: 0; border-radius: 999px; padding: 12px 17px 12px 14px; background: var(--red); color: white !important; box-shadow: 0 10px 25px rgba(209,33,40,.3); font-size: 13px; font-weight: 700; cursor: pointer; transition: transform .2s, background .2s; }.contact-toggle:hover { background: var(--red-dark); transform: translateY(-2px); }.contact-icon { display: inline-flex; align-items: center; justify-content: center; width: 25px; height: 25px; border-radius: 50%; background: rgba(255,255,255,.18); }.contact-icon svg { width: 15px; height: 15px; }
      `}</style>

      <header className="site-nav">
        <a className="brand" href="#top" aria-label="Ripple home"><RippleLogo /></a>
        <nav className={`nav-links${menuOpen ? " open" : ""}`} aria-label="Main navigation">
          <a href="#product" onClick={() => setMenuOpen(false)}>Product</a><a href="#why-ripple" onClick={() => setMenuOpen(false)}>Why Ripple</a><a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="nav-cta" href={demoUrl} target="_blank" rel="noreferrer">Book a demo</a>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation">☰</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-intro">
          <div className="eyebrow">Nepal&apos;s Trusted Hospitality Management Software</div>
          <h1>Best Hospitality Management<br /><em>Software in Nepal.</em></h1>
          <p className="hero-copy">With <span className="ripple-word">Ripple</span>, run restaurants, cafés, hotels, and resorts with orders, reservations, inventory, billing, and finances in one powerful system.</p>
        </div>
        <div className="hero-actions">
          <form className="hero-form" onSubmit={submitTrial}>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your work email" aria-label="Work email" />
            <button type="submit">Start Free Trial</button>
          </form>
          <a className="demo-account-button" href={demoAccountUrl} target="_blank" rel="noopener noreferrer">Explore Demo Account <span aria-hidden="true">→</span></a>
        </div>
        <div className="hero-benefits" aria-label="Ripple benefits"><span className="hero-benefit">Set up in less than 5 minutes</span><span className="hero-benefit">IRD certified</span><span className="hero-benefit">Premium UI/UX</span></div>
        <div className="preview-wrap" id="product"><div className="preview-caption"><span>Ripple workspace</span><span>Live product preview</span></div><ProductPreview /></div>
      </section>

      <div className="trust-strip" aria-label="Ripple benefits">{trustItems.map((item) => <div className="trust-item" key={item}>{item}</div>)}</div>

      <section className="section" id="why-ripple">
        <div className="section-header"><div className="section-label">The Ripple difference</div><h2>Everything connected.<br />Nothing in the way.</h2><p className="section-sub">The tools your restaurant needs should work like one system. Ripple keeps the details moving together, from the first order to the final report.</p></div>
        <div className="feature-grid">{featureGroups.map((feature) => <article className={`feature-card ${feature.tone}`} key={feature.number}><div className="feature-number">{feature.number}</div><div className="feature-eyebrow">{feature.eyebrow}</div><h3>{feature.title}</h3><p className="feature-copy">{feature.copy}</p><ul className="feature-list">{feature.bullets.map((bullet) => <li key={bullet}><CheckIcon />{bullet}</li>)}</ul></article>)}</div>
      </section>

      <section className="section workflow" id="how-it-works"><div className="workflow-inner"><div className="workflow-copy section-header"><div className="section-label">How it works</div><h2>A better rhythm for every shift.</h2><p className="section-sub">Ripple gives every person on your team a clearer next step — and gives you the full picture when the day is done.</p></div><div className="workflow-steps">{["Take orders without the scramble", "Keep stock and purchasing visible", "Close the day with clean numbers"].map((title, index) => <div className="workflow-step" key={title}><div className="step-number">0{index + 1}</div><div><h3>{title}</h3><p>{["Move from table to payment in a few taps, with fewer errors and no lost details.", "See what is moving, what is low, and what needs approval before service is affected.", "Get daily sales, expenses, and branch performance in one report your team can trust."][index]}</p></div></div>)}</div></div></section>

      <section className="cta-section" id="contact"><div className="section-label">Ready when you are</div><h2>Let&apos;s make your next shift feel lighter.</h2><p>Tell us how your restaurant works today. We&apos;ll show you how Ripple can fit your menu, your branches, and your team.</p><a className="cta-button" href={demoUrl} target="_blank" rel="noreferrer">Request a free walkthrough →</a></section>

      <div className="contact-widget">
        {contactOpen && (
          <div className="contact-popover" role="dialog" aria-label="Contact sales">
            <div className="contact-popover-header"><h3>Talk to our sales team</h3><button className="contact-close" onClick={() => setContactOpen(false)} aria-label="Close contact panel">×</button></div>
            <p>Want to see Ripple in action? We&apos;ll help you find the right setup for your restaurant, hotel, resort, or cafe.</p>
            <a className="contact-link" href={demoUrl} target="_blank" rel="noopener noreferrer">Chat with sales →</a>
          </div>
        )}
        <button className="contact-toggle" onClick={() => setContactOpen((open) => !open)} aria-expanded={contactOpen} aria-label="Contact sales">
          <span className="contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.7 9.7 0 0 1-4-.9L3 21l1.9-4.4A8.2 8.2 0 0 1 3 11.5 8.5 8.5 0 1 1 21 11.5Z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></svg></span>
          Contact sales
        </button>
      </div>

      <footer className="site-footer"><div className="footer-brand"><a className="brand" href="#top"><RippleMark /> ripple</a><p>Hospitality management software for teams that want a calmer, clearer way to run service.</p></div><div className="footer-links"><a href="#product">Product</a><a href="#why-ripple">Features</a><a href="#how-it-works">How it works</a><a href={webAppUrl} target="_blank" rel="noreferrer">Open app</a><a href="/ripple/privacy-policy">Privacy policy</a></div></footer>
      <div className="footer-note">© {new Date().getFullYear()} Ripple. A PSI Technologies product.</div>
    </main>
  );
}
