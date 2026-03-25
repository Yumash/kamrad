import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from '~/locales/en.json'
import ru from '~/locales/ru.json'
import de from '~/locales/de.json'
import kz from '~/locales/kz.json'

export const SUPPORTED_LANGUAGES = {
  ru: 'Русский',
  en: 'English',
  de: 'Deutsch',
  kz: 'Қазақша',
} as const

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES

const STORAGE_KEY = 'kamrad:language'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      de: { translation: de },
      kz: { translation: kz },
    },
    fallbackLng: 'en',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: STORAGE_KEY,
      caches: ['localStorage'],
    },
  })

export default i18n
