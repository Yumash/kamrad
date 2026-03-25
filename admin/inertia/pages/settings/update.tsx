import { Head } from '@inertiajs/react'
import SettingsLayout from '~/layouts/SettingsLayout'
import StyledButton from '~/components/StyledButton'
import StyledTable from '~/components/StyledTable'
import StyledSectionHeader from '~/components/StyledSectionHeader'
import ActiveDownloads from '~/components/ActiveDownloads'
import Alert from '~/components/Alert'
import { useEffect, useState } from 'react'
import { IconAlertCircle, IconArrowBigUpLines, IconCheck, IconCircleCheck, IconReload } from '@tabler/icons-react'
import { SystemUpdateStatus } from '../../../types/system'
import type { ContentUpdateCheckResult, ResourceUpdateInfo } from '../../../types/collections'
import api from '~/lib/api'
import Input from '~/components/inputs/Input'
import Switch from '~/components/inputs/Switch'
import { useMutation } from '@tanstack/react-query'
import { useNotifications } from '~/context/NotificationContext'
import { useSystemSetting } from '~/hooks/useSystemSetting'
import { useTranslation } from 'react-i18next'

type Props = {
  updateAvailable: boolean
  latestVersion: string
  currentVersion: string
  earlyAccess: boolean
}

function ContentUpdatesSection() {
  const { t } = useTranslation()
  const { addNotification } = useNotifications()
  const [checkResult, setCheckResult] = useState<ContentUpdateCheckResult | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [applyingIds, setApplyingIds] = useState<Set<string>>(new Set())
  const [isApplyingAll, setIsApplyingAll] = useState(false)

  const handleCheck = async () => {
    setIsChecking(true)
    try {
      const result = await api.checkForContentUpdates()
      if (result) {
        setCheckResult(result)
      }
    } catch {
      setCheckResult({
        updates: [],
        checked_at: new Date().toISOString(),
        error: t('settings.update.failedToCheck'),
      })
    } finally {
      setIsChecking(false)
    }
  }

  const handleApply = async (update: ResourceUpdateInfo) => {
    setApplyingIds((prev) => new Set(prev).add(update.resource_id))
    try {
      const result = await api.applyContentUpdate(update)
      if (result?.success) {
        addNotification({ type: 'success', message: t('settings.update.updateStartedFor', { id: update.resource_id }) })
        // Remove from the updates list
        setCheckResult((prev) =>
          prev
            ? { ...prev, updates: prev.updates.filter((u) => u.resource_id !== update.resource_id) }
            : prev
        )
      } else {
        addNotification({ type: 'error', message: result?.error || t('settings.update.failedToStartUpdate') })
      }
    } catch {
      addNotification({ type: 'error', message: t('settings.update.failedToStartUpdate') })
    } finally {
      setApplyingIds((prev) => {
        const next = new Set(prev)
        next.delete(update.resource_id)
        return next
      })
    }
  }

  const handleApplyAll = async () => {
    if (!checkResult?.updates.length) return
    setIsApplyingAll(true)
    try {
      const result = await api.applyAllContentUpdates(checkResult.updates)
      if (result?.results) {
        const succeeded = result.results.filter((r) => r.success).length
        const failed = result.results.filter((r) => !r.success).length
        if (succeeded > 0) {
          addNotification({ type: 'success', message: t('settings.update.updatesStarted', { count: succeeded }) })
        }
        if (failed > 0) {
          addNotification({ type: 'error', message: t('settings.update.updatesCouldNotStart', { count: failed }) })
        }
        // Remove successful updates from the list
        const successIds = new Set(result.results.filter((r) => r.success).map((r) => r.resource_id))
        setCheckResult((prev) =>
          prev
            ? { ...prev, updates: prev.updates.filter((u) => !successIds.has(u.resource_id)) }
            : prev
        )
      }
    } catch {
      addNotification({ type: 'error', message: t('settings.update.failedToApplyUpdates') })
    } finally {
      setIsApplyingAll(false)
    }
  }

  return (
    <div className="mt-8">
      <StyledSectionHeader title={t('settings.update.contentUpdates')} />

      <div className="bg-surface-primary rounded-lg border shadow-md overflow-hidden p-6">
        <div className="flex items-center justify-between">
          <p className="text-desert-stone-dark">
            {t('settings.update.contentUpdatesDesc')}
          </p>
          <StyledButton
            variant="primary"
            icon="IconRefresh"
            onClick={handleCheck}
            loading={isChecking}
          >
            {t('settings.update.checkContentUpdates')}
          </StyledButton>
        </div>

        {checkResult?.error && (
          <Alert
            type="warning"
            title={t('settings.update.updateCheckIssue')}
            message={checkResult.error}
            variant="bordered"
            className="my-4"
          />
        )}

        {checkResult && !checkResult.error && checkResult.updates.length === 0 && (
          <Alert
            type="success"
            title={t('settings.update.allContentUpToDate')}
            message={t('settings.update.allContentUpToDateMsg')}
            variant="bordered"
            className="my-4"
          />
        )}

        {checkResult && checkResult.updates.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-desert-stone-dark">
                {t('settings.update.updatesAvailable', { count: checkResult.updates.length })}
              </p>
              <StyledButton
                variant="primary"
                size="sm"
                icon="IconDownload"
                onClick={handleApplyAll}
                loading={isApplyingAll}
              >
                {t('settings.update.updateAll', { count: checkResult.updates.length })}
              </StyledButton>
            </div>
            <StyledTable
              data={checkResult.updates}
              columns={[
                {
                  accessor: 'resource_id',
                  title: t('common.title'),
                  render: (record) => (
                    <span className="font-medium text-desert-green">{record.resource_id}</span>
                  ),
                },
                {
                  accessor: 'resource_type',
                  title: t('common.type'),
                  render: (record) => (
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${record.resource_type === 'zim'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                        }`}
                    >
                      {record.resource_type === 'zim' ? t('settings.update.zim') : t('settings.update.map')}
                    </span>
                  ),
                },
                {
                  accessor: 'installed_version',
                  title: t('common.version'),
                  render: (record) => (
                    <span className="text-desert-stone-dark">
                      {record.installed_version} → {record.latest_version}
                    </span>
                  ),
                },
                {
                  accessor: 'resource_id',
                  title: '',
                  render: (record) => (
                    <StyledButton
                      variant="secondary"
                      size="sm"
                      icon="IconDownload"
                      onClick={() => handleApply(record)}
                      loading={applyingIds.has(record.resource_id)}
                    >
                      {t('common.update')}
                    </StyledButton>
                  ),
                },
              ]}
            />
          </div>
        )}

        {checkResult?.checked_at && (
          <p className="text-xs text-desert-stone mt-3">
            {t('settings.update.lastChecked', { timestamp: new Date(checkResult.checked_at).toLocaleString() })}
          </p>
        )}
      </div>

      <ActiveDownloads withHeader />
    </div>
  )
}

export default function SystemUpdatePage(props: { system: Props }) {
  const { t } = useTranslation()
  const { addNotification } = useNotifications()

  const [isUpdating, setIsUpdating] = useState(false)
  const [updateStatus, setUpdateStatus] = useState<SystemUpdateStatus | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showLogs, setShowLogs] = useState(false)
  const [logs, setLogs] = useState<string>('')
  const [email, setEmail] = useState('')
  const [versionInfo, setVersionInfo] = useState<Omit<Props, 'earlyAccess'>>(props.system)
  const [showConnectionLostNotice, setShowConnectionLostNotice] = useState(false)

  const earlyAccessSetting = useSystemSetting({
    key: 'system.earlyAccess', initialData: {
      key: 'system.earlyAccess',
      value: props.system.earlyAccess,
    }
  })

  useEffect(() => {
    if (!isUpdating) return

    const interval = setInterval(async () => {
      try {
        const response = await api.getSystemUpdateStatus()
        if (!response) {
          throw new Error('Failed to fetch update status')
        }
        setUpdateStatus(response)

        // If we can connect again, hide the connection lost notice
        setShowConnectionLostNotice(false)

        // Check if update is complete or errored
        if (response.stage === 'complete') {
          // Re-check version so the KV store clears the stale "update available" flag
          // before we reload, otherwise the banner shows "current → current"
          try {
            await api.checkLatestVersion(true)
          } catch {
            // Non-critical - page reload will still work
          }
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        } else if (response.stage === 'error') {
          setIsUpdating(false)
          setError(response.message)
        }
      } catch (err) {
        // During container restart, we'll lose connection - this is expected
        // Show a notice to inform the user that this is normal
        setShowConnectionLostNotice(true)
        // Continue polling to detect when the container comes back up
        console.log('Polling update status (container may be restarting)...')
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isUpdating])

  const handleStartUpdate = async () => {
    try {
      setError(null)
      setIsUpdating(true)
      const response = await api.startSystemUpdate()
      if (!response || !response.success) {
        throw new Error('Failed to start update')
      }
    } catch (err: any) {
      setIsUpdating(false)
      setError(err.response?.data?.error || err.message || 'Failed to start update')
    }
  }

  const handleViewLogs = async () => {
    try {
      const response = await api.getSystemUpdateLogs()
      if (!response) {
        throw new Error('Failed to fetch update logs')
      }
      setLogs(response.logs)
      setShowLogs(true)
    } catch (err) {
      setError('Failed to fetch update logs')
    }
  }

  const checkVersionMutation = useMutation({
    mutationKey: ['checkLatestVersion'],
    mutationFn: () => api.checkLatestVersion(true),
    onSuccess: (data) => {
      if (data) {
        setVersionInfo({
          updateAvailable: data.updateAvailable,
          latestVersion: data.latestVersion,
          currentVersion: data.currentVersion,
        })
        if (data.updateAvailable) {
          addNotification({
            type: 'success',
            message: t('settings.update.updateAvailableVersion', { version: data.latestVersion }),
          })
        } else {
          addNotification({ type: 'success', message: t('settings.update.systemIsUpToDate') })
        }
        setError(null)
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.message || t('settings.update.failedToCheck')
      setError(errorMessage)
      addNotification({ type: 'error', message: errorMessage })
    },
  })

  const getProgressBarColor = () => {
    if (updateStatus?.stage === 'error') return 'bg-desert-red'
    if (updateStatus?.stage === 'complete') return 'bg-desert-olive'
    return 'bg-desert-green'
  }

  const getStatusIcon = () => {
    if (updateStatus?.stage === 'complete')
      return <IconCheck className="h-12 w-12 text-desert-olive" />
    if (updateStatus?.stage === 'error')
      return <IconAlertCircle className="h-12 w-12 text-desert-red" />
    if (isUpdating) return <IconReload className="h-12 w-12 text-desert-green animate-spin" />
    if (props.system.updateAvailable)
      return <IconArrowBigUpLines className="h-16 w-16 text-desert-green" />
    return <IconCircleCheck className="h-16 w-16 text-desert-olive" />
  }

  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: boolean }) => {
      return await api.updateSetting(key, value)
    },
    onSuccess: () => {
      addNotification({ message: t('settings.models.settingUpdated'), type: 'success' })
      earlyAccessSetting.refetch()
    },
    onError: (error) => {
      console.error('Error updating setting:', error)
      addNotification({ message: t('settings.models.settingUpdateError'), type: 'error' })
    },
  })

  const subscribeToReleaseNotesMutation = useMutation({
    mutationKey: ['subscribeToReleaseNotes'],
    mutationFn: (email: string) => api.subscribeToReleaseNotes(email),
    onSuccess: (data) => {
      if (data && data.success) {
        addNotification({ type: 'success', message: 'Successfully subscribed to release notes!' })
        setEmail('')
      } else {
        addNotification({
          type: 'error',
          message: `Failed to subscribe: ${data?.message || 'Unknown error'}`,
        })
      }
    },
    onError: (error: any) => {
      addNotification({
        type: 'error',
        message: `Error subscribing to release notes: ${error.message || 'Unknown error'}`,
      })
    },
  })

  return (
    <SettingsLayout>
      <Head title={t('settings.update.title')} />
      <div className="xl:pl-72 w-full">
        <main className="px-6 lg:px-12 py-6 lg:py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-desert-green mb-2">{t('settings.update.title')}</h1>
            <p className="text-desert-stone-dark">
              {t('settings.update.description')}
            </p>
          </div>

          {error && (
            <div className="mb-6">
              <Alert
                type="error"
                title={t('settings.update.updateFailed')}
                message={error}
                variant="bordered"
                dismissible
                onDismiss={() => setError(null)}
              />
            </div>
          )}
          {isUpdating && updateStatus?.stage === 'recreating' && (
            <div className="mb-6">
              <Alert
                type="info"
                title={t('settings.update.containerRestarting')}
                message={t('settings.update.containerRestartingMsg')}
                variant="solid"
              />
            </div>
          )}
          {isUpdating && showConnectionLostNotice && (
            <div className="mb-6">
              <Alert
                type="info"
                title={t('settings.update.connectionLost')}
                message={t('settings.update.connectionLostMsg')}
                variant="solid"
              />
            </div>
          )}
          <div className="bg-surface-primary rounded-lg border shadow-md overflow-hidden">
            <div className="p-8 text-center">
              <div className="flex justify-center mb-4">{getStatusIcon()}</div>

              {!isUpdating && (
                <>
                  <h2 className="text-2xl font-bold text-desert-green mb-2">
                    {props.system.updateAvailable ? t('settings.update.updateAvailable') : t('settings.update.systemUpToDate')}
                  </h2>
                  <p className="text-desert-stone-dark mb-6">
                    {props.system.updateAvailable
                      ? t('settings.update.newVersionAvailable', { version: props.system.latestVersion })
                      : t('settings.update.runningLatest')}
                  </p>
                </>
              )}

              {isUpdating && updateStatus && (
                <>
                  <h2 className="text-2xl font-bold text-desert-green mb-2 capitalize">
                    {updateStatus.stage === 'idle' ? t('settings.update.preparingUpdate') : updateStatus.stage}
                  </h2>
                  <p className="text-desert-stone-dark mb-6">{updateStatus.message}</p>
                </>
              )}

              <div className="flex justify-center gap-8 mb-6">
                <div className="text-center">
                  <p className="text-sm text-desert-stone mb-1">{t('settings.update.currentVersion')}</p>
                  <p className="text-xl font-bold text-desert-green">
                    {versionInfo.currentVersion}
                  </p>
                </div>
                {versionInfo.updateAvailable && (
                  <>
                    <div className="flex items-center">
                      <svg
                        className="h-6 w-6 text-desert-stone"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-desert-stone mb-1">{t('settings.update.latestVersion')}</p>
                      <p className="text-xl font-bold text-desert-olive">
                        {versionInfo.latestVersion}
                      </p>
                    </div>
                  </>
                )}
              </div>
              {isUpdating && updateStatus && (
                <div className="mb-4">
                  <div className="w-full bg-desert-stone-light rounded-full h-3 overflow-hidden">
                    <div
                      className={`${getProgressBarColor()} h-full transition-all duration-500 ease-out`}
                      style={{ width: `${updateStatus.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-desert-stone mt-2">
                    {t('settings.update.progressComplete', { progress: updateStatus.progress })}
                  </p>
                </div>
              )}
              {!isUpdating && (
                <div className="flex justify-center gap-4">
                  <StyledButton
                    variant="primary"
                    size="lg"
                    icon="IconDownload"
                    onClick={handleStartUpdate}
                    disabled={!versionInfo.updateAvailable}
                  >
                    {versionInfo.updateAvailable ? t('settings.update.startUpdate') : t('settings.update.noUpdateAvailable')}
                  </StyledButton>
                  <StyledButton
                    variant="ghost"
                    size="lg"
                    icon="IconRefresh"
                    onClick={() => checkVersionMutation.mutate()}
                    loading={checkVersionMutation.isPending}
                  >
                    {t('settings.update.checkAgain')}
                  </StyledButton>
                </div>
              )}
            </div>
            <div className="border-t bg-surface-primary p-6">
              <h3 className="text-lg font-semibold text-desert-green mb-4">
                {t('settings.update.whatHappens')}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-desert-green text-white flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-desert-stone-dark">{t('settings.update.pullImages')}</p>
                    <p className="text-sm text-desert-stone">
                      {t('settings.update.pullImagesDesc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-desert-green text-white flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-desert-stone-dark">{t('settings.update.recreateContainers')}</p>
                    <p className="text-sm text-desert-stone">
                      {t('settings.update.recreateContainersDesc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-desert-green text-white flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-desert-stone-dark">{t('settings.update.autoReload')}</p>
                    <p className="text-sm text-desert-stone">
                      {t('settings.update.autoReloadDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {isUpdating && (
                <div className="mt-6 pt-6 border-t border-desert-stone-light">
                  <StyledButton
                    variant="ghost"
                    size="sm"
                    icon="IconLogs"
                    onClick={handleViewLogs}
                    fullWidth
                  >
                    {t('settings.update.viewLogs')}
                  </StyledButton>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Alert
              type="info"
              title={t('settings.update.backupReminder')}
              message={t('settings.update.backupReminderMsg')}
              variant="solid"
            />
            <Alert
              type="warning"
              title={t('settings.update.temporaryDowntime')}
              message={t('settings.update.temporaryDowntimeMsg')}
              variant="solid"
            />
          </div>
          <StyledSectionHeader title={t('settings.update.earlyAccess')} className="mt-8" />
          <div className="bg-surface-primary rounded-lg border shadow-md overflow-hidden mt-6 p-6">
            <Switch
              checked={earlyAccessSetting.data?.value || false}
              onChange={(newVal) => {
                updateSettingMutation.mutate({ key: 'system.earlyAccess', value: newVal })
              }}
              disabled={updateSettingMutation.isPending}
              label={t('settings.update.enableEarlyAccess')}
              description={t('settings.update.earlyAccessDesc')}
            />
          </div>
          <ContentUpdatesSection />
          <div className="bg-surface-primary rounded-lg border shadow-md overflow-hidden py-6 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center p-8 gap-y-8 md:gap-y-0 gap-x-8">
              <div>
                <h2 className="max-w-xl text-lg font-bold text-desert-green sm:text-xl lg:col-span-7">
                  {t('settings.update.subscribeHeading', 'Want to stay updated with the latest from КАМРАД? Subscribe to receive release notes directly to your inbox. Unsubscribe anytime.')}
                </h2>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-x-3">
                  <Input
                    name="email"
                    label=""
                    type="email"
                    placeholder={t('settings.update.emailPlaceholder', 'Your email address')}
                    disabled={false}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                    containerClassName="!mt-0"
                  />
                  <StyledButton
                    variant="primary"
                    disabled={!email}
                    onClick={() => subscribeToReleaseNotesMutation.mutateAsync(email)}
                    loading={subscribeToReleaseNotesMutation.isPending}
                  >
                    {t('settings.update.subscribe', 'Subscribe')}
                  </StyledButton>
                </div>
                <p className="mt-2 text-sm text-desert-stone-dark">
                  {t('settings.update.privacyNote', 'We care about your privacy. КАМРАД will never share your email with third parties or send you spam.')}
                </p>
              </div>
            </div>
          </div>

          {showLogs && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-surface-primary rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] flex flex-col">
                <div className="p-6 border-b border-desert-stone-light flex justify-between items-center">
                  <h3 className="text-xl font-bold text-desert-green">{t('settings.update.updateLogs')}</h3>
                  <button
                    onClick={() => setShowLogs(false)}
                    className="text-desert-stone hover:text-desert-green transition-colors"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-6 overflow-auto flex-1">
                  <pre className="bg-black text-green-400 p-4 rounded text-xs font-mono whitespace-pre-wrap">
                    {logs || t('settings.update.noLogsYet')}
                  </pre>
                </div>
                <div className="p-6 border-t border-desert-stone-light">
                  <StyledButton variant="secondary" onClick={() => setShowLogs(false)} fullWidth>
                    {t('common.close')}
                  </StyledButton>
                </div>
              </div>
            </div>
          )}
        </main>
      </div >
    </SettingsLayout >
  )
}
