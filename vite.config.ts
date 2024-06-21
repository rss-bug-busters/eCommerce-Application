// import 'dotenv/config';
import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import sassDts from 'vite-plugin-sass-dts';
import checker from 'vite-plugin-checker';
import path from 'node:path';
import svgr from 'vite-plugin-svgr';
import { loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { visualizer } from 'rollup-plugin-visualizer';

const viteENV = loadEnv('all', process.cwd(), 'VITE_');

const root = import.meta.dirname;

const throwError = (text: string) => {
  throw new Error(text);
};

export default defineConfig({
  base: '/',
  root,
  build: {
    emptyOutDir: true,
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
    react(),
    nodePolyfills(),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        plugins: ['@svgr/plugin-jsx'],
      },
    }),
    sassDts({
      enabledMode: ['development', 'production'],
      prettierFilePath: path.resolve(root, 'prettier.config.js'),
    }),
    process.env.VITEST
      ? undefined
      : checker({
          overlay: {
            initialIsOpen: 'error',
          },
          typescript: true,
          eslint: {
            lintCommand:
              'eslint "./src/**/*.{js,jsx,ts,tsx,cjs,mjs}" --ignore-path .gitignore',
          },
          stylelint: {
            lintCommand:
              'stylelint "./src/**/*.{css,scss,sass,less,styl,vue,svelte}" --ignore-path .gitignore',
          },
          enableBuild: false,
        }),
    visualizer(),
  ],
  test: {
    setupFiles: path.resolve(root, 'src/tests/setup.ts'),
    globals: true,
    environment: 'jsdom',
    css: true,
    include: [...configDefaults.include],
    exclude: [...configDefaults.exclude],
    coverage: {
      include: ['src/**/*.{js,ts,jsx,tsx}'],
      reporter: ['text', 'json', 'html'],
    },
  },
  define: {
    VITE_COMMERCETOOLS_PROJECT_KEY:
      JSON.stringify(viteENV.VITE_COMMERCETOOLS_PROJECT_KEY) ??
      throwError('VITE_COMMERCETOOLS_PROJECT_KEY is not defined'),
    VITE_COMMERCETOOLS_CLIENT_ID:
      JSON.stringify(viteENV.VITE_COMMERCETOOLS_CLIENT_ID) ??
      throwError('VITE_COMMERCETOOLS_CLIENT_ID is not defined'),
    VITE_COMMERCETOOLS_SECRET:
      JSON.stringify(viteENV.VITE_COMMERCETOOLS_SECRET) ??
      throwError('VITE_COMMERCETOOLS_SECRET is not defined'),
    VITE_COMMERCETOOLS_SCOPE:
      JSON.stringify(viteENV.VITE_COMMERCETOOLS_SCOPE) ??
      throwError('VITE_COMMERCETOOLS_SCOPE is not defined'),
    VITE_COMMERCETOOLS_API_URL:
      JSON.stringify(viteENV.VITE_COMMERCETOOLS_API_URL) ??
      throwError('VITE_COMMERCETOOLS_API_URL is not defined'),
    VITE_COMMERCETOOLS_AUTH_URL:
      JSON.stringify(viteENV.VITE_COMMERCETOOLS_AUTH_URL) ??
      throwError('VITE_COMMERCETOOLS_AUTHURL is not defined'),
    VITE_COMMERCETOOLS_USE_LOGGER:
      JSON.stringify(viteENV.VITE_COMMERCETOOLS_USE_LOGGER) ?? '0',
    VITE_COMMERCETOOLS_TEST_USER_EMAIL:
      JSON.stringify(viteENV.VITE_COMMERCETOOLS_TEST_USER_EMAIL) ??
      throwError('VITE_COMMERCETOOLS_TEST_USER_EMAIL is not defined'),
    VITE_COMMERCETOOLS_TEST_USER_PASSWORD:
      JSON.stringify(viteENV.VITE_COMMERCETOOLS_TEST_USER_PASSWORD) ??
      throwError('VITE_COMMERCETOOLS_TEST_USER_PASSWORD is not defined'),
  },
});
