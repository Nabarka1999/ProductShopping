import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/cms': {
        target: 'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
