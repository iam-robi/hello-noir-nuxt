import crossOriginIsolation from "vite-plugin-cross-origin-isolation";
import inject from "@rollup/plugin-inject";
import nodeStdlibBrowser from "node-stdlib-browser";
import rollupPolyfillNode from "rollup-plugin-polyfill-node";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "nuxt-graphql-client",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
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
        ? ["vueuc", "@css-render/vue3-ssr", "@juggle/resize-observer"]
        : ["@juggle/resize-observer"],
  },
  eslint: {
    /* module options */
  },
  runtimeConfig: {
    privateKey: process.env.MINA_PRIVATE_KEY,
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
    build: {
      target: "esnext",
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        plugins: [
          // Enable rollup polyfills plugin used in production bundling, refer to https://stackoverflow.com/a/72440811/10752354
          rollupPolyfillNode(),
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
          ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
          : [],
    },
  },
});
