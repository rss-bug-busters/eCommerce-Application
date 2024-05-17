// vite.config.ts
import { configDefaults, defineConfig } from "file:///C:/Users/anton.ramarchuk/asdasda/.yarn/__virtual__/vitest-virtual-2ae3767ea0/2/AppData/Local/Yarn/Berry/cache/vitest-npm-1.6.0-55b47a8207-10c0.zip/node_modules/vitest/dist/config.js";
import react from "file:///C:/Users/anton.ramarchuk/asdasda/.yarn/__virtual__/@vitejs-plugin-react-swc-virtual-2f9dcefac1/2/AppData/Local/Yarn/Berry/cache/@vitejs-plugin-react-swc-npm-3.6.0-18140d7bb7-10c0.zip/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tsconfigPaths from "file:///C:/Users/anton.ramarchuk/asdasda/.yarn/__virtual__/vite-tsconfig-paths-virtual-2776789485/2/AppData/Local/Yarn/Berry/cache/vite-tsconfig-paths-npm-4.3.2-96d4ddd73d-10c0.zip/node_modules/vite-tsconfig-paths/dist/index.mjs";
import sassDts from "file:///C:/Users/anton.ramarchuk/asdasda/.yarn/__virtual__/vite-plugin-sass-dts-virtual-e3f4b8d458/2/AppData/Local/Yarn/Berry/cache/vite-plugin-sass-dts-npm-1.3.18-bc14efc44e-10c0.zip/node_modules/vite-plugin-sass-dts/dist/index.js";
import checker from "file:///C:/Users/anton.ramarchuk/asdasda/.yarn/__virtual__/vite-plugin-checker-virtual-ec3b598f7a/2/AppData/Local/Yarn/Berry/cache/vite-plugin-checker-npm-0.6.4-7ffc01c613-10c0.zip/node_modules/vite-plugin-checker/dist/esm/main.js";
import path from "node:path";
import svgr from "file:///C:/Users/anton.ramarchuk/asdasda/.yarn/__virtual__/vite-plugin-svgr-virtual-eac63e457a/2/AppData/Local/Yarn/Berry/cache/vite-plugin-svgr-npm-4.2.0-e0c6a7a1f0-10c0.zip/node_modules/vite-plugin-svgr/dist/index.js";
import { loadEnv } from "file:///C:/Users/anton.ramarchuk/asdasda/.yarn/__virtual__/vite-virtual-27f3518de6/2/AppData/Local/Yarn/Berry/cache/vite-npm-5.2.10-08834d3974-10c0.zip/node_modules/vite/dist/node/index.js";
import { nodePolyfills } from "file:///C:/Users/anton.ramarchuk/asdasda/.yarn/__virtual__/vite-plugin-node-polyfills-virtual-302e823e48/2/AppData/Local/Yarn/Berry/cache/vite-plugin-node-polyfills-npm-0.21.0-3da2ba0d42-10c0.zip/node_modules/vite-plugin-node-polyfills/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\anton.ramarchuk\\asdasda";
var viteENV = loadEnv("all", process.cwd(), "VITE_");
var root = __vite_injected_original_dirname;
var throwError = (text) => {
  throw new Error(text);
};
var vite_config_default = defineConfig({
  base: "./",
  root,
  build: {
    emptyOutDir: true,
    minify: true,
    outDir: path.resolve(root, "build"),
    sourcemap: true,
    target: "es2017",
    cssCodeSplit: true
  },
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: "camelCaseOnly"
    },
    preprocessorOptions: {
      minimize: true,
      sourceMap: true
    }
  },
  plugins: [
    nodePolyfills(),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        plugins: ["@svgr/plugin-jsx"]
      }
    }),
    sassDts({
      enabledMode: ["development", "production"],
      prettierFilePath: path.resolve(root, ".prettierrc.json.")
    }),
    process.env.VITEST ? void 0 : checker({
      typescript: true,
      eslint: {
        lintCommand: `eslint "./src/**/*.{js,jsx,ts,tsx,cjs,mjs}" --ignore-path .gitignore --cache --cache-location ${path.resolve(root, "node_modules/.cache/eslint/.eslintcache")} `
      },
      stylelint: {
        lintCommand: `stylelint "./src/**/*.{css,scss,sass,less,styl,vue,svelte}" --ignore-path .gitignore --cache --cache-location ${path.resolve(root, "node_modules/.cache/stylelint/.stylelintcache")}`
      },
      enableBuild: false
    }),
    react()
  ],
  test: {
    setupFiles: path.resolve(root, "src/tests/setup.ts"),
    globals: true,
    environment: "jsdom",
    css: true,
    include: [...configDefaults.include],
    exclude: [
      ...configDefaults.exclude,
      "**/node_modules/**",
      "**/build/**",
      "**/dist/**",
      "**/coverage/**",
      "**/.{idea,git,cache,output,temp}/**",
      "./src/assets/**/*"
    ],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        ...configDefaults.exclude,
        "**/coverage/**",
        "**/node_modules/**",
        ".pnp.loader.mjs",
        ".pnp.cjs",
        "./src/assets/**",
        ".lintstagedrc.js",
        "commitlint.config.js"
      ]
    }
  },
  define: {
    VITE_COMMERCETOOLS_PROJECT_KEY: JSON.stringify(viteENV.VITE_COMMERCETOOLS_PROJECT_KEY) ?? throwError("VITE_COMMERCETOOLS_PROJECT_KEY is not defined"),
    VITE_COMMERCETOOLS_CLIENT_ID: JSON.stringify(viteENV.VITE_COMMERCETOOLS_CLIENT_ID) ?? throwError("VITE_COMMERCETOOLS_CLIENT_ID is not defined"),
    VITE_COMMERCETOOLS_SECRET: JSON.stringify(viteENV.VITE_COMMERCETOOLS_SECRET) ?? throwError("VITE_COMMERCETOOLS_SECRET is not defined"),
    VITE_COMMERCETOOLS_SCOPE: JSON.stringify(viteENV.VITE_COMMERCETOOLS_SCOPE) ?? throwError("VITE_COMMERCETOOLS_SCOPE is not defined"),
    VITE_COMMERCETOOLS_API_URL: JSON.stringify(viteENV.VITE_COMMERCETOOLS_API_URL) ?? throwError("VITE_COMMERCETOOLS_API_URL is not defined"),
    VITE_COMMERCETOOLS_AUTH_URL: JSON.stringify(viteENV.VITE_COMMERCETOOLS_AUTH_URL) ?? throwError("VITE_COMMERCETOOLS_AUTHURL is not defined")
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbnRvbi5yYW1hcmNodWtcXFxcYXNkYXNkYVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcYW50b24ucmFtYXJjaHVrXFxcXGFzZGFzZGFcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2FudG9uLnJhbWFyY2h1ay9hc2Rhc2RhL3ZpdGUuY29uZmlnLnRzXCI7Ly8gaW1wb3J0ICdkb3RlbnYvY29uZmlnJztcbmltcG9ydCB7IGNvbmZpZ0RlZmF1bHRzLCBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5pbXBvcnQgc2Fzc0R0cyBmcm9tICd2aXRlLXBsdWdpbi1zYXNzLWR0cyc7XG5pbXBvcnQgY2hlY2tlciBmcm9tICd2aXRlLXBsdWdpbi1jaGVja2VyJztcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcbmltcG9ydCB7IGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IG5vZGVQb2x5ZmlsbHMgfSBmcm9tICd2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxscyc7XG5cbmNvbnN0IHZpdGVFTlYgPSBsb2FkRW52KCdhbGwnLCBwcm9jZXNzLmN3ZCgpLCAnVklURV8nKTtcblxuY29uc3Qgcm9vdCA9IGltcG9ydC5tZXRhLmRpcm5hbWU7XG5cbmNvbnN0IHRocm93RXJyb3IgPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gIHRocm93IG5ldyBFcnJvcih0ZXh0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6ICcuLycsXG4gIHJvb3QsXG4gIGJ1aWxkOiB7XG4gICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgbWluaWZ5OiB0cnVlLFxuICAgIG91dERpcjogcGF0aC5yZXNvbHZlKHJvb3QsICdidWlsZCcpLFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICB0YXJnZXQ6ICdlczIwMTcnLFxuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgZGV2U291cmNlbWFwOiB0cnVlLFxuICAgIG1vZHVsZXM6IHtcbiAgICAgIGxvY2Fsc0NvbnZlbnRpb246ICdjYW1lbENhc2VPbmx5JyxcbiAgICB9LFxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIG1pbmltaXplOiB0cnVlLFxuICAgICAgc291cmNlTWFwOiB0cnVlLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBub2RlUG9seWZpbGxzKCksXG4gICAgdHNjb25maWdQYXRocygpLFxuICAgIHN2Z3Ioe1xuICAgICAgc3Znck9wdGlvbnM6IHtcbiAgICAgICAgcGx1Z2luczogWydAc3Znci9wbHVnaW4tanN4J10sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHNhc3NEdHMoe1xuICAgICAgZW5hYmxlZE1vZGU6IFsnZGV2ZWxvcG1lbnQnLCAncHJvZHVjdGlvbiddLFxuICAgICAgcHJldHRpZXJGaWxlUGF0aDogcGF0aC5yZXNvbHZlKHJvb3QsICcucHJldHRpZXJyYy5qc29uLicpLFxuICAgIH0pLFxuICAgIHByb2Nlc3MuZW52LlZJVEVTVFxuICAgICAgPyB1bmRlZmluZWRcbiAgICAgIDogY2hlY2tlcih7XG4gICAgICAgICAgdHlwZXNjcmlwdDogdHJ1ZSxcbiAgICAgICAgICBlc2xpbnQ6IHtcbiAgICAgICAgICAgIGxpbnRDb21tYW5kOiBgZXNsaW50IFwiLi9zcmMvKiovKi57anMsanN4LHRzLHRzeCxjanMsbWpzfVwiIC0taWdub3JlLXBhdGggLmdpdGlnbm9yZSAtLWNhY2hlIC0tY2FjaGUtbG9jYXRpb24gJHtwYXRoLnJlc29sdmUocm9vdCwgJ25vZGVfbW9kdWxlcy8uY2FjaGUvZXNsaW50Ly5lc2xpbnRjYWNoZScpfSBgLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3R5bGVsaW50OiB7XG4gICAgICAgICAgICBsaW50Q29tbWFuZDogYHN0eWxlbGludCBcIi4vc3JjLyoqLyoue2NzcyxzY3NzLHNhc3MsbGVzcyxzdHlsLHZ1ZSxzdmVsdGV9XCIgLS1pZ25vcmUtcGF0aCAuZ2l0aWdub3JlIC0tY2FjaGUgLS1jYWNoZS1sb2NhdGlvbiAke3BhdGgucmVzb2x2ZShyb290LCAnbm9kZV9tb2R1bGVzLy5jYWNoZS9zdHlsZWxpbnQvLnN0eWxlbGludGNhY2hlJyl9YCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVuYWJsZUJ1aWxkOiBmYWxzZSxcbiAgICAgICAgfSksXG4gICAgcmVhY3QoKSxcbiAgXSxcbiAgdGVzdDoge1xuICAgIHNldHVwRmlsZXM6IHBhdGgucmVzb2x2ZShyb290LCAnc3JjL3Rlc3RzL3NldHVwLnRzJyksXG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgICBjc3M6IHRydWUsXG4gICAgaW5jbHVkZTogWy4uLmNvbmZpZ0RlZmF1bHRzLmluY2x1ZGVdLFxuICAgIGV4Y2x1ZGU6IFtcbiAgICAgIC4uLmNvbmZpZ0RlZmF1bHRzLmV4Y2x1ZGUsXG4gICAgICAnKiovbm9kZV9tb2R1bGVzLyoqJyxcbiAgICAgICcqKi9idWlsZC8qKicsXG4gICAgICAnKiovZGlzdC8qKicsXG4gICAgICAnKiovY292ZXJhZ2UvKionLFxuICAgICAgJyoqLy57aWRlYSxnaXQsY2FjaGUsb3V0cHV0LHRlbXB9LyoqJyxcbiAgICAgICcuL3NyYy9hc3NldHMvKiovKicsXG4gICAgXSxcbiAgICBjb3ZlcmFnZToge1xuICAgICAgcmVwb3J0ZXI6IFsndGV4dCcsICdqc29uJywgJ2h0bWwnXSxcbiAgICAgIGV4Y2x1ZGU6IFtcbiAgICAgICAgLi4uY29uZmlnRGVmYXVsdHMuZXhjbHVkZSxcbiAgICAgICAgJyoqL2NvdmVyYWdlLyoqJyxcbiAgICAgICAgJyoqL25vZGVfbW9kdWxlcy8qKicsXG4gICAgICAgICcucG5wLmxvYWRlci5tanMnLFxuICAgICAgICAnLnBucC5janMnLFxuICAgICAgICAnLi9zcmMvYXNzZXRzLyoqJyxcbiAgICAgICAgJy5saW50c3RhZ2VkcmMuanMnLFxuICAgICAgICAnY29tbWl0bGludC5jb25maWcuanMnLFxuICAgICAgXSxcbiAgICB9LFxuICB9LFxuICBkZWZpbmU6IHtcbiAgICBWSVRFX0NPTU1FUkNFVE9PTFNfUFJPSkVDVF9LRVk6XG4gICAgICBKU09OLnN0cmluZ2lmeSh2aXRlRU5WLlZJVEVfQ09NTUVSQ0VUT09MU19QUk9KRUNUX0tFWSkgPz9cbiAgICAgIHRocm93RXJyb3IoJ1ZJVEVfQ09NTUVSQ0VUT09MU19QUk9KRUNUX0tFWSBpcyBub3QgZGVmaW5lZCcpLFxuICAgIFZJVEVfQ09NTUVSQ0VUT09MU19DTElFTlRfSUQ6XG4gICAgICBKU09OLnN0cmluZ2lmeSh2aXRlRU5WLlZJVEVfQ09NTUVSQ0VUT09MU19DTElFTlRfSUQpID8/XG4gICAgICB0aHJvd0Vycm9yKCdWSVRFX0NPTU1FUkNFVE9PTFNfQ0xJRU5UX0lEIGlzIG5vdCBkZWZpbmVkJyksXG4gICAgVklURV9DT01NRVJDRVRPT0xTX1NFQ1JFVDpcbiAgICAgIEpTT04uc3RyaW5naWZ5KHZpdGVFTlYuVklURV9DT01NRVJDRVRPT0xTX1NFQ1JFVCkgPz9cbiAgICAgIHRocm93RXJyb3IoJ1ZJVEVfQ09NTUVSQ0VUT09MU19TRUNSRVQgaXMgbm90IGRlZmluZWQnKSxcbiAgICBWSVRFX0NPTU1FUkNFVE9PTFNfU0NPUEU6XG4gICAgICBKU09OLnN0cmluZ2lmeSh2aXRlRU5WLlZJVEVfQ09NTUVSQ0VUT09MU19TQ09QRSkgPz9cbiAgICAgIHRocm93RXJyb3IoJ1ZJVEVfQ09NTUVSQ0VUT09MU19TQ09QRSBpcyBub3QgZGVmaW5lZCcpLFxuICAgIFZJVEVfQ09NTUVSQ0VUT09MU19BUElfVVJMOlxuICAgICAgSlNPTi5zdHJpbmdpZnkodml0ZUVOVi5WSVRFX0NPTU1FUkNFVE9PTFNfQVBJX1VSTCkgPz9cbiAgICAgIHRocm93RXJyb3IoJ1ZJVEVfQ09NTUVSQ0VUT09MU19BUElfVVJMIGlzIG5vdCBkZWZpbmVkJyksXG4gICAgVklURV9DT01NRVJDRVRPT0xTX0FVVEhfVVJMOlxuICAgICAgSlNPTi5zdHJpbmdpZnkodml0ZUVOVi5WSVRFX0NPTU1FUkNFVE9PTFNfQVVUSF9VUkwpID8/XG4gICAgICB0aHJvd0Vycm9yKCdWSVRFX0NPTU1FUkNFVE9PTFNfQVVUSFVSTCBpcyBub3QgZGVmaW5lZCcpLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxnQkFBZ0Isb0JBQW9CO0FBQzdDLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFVBQVU7QUFDakIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMscUJBQXFCO0FBVDlCLElBQU0sbUNBQW1DO0FBV3pDLElBQU0sVUFBVSxRQUFRLE9BQU8sUUFBUSxJQUFJLEdBQUcsT0FBTztBQUVyRCxJQUFNLE9BQU87QUFFYixJQUFNLGFBQWEsQ0FBQyxTQUFpQjtBQUNuQyxRQUFNLElBQUksTUFBTSxJQUFJO0FBQ3RCO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ047QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGFBQWE7QUFBQSxJQUNiLFFBQVE7QUFBQSxJQUNSLFFBQVEsS0FBSyxRQUFRLE1BQU0sT0FBTztBQUFBLElBQ2xDLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxJQUNSLGNBQWM7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsY0FBYztBQUFBLElBQ2QsU0FBUztBQUFBLE1BQ1Asa0JBQWtCO0FBQUEsSUFDcEI7QUFBQSxJQUNBLHFCQUFxQjtBQUFBLE1BQ25CLFVBQVU7QUFBQSxNQUNWLFdBQVc7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsY0FBYztBQUFBLElBQ2QsY0FBYztBQUFBLElBQ2QsS0FBSztBQUFBLE1BQ0gsYUFBYTtBQUFBLFFBQ1gsU0FBUyxDQUFDLGtCQUFrQjtBQUFBLE1BQzlCO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxRQUFRO0FBQUEsTUFDTixhQUFhLENBQUMsZUFBZSxZQUFZO0FBQUEsTUFDekMsa0JBQWtCLEtBQUssUUFBUSxNQUFNLG1CQUFtQjtBQUFBLElBQzFELENBQUM7QUFBQSxJQUNELFFBQVEsSUFBSSxTQUNSLFNBQ0EsUUFBUTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osUUFBUTtBQUFBLFFBQ04sYUFBYSxpR0FBaUcsS0FBSyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFBQSxNQUM3SztBQUFBLE1BQ0EsV0FBVztBQUFBLFFBQ1QsYUFBYSxpSEFBaUgsS0FBSyxRQUFRLE1BQU0sK0NBQStDLENBQUM7QUFBQSxNQUNuTTtBQUFBLE1BQ0EsYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBLElBQ0wsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFlBQVksS0FBSyxRQUFRLE1BQU0sb0JBQW9CO0FBQUEsSUFDbkQsU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsS0FBSztBQUFBLElBQ0wsU0FBUyxDQUFDLEdBQUcsZUFBZSxPQUFPO0FBQUEsSUFDbkMsU0FBUztBQUFBLE1BQ1AsR0FBRyxlQUFlO0FBQUEsTUFDbEI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLFVBQVUsQ0FBQyxRQUFRLFFBQVEsTUFBTTtBQUFBLE1BQ2pDLFNBQVM7QUFBQSxRQUNQLEdBQUcsZUFBZTtBQUFBLFFBQ2xCO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixnQ0FDRSxLQUFLLFVBQVUsUUFBUSw4QkFBOEIsS0FDckQsV0FBVywrQ0FBK0M7QUFBQSxJQUM1RCw4QkFDRSxLQUFLLFVBQVUsUUFBUSw0QkFBNEIsS0FDbkQsV0FBVyw2Q0FBNkM7QUFBQSxJQUMxRCwyQkFDRSxLQUFLLFVBQVUsUUFBUSx5QkFBeUIsS0FDaEQsV0FBVywwQ0FBMEM7QUFBQSxJQUN2RCwwQkFDRSxLQUFLLFVBQVUsUUFBUSx3QkFBd0IsS0FDL0MsV0FBVyx5Q0FBeUM7QUFBQSxJQUN0RCw0QkFDRSxLQUFLLFVBQVUsUUFBUSwwQkFBMEIsS0FDakQsV0FBVywyQ0FBMkM7QUFBQSxJQUN4RCw2QkFDRSxLQUFLLFVBQVUsUUFBUSwyQkFBMkIsS0FDbEQsV0FBVywyQ0FBMkM7QUFBQSxFQUMxRDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
