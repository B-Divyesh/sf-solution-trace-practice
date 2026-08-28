import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  root: resolve(import.meta.dirname, 'site'),
  publicDir: resolve(import.meta.dirname, 'site/public'),
  build: {
    outDir: resolve(import.meta.dirname, 'dist/site'),
    emptyOutDir: true,
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      input: resolve(import.meta.dirname, 'site/index.html')
    }
  }
});
