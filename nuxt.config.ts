import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // SPA / static front-end only — no server routes needed.
  ssr: true,

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  // Strict types; run `npm run typecheck` to validate (kept out of the
  // build/dev pipeline so type errors don't block HMR).
  typescript: {
    strict: true,
  },
})
