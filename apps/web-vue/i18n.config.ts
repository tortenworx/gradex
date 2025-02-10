import en from '~/i18n/languages/en.json'
import fil from '~/i18n/languages/fil.json'

export default defineI18nConfig(() => ({
  legacy: false,
  messages: {
    en,
    fil
  }
}))