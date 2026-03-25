import { useTranslation } from 'react-i18next'
import { IconLanguage } from '@tabler/icons-react'
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '~/lib/i18n'
import api from '~/lib/api'

export default function LanguageSelector() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language as SupportedLanguage

  const handleChange = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang)
    api.updateSetting('ui.language', lang).catch(() => {})
  }

  return (
    <div className="relative flex items-center gap-1.5">
      <IconLanguage className="size-4 text-desert-stone" />
      <select
        value={currentLang}
        onChange={(e) => handleChange(e.target.value as SupportedLanguage)}
        className="appearance-none bg-transparent text-sm text-desert-stone hover:text-desert-green-darker
                   cursor-pointer border-none outline-none pr-4"
        aria-label="Language"
      >
        {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}
