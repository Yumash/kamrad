import { useState } from 'react'
import { useTranslation as useI18nTranslation } from 'react-i18next'
import api from '~/lib/api'

interface UseContentTranslationOptions {
  contentLanguage?: string
}

export function useContentTranslation({ contentLanguage }: UseContentTranslationOptions = {}) {
  const { i18n } = useI18nTranslation()
  const [translating, setTranslating] = useState(false)
  const [translatedText, setTranslatedText] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showOriginal, setShowOriginal] = useState(false)

  const userLanguage = i18n.language
  const needsTranslation = contentLanguage ? contentLanguage !== userLanguage : true

  async function translateText(text: string, from?: string) {
    setTranslating(true)
    setError(null)
    try {
      const response = await api.post('/api/translate', {
        text,
        from: from || contentLanguage || 'en',
        to: userLanguage,
      })
      setTranslatedText(response.data.translatedText)
      setShowOriginal(false)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Translation failed')
    } finally {
      setTranslating(false)
    }
  }

  function toggleOriginal() {
    setShowOriginal(!showOriginal)
  }

  function reset() {
    setTranslatedText(null)
    setError(null)
    setShowOriginal(false)
  }

  return {
    userLanguage,
    needsTranslation,
    translating,
    translatedText,
    error,
    showOriginal,
    translateText,
    toggleOriginal,
    reset,
  }
}
