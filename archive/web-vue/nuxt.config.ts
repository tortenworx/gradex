// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  auth: {
    provider: {
      
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
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
    vueI18n: './i18n.config.ts'
  },
  modules: [
    '@nuxtjs/google-fonts',
    '@vee-validate/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@sidebase/nuxt-auth'
  ]
})