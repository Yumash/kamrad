import { DateTime } from 'luxon'
import { BaseModel, column, SnakeCaseNamingStrategy } from '@adonisjs/lucid/orm'
import { createHash } from 'node:crypto'

export default class TranslationCache extends BaseModel {
  static table = 'translation_cache'
  static namingStrategy = new SnakeCaseNamingStrategy()

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare sourceHash: string

  @column()
  declare sourceLang: string

  @column()
  declare targetLang: string

  @column()
  declare translatedText: string

  @column()
  declare provider: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Compute SHA-256 hash for cache lookup.
   */
  static hashText(text: string): string {
    return createHash('sha256').update(text).digest('hex')
  }

  /**
   * Look up cached translation.
   */
  static async lookup(text: string, sourceLang: string, targetLang: string): Promise<string | null> {
    const hash = TranslationCache.hashText(text)
    const entry = await TranslationCache.query()
      .where('source_hash', hash)
      .where('source_lang', sourceLang)
      .where('target_lang', targetLang)
      .first()
    return entry?.translatedText || null
  }

  /**
   * Store translation in cache.
   */
  static async store(text: string, sourceLang: string, targetLang: string, translatedText: string, provider: string): Promise<void> {
    const hash = TranslationCache.hashText(text)
    await TranslationCache.updateOrCreate(
      { sourceHash: hash, sourceLang, targetLang },
      { translatedText, provider }
    )
  }

  /**
   * Clear all cached translations.
   */
  static async clearAll(): Promise<number> {
    const count = await TranslationCache.query().delete()
    return count[0] as unknown as number
  }
}
