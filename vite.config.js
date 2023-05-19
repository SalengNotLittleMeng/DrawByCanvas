// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    server: {
      hmr: true,
    },
    sourcemap: true,
    watch: {},
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'Draw',
      fileName: 'draw',
    },
    rollupOptions: {
      output: {
        dir: 'lib',
        name: 'draw',
      },
    },
  },
});
