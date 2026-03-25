import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { useNotifications } from '~/context/NotificationContext'
import StyledButton from '~/components/StyledButton'
import StyledSectionHeader from '~/components/StyledSectionHeader'
import Alert from '~/components/Alert'
import LoadingSpinner from '~/components/LoadingSpinner'
import api from '~/lib/api'

interface MapRegion {
  id: string
  name: { ru: string; en: string }
  country: string
  bbox: [number, number, number, number]
  estimated_size_mb: number
}

export default function MapExtractSection() {
  const { t, i18n } = useTranslation()
  const { addNotification } = useNotifications()
  const [search, setSearch] = useState('')
  const [extracting, setExtracting] = useState(false)
  const [extractStatus, setExtractStatus] = useState<string | null>(null)
  const [extractError, setExtractError] = useState<string | null>(null)
  const lang = i18n.language as 'ru' | 'en'

  const { data: regionsData } = useQuery({
    queryKey: ['map-extract-regions'],
    queryFn: async () => {
      const res = await api.get('/api/maps/extract/regions')
      return res.data.regions as MapRegion[]
    },
    refetchOnWindowFocus: false,
  })

  const regions = regionsData || []
  const filtered = regions.filter((r) => {
    const q = search.toLowerCase()
    return r.name.ru.toLowerCase().includes(q) ||
      r.name.en.toLowerCase().includes(q) ||
      r.country.toLowerCase().includes(q)
  })

  // Poll extraction status
  useEffect(() => {
    if (!extracting) return
    const interval = setInterval(async () => {
      try {
        const res = await api.get('/api/maps/extract/status')
        const status = res.data
        if (status.status === 'done') {
          setExtracting(false)
          setExtractStatus(null)
          addNotification({ type: 'success', message: status.progress || t('maps.extract.done') })
        } else if (status.status === 'error') {
          setExtracting(false)
          setExtractError(status.error)
        } else {
          setExtractStatus(status.progress)
        }
      } catch {}
    }, 2000)
    return () => clearInterval(interval)
  }, [extracting])

  async function handleExtract(regionId: string) {
    setExtracting(true)
    setExtractError(null)
    setExtractStatus(t('maps.extract.starting'))
    try {
      await api.post('/api/maps/extract/start', { regionId })
    } catch (err: any) {
      setExtracting(false)
      setExtractError(err.response?.data?.error || t('maps.extract.failed'))
    }
  }

  return (
    <div>
      <StyledSectionHeader title={t('maps.extract.heading')} />
      <p className="text-text-secondary text-sm mb-4">{t('maps.extract.description')}</p>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t('maps.extract.searchPlaceholder')}
        className="w-full mb-4 rounded-md border border-border-subtle bg-surface-primary px-3 py-2 text-text-primary text-sm"
      />

      {extracting && (
        <div className="mb-4">
          <Alert title={extractStatus || t('maps.extract.extracting')} type="info" variant="solid" />
        </div>
      )}

      {extractError && (
        <div className="mb-4">
          <Alert title={extractError} type="error" variant="solid" />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
        {filtered.map((region) => (
          <div
            key={region.id}
            className="border border-border-subtle rounded-lg p-3 bg-surface-primary flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-text-primary text-sm">
                {lang === 'ru' ? region.name.ru : region.name.en}
              </p>
              <p className="text-text-muted text-xs">
                ~{region.estimated_size_mb >= 1000
                  ? `${(region.estimated_size_mb / 1000).toFixed(1)} GB`
                  : `${region.estimated_size_mb} MB`}
              </p>
            </div>
            <StyledButton
              onClick={() => handleExtract(region.id)}
              variant="primary"
              size="sm"
              disabled={extracting}
              icon="IconDownload"
            >
              {t('maps.extract.extractButton')}
            </StyledButton>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-text-muted text-sm text-center py-4">{t('maps.extract.noResults')}</p>
      )}
    </div>
  )
}
