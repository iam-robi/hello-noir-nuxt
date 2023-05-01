//import crossOriginIsolation from "vite-plugin-cross-origin-isolation";
import inject from "@rollup/plugin-inject";
import nodeStdlibBrowser from "node-stdlib-browser";
import rollupPolyfillNode from "rollup-plugin-polyfill-node";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: { experimental: { wasm: true } },
  modules: [
    "nuxt-graphql-client",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxtjs/partytown",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
      },
    ],
  ],
  // buildModules: ["nuxt-animejs"],
  build: {
    transpile:
      process.env.NODE_ENV === "production"
        ? [
            "vueuc",
            "@css-render/vue3-ssr",
            "@juggle/resize-observer",
            "@noir-lang/noir_wasm",
          ]
        : ["@juggle/resize-observer", "@noir-lang/noir_wasm"],
  },
  runtimeConfig: {
    privateKey: process.env.HELLO_CONTRACT,
  },
  colorMode: {
    preference: "system", // default theme
    dataValue: "theme", // activate data-theme in <html> tag
    classSuffix: "",
  },
  "graphql-client": {
    watch: true,
    autoImport: true,
    functionPrefix: "Gql",
    documentPaths: ["./gql"],
    preferGETQueries: false,
  },
  vite: {
    ssr: {
      noExternal: [
        // ...
        "@noir-lang/aztec_backend",
        "@noir-lang/barretenberg",
        "@noir-lang/noir_wasm",
      ],
    },
    plugins: [wasm(), topLevelAwait()],
    build: {
      target: "esnext",
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        plugins: [
          // Enable rollup polyfills plugin used in production bundling, refer to https://stackoverflow.com/a/72440811/10752354
          rollupPolyfillNode(),
          wasm(),
          topLevelAwait(),
        ],
      },
    },
    // plugins: [crossOriginIsolation()],
    resolve: {
      alias: { ...nodeStdlibBrowser },
    },
    define: {
      "process.env": {},
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "esnext",
        inject: [require.resolve("node-stdlib-browser/helpers/esbuild/shim")],
      },
      include:
        process.env.NODE_ENV === "development"
          ? [
              "naive-ui",
              "vueuc",
              "date-fns-tz/esm/formatInTimeZone",
              "@noir-lang/aztec_backend",
            ]
          : [],
    },
  },
});
