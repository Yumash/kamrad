import { useState } from 'react'
import { usePage } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { UsePageProps } from '../../types/system'
import ThemeToggle from '~/components/ThemeToggle'
import LanguageSelector from '~/components/LanguageSelector'
import { IconBug } from '@tabler/icons-react'
import DebugInfoModal from './DebugInfoModal'

export default function Footer() {
  const { appVersion } = usePage().props as unknown as UsePageProps
  const { t } = useTranslation()
  const [debugModalOpen, setDebugModalOpen] = useState(false)

  return (
    <footer>
      <div className="flex items-center justify-center gap-3 border-t border-border-subtle py-4">
        <p className="text-sm/6 text-text-secondary">
          {t('footer.commandCenter', { version: appVersion })}
        </p>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => setDebugModalOpen(true)}
          className="text-sm/6 text-gray-500 hover:text-desert-green flex items-center gap-1 cursor-pointer"
        >
          <IconBug className="size-3.5" />
          {t('footer.debugInfo')}
        </button>
        <ThemeToggle />
        <span className="text-gray-300">|</span>
        <LanguageSelector />
      </div>
      <DebugInfoModal open={debugModalOpen} onClose={() => setDebugModalOpen(false)} />
    </footer>
  )
}
