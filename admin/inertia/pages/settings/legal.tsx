import { Head } from '@inertiajs/react'
import SettingsLayout from '~/layouts/SettingsLayout'
import { useTranslation } from 'react-i18next'

export default function LegalPage() {
  const { t } = useTranslation()
  return (
    <SettingsLayout>
      <Head title={t('settings.legal.pageTitle')} />
      <div className="w-full">
        <main className="px-12 py-6 max-w-4xl">
          <h1 className="text-4xl font-semibold mb-8">{t('settings.legal.title')}</h1>

          {/* License Agreement */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('settings.legal.licenseAgreement')}</h2>
            <p className="text-text-primary mb-3">{t('settings.legal.copyright')}</p>
            <p className="text-text-primary mb-3">
              {t('settings.legal.licenseText')}{' '}
              {t('settings.legal.licenseObtainCopy')}
            </p>
            <p className="text-text-primary mb-3">
              <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.apache.org/licenses/LICENSE-2.0</a>
            </p>
            <p className="text-text-primary">
              {t('settings.legal.licenseDisclaimer')}
            </p>
          </section>

          {/* Third-Party Software */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('settings.legal.thirdParty')}</h2>
            <p className="text-text-primary mb-4">
              {t('settings.legal.thirdPartyDesc')}
            </p>
            <ul className="space-y-3 text-text-primary">
              <li>
                <strong>Kiwix</strong> - {t('settings.legal.kiwixDesc')}
                <br />
                <a href="https://kiwix.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://kiwix.org</a>
              </li>
              <li>
                <strong>Kolibri</strong> - {t('settings.legal.kolibriDesc')}
                <br />
                <a href="https://learningequality.org/kolibri" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://learningequality.org/kolibri</a>
              </li>
              <li>
                <strong>Ollama</strong> - {t('settings.legal.ollamaDesc')}
                <br />
                <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://ollama.com</a>
              </li>
              <li>
                <strong>CyberChef</strong> - {t('settings.legal.cyberchefDesc')}
                <br />
                <a href="https://github.com/gchq/CyberChef" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://github.com/gchq/CyberChef</a>
              </li>
              <li>
                <strong>FlatNotes</strong> - {t('settings.legal.flatnotesDesc')}
                <br />
                <a href="https://github.com/dullage/flatnotes" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://github.com/dullage/flatnotes</a>
              </li>
              <li>
                <strong>Qdrant</strong> - {t('settings.legal.qdrantDesc')}
                <br />
                <a href="https://github.com/qdrant/qdrant" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://github.com/qdrant/qdrant</a>
              </li>
            </ul>
          </section>

          {/* Privacy Statement */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('settings.legal.privacy')}</h2>
            <p className="text-text-primary mb-3">
              {t('settings.legal.privacyDesc')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-primary">
              <li>{t('settings.legal.zeroTelemetry')}</li>
              <li>{t('settings.legal.localFirst')}</li>
              <li>{t('settings.legal.noAccounts')}</li>
              <li>{t('settings.legal.networkOptional')}</li>
            </ul>
          </section>

          {/* Content Disclaimer */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('settings.legal.contentDisclaimer')}</h2>
            <p className="text-text-primary mb-3">
              {t('settings.legal.contentDisclaimerText1')}
            </p>
            <p className="text-text-primary mb-3">
              {t('settings.legal.contentDisclaimerText2')}
            </p>
            <p className="text-text-primary">
              {t('settings.legal.contentDisclaimerText3')}
            </p>
          </section>

          {/* Medical Disclaimer */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('settings.legal.medicalDisclaimer')}</h2>
            <p className="text-text-primary mb-3">
              {t('settings.legal.medicalDisclaimerText')}
            </p>
            <p className="text-text-primary mb-3 font-semibold">
              {t('settings.legal.medicalNotSubstitute')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-primary mb-3">
              <li>{t('settings.legal.medicalAdvice1')}</li>
              <li>{t('settings.legal.medicalAdvice2')}</li>
              <li>{t('settings.legal.medicalAdvice3')}</li>
              <li>{t('settings.legal.medicalAdvice4')}</li>
            </ul>
          </section>

          {/* Data Storage Notice */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t('settings.legal.dataStorage')}</h2>
            <p className="text-text-primary mb-3">
              {t('settings.legal.dataStorageText')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-primary">
              <li><strong>{t('settings.legal.installDir')}:</strong> /opt/kamrad</li>
              <li><strong>{t('settings.legal.downloadedContent')}:</strong> /opt/kamrad/storage</li>
              <li><strong>{t('settings.legal.appData')}:</strong> {t('settings.legal.appDataDesc')}</li>
            </ul>
            <p className="text-text-primary mt-3">
              {t('settings.legal.dataControlNotice')}
            </p>
          </section>

        </main>
      </div>
    </SettingsLayout>
  )
}
