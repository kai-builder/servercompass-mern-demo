# ServerCompass MERN Demo

> A production-ready MERN stack (MongoDB + Express.js + React + Node.js) application template for self-hosting with [Server Compass](https://servercompass.app/).

This demo showcases how [Server Compass](https://servercompass.app/) makes it easy to **install MERN stack**, **self-host Node.js applications**, and **deploy Express.js to a VPS** — no DevOps expertise required.

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/kai-builder/servercompass-mern-demo.git
cd servercompass-mern-demo

# Copy environment variables
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Endpoints

| Route | Description |
|-------|-------------|
| `GET /` | Landing page showing public environment variables |
| `GET /api/env` | JSON response with public env vars |
| `GET /health` | Health check — returns `{"status":"ok"}` |

---

## Environment Variables

Copy `.env.example` to `.env` and adjust the values:

```env
APP_NAME=ServerCompass MERN Demo
API_URL=https://api.servercompass.app
ENVIRONMENT=production
VERSION=1.0.0
DATABASE_URL=mongodb://localhost:27017/servercompass
API_SECRET_KEY=your-secret-key-here
PORT=3000
```

| Variable | Description |
|----------|-------------|
| `APP_NAME` | Display name shown on the landing page |
| `API_URL` | Server Compass API endpoint |
| `ENVIRONMENT` | Runtime environment (`production`, `staging`, etc.) |
| `VERSION` | Application version |
| `DATABASE_URL` | MongoDB connection string (kept private, not exposed in UI) |
| `API_SECRET_KEY` | Secret key (kept private, not exposed in UI) |
| `PORT` | Port the server listens on (default: `3000`) |

---

## Docker

### Build

```bash
docker build -t servercompass-mern-demo .
```

### Run

```bash
docker run -p 3000:3000 --env-file .env servercompass-mern-demo
```

### Docker Compose (optional)

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
    restart: unless-stopped
```

---

## Deploy to Your VPS

Deploy this MERN stack application to any VPS in minutes with [Server Compass](https://servercompass.app/) — the modern way to self-host Node.js applications on your own infrastructure.

- Point Server Compass at your Git repository
- Set your environment variables in the dashboard
- Server Compass builds and runs the Docker container automatically
- Zero-downtime deploys, health checks, and log streaming included

[Get started with Server Compass](https://servercompass.app/)

---

## Keywords

self host MERN stack, deploy Express.js to VPS, install Node.js on VPS, self-hosted MongoDB Express React Node, deploy MERN to VPS, Node.js Docker deployment, self-hosted Node.js
