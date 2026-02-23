'use strict';

// Load .env only when not already injected (local dev convenience)
// In Docker / production the vars are set at the container level.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Public env vars shown in the React UI - never include secrets here
const PUBLIC_KEYS = ['APP_NAME', 'API_URL', 'ENVIRONMENT', 'VERSION'];

function getPublicEnvs() {
  return PUBLIC_KEYS.map((key) => ({
    key,
    value: process.env[key] || 'Not set',
  }));
}

// ── API routes ────────────────────────────────────────────────────────────────

app.get('/api/env', (_req, res) => {
  res.json({ envs: getPublicEnvs() });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'servercompass-mern-demo' });
});

// ── Static files (React build) ────────────────────────────────────────────────

const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));

// SPA fallback — any unmatched route returns index.html so React Router works
app.get('*', (_req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

// ── Start ─────────────────────────────────────────────────────────────────────

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[ServerCompass MERN Demo] listening on http://0.0.0.0:${PORT}`);
  console.log(`  NODE_ENV : ${process.env.NODE_ENV || 'development'}`);
  console.log(`  /health  -> { status: "ok" }`);
  console.log(`  /api/env -> public env vars`);
  console.log(`  /        -> React SPA`);
});
