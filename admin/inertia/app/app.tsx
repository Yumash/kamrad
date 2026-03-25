/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import i18n from '~/lib/i18n'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import ModalsProvider from '~/providers/ModalProvider'
import { TransmitProvider } from 'react-adonis-transmit'
import { generateUUID } from '~/lib/util'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import NotificationsProvider from '~/providers/NotificationProvider'
import { ThemeProvider } from '~/providers/ThemeProvider'
import { UsePageProps } from '../../types/system'

const appName = import.meta.env.VITE_APP_NAME || 'КАМРАД'
const queryClient = new QueryClient()

// Patch the global crypto object for non-HTTPS/localhost contexts
if (!window.crypto?.randomUUID) {
  // @ts-ignore
  if (!window.crypto) window.crypto = {}
  // @ts-ignore
  window.crypto.randomUUID = generateUUID
}

createInertiaApp({
  progress: { color: '#424420' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    const pageProps = props.initialPage.props as unknown as UsePageProps
    const environment = pageProps.environment
    const showDevtools = ['development', 'staging'].includes(environment)

    // Sync i18n locale from server-stored preference (highest priority)
    const serverLocale = (pageProps as any).locale
    if (serverLocale && serverLocale !== i18n.language) {
      i18n.changeLanguage(serverLocale)
    }
    createRoot(el).render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TransmitProvider baseUrl={window.location.origin} enableLogging={environment === 'development'}>
            <NotificationsProvider>
              <ModalsProvider>
                <App {...props} />
                {showDevtools && <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />}
              </ModalsProvider>
            </NotificationsProvider>
          </TransmitProvider>
        </ThemeProvider>
      </QueryClientProvider>
    )
  },
})
