# syntax=docker/dockerfile:1

# ── Stage 1: Build React frontend ────────────────────────────────────────────
# Install deps separately from source so the npm ci layer is cached as long
# as package*.json files don't change.
FROM node:22-alpine AS client-builder
WORKDIR /app/client

COPY client/package*.json ./
RUN npm ci

COPY client/ .
RUN npm run build

# ── Stage 2: Production server ────────────────────────────────────────────────
# Only ship the compiled React assets + Express server — no dev tooling.
FROM node:22-alpine
WORKDIR /app

# Install server production deps first (cached layer)
COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev

# Copy Express server source
COPY server/ ./server/

# Copy the Vite-compiled React bundle from stage 1
COPY --from=client-builder /app/client/dist ./client/dist

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost:3000/health || exit 1

ENV NODE_ENV=production

CMD ["node", "server/index.js"]
