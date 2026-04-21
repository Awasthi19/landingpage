"use client";
import { useState, useEffect, useRef } from "react";

// ─── Fonts via Google Fonts ───────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --red: #D32F2F;
      --red-dark: #B71C1C;
      --red-light: #FFEBEE;
      --red-mid: #EF5350;
      --ink: #1A1A1A;
      --ink-soft: #444;
      --muted: #777;
      --border: #E8E0DA;
      --bg: #FDFAF7;
      --white: #FFFFFF;
      --card-bg: #FFFFFF;
      --warm: #F5EFE8;
      --gold: #C9A84C;
      --shadow: 0 2px 24px rgba(0,0,0,0.08);
      --shadow-lg: 0 8px 48px rgba(0,0,0,0.13);
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Outfit', sans-serif;
      background: var(--bg);
      color: var(--ink);
      overflow-x: hidden;
    }

    h1,h2,h3,h4 { font-family: 'Outfit', sans-serif; }

    /* ── Animations ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes slideRight {
      from { transform: translateX(-100%); } to { transform: translateX(0); }
    }
    @keyframes pulse-ring {
      0%   { transform: scale(1); opacity: 0.5; }
      100% { transform: scale(1.6); opacity: 0; }
    }
    @keyframes float {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-8px); }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes ticker {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes barGrow {
      from { height: 0; }
      to   { height: var(--h); }
    }

    .fade-up   { animation: fadeUp 0.7s ease both; }
    .fade-in   { animation: fadeIn 0.6s ease both; }

    /* ── Nav ── */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 48px;
      height: 72px;
      transition: background 0.3s, box-shadow 0.3s;
    }
    .nav.scrolled {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(12px);
      box-shadow: 0 1px 0 var(--border);
    }
    .nav-logo { display: flex; align-items: center; gap: 12px; }
    .nav-logo-img {
      height: 36px; width: auto; object-fit: contain;
    }
    .nav-logo-divider {
      width: 1px; height: 24px; background: rgba(255,255,255,0.3);
    }
    .nav.scrolled .nav-logo-divider { background: var(--border); }
    .nav-brand { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 600; color: var(--white); letter-spacing: 0.2px; }
    .nav-brand span { font-weight: 400; opacity: 0.75; }
    .nav.scrolled .nav-brand { color: var(--ink); }
    .nav-links { display: flex; gap: 32px; }
    .nav-links a {
      font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.85);
      text-decoration: none; transition: color 0.2s;
    }
    .nav.scrolled .nav-links a { color: var(--ink-soft); }
    .nav-links a:hover { color: var(--red); }
    .nav-actions { display: flex; gap: 12px; align-items: center; }
    .btn-ghost {
      padding: 8px 20px; border-radius: 8px;
      font-size: 14px; font-weight: 500; cursor: pointer;
      border: 1.5px solid rgba(255,255,255,0.5); color: #fff; background: transparent;
      transition: all 0.2s;
    }
    .nav.scrolled .btn-ghost { border-color: var(--border); color: var(--ink); }
    .btn-ghost:hover { border-color: var(--red); color: var(--red); }
    .btn-red {
      padding: 9px 22px; border-radius: 8px;
      font-size: 14px; font-weight: 600; cursor: pointer;
      background: var(--red); color: #fff; border: none;
      transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
      box-shadow: 0 2px 12px rgba(211,47,47,0.3);
    }
    .btn-red:hover { background: var(--red-dark); transform: translateY(-1px); box-shadow: 0 4px 20px rgba(211,47,47,0.4); }

    /* ── Hero ── */
    .hero {
      position: relative; min-height: 100vh;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      overflow: hidden; text-align: center;
    }
