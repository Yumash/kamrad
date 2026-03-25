import { TFunction } from 'i18next'

/**
 * Get the translated friendly name for a service.
 * Falls back to the DB friendly_name, then service_name.
 */
export function getServiceName(
  t: TFunction,
  serviceName: string,
  dbFriendlyName?: string | null
): string {
  const key = `services.${serviceName}.name`
  const translated = t(key, { defaultValue: '' })
  if (translated && translated !== key) return translated
  return dbFriendlyName || serviceName
}

/**
 * Get the translated description for a service.
 * Falls back to the DB description.
 */
export function getServiceDescription(
  t: TFunction,
  serviceName: string,
  dbDescription?: string | null
): string {
  const key = `services.${serviceName}.description`
  const translated = t(key, { defaultValue: '' })
  if (translated && translated !== key) return translated
  return dbDescription || ''
}
