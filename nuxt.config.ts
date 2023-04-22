import crossOriginIsolation from "vite-plugin-cross-origin-isolation";

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
      target: "es2020",
    },
    plugins: [crossOriginIsolation()],
    define: {
      "process.env": {},
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "es2020",
        supported: { bigint: true },
      },
      include:
        process.env.NODE_ENV === "development"
          ? ["naive-ui", "vueuc", "date-fns-tz/esm/formatInTimeZone"]
          : [],
    },
  },
});
