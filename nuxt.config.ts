import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/favicon.png' }
      ]
    }
  },

  ssr: true,
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

  modules: ['@nuxt/icon'],
})