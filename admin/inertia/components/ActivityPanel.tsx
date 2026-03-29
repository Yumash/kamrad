import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import useDownloads from '~/hooks/useDownloads'
import useOllamaModelDownloads from '~/hooks/useOllamaModelDownloads'
import { IconDownload, IconChevronDown } from '@tabler/icons-react'
import { extractFileName } from '~/lib/util'
import classNames from 'classnames'

export default function ActivityPanel() {
  const { t } = useTranslation()
  const { data: downloads } = useDownloads({})
  const { downloads: modelDownloads } = useOllamaModelDownloads()
  const [isExpanded, setIsExpanded] = useState(false)
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-collapse after 5s of no interaction
  useEffect(() => {
    if (isExpanded) {
      collapseTimerRef.current = setTimeout(() => {
        setIsExpanded(false)
      }, 5000)
    }
    return () => {
      if (collapseTimerRef.current) {
        clearTimeout(collapseTimerRef.current)
      }
    }
  }, [isExpanded])

  const resetCollapseTimer = () => {
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current)
    }
    collapseTimerRef.current = setTimeout(() => {
      setIsExpanded(false)
    }, 5000)
  }

  // Combine all active operations
  const activeDownloads = (downloads || []).filter((d) => d.status !== undefined)
  const activeModels = (modelDownloads || []).filter((d) => d.percent < 100 || d.error)
  const totalActive = activeDownloads.length + activeModels.length

  // Hide when nothing is happening
  if (totalActive === 0) return null

  const activeCount =
    activeDownloads.filter((d) => d.status === 'active').length +
    activeModels.filter((d) => !d.error).length
  const failedCount =
    activeDownloads.filter((d) => d.status === 'failed').length +
    activeModels.filter((d) => d.error).length

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Expanded panel */}
      {isExpanded && (
        <div
          className="mb-3 w-80 max-h-64 overflow-y-auto bg-surface-primary border border-border-subtle rounded-lg shadow-xl"
          onMouseMove={resetCollapseTimer}
          onClick={resetCollapseTimer}
        >
          <div className="flex items-center justify-between p-3 border-b border-border-subtle">
            <h4 className="text-sm font-semibold text-text-primary">{t('activity.title')}</h4>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-text-muted hover:text-text-primary"
            >
              <IconChevronDown size={16} />
            </button>
          </div>
          <div className="p-2 space-y-2">
            {/* File downloads */}
            {activeDownloads.map((dl) => (
              <div
                key={dl.jobId}
                className={classNames(
                  'text-xs p-2 rounded',
                  dl.status === 'failed' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-surface-secondary'
                )}
              >
                <div className="flex justify-between mb-1">
                  <span className="truncate text-text-primary font-medium">
                    {extractFileName(dl.filepath) || dl.url}
                  </span>
                  <span className={dl.status === 'failed' ? 'text-red-500' : 'text-text-muted'}>
                    {dl.status === 'failed' ? t('activity.failed') : `${dl.progress}%`}
                  </span>
                </div>
                {dl.status !== 'failed' && (
                  <div className="w-full bg-desert-stone-light/30 rounded-full h-1.5">
                    <div
                      className="bg-desert-green h-1.5 rounded-full transition-all"
                      style={{ width: `${dl.progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
            {/* Model downloads */}
            {activeModels.map((dl) => (
              <div
                key={dl.model}
                className={classNames(
                  'text-xs p-2 rounded',
                  dl.error ? 'bg-red-50 dark:bg-red-900/20' : 'bg-surface-secondary'
                )}
              >
                <div className="flex justify-between mb-1">
                  <span className="truncate text-text-primary font-medium">{dl.model}</span>
                  <span className={dl.error ? 'text-red-500' : 'text-text-muted'}>
                    {dl.error ? t('activity.failed') : `${dl.percent.toFixed(0)}%`}
                  </span>
                </div>
                {!dl.error && (
                  <div className="w-full bg-desert-stone-light/30 rounded-full h-1.5">
                    <div
                      className="bg-desert-green h-1.5 rounded-full transition-all"
                      style={{ width: `${dl.percent}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={classNames(
          'flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg transition-all',
          'bg-desert-green text-white hover:bg-desert-green-dark',
          activeCount > 0 && 'animate-pulse'
        )}
        style={activeCount > 0 ? { animationDuration: '2s' } : undefined}
      >
        <IconDownload size={18} />
        <span className="text-sm font-medium">{totalActive}</span>
        {failedCount > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full px-1.5">{failedCount}</span>
        )}
      </button>
    </div>
  )
}
