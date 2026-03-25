import { Head } from '@inertiajs/react'
import { IconExternalLink, IconCopy, IconCheck } from '@tabler/icons-react'
import { useState } from 'react'
import SettingsLayout from '~/layouts/SettingsLayout'
import { useTranslation } from 'react-i18next'

const USDT_ADDRESS = 'TGaUz963ZaCoHrfoDDgy1sCvSrK1wsZvcx'

export default function SupportPage() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(USDT_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <SettingsLayout>
      <Head title={t('settings.support.pageTitle')} />
      <div className="w-full">
        <main className="px-12 py-6 max-w-4xl">
          <h1 className="text-4xl font-semibold mb-4">{t('settings.support.title')}</h1>
          <p className="text-text-muted mb-10 text-lg">
            {t('settings.support.intro')}
          </p>

          {/* USDT TRC-20 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-3">{t('settings.support.usdtTitle')}</h2>
            <p className="text-sm text-text-muted mb-2">{t('settings.support.usdtNetwork')}</p>
            <div className="flex items-center gap-2 bg-surface-secondary rounded-lg p-3 border border-border-subtle">
              <code className="text-sm text-text-primary break-all flex-1">{USDT_ADDRESS}</code>
              <button
                onClick={copyAddress}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-desert-green text-white rounded-md text-sm font-medium hover:bg-btn-green-hover transition-colors cursor-pointer"
              >
                {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                {copied ? t('common.copied') : t('common.copy')}
              </button>
            </div>
            <p className="text-xs text-desert-red mt-2">{t('settings.support.usdtWarning')}</p>
          </section>

          {/* OpenCollective */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-3">{t('settings.support.openCollectiveTitle')}</h2>
            <p className="text-text-muted mb-4">{t('settings.support.openCollectiveDesc')}</p>
            <a
              href="https://opencollective.com/yumatech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-desert-green hover:bg-btn-green-hover text-white font-semibold rounded-lg transition-colors"
            >
              {t('settings.support.donateOnOC')}
              <IconExternalLink size={18} />
            </a>
          </section>

          {/* Other Ways to Help */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">{t('settings.support.otherWays')}</h2>
            <ul className="space-y-2 text-text-muted">
              <li>
                <a
                  href="https://github.com/Yumash/kamrad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-desert-orange hover:underline"
                >
                  {t('settings.support.starOnGithub')}
                </a>
                {' '}{t('settings.support.starOnGithubDesc')}
              </li>
              <li>
                <a
                  href="https://github.com/Yumash/kamrad/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-desert-orange hover:underline"
                >
                  {t('settings.support.reportBugs')}
                </a>
                {' '}{t('settings.support.reportBugsDesc')}
              </li>
              <li>{t('settings.support.shareProject')}</li>
            </ul>
          </section>

          <p className="text-text-muted text-sm italic">{t('settings.support.thanks')}</p>
        </main>
      </div>
    </SettingsLayout>
  )
}
