// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/stylelint-module',
  ],
  app: {
    head: {
      title: 'Dent App Frontend',
      meta: [{ name: 'description', content: 'Frontend aplikacji dentystycznej' }],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },
  typescript: {
    strict: true,
    shim: false,
  },
  css: ['@/assets/main.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.BASE_URL || '/api',
    },
  },
});
