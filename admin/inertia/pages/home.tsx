import {
  IconBolt,
  IconHelp,
  IconMapRoute,
  IconPlus,
  IconSettings,
  IconWifiOff,
} from '@tabler/icons-react'
import { Head, usePage } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import AppLayout from '~/layouts/AppLayout'
import { getServiceLink } from '~/lib/navigation'
import { ServiceSlim } from '../../types/services'
import DynamicIcon, { DynamicIconName } from '~/components/DynamicIcon'
import classNames from 'classnames'
import { useUpdateAvailable } from '~/hooks/useUpdateAvailable'
import { useSystemSetting } from '~/hooks/useSystemSetting'
import Alert from '~/components/Alert'
import { SERVICE_NAMES } from '../../constants/service_names'
import { getServiceName, getServiceDescription } from '~/lib/serviceI18n'

interface DashboardItem {
  label: string
  to: string
  target: string
  description: string
  icon: React.ReactNode
  installed: boolean
  displayOrder: number
  poweredBy: string | null
}

export default function Home(props: {
  system: {
    services: ServiceSlim[]
  }
}) {
  const { t } = useTranslation()
  const items: DashboardItem[] = []
  const updateInfo = useUpdateAvailable();
  const { aiAssistantName } = usePage<{ aiAssistantName: string }>().props

  // Check if user has visited Easy Setup
  const { data: easySetupVisited } = useSystemSetting({
    key: 'ui.hasVisitedEasySetup'
  })
  const shouldHighlightEasySetup = easySetupVisited?.value ? String(easySetupVisited.value) !== 'true' : false

  // Maps is a Core Capability (display_order: 4)
  const MAPS_ITEM: DashboardItem = {
    label: t('home.maps'),
    to: '/maps',
    target: '',
    description: t('home.mapsDesc'),
    icon: <IconMapRoute size={48} />,
    installed: true,
    displayOrder: 4,
    poweredBy: null,
  }

  // System items shown after all apps
  const SYSTEM_ITEMS: DashboardItem[] = [
    {
      label: t('home.easySetup'),
      to: '/easy-setup',
      target: '',
      description: t('home.easySetupDesc'),
      icon: <IconBolt size={48} />,
      installed: true,
      displayOrder: 50,
      poweredBy: null,
    },
    {
      label: t('home.installApps'),
      to: '/settings/apps',
      target: '',
      description: t('home.installAppsDesc'),
      icon: <IconPlus size={48} />,
      installed: true,
      displayOrder: 51,
      poweredBy: null,
    },
    {
      label: t('home.docs'),
      to: '/docs/home',
      target: '',
      description: t('home.docsDesc'),
      icon: <IconHelp size={48} />,
      installed: true,
      displayOrder: 52,
      poweredBy: null,
    },
    {
      label: t('home.settings'),
      to: '/settings/system',
      target: '',
      description: t('home.settingsDesc'),
      icon: <IconSettings size={48} />,
      installed: true,
      displayOrder: 53,
      poweredBy: null,
    },
  ]

  // Add installed services (non-dependency services only)
  props.system.services
    .filter((service) => service.installed && service.ui_location)
    .forEach((service) => {
      const translatedName = getServiceName(t, service.service_name, service.friendly_name)
      const translatedDesc = getServiceDescription(t, service.service_name, service.description)

      items.push({
        label: service.service_name === SERVICE_NAMES.OLLAMA && aiAssistantName ? aiAssistantName : translatedName,
        to: service.ui_location ? getServiceLink(service.ui_location) : '#',
        target: '_blank',
        description:
          translatedDesc ||
          t('home.accessApp', { name: translatedName }),
        icon: service.icon ? (
          <DynamicIcon icon={service.icon as DynamicIconName} className="!size-12" />
        ) : (
          <IconWifiOff size={48} />
        ),
        installed: service.installed,
        displayOrder: service.display_order ?? 100,
        poweredBy: service.powered_by ?? null,
      })
    })

  // Add Maps as a Core Capability
  items.push(MAPS_ITEM)

  // Add system items
  items.push(...SYSTEM_ITEMS)

  // Sort all items by display order
  items.sort((a, b) => a.displayOrder - b.displayOrder)

  return (
    <AppLayout>
      <Head title={t('home.title')} />
      {
        updateInfo?.updateAvailable && (
          <div className='flex justify-center items-center p-4 w-full'>
            <Alert
              title={t('home.updateAvailable')}
              type="info-inverted"
              variant="solid"
              className="w-full"
              buttonProps={{
                variant: 'primary',
                children: t('common.goToSettings'),
                icon: 'IconSettings',
                onClick: () => {
                  window.location.href = '/settings/update'
                },
              }}
            />
          </div>
        )
      }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {items.map((item) => {
          const isEasySetup = item.to === '/easy-setup'
          const shouldHighlight = isEasySetup && shouldHighlightEasySetup
          const isSystemUtility = item.displayOrder >= 50

          return (
            <a key={item.to} href={item.to} target={item.target}>
              <div className={classNames(
                "relative rounded-lg border-2 transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5 min-h-40 py-6 flex flex-col items-center justify-center cursor-pointer text-center px-4",
                isSystemUtility
                  ? "bg-surface-elevated border-border-default text-text-primary"
                  : "bg-desert-green border-desert-green text-white"
              )}>
                {shouldHighlight && (
                  <span className="absolute top-2 right-2 flex items-center justify-center">
                    <span
                      className="animate-ping absolute inline-flex w-16 h-6 rounded-full bg-desert-orange-light opacity-75"
                      style={{ animationDuration: '1.5s' }}
                    ></span>
                    <span className="relative inline-flex items-center rounded-full px-2.5 py-1 bg-desert-orange-light text-xs font-semibold text-white shadow-sm">
                      {t('common.startHere')}
                    </span>
                  </span>
                )}
                <div className={classNames("flex items-center justify-center mb-2", isSystemUtility && "text-desert-green")}>{item.icon}</div>
                <h3 className="font-bold text-2xl">{item.label}</h3>
                {item.poweredBy && <p className="text-sm opacity-80">{t('common.poweredBy', { name: item.poweredBy })}</p>}
                <p className="xl:text-lg mt-2">{item.description}</p>
              </div>
            </a>
          )
        })}
      </div>
    </AppLayout>
  )
}
