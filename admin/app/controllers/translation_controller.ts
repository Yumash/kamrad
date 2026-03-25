import { TranslationService } from '#services/translation_service'
import TranslationCache from '#models/translation_cache'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

const translateSchema = vine.compile(
  vine.object({
    text: vine.string().trim().minLength(1).maxLength(50000),
    from: vine.string().trim().minLength(2).maxLength(5),
    to: vine.string().trim().minLength(2).maxLength(5),
  })
)

@inject()
export class TranslationController {
  constructor(private translationService: TranslationService) {}

  async translate({ request, response }: HttpContext) {
    const { text, from, to } = await request.validateUsing(translateSchema)

    try {
      const result = await this.translationService.translate(text, from, to)
      return response.json(result)
    } catch (error) {
      return response.status(503).json({
        error: error instanceof Error ? error.message : 'Translation failed',
      })
    }
  }

  async providers({ response }: HttpContext) {
    const providers = await this.translationService.getAvailableProviders()
    return response.json({ providers })
  }

  async clearCache({ response }: HttpContext) {
    const deleted = await TranslationCache.clearAll()
    return response.json({ success: true, deleted })
  }
}