.hero-video-wrap {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.hero-video-wrap video {
  position: absolute;
  top: -60px;
  left: 0;
  width: 100%;
  height: auto;
  min-height: 100%;
  object-fit: cover;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.9); /* adjust opacity here */
}
    .hero-content {
      position: relative; z-index: 2;
      max-width: 820px; padding: 0 24px;
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(211,47,47,0.18); border: 1px solid rgba(211,47,47,0.4);
      border-radius: 100px; padding: 6px 16px; margin-bottom: 28px;
      color: #ffcdd2; font-size: 13px; font-weight: 500;
      animation: fadeUp 0.6s ease both;
    }
    .hero-badge span { width: 6px; height: 6px; border-radius: 50%; background: var(--red-mid); display: inline-block; }
    .hero h1 {
      font-size: 56px; line-height: 1.1; color: #fff;
      animation: fadeUp 0.7s 0.1s ease both;
      text-shadow: 0 2px 40px rgba(0,0,0,0.4);
    }
    .hero h1 em { font-style: normal; color: var(--red-mid); }
    .hero-sub {
      margin-top: 20px; font-size: 18px; color: rgba(255,255,255,0.78);
      line-height: 1.65; font-weight: 300;
      animation: fadeUp 0.7s 0.2s ease both;
    }
    .hero-ctas {
      display: flex; gap: 14px; justify-content: center; margin-top: 40px; flex-wrap: wrap;
      animation: fadeUp 0.7s 0.3s ease both;
    }
    .btn-hero-primary {
      padding: 14px 32px; border-radius: 10px;
      font-size: 15px; font-weight: 600; cursor: pointer;
      background: var(--red); color: #fff; border: none;
      box-shadow: 0 4px 24px rgba(211,47,47,0.45);
      transition: all 0.2s;
    }
    .btn-hero-primary:hover { background: var(--red-dark); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(211,47,47,0.5); }
    .btn-hero-secondary {
      padding: 14px 32px; border-radius: 10px;
      font-size: 15px; font-weight: 600; cursor: pointer;
      background: #ffffff; color: var(--red);
      border: none;
      transition: all 0.2s;
      box-shadow: 0 4px 20px rgba(0,0,0,0.25);
    }
    .btn-hero-secondary:hover { background: #f0f0f0; transform: translateY(-2px); }

    /* Download strip */
    .download-strip {
      position: relative; z-index: 2;
      display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
      margin-top: 32px;
      animation: fadeUp 0.7s 0.4s ease both;
    }
    .dl-btn {
      display: flex; align-items: center; gap: 10px;
      padding: 11px 22px; border-radius: 10px;
      font-size: 13px; font-weight: 600; cursor: pointer;
      transition: all 0.2s; text-decoration: none;
      border: none;
    }
    .dl-btn-windows {
      background: #0078D4; color: #fff;
      box-shadow: 0 3px 16px rgba(0,120,212,0.45);
    }
    .dl-btn-windows:hover { background: #006ABD; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,120,212,0.5); }
    .dl-btn-android {
      background: #3DDC84; color: #1A1A1A;
      box-shadow: 0 3px 16px rgba(61,220,132,0.4);
    }
    .dl-btn-android:hover { background: #2ec975; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(61,220,132,0.5); }
    .dl-btn-web {
      background: var(--red); color: #fff;
      box-shadow: 0 3px 16px rgba(211,47,47,0.45);
    }
    .dl-btn-web:hover { background: var(--red-dark); transform: translateY(-2px); box-shadow: 0 6px 24px rgba(211,47,47,0.5); }
    .dl-btn svg { flex-shrink: 0; }
    .dl-btn-label { display: flex; flex-direction: column; line-height: 1.2; }
    .dl-btn-label small { font-size: 10px; opacity: 0.75; font-weight: 400; }
    .dl-btn-label strong { font-size: 13px; font-weight: 700; }

    /* Scroll hint */
    .scroll-hint {
      position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
      z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px;
      color: rgba(255,255,255,0.5); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;
      animation: fadeIn 1.5s 1s ease both;
    }
    .scroll-hint-line {
      width: 1px; height: 48px; background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.4));
    }

    /* ── Trust strip ── */
    .trust-strip {
      background: var(--ink); padding: 0 48px; overflow: hidden;
    }
    .trust-inner {
      display: flex; gap: 0;
      animation: ticker 30s linear infinite;
      width: max-content;
    }
    .trust-item {
      display: flex; align-items: center; gap: 10px; white-space: nowrap;
      padding: 18px 48px; border-right: 1px solid rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.7); font-size: 13px; font-weight: 500;
    }
    .trust-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--red); flex-shrink: 0; }

    /* ── Section commons ── */
    .section { padding: 100px 48px; }
    .section-label {
      font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
      color: var(--red); font-weight: 600; margin-bottom: 14px;
    }
    .section-title { font-size: clamp(32px, 4vw, 52px); line-height: 1.15; color: var(--ink); }
    .section-sub { font-size: 17px; color: var(--muted); line-height: 1.7; margin-top: 14px; max-width: 560px; }
    .center { text-align: center; }
    .center .section-sub { margin: 14px auto 0; }

    /* ── How it works ── */
    .how-bg { background: var(--warm); }
    .steps-row {
      display: grid; grid-template-columns: repeat(3,1fr); gap: 0;
      margin-top: 64px; position: relative;
    }
    .steps-row::after {
      content: ''; position: absolute;
      top: 36px; left: calc(16.5% + 12px); right: calc(16.5% + 12px);
      height: 2px; background: repeating-linear-gradient(90deg, var(--red) 0, var(--red) 8px, transparent 8px, transparent 16px);
      z-index: 0;
    }
    .step {
      display: flex; flex-direction: column; align-items: center; text-align: center;
      padding: 0 40px; position: relative; z-index: 1;
    }
    .step-num {
      width: 72px; height: 72px; border-radius: 50%;
      background: #fff; border: 2px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 900;
      color: var(--red); margin-bottom: 24px;
      box-shadow: var(--shadow); position: relative;
      transition: all 0.3s;
    }
    .step:hover .step-num {
      background: var(--red); color: #fff; border-color: var(--red);
      box-shadow: 0 8px 32px rgba(211,47,47,0.35);
      animation: float 2s ease infinite;
    }
    .step h3 { font-size: 20px; margin-bottom: 10px; color: var(--ink); }
    .step p { font-size: 15px; color: var(--muted); line-height: 1.65; }

    /* ── Feature cards ── */
    .features-grid {
      display: grid; grid-template-columns: repeat(2,1fr); gap: 24px; margin-top: 56px;
    }
    .feat-card {
      background: var(--card-bg); border-radius: 16px;
      border: 1px solid var(--border); padding: 40px;
      transition: box-shadow 0.3s, transform 0.3s;
      position: relative; overflow: hidden;
    }
    .feat-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
      background: var(--red); transform: scaleX(0); transform-origin: left;
      transition: transform 0.35s ease;
    }
    .feat-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); }
    .feat-card:hover::before { transform: scaleX(1); }
    .feat-icon {
      width: 52px; height: 52px; border-radius: 12px;
      background: var(--red-light); display: flex; align-items: center; justify-content: center;
      font-size: 24px; margin-bottom: 20px;
    }
    .feat-card h3 { font-size: 22px; margin-bottom: 10px; color: var(--ink); }
    .feat-card p { font-size: 15px; color: var(--muted); line-height: 1.7; margin-bottom: 20px; }
    .feat-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
    .feat-list li {
      display: flex; align-items: center; gap: 10px;
      font-size: 14px; color: var(--ink-soft);
    }
    .feat-list li::before {
      content: ''; width: 6px; height: 6px; border-radius: 50%;
      background: var(--red); flex-shrink: 0;
    }

    /* ── Role section ── */
    .roles-bg { background: var(--ink); }
    .roles-bg .section-title { color: #fff; }
    .roles-bg .section-sub { color: rgba(255,255,255,0.55); }
    .roles-bg .section-label { color: var(--red-mid); }
    .roles-tabs {
      display: flex; gap: 8px; margin-top: 48px; background: rgba(255,255,255,0.06);
      border-radius: 12px; padding: 6px; width: fit-content;
    }
    .role-tab {
      padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 500;
      cursor: pointer; border: none; background: transparent; color: rgba(255,255,255,0.55);
      transition: all 0.2s;
    }
    .role-tab.active { background: var(--red); color: #fff; }
    .roles-content {
      display: grid; grid-template-columns: 1fr 1fr; gap: 64px; margin-top: 48px; align-items: center;
    }
    .role-points { display: flex; flex-direction: column; gap: 20px; }
    .role-point {
      display: flex; gap: 16px; align-items: flex-start;
    }
    .role-point-icon {
      width: 40px; height: 40px; border-radius: 10px; background: rgba(211,47,47,0.15);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px;
    }
    .role-point h4 { font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 4px; }
    .role-point p { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.6; }
    .role-preview {
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px; padding: 32px; min-height: 280px;
    }
    .role-preview-header {
      display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;
    }
    .role-preview-title { color: rgba(255,255,255,0.5); font-size: 12px; letter-spacing: 2px; text-transform: uppercase; }
    .role-badge {
      padding: 4px 12px; border-radius: 100px; background: rgba(211,47,47,0.2);
      color: var(--red-mid); font-size: 11px; font-weight: 600;
    }
    .mock-stat {
      background: rgba(255,255,255,0.05); border-radius: 10px; padding: 16px;
      margin-bottom: 12px;
    }
    .mock-stat-label { font-size: 12px; color: rgba(255,255,255,0.4); margin-bottom: 6px; }
    .mock-stat-value { font-size: 22px; font-weight: 700; color: #fff; }
    .mock-stat-delta { font-size: 12px; color: #66BB6A; margin-top: 2px; }

    /* ── Reports ── */
    .reports-bg { background: var(--warm); }
    .reports-grid {
      display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 56px;
    }
    .report-card {
      background: #fff; border-radius: 16px; border: 1px solid var(--border);
      padding: 32px; transition: all 0.3s;
    }
    .report-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); }
    .report-card h4 { font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); font-family: 'Outfit', sans-serif; font-weight: 600; margin-bottom: 12px; }
    .report-big { font-size: 48px; font-weight: 800; font-family: 'Outfit', sans-serif; color: var(--ink); line-height: 1; }
    .report-meta { font-size: 13px; color: var(--muted); margin-top: 8px; }
    .report-delta { display: inline-flex; align-items: center; gap: 4px; font-size: 13px; font-weight: 600; color: #388E3C; margin-top: 6px; }
    .bar-chart { display: flex; align-items: flex-end; gap: 6px; height: 80px; margin-top: 20px; }
    .bar {
      flex: 1; border-radius: 4px 4px 0 0; background: var(--red);
      --h: 50%; animation: barGrow 1s ease both;
      height: var(--h);
    }
    .bar:nth-child(even) { background: var(--red-light); }

    /* ── Final CTA ── */
    .cta-section {
      background: var(--red); padding: 100px 48px; text-align: center;
      position: relative; overflow: hidden;
    }
    .cta-section::before {
      content: '';
      position: absolute; top: -80px; right: -80px;
      width: 320px; height: 320px; border-radius: 50%;
      background: rgba(255,255,255,0.06);
    }
    .cta-section::after {
      content: '';
      position: absolute; bottom: -60px; left: -60px;
      width: 240px; height: 240px; border-radius: 50%;
      background: rgba(255,255,255,0.05);
    }
    .cta-section h2 { color: #fff; font-size: clamp(32px,5vw,60px); line-height: 1.15; }
    .cta-section p { color: rgba(255,255,255,0.75); font-size: 18px; margin-top: 16px; }
    .btn-cta-white {
      margin-top: 40px; padding: 16px 40px; border-radius: 10px;
      font-size: 16px; font-weight: 600; cursor: pointer;
      background: #fff; color: var(--red); border: none;
      box-shadow: 0 4px 24px rgba(0,0,0,0.15);
      transition: all 0.2s;
    }
    .btn-cta-white:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.2); }

    /* ── Footer ── */
    .footer {
      background: #111; padding: 56px 48px 32px;
      display: flex; flex-direction: column; gap: 40px;
    }
    .footer-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 40px; flex-wrap: wrap; }
    .footer-brand { max-width: 280px; }
    .footer-brand-name { font-family: 'Outfit', sans-serif; font-size: 24px; color: #fff; margin-bottom: 10px; font-weight: 700; }
    .footer-brand p { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.65; }
    .footer-links h5 { color: rgba(255,255,255,0.6); font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; font-family: 'Outfit', sans-serif; }
    .footer-links a { display: block; color: rgba(255,255,255,0.4); font-size: 14px; text-decoration: none; margin-bottom: 10px; transition: color 0.2s; }
    .footer-links a:hover { color: var(--red-mid); }
    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.07); padding-top: 24px;
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
    }
    .footer-bottom p { font-size: 13px; color: rgba(255,255,255,0.3); }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .nav { padding: 0 24px; }
      .nav-links { display: none; }
      .section { padding: 72px 24px; }
      .features-grid { grid-template-columns: 1fr; }
      .steps-row { grid-template-columns: 1fr; gap: 40px; }
      .steps-row::after { display: none; }
      .reports-grid { grid-template-columns: 1fr 1fr; }
      .roles-content { grid-template-columns: 1fr; }
      .footer-top { flex-direction: column; }
    }
    @media (max-width: 600px) {
      .reports-grid { grid-template-columns: 1fr; }
      .hero h1 { font-size: 24px; }
      .cta-section, .footer { padding-left: 24px; padding-right: 24px; }
    }
  `}</style>
);

// ─── Icons ────────────────────────────────────────────────────────────────────
const WindowsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
  </svg>
);
const AndroidIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.523 15.341a.9.9 0 01-.9-.9.9.9 0 01.9-.9.9.9 0 01.9.9.9.9 0 01-.9.9m-11.046 0a.9.9 0 01-.9-.9.9.9 0 01.9-.9.9.9 0 01.9.9.9.9 0 01-.9.9M17.705 9.5l1.783-3.091a.371.371 0 00-.136-.507.371.371 0 00-.507.136l-1.806 3.129A11.14 11.14 0 0012 8.264a11.14 11.14 0 00-5.039 1.193L5.155 6.038a.371.371 0 00-.507-.136.371.371 0 00-.136.507L6.295 9.5C3.887 10.91 2.25 13.513 2.25 16.5h19.5c0-2.987-1.637-5.59-4.045-7" />
  </svg>
);
const WebIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
  </svg>
);

// ─── Role Data ────────────────────────────────────────────────────────────────
const roleData = {
  Owner: {
    points: [
      { icon: "📊", title: "Full financial visibility", desc: "P&L, ledger, income & expenses across all branches in one view." },
      { icon: "🏢", title: "Multi-branch oversight", desc: "Compare performance, manage staff roles, and control access from a super-admin dashboard." },
      { icon: "💎", title: "Loyalty & retention", desc: "Track customer loyalty points and outstanding balances across your entire portfolio." },
    ],
    stats: [{ label: "Revenue Today", value: "NPR 1,84,200", delta: "+12% vs yesterday" }, { label: "Active Branches", value: "6", delta: "All operational" }]
  },
  Manager: {
    points: [
      { icon: "📦", title: "Live stock control", desc: "Set min/max rules, track valuation, and approve purchase orders in real time." },
      { icon: "🧾", title: "Daily close reporting", desc: "End-of-day summaries auto-generated. Shift handovers are clean and documented." },
      { icon: "👥", title: "Staff scheduling", desc: "Assign roles per branch and monitor who's on-floor and who's handling which section." },
    ],
    stats: [{ label: "Stock Value", value: "NPR 92,400", delta: "Updated 5m ago" }, { label: "Low Stock Items", value: "3", delta: "Needs reorder" }]
  },
  "Cashier/Waiter": {
    points: [
      { icon: "⚡", title: "Fast table POS", desc: "Take orders, merge or split tables, and apply modifiers in a few taps." },
      { icon: "🔄", title: "Quick table changes", desc: "Move guests, split bills by item or equally, and switch tables without losing orders." },
      { icon: "✅", title: "One-tap checkout", desc: "Cash, card, or loyalty balance — process payment and print receipt instantly." },
    ],
    stats: [{ label: "Tables Active", value: "14 / 20", delta: "70% occupied" }, { label: "Orders Today", value: "148", delta: "+8 pending" }]
  }
};

// ─── Main Component ────────────────────────────────────────────────────────────
export default function RestroeliteLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [activeRole, setActiveRole] = useState("Owner");

  const message = "Hi Restroelite, I would like to request a free demo.";

  const whatsappDemoUrl = `https://wa.me/9779821618622?text=${encodeURIComponent(message)}`;

  const downloadLinks = {
    windows: "https://github.com/Restroelite/releases/releases/download/v1.1.2/restroelite.Setup.1.0.0.exe",
    android: "https://github.com/Restroelite/releases/releases/download/new/restroelite-v5.2.3.apk",
    web: "https://restroelite.psinepal.com.np",
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const role = roleData[activeRole];

  const trustItems = [
    "Built for dine-in operations",
    "Multi-branch ready",
    "Role-based access control",
    "Real-time stock tracking",
    "Offline POS support",
    "Daily close reports",
    "Loyalty program built-in",
    "Super-admin dashboard",
  ];

  return (
    <>
      <FontLoader />

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo">
          {/* Replace src with your actual logo path e.g. /logo.png */}
          <img src="/restroelite/icon.png" alt="Restroelite Logo" className="nav-logo-img" />
          <div className="nav-logo-divider" />
          <span className="nav-brand">Restroelite </span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#roles">Roles</a>
          <a href="#reports">Reports</a>
        </div>
        <div className="nav-actions">
          <button className="btn-red" onClick={() => window.open(whatsappDemoUrl, "_blank", "noopener,noreferrer")}>
            Ask for Free Demo
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        {/* Video BG — replace src with your actual 30s video */}
        <div className="hero-video-wrap">
          <video autoPlay muted loop playsInline>
            <source src="/restroelite/hero-video.webm" type="video/webm" />
            <source src="/restroelite/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay" />

        <div className="hero-content">
          <h1>
            Run POS, Billing, Inventory &<br />
            finance from <em>a complete software.</em>
          </h1>
          <p className="hero-sub">
            Restroelite brings your front-of-house, inventory, and accounts under one roof —<br />
            built for independent restaurants and growing chains alike.
          </p>
          <div className="hero-ctas">
            <button className="btn-hero-primary" onClick={() => window.open(whatsappDemoUrl, "_blank", "noopener,noreferrer")}>
              Ask for Free Demo
            </button>
            <button className="btn-hero-secondary" onClick={() => window.open(whatsappDemoUrl, "_blank", "noopener,noreferrer")}>
              Request Setup →
            </button>
          </div>

          {/* Download buttons */}
          <div className="download-strip">
            <a href={downloadLinks.windows} target="_blank" rel="noopener noreferrer" className="dl-btn dl-btn-windows">
              <WindowsIcon />
              <div className="dl-btn-label">
                <small>Download for</small>
                <strong>Windows</strong>
              </div>
            </a>
            <a href={downloadLinks.android} target="_blank" rel="noopener noreferrer" className="dl-btn dl-btn-android">
              <AndroidIcon />
              <div className="dl-btn-label">
                <small>Download on</small>
                <strong>Android</strong>
              </div>
            </a>
            <a href={downloadLinks.web} target="_blank" rel="noopener noreferrer" className="dl-btn dl-btn-web">
              <WebIcon />
              <div className="dl-btn-label">
                <small>Open</small>
                <strong>Web App</strong>
              </div>
            </a>
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-hint-line" />
          Scroll
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="trust-strip">
        <div className="trust-inner">
          {[...trustItems, ...trustItems].map((item, i) => (
            <div className="trust-item" key={i}>
              <div className="trust-dot" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="section how-bg center">
        <div className="section-label">How it works</div>
        <h2 className="section-title">Three steps to a clean close</h2>
        <p className="section-sub">From the first order to the last report — Restroelite runs every moment in between.</p>

        <div className="steps-row">
          {[
            { n: "01", title: "Take Orders", desc: "POS at the table. Split, merge, modify — serve faster with fewer errors." },
            { n: "02", title: "Track Stock", desc: "Every item sold updates your stock. Purchase orders trigger automatically when thresholds are hit." },
            { n: "03", title: "Close Clean", desc: "End your shift with auto-generated daily reports, balanced ledgers, and outstanding balances cleared." },
          ].map((s) => (
            <div className="step" key={s.n}>
              <div className="step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="section">
        <div className="section-label">Feature blocks</div>
        <h2 className="section-title">Everything your restaurant needs</h2>
        <p className="section-sub">Four integrated pillars that replace a stack of disconnected tools.</p>

        <div className="features-grid">
          {[
            {
              icon: "🍽️", title: "POS Operations",
              desc: "A blazing-fast front-of-house system built for busy service hours.",
              items: ["Table merge, split & transfer", "Quick checkout with modifiers", "Multi-user, role-based access", "Offline mode support"]
            },
            {
              icon: "📦", title: "Inventory & Purchases",
              desc: "From raw ingredients to finished plates — track every gram.",
              items: ["Purchase order management", "Stock level rules & alerts", "Valuation at cost or FIFO", "Supplier & receiving logs"]
            },
            {
              icon: "💰", title: "Accounts & Loyalty",
              desc: "Financial clarity across your entire operation.",
              items: ["Chart of accounts & ledger", "Income & expense tracking", "Customer loyalty & points", "Outstanding balance reports"]
            },
            {
              icon: "🏛️", title: "Reports & Super Admin",
              desc: "Own the big picture across every branch and every shift.",
              items: ["Daily sales & P&L snapshots", "Multi-branch comparison", "Staff & role management", "Drill-down to any transaction"]
            },
          ].map((f) => (
            <div className="feat-card" key={f.title}>
              <div className="feat-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <ul className="feat-list">
                {f.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROLES ── */}
      <section id="roles" className="section roles-bg">
        <div className="section-label">Role-based views</div>
        <h2 className="section-title">Built for every person in your team</h2>
        <p className="section-sub">Each role sees exactly what they need — nothing more, nothing less.</p>

        <div className="roles-tabs">
          {Object.keys(roleData).map(r => (
            <button
              key={r}
              className={`role-tab${activeRole === r ? " active" : ""}`}
              onClick={() => setActiveRole(r)}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="roles-content">
          <div className="role-points">
            {role.points.map(p => (
              <div className="role-point" key={p.title}>
                <div className="role-point-icon">{p.icon}</div>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="role-preview">
            <div className="role-preview-header">
              <span className="role-preview-title">{activeRole} Dashboard</span>
              <span className="role-badge">LIVE</span>
            </div>
            {role.stats.map(s => (
              <div className="mock-stat" key={s.label}>
                <div className="mock-stat-label">{s.label}</div>
                <div className="mock-stat-value">{s.value}</div>
                <div className="mock-stat-delta">↑ {s.delta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REPORTS ── */}
      <section id="reports" className="section reports-bg">
        <div className="section-label center">Reporting snapshot</div>
        <h2 className="section-title center">Numbers you can act on, instantly</h2>
        <p className="section-sub center">Every close generates a clean report. No spreadsheets. No guessing.</p>

        <div className="reports-grid">
          <div className="report-card">
            <h4>Daily Sales</h4>
            <div className="report-big">1,84,200</div>
            <div className="report-meta">NPR · Today</div>
            <div className="report-delta">↑ 12% vs yesterday</div>
            <div className="bar-chart">
              {[55, 40, 75, 60, 90, 70, 100].map((h, i) => (
                <div key={i} className="bar" style={{ "--h": `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="report-card">
            <h4>Stock Valuation</h4>
            <div className="report-big">92,400</div>
            <div className="report-meta">NPR · Current stock</div>
            <div className="report-delta">↑ Updated in real time</div>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              {[["Beverages", 38], ["Dry goods", 27], ["Produce", 22], ["Other", 13]].map(([label, pct]) => (
                <div key={label}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#777", marginBottom: 4 }}>
                    <span>{label}</span><span>{pct}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: "#F0E8DF", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: "var(--red)", borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="report-card">
            <h4>Outstanding Balances</h4>
            <div className="report-big">14,800</div>
            <div className="report-meta">NPR · Pending collection</div>
            <div className="report-delta" style={{ color: "#E53935" }}>↓ 6 accounts pending</div>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              {["Rooftop Events – 4,200", "Corporate Account – 6,100", "Staff credit – 1,200", "Others – 3,300"].map(item => (
                <div key={item} style={{ fontSize: 13, color: "#888", padding: "8px 12px", background: "#FFF5F5", borderRadius: 8, borderLeft: "3px solid var(--red)" }}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="cta-section">
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 16, fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>
            Ready to switch?
          </div>
          <h2>Get a tailored walkthrough<br />for your restaurant</h2>
          <p>We'll show you Restroelite set up exactly for your menu, your branches, and your team.</p>
          <button className="btn-cta-white" onClick={() => window.open(whatsappDemoUrl, "_blank", "noopener,noreferrer")}>
            Request Setup Call →
          </button>
          <div style={{ marginTop: 24, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            No commitment required · Setup takes under 30 minutes
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <img src="/Restroelite/icon.png" alt="Restroelite" style={{ height: 32, width: "auto" }} />
              <div className="footer-brand-name">Restroelite</div>
            </div>
            <p>Restaurant management software built for the way real kitchens and dining rooms actually run.</p>
          </div>
          <div className="footer-links">
            <h5>Product</h5>
            <a href="#">POS Operations</a>
            <a href="#">Inventory</a>
            <a href="#">Accounts</a>
            <a href="#">Reports</a>
          </div>
          <div className="footer-links">
            <h5>Downloads</h5>
            <a href="#">Windows App</a>
            <a href="#">Android App</a>
            <a href="#">Web App</a>
          </div>
          <div className="footer-links">
            <h5>Company</h5>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Restroelite. All rights reserved.</p>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>Run service, stock, and finance from one restaurant operating system.</p>
        </div>
      </footer>
    </>
  );
}