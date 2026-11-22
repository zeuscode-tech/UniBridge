import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works from any static host (GitHub Pages, Vercel, a USB stick).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { port: 5173 },
});
