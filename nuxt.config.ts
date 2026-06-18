import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // The app is deployed as a 100% static build (`nuxt generate`) served by
  // nginx, and authentication is entirely client-side (JWT in a cookie).
  // With SSR on, prerendering runs the `auth` middleware at build time with no
  // cookie, freezing a redirect to /login into every protected page's HTML.
  // A pure client-side SPA runs the middleware at runtime with the real cookie.
  ssr: false,

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true,
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE ?? 'https://localhost/api/crooak_api',
    },
  },
})
