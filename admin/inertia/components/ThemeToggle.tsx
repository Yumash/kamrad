import { IconSun, IconMoon } from '@tabler/icons-react'
import { useThemeContext } from '~/providers/ThemeProvider'
import { useTranslation } from 'react-i18next'

interface ThemeToggleProps {
  compact?: boolean
}

export default function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useThemeContext()
  const { t } = useTranslation()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-all cursor-pointer
                 text-desert-stone hover:text-desert-green hover:bg-desert-green-light/20
                 border border-transparent hover:border-desert-green-light/30"
      aria-label={isDark ? t('theme.switchToDay') : t('theme.switchToNight')}
      title={isDark ? t('theme.switchToDay') : t('theme.switchToNight')}
    >
      {isDark ? <IconSun className="size-4 text-desert-orange" /> : <IconMoon className="size-4" />}
      {!compact && <span>{isDark ? t('theme.dayOps') : t('theme.nightOps')}</span>}
    </button>
  )
}
