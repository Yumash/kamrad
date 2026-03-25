import { Head } from '@inertiajs/react'
import { IconExternalLink } from '@tabler/icons-react'
import SettingsLayout from '~/layouts/SettingsLayout'
import { useTranslation } from 'react-i18next'

export default function SupportPage() {
  const { t } = useTranslation()
  return (
    <SettingsLayout>
      <Head title={t('settings.support.pageTitle')} />
      <div className="xl:pl-72 w-full">
        <main className="px-12 py-6 max-w-4xl">
          <h1 className="text-4xl font-semibold mb-4">{t('settings.support.title')}</h1>
          <p className="text-text-muted mb-10 text-lg">
            {t('settings.support.intro')}
          </p>

          {/* Ko-fi */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-3">{t('settings.support.buyCoffee')}</h2>
            <p className="text-text-muted mb-4">
              {t('settings.support.buyCoffeeDesc')}
            </p>
            <a
              href="https://ko-fi.com/crosstalk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5E5B] hover:bg-[#e54e4b] text-white font-semibold rounded-lg transition-colors"
            >
              {t('settings.support.supportOnKofi')}
              <IconExternalLink size={18} />
            </a>
          </section>

          {/* Rogue Support */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-3">{t('settings.support.rogueTitle')}</h2>
            <a
              href="https://roguesupport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-4 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
            >
              <img
                src="/rogue-support-banner.png"
                alt="Rogue Support — Conquer Your Home Network"
                className="w-full"
              />
            </a>
            <p className="text-text-muted mb-4">
              {t('settings.support.rogueDesc')}
            </p>
            <a
              href="https://roguesupport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium"
            >
              {t('settings.support.visitRogue')}
              <IconExternalLink size={16} />
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
                  className="text-blue-600 hover:underline"
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
                  className="text-blue-600 hover:underline"
                >
                  {t('settings.support.reportBugs')}
                </a>
                {' '}{t('settings.support.reportBugsDesc')}
              </li>
              <li>{t('settings.support.shareProject')}</li>
              <li>
                <a
                  href="https://discord.com/invite/crosstalksolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {t('settings.support.joinDiscord')}
                </a>
                {' '}{t('settings.support.joinDiscordDesc')}
              </li>
            </ul>
          </section>

        </main>
      </div>
    </SettingsLayout>
  )
}
