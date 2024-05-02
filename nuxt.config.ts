// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  devtools: { enabled: false },
  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
  ],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL
    }
  },
  plugins: [
    '~/plugins/confetti.js'  // Ensure the path is correct
  ],
});
