// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  auth: {
    globalAppMiddleware: true,
    baseURL: 'http://localhost:8000/credentials/',
    
    provider: {
      type: 'local',
      pages: {
        login: '/accounts/login'
      },
      endpoints: {
        signIn: { path: 'authenticate', method: 'post' },
        signOut: false,
        getSession: { path: 'user', method: 'get' }
      },
      token: {
        cookieName: "access_token"
      },
      session: {
        dataType: {
          _id: 'string',
          id_number: 'string',
          first_name: 'string',
          middle_name: 'string',
          last_name: 'string',
          mobile_number: 'number',
          personal_email_address: 'string',
          educational_email_address: 'string',
          gender: 'string',
          role: 'string',
          __v: 'numnber'
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      baseUrl: 'https://gradex-backend-y7ar.onrender.com/',
    },
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
  modules: ['@nuxtjs/google-fonts', '@vee-validate/nuxt', '@nuxtjs/i18n', '@pinia/nuxt', '@sidebase/nuxt-auth']
})