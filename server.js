'use strict';

require('dotenv').config();

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const PUBLIC_KEYS = ['APP_NAME', 'API_URL', 'ENVIRONMENT', 'VERSION'];

function getPublicEnvs() {
  return PUBLIC_KEYS.map((key) => ({
    key,
    value: process.env[key] || 'Not set',
  }));
}

function renderHtml() {
  const envs = getPublicEnvs();

  const envCards = envs
    .map(
      ({ key, value }) => `
        <div class="env-card">
          <span class="env-key">${key}</span>
          <span class="env-value">${value}</span>
        </div>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ServerCompass MERN Demo</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Manrope', sans-serif;
      background: linear-gradient(135deg, #000000 0%, #0a0a0f 50%, #000000 100%);
      min-height: 100vh;
      color: #fafafa;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
    }

    .container {
      width: 100%;
      max-width: 680px;
    }

    /* Header */
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #00d4ff;
      background: rgba(0, 212, 255, 0.08);
      border: 1px solid rgba(0, 212, 255, 0.2);
      border-radius: 999px;
      padding: 0.3rem 0.85rem;
      margin-bottom: 1.25rem;
    }

    .eyebrow .dot {
      width: 6px;
      height: 6px;
      background: #00d4ff;
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.8); }
    }

    h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(1.75rem, 5vw, 2.5rem);
      font-weight: 700;
      line-height: 1.15;
      margin-bottom: 0.6rem;
      letter-spacing: -0.02em;
    }

    h1 .accent {
      background: linear-gradient(90deg, #00d4ff, #0ea5e9);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .subtitle {
      font-size: 0.95rem;
      color: #a1a1aa;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    /* Meta pills row */
    .meta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 2rem;
    }

    .meta-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: #a1a1aa;
      background: #0f0f0f;
      border: 1px solid #262626;
      border-radius: 999px;
      padding: 0.3rem 0.75rem;
    }

    .meta-pill .icon {
      font-size: 0.85rem;
    }

    /* Section */
    .section {
      background: #0a0a0a;
      border: 1px solid #1f1f1f;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1rem;
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .section-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #71717a;
    }

    .section-badge {
      font-size: 0.7rem;
      font-weight: 600;
      padding: 0.2rem 0.55rem;
      border-radius: 999px;
    }

    .badge-public {
      color: #22c55e;
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.2);
    }

    .badge-private {
      color: #f59e0b;
      background: rgba(245, 158, 11, 0.1);
      border: 1px solid rgba(245, 158, 11, 0.2);
    }

    /* Env grid */
    .env-grid {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .env-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      background: #111111;
      border: 1px solid #1f1f1f;
      border-radius: 8px;
      padding: 0.65rem 0.9rem;
      transition: border-color 0.15s;
    }

    .env-card:hover { border-color: #2a2a2a; }

    .env-key {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 0.78rem;
      color: #00d4ff;
      flex-shrink: 0;
    }

    .env-value {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      font-size: 0.78rem;
      color: #e4e4e7;
      text-align: right;
      word-break: break-all;
    }

    /* Private vars */
    .private-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .private-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.75rem;
      font-weight: 500;
      background: #0f0f0f;
      border: 1px solid #1f1f1f;
      border-radius: 8px;
      padding: 0.4rem 0.75rem;
      color: #71717a;
    }

    .private-pill .lock {
      font-size: 0.7rem;
    }

    .private-pill .key-name {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      color: #a1a1aa;
    }

    .private-pill .redacted {
      font-family: 'JetBrains Mono', 'Fira Code', monospace;
      letter-spacing: 0.05em;
      color: #3f3f46;
    }

    /* Footer */
    .footer {
      margin-top: 1.75rem;
      text-align: center;
      font-size: 0.78rem;
      color: #3f3f46;
    }

    .footer a {
      color: #00d4ff;
      text-decoration: none;
      font-weight: 500;
    }

    .footer a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">

    <div class="eyebrow">
      <span class="dot"></span>
      Express.js demo
    </div>

    <h1>Server<span class="accent">Compass</span><br />MERN Demo</h1>
    <p class="subtitle">
      A production-ready MERN stack template — MongoDB, Express.js, React, Node.js —
      deployed and managed with
      <a href="https://servercompass.app/" style="color:#00d4ff;text-decoration:none;font-weight:600;">Server Compass</a>.
    </p>

    <div class="meta-row">
      <span class="meta-pill"><span class="icon">&#x26A1;</span> Served by Express.js</span>
      <span class="meta-pill"><span class="icon">&#x1F4E1;</span> JSON endpoint: /api/env</span>
      <span class="meta-pill"><span class="icon">&#x2764;</span> Health: /health</span>
    </div>

    <div class="section">
      <div class="section-header">
        <span class="section-title">Public Environment Variables</span>
        <span class="section-badge badge-public">Public</span>
      </div>
      <div class="env-grid">
        ${envCards}
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <span class="section-title">Private Environment Variables</span>
        <span class="section-badge badge-private">Redacted</span>
      </div>
      <div class="private-grid">
        <div class="private-pill">
          <span class="lock">&#x1F512;</span>
          <span class="key-name">DATABASE_URL</span>
          <span class="redacted">&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;</span>
        </div>
        <div class="private-pill">
          <span class="lock">&#x1F512;</span>
          <span class="key-name">API_SECRET_KEY</span>
          <span class="redacted">&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;</span>
        </div>
      </div>
    </div>

    <div class="footer">
      Deployed with <a href="https://servercompass.app/">Server Compass</a> &mdash;
      the modern way to self-host Node.js applications on your own VPS.
    </div>

  </div>
</body>
</html>`;
}

// Routes

app.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(renderHtml());
});

app.get('/api/env', (_req, res) => {
  res.json({ envs: getPublicEnvs() });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'servercompass-mern-demo' });
});

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`ServerCompass MERN Demo running on http://localhost:${PORT}`);
});
