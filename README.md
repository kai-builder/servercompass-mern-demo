# MERN Stack Demo - Server Compass

> A production-ready MERN stack application template for self-hosting with [Server Compass](https://servercompass.app/)

This demo shows how to deploy a full **MongoDB + Express + React + Node.js** application to your own VPS using Server Compass. The React frontend is built with Vite (TypeScript) and served by the Express backend as static assets — one Docker container for the complete stack.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript (Vite) |
| Backend | Express.js (Node.js 22) |
| Database | MongoDB (via `DATABASE_URL`) |
| Runtime | Node.js 22 Alpine |

## Project Structure

```
servercompass-mern-demo/
├── client/                  # React + Vite frontend
│   ├── index.html
│   ├── vite.config.ts       # Dev proxy: /api -> http://localhost:3000
│   ├── tsconfig.json
│   ├── package.json
│   └── src/
│       ├── main.tsx
│       ├── App.tsx          # Dashboard: fetches /api/env, renders env vars
│       ├── App.css          # Server Compass dark theme design tokens
│       └── vite-env.d.ts
├── server/                  # Express API backend
│   ├── index.js             # Routes: /api/env, /health, SPA fallback
│   └── package.json
├── package.json             # Root scripts (dev, build, start)
├── Dockerfile               # Multi-stage: build React then serve with Express
├── .env.example
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 22+
- npm 10+

### Local Development

```bash
# 1. Clone the repo
git clone https://github.com/kai-builder/servercompass-mern-demo.git
cd servercompass-mern-demo

# 2. Install all dependencies (root + client + server)
npm run install:all

# 3. Copy and edit the env file
cp .env.example .env

# 4. Start both servers concurrently
npm run dev
# React dev server  → http://localhost:5173  (proxies /api to Express)
# Express API       → http://localhost:3000
```

The Vite dev server proxies `/api` and `/health` to `http://localhost:3000`, so hot-module reloading works while the Express server handles API calls.

### Docker (Recommended)

```bash
# Build the multi-stage image
docker build -t servercompass-mern-demo .

# Run with environment variables
docker run -p 3000:3000 --env-file .env.example servercompass-mern-demo
```

Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /` | React SPA dashboard |
| `GET /api/env` | JSON — public environment variables |
| `GET /health` | Health check — `{ "status": "ok" }` |

## Environment Variables

```dotenv
# Public — displayed in the React UI
APP_NAME=ServerCompass MERN Demo
API_URL=https://api.servercompass.app
ENVIRONMENT=production
VERSION=1.0.0

# Private — server-side only, never sent to the browser
DATABASE_URL=mongodb://user:password@localhost:27017/servercompass
API_SECRET_KEY=your-secret-key-here

# Server
PORT=3000
```

## How the Build Works

1. **Stage 1** (`client-builder`): `npm ci` installs Vite + React deps, then `npm run build` compiles TypeScript and bundles everything into `client/dist/`.
2. **Stage 2** (production): Only the Express server and the compiled `client/dist/` assets are copied — no Node build tooling in the final image.
3. Express serves `client/dist` as static files and falls back to `index.html` for all unmatched routes (SPA routing).

This approach means the final image is minimal and the Vite build layer is cached as long as `client/package*.json` hasn't changed.

## Deploy to Your VPS

Deploy this MERN application to any VPS in minutes with [Server Compass](https://servercompass.app/) — the modern way to self host MERN stack applications.

1. Push this repo to GitHub
2. Connect your VPS to [Server Compass](https://servercompass.app/)
3. Point Server Compass at the repo — it detects the Dockerfile automatically
4. Set your environment variables in the Server Compass dashboard
5. Deploy

Server Compass handles Docker builds, zero-downtime restarts, environment variable management, and health monitoring.

## Keywords

self host MERN, deploy MERN to VPS, install MERN stack, MERN docker deployment, self-hosted React Express Node MongoDB, deploy React app VPS, self-host Express API
