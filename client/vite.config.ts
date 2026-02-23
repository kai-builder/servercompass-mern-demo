import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// During local development, proxy /api and /health to the Express server.
// In production the Express server serves the built React assets directly,
// so no proxy is needed.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/health': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
