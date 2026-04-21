import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      server: {
        hmr: true,
        watch: {
          // Если работаете в WSL, Docker или VirtualBox
          usePolling: true,
          interval: 1000,
        },
      },
      css: {
        // Убедимся, что CSS обрабатывается правильно
        devSourcemap: true,
      },
    }),
  ],
});
