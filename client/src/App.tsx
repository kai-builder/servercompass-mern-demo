import { useEffect, useState } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface EnvVar {
  key: string;
  value: string;
}

interface ApiResponse {
  envs: EnvVar[];
}

type Status = 'loading' | 'success' | 'error';

// ── Stack layer definitions ───────────────────────────────────────────────────

const STACK_LAYERS = [
  { icon: '⚛', name: 'React', role: 'Frontend UI', color: 'var(--accent-2)' },
  { icon: '⚡', name: 'Express', role: 'API Server', color: 'var(--accent)' },
  { icon: '🍃', name: 'MongoDB', role: 'Database', color: '#4ade80' },
  { icon: '🟩', name: 'Node.js', role: 'Runtime', color: '#f5d06f' },
] as const;

const PRIVATE_KEYS = ['DATABASE_URL', 'API_SECRET_KEY'] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function App() {
  const [envs, setEnvs] = useState<EnvVar[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch('/api/env')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status} from /api/env`);
        return res.json() as Promise<ApiResponse>;
      })
      .then((data) => {
        setEnvs(data.envs);
        setStatus('success');
      })
      .catch((err: unknown) => {
        setErrorMsg(err instanceof Error ? err.message : String(err));
        setStatus('error');
      });
  }, []);

  return (
    <div className="page">
      <div className="container">

        {/* ── Eyebrow ── */}
        <div className="eyebrow">
          <span className="pulse-dot" />
          MongoDB · Express · React · Node.js
        </div>

        {/* ── Hero ── */}
        <h1>
          Server<span className="gradient-text">Compass</span>
          <br />
          MERN Demo
        </h1>
        <p className="subtitle">
          A production-ready <strong>MERN stack</strong> application — React
          frontend built with Vite, Express.js REST API, and a MongoDB
          connection — all in a single Docker container managed by{' '}
          <a
            href="https://servercompass.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Server Compass
          </a>
          .
        </p>

        {/* ── Stack badges ── */}
        <div className="pill-row">
          <span className="pill">&#x269B; React 18</span>
          <span className="pill">&#x26A1; Express.js</span>
          <span className="pill">&#x1F9EA; /api/env</span>
          <span className="pill">&#x2764; /health</span>
        </div>

        {/* ── Public env vars ── */}
        <section className="card" aria-label="Public environment variables">
          <div className="card-header">
            <span className="card-title">Public Environment Variables</span>
            <span className="badge badge-green">Public</span>
          </div>

          {status === 'loading' && (
            <div className="state-row">
              <span className="spinner" aria-hidden="true" />
              <span>Fetching from <code>/api/env</code>&hellip;</span>
            </div>
          )}

          {status === 'error' && (
            <div className="state-row state-error" role="alert">
              <span aria-hidden="true">&#x26A0;</span>
              <span>
                Failed to load: <code>{errorMsg}</code>
              </span>
            </div>
          )}

          {status === 'success' && (
            <div className="env-list">
              {envs.map(({ key, value }) => (
                <div className="env-row" key={key}>
                  <span className="env-key">{key}</span>
                  <span className="env-value">{value}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Private env vars (redacted) ── */}
        <section className="card" aria-label="Private environment variables">
          <div className="card-header">
            <span className="card-title">Private Environment Variables</span>
            <span className="badge badge-yellow">Redacted</span>
          </div>
          <div className="pill-row pill-row--flush">
            {PRIVATE_KEYS.map((name) => (
              <div className="private-pill" key={name}>
                <span aria-hidden="true">&#x1F512;</span>
                <span className="mono">{name}</span>
                <span className="redacted" aria-label="redacted value">
                  &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── MERN stack layers ── */}
        <div className="stack-grid">
          {STACK_LAYERS.map(({ icon, name, role, color }) => (
            <div className="stack-card" key={name}>
              <span className="stack-icon" aria-hidden="true">{icon}</span>
              <span className="stack-name" style={{ color }}>{name}</span>
              <span className="stack-role">{role}</span>
            </div>
          ))}
        </div>

        {/* ── Build pipeline callout ── */}
        <div className="callout">
          <span className="callout-label">Build pipeline</span>
          <div className="pipeline">
            <span className="pipeline-step">Vite builds React</span>
            <span className="pipeline-arrow">&#x2192;</span>
            <span className="pipeline-step">static assets</span>
            <span className="pipeline-arrow">&#x2192;</span>
            <span className="pipeline-step">Express serves them</span>
            <span className="pipeline-arrow">&#x2192;</span>
            <span className="pipeline-step pipeline-step--accent">single container</span>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="footer">
          Deployed with{' '}
          <a
            href="https://servercompass.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Server Compass
          </a>{' '}
          &mdash; the modern way to self-host MERN applications on your own VPS.
        </footer>

      </div>
    </div>
  );
}
