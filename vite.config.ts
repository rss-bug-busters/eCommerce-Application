/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import sassDts from 'vite-plugin-sass-dts';
import checker from 'vite-plugin-checker';
import path from 'node:path';

const root = import.meta.dirname;

export default defineConfig({
  base: './',
  root,
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
    process.env.VITEST
      ? undefined
      : checker({
          typescript: true,
          eslint: {
            lintCommand: `eslint "./src/**/*.{js,jsx,ts,tsx,cjs,mjs}" --ignore-path .gitignore --cache --cache-location ${path.resolve(root, 'node_modules/.cache/eslint/.eslintcache')} `,
          },
          stylelint: {
            lintCommand: `stylelint "./src/**/*.{css,scss,sass,less,styl,vue,svelte}" --ignore-path .gitignore --cache --cache-location ${path.resolve(root, 'node_modules/.cache/stylelint/.stylelintcache')}`,
          },
          enableBuild: false,
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
