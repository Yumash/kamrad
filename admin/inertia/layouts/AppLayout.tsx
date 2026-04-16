import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Footer from '~/components/Footer'
import ActivityPanel from '~/components/ActivityPanel'
import ChatButton from '~/components/chat/ChatButton'
import ChatModal from '~/components/chat/ChatModal'
import useServiceInstalledStatus from '~/hooks/useServiceInstalledStatus'
import { SERVICE_NAMES } from '../../constants/service_names'
import { Link, router } from '@inertiajs/react'
import { IconArrowLeft } from '@tabler/icons-react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const aiAssistantInstalled = useServiceInstalledStatus(SERVICE_NAMES.OLLAMA)
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-2 flex gap-2 flex-col items-center justify-center cursor-pointer relative"
        onClick={() => router.visit('/home')}
      >
        {window.location.pathname !== '/home' && (
          <Link href="/home" className="absolute top-3 left-4 flex items-center" onClick={(e) => e.stopPropagation()}>
            <IconArrowLeft className="mr-1.5" size={20} />
            <span className="text-sm text-text-secondary">{t('common.backToHome')}</span>
          </Link>
        )}
        <img src="/kamrad_logo.png" alt="KAMRAD Logo" className="h-24 w-24" />
        <h1 className="text-3xl font-bold text-desert-green">{t('home.title')}</h1>
      </div>
      <hr className="text-desert-green font-semibold h-[1.5px] bg-desert-green border-none" />
      <div className="flex-1 w-full bg-desert">{children}</div>
      <Footer />
      <ActivityPanel />

      {aiAssistantInstalled && (
        <>
          <ChatButton onClick={() => setIsChatOpen(true)} />
          <ChatModal open={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </>
      )}
    </div>
  )
}
