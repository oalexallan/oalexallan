import { createI18n } from 'vue-i18n'
import en from './en.json'
import pt from './pt.json'

const savedLocale = localStorage.getItem('locale') || 'pt'

export default createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, pt },
})
