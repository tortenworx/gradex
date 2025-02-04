// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  colorMode: {
    preference: 'light'
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    }
  },
  css: ['~/assets/css/main.css'],
  googleFonts: {
    families: {
      "DM Mono": {
        wght: [300,400,500],
        ital: [300,400,500],
      },
      'DM Sans': {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        ital: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
      Lora: {
        wght: [400,500,600,700],
        ital: [400,500,600,700],
      },
    },
  },
  i18n: {
    vueI18n: './i18n.config.ts',
    strategy: 'no_prefix',
    locales: [
      {
        code: "en",
        name: "English"
      },
      {
        code: "fil",
        name: "Filipino"
      }
    ],
  },
  modules: [
    '@nuxtjs/google-fonts',
    '@vee-validate/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'nuxt-auth-utils',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
  ]
})