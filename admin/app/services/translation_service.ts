import logger from '@adonisjs/core/services/logger'
import KVStore from '#models/kv_store'
import TranslationCache from '#models/translation_cache'
import { OllamaService } from './ollama_service.js'
import { inject } from '@adonisjs/core'
import axios from 'axios'

export interface TranslationResult {
  translatedText: string
  provider: string
  cached: boolean
}

export interface TranslationProvider {
  name: string
  translate(text: string, from: string, to: string): Promise<string>
  isAvailable(): Promise<boolean>
}

/**
 * Ollama-based translation provider.
 * Uses the currently selected Ollama model with a translation prompt.
 */
class OllamaTranslationProvider implements TranslationProvider {
  name = 'ollama'

  constructor(private ollamaService: OllamaService) {}

  async translate(text: string, from: string, to: string): Promise<string> {
    const model = await KVStore.getValue('chat.lastModel') || 'qwen2.5:3b'

    const prompt = `Translate the following text from ${from} to ${to}. Return ONLY the translated text, no explanations or notes.\n\nText to translate:\n${text}`

    const response = await this.ollamaService.chat({
      model,
      messages: [
        { role: 'system', content: 'You are a professional translator. Translate accurately and naturally. Return only the translated text.' },
        { role: 'user', content: prompt },
      ],
    })

    return (response as any).message?.content?.trim() || ''
  }

  async isAvailable(): Promise<boolean> {
    try {
      await this.ollamaService.chat({
        model: 'qwen2.5:3b',
        messages: [{ role: 'user', content: 'ping' }],
      })
      return true
    } catch {
      return false
    }
  }
}

/**
 * LibreTranslate-based translation provider.
 * Calls a locally-running LibreTranslate Docker container.
 */
class LibreTranslateProvider implements TranslationProvider {
  name = 'libretranslate'
  private baseUrl: string

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || 'http://host.docker.internal:5050'
  }

  async translate(text: string, from: string, to: string): Promise<string> {
    const response = await axios.post(`${this.baseUrl}/translate`, {
      q: text,
      source: this.mapLangCode(from),
      target: this.mapLangCode(to),
      format: 'text',
    }, { timeout: 30000 })

    return response.data.translatedText
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/languages`, { timeout: 5000 })
      return Array.isArray(response.data) && response.data.length > 0
    } catch {
      return false
    }
  }

  private mapLangCode(code: string): string {
    const map: Record<string, string> = { kz: 'kk' }
    return map[code] || code
  }
}

/**
 * Translation Service — orchestrates translation with provider selection and caching.
 */
@inject()
export class TranslationService {
  private providers: Map<string, TranslationProvider> = new Map()

  constructor(ollamaService: OllamaService) {
    this.providers.set('ollama', new OllamaTranslationProvider(ollamaService))
    this.providers.set('libretranslate', new LibreTranslateProvider())
  }

  async translate(text: string, from: string, to: string): Promise<TranslationResult> {
    if (!text.trim()) {
      throw new Error('Text cannot be empty')
    }

    if (from === to) {
      return { translatedText: text, provider: 'none', cached: false }
    }

    // Check cache first
    try {
      const cached = await TranslationCache.lookup(text, from, to)
      if (cached) {
        logger.debug(`[TranslationService] Cache hit for ${from}->${to}`)
        return { translatedText: cached, provider: 'cache', cached: true }
      }
    } catch (err) {
      logger.debug('[TranslationService] Cache lookup failed, proceeding without cache')
    }

    const providerName = await KVStore.getValue('translation.provider') || 'ollama'
    const provider = this.providers.get(providerName)

    if (!provider) {
      throw new Error(`Translation provider '${providerName}' not found`)
    }

    const available = await provider.isAvailable()
    if (!available) {
      // Fallback to ollama if selected provider is unavailable
      if (providerName !== 'ollama') {
        logger.warn(`[TranslationService] Provider '${providerName}' unavailable, falling back to ollama`)
        const ollamaProvider = this.providers.get('ollama')!
        const ollamaAvailable = await ollamaProvider.isAvailable()
        if (!ollamaAvailable) {
          throw new Error('No translation provider available. Please install Ollama or LibreTranslate.')
        }
        const translatedText = await ollamaProvider.translate(text, from, to)
        return { translatedText, provider: 'ollama', cached: false }
      }
      throw new Error('Ollama is not running. Please start the AI Assistant to use translation.')
    }

    const translatedText = await provider.translate(text, from, to)

    // Save to cache
    try {
      await TranslationCache.store(text, from, to, translatedText, provider.name)
    } catch (err) {
      logger.debug('[TranslationService] Cache store failed, continuing without cache')
    }

    logger.debug(`[TranslationService] Translated ${text.length} chars from ${from} to ${to} via ${provider.name}`)
    return { translatedText, provider: provider.name, cached: false }
  }

  async getAvailableProviders(): Promise<{ name: string; available: boolean }[]> {
    const results = []
    for (const [name, provider] of this.providers) {
      const available = await provider.isAvailable()
      results.push({ name, available })
    }
    return results
  }
}
