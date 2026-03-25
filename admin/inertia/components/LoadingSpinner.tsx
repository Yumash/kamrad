import { useTranslation } from 'react-i18next'

interface LoadingSpinnerProps {
  text?: string
  fullscreen?: boolean
  iconOnly?: boolean
  light?: boolean
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text,
  fullscreen = true,
  iconOnly = false,
  light = false,
  className,
}) => {
  const { t } = useTranslation()
  if (!fullscreen) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div
          className={`w-8 h-8 border-[3px] ${light ? 'border-white' : 'border-text-muted'} border-t-transparent rounded-full animate-spin ${className || ''}`}
        ></div>
        {!iconOnly && (
          <div className={light ? 'text-white mt-2' : 'text-text-primary mt-2'}>
            {text || t('common.loading')}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm ${className || ''}`}>
      <div className="flex flex-col items-center justify-center bg-surface-primary rounded-lg p-8 shadow-lg">
        <div className="w-10 h-10 border-[3px] border-desert-green border-t-transparent rounded-full animate-spin"></div>
        {!iconOnly && (
          <div className="text-text-primary mt-3 font-medium">
            {text || t('common.loading')}
          </div>
        )}
      </div>
    </div>
  )
}

export default LoadingSpinner
