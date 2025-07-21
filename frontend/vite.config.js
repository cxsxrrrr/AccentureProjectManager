import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://8080-cxsxrrrr-accentureproje-sa6dzqb8gkh.ws-us120.gitpod.io/',
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: ['5173-cxsxrrrr-accentureproje-sa6dzqb8gkh.ws-us120.gitpod.io'],
  }
});
