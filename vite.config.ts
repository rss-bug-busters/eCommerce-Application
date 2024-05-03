/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import sassDts from 'vite-plugin-sass-dts';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';
import path from 'node:path';

const root = import.meta.dirname;

export default defineConfig({
  base: './',
  build: {
    emptyOutDir: true,
    minify: true,
    outDir: path.resolve(root, 'build'),
    sourcemap: true,
    target: 'es2017',
    cssCodeSplit: true,
  },
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      minimize: true,
      sourceMap: true,
    },
  },
  plugins: [
    tsconfigPaths(),
    sassDts({
      enabledMode: ['development', 'production'],
      prettierFilePath: path.resolve(root, '.prettierrc.json.'),
    }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    eslint({
      cache: true,
      fix: true,
      include: ['src/**/*.{ts,tsx,js,jsx}'],
    }),
    stylelint({
      cache: true,
      cacheLocation: 'node_modules/.cache/stylelint/.stylelintcache',
      include: ['src/**/*.{css,scss,sass,less,styl,vue,svelte}'],
      fix: true,
    }),
    checker({
      typescript: true,
    }),
    react(),
  ],
  test: {
    setupFiles: path.resolve(root, 'src/tests/setup.ts'),
    globals: true,
    environment: 'jsdom',
    css: true,
  },
});
