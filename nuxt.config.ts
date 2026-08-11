import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  imports: {
    dirs: ['~/composables/**', '~/basic/**'],
  },
  colorMode: {
    preference: 'system',
    storage: 'sessionStorage',
    classSuffix: '',
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxtjs/color-mode',
    '@nuxt/ui',
    'shadcn-nuxt',
    '@vee-validate/nuxt',
  ],
  veeValidate: {
    autoImports: true,
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui',
  },
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
  css: ['~/assets/css/tailwind.css', '~/assets/css/fullcalendar.css'],
  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@fullcalendar/core',
        '@fullcalendar/vue3',
        '@fullcalendar/daygrid',
        '@fullcalendar/timegrid',
        '@fullcalendar/interaction',
        '@fullcalendar/resource',
        '@fullcalendar/resource-timegrid',
        '@vuepic/vue-datepicker',
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.BASE_URL || '/api',
      reverbKey: process.env.REVERB_APP_KEY || '',
      reverbHost: process.env.REVERB_HOST || 'localhost',
      reverbPort: process.env.REVERB_PORT || '6001',
      reverbScheme: process.env.REVERB_SCHEME || 'http',
    },
  },
})
