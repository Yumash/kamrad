import {
  IconArrowBigUpLines,
  IconArrowLeft,
  IconDashboard,
  IconFolder,
  IconLanguage,
  IconGavel,
  IconHeart,
  IconMapRoute,
  IconSettings,
  IconTerminal2,
  IconWand,
  IconZoom
} from '@tabler/icons-react'
import { usePage } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import StyledSidebar from '~/components/StyledSidebar'
import { getServiceLink } from '~/lib/navigation'
import useServiceInstalledStatus from '~/hooks/useServiceInstalledStatus'
import { SERVICE_NAMES } from '../../constants/service_names'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const { aiAssistantName } = usePage<{ aiAssistantName: string }>().props
  const aiAssistantInstallStatus = useServiceInstalledStatus(SERVICE_NAMES.OLLAMA)
  const { t } = useTranslation()

  const navigation = [
    ...(aiAssistantInstallStatus.isInstalled ? [{ name: aiAssistantName, href: '/settings/models', icon: IconWand, current: false }] : []),
    { name: t('settings.nav.apps'), href: '/settings/apps', icon: IconTerminal2, current: false },
    { name: t('settings.nav.contentExplorer'), href: '/settings/zim/remote-explorer', icon: IconZoom, current: false },
    { name: t('settings.nav.contentManager'), href: '/settings/zim', icon: IconFolder, current: false },
    { name: t('settings.nav.mapsManager'), href: '/settings/maps', icon: IconMapRoute, current: false },
    {
      name: t('settings.nav.serviceLogs'),
      href: getServiceLink('9999'),
      icon: IconDashboard,
      current: false,
      target: '_blank',
    },
    {
      name: t('settings.nav.checkForUpdates'),
      href: '/settings/update',
      icon: IconArrowBigUpLines,
      current: false,
    },
    { name: t('settings.nav.system'), href: '/settings/system', icon: IconSettings, current: false },
    { name: t('settings.nav.translate'), href: '/settings/translate', icon: IconLanguage, current: false },
    { name: t('settings.nav.supportProject'), href: '/settings/support', icon: IconHeart, current: false },
    { name: t('settings.nav.legalNotices'), href: '/settings/legal', icon: IconGavel, current: false },
  ]

  return (
    <div className="min-h-screen flex flex-row bg-surface-secondary/90">
      <StyledSidebar title={t('settings.title')} items={navigation} />
      <div className="flex-1 xl:pl-72">
        <div className="px-4 pt-4 pb-2 xl:hidden">
          <a href="/home" className="inline-flex items-center gap-1.5 text-sm font-medium text-desert-green hover:text-desert-green-dark transition-colors">
            <IconArrowLeft className="size-4" />
            {t('common.backToHome')}
          </a>
        </div>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
