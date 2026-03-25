import { Head } from '@inertiajs/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SettingsLayout from '~/layouts/SettingsLayout'
import StyledButton from '~/components/StyledButton'
import Alert from '~/components/Alert'
import LoadingSpinner from '~/components/LoadingSpinner'
import { useContentTranslation } from '~/hooks/useTranslation'
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '~/lib/i18n'

export default function TranslatePage() {
  const { t, i18n } = useTranslation()
  const [inputText, setInputText] = useState('')
  const [fromLang, setFromLang] = useState<string>('en')
  const {
    translating,
    translatedText,
    error,
    translateText,
    reset,
  } = useContentTranslation()

  const handleTranslate = () => {
    if (inputText.trim()) {
      translateText(inputText, fromLang)
    }
  }

  return (
    <SettingsLayout>
      <Head title={t('settings.translate.title')} />
      <div className="xl:pl-72 w-full">
      <div className="px-12 py-6 max-w-4xl">
        <h1 className="text-2xl font-bold text-text-primary mb-2">{t('settings.translate.heading')}</h1>
        <p className="text-text-secondary mb-6">{t('settings.translate.description')}</p>

        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-text-secondary mb-1">{t('settings.translate.fromLang')}</label>
              <select
                value={fromLang}
                onChange={(e) => setFromLang(e.target.value)}
                className="w-full rounded-md border border-border-subtle bg-surface-primary px-3 py-2 text-text-primary"
              >
                {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end pb-1 text-text-secondary">→</div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-text-secondary mb-1">{t('settings.translate.toLang')}</label>
              <div className="w-full rounded-md border border-border-subtle bg-surface-secondary px-3 py-2 text-text-primary">
                {SUPPORTED_LANGUAGES[i18n.language as SupportedLanguage] || i18n.language}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">{t('settings.translate.inputLabel')}</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={6}
              className="w-full rounded-md border border-border-subtle bg-surface-primary px-3 py-2 text-text-primary resize-y"
              placeholder={t('settings.translate.inputPlaceholder')}
            />
          </div>

          <StyledButton
            onClick={handleTranslate}
            variant="primary"
            icon="IconLanguage"
            disabled={!inputText.trim() || translating}
          >
            {translating ? t('settings.translate.translating') : t('settings.translate.translateButton')}
          </StyledButton>

          {translating && <LoadingSpinner />}

          {error && (
            <Alert title={error} type="error" variant="solid" />
          )}

          {translatedText && (
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">{t('settings.translate.resultLabel')}</label>
              <div className="w-full rounded-md border border-border-subtle bg-surface-secondary px-3 py-2 text-text-primary whitespace-pre-wrap min-h-[100px]">
                {translatedText}
              </div>
              <div className="mt-2 flex gap-2">
                <StyledButton onClick={() => navigator.clipboard.writeText(translatedText)} variant="outline" size="sm" icon="IconCopy">
                  {t('settings.translate.copy')}
                </StyledButton>
                <StyledButton onClick={reset} variant="outline" size="sm" icon="IconTrash">
                  {t('settings.translate.clear')}
                </StyledButton>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </SettingsLayout>
  )
}
