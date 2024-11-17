export default defineNuxtConfig({
  srcDir: 'app',
  serverDir: 'server',
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/image',
    'nuxt-auth-utils',
  ],
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  ui: {
    theme: {
      colors: ['primary', 'white', 'black', 'success', 'error'],
    },
  },
  devtools: {
    enabled: true,
  },
  colorMode: {
    preference: 'dark',
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
