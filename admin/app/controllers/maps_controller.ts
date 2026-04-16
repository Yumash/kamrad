import { MapService } from '#services/map_service'
import { MapExtractService } from '#services/map_extract_service'
import MapMarker from '#models/map_marker'
import {
  assertNotPrivateUrl,
  downloadCollectionValidator,
  filenameParamValidator,
  remoteDownloadValidator,
  remoteDownloadValidatorOptional,
} from '#validators/common'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

const mapExtractService = new MapExtractService()

@inject()
export default class MapsController {
  constructor(private mapService: MapService) {}

  async index({ inertia }: HttpContext) {
    const baseAssetsCheck = await this.mapService.ensureBaseAssets()
    const regionFiles = await this.mapService.listRegions()
    return inertia.render('maps', {
      maps: {
        baseAssetsExist: baseAssetsCheck,
        regionFiles: regionFiles.files,
      },
    })
  }

  async downloadBaseAssets({ request }: HttpContext) {
    const payload = await request.validateUsing(remoteDownloadValidatorOptional)
    if (payload.url) assertNotPrivateUrl(payload.url)
    await this.mapService.downloadBaseAssets(payload.url)
    return { success: true }
  }

  async downloadRemote({ request }: HttpContext) {
    const payload = await request.validateUsing(remoteDownloadValidator)
    assertNotPrivateUrl(payload.url)
    const filename = await this.mapService.downloadRemote(payload.url)
    return {
      message: 'Download started successfully',
      filename,
      url: payload.url,
    }
  }

  async downloadCollection({ request }: HttpContext) {
    const payload = await request.validateUsing(downloadCollectionValidator)
    const resources = await this.mapService.downloadCollection(payload.slug)
    return {
      message: 'Collection download started successfully',
      slug: payload.slug,
      resources,
    }
  }

  // For providing a "preflight" check in the UI before actually starting a background download
  async downloadRemotePreflight({ request }: HttpContext) {
    const payload = await request.validateUsing(remoteDownloadValidator)
    assertNotPrivateUrl(payload.url)
    const info = await this.mapService.downloadRemotePreflight(payload.url)
    return info
  }

  async fetchLatestCollections({}: HttpContext) {
    const success = await this.mapService.fetchLatestCollections()
    return { success }
  }

  async listCuratedCollections({}: HttpContext) {
    return await this.mapService.listCuratedCollections()
  }

  async listRegions({}: HttpContext) {
    return await this.mapService.listRegions()
  }

  async styles({ request, response }: HttpContext) {
    // Automatically ensure base assets are present before generating styles
    const baseAssetsExist = await this.mapService.ensureBaseAssets()
    if (!baseAssetsExist) {
      return response.status(500).send({
        message:
          'Base map assets are missing and could not be downloaded. Please check your connection and try again.',
      })
    }

    const styles = await this.mapService.generateStylesJSON(request.host(), request.protocol())
    return response.json(styles)
  }

  async delete({ request, response }: HttpContext) {
    const payload = await request.validateUsing(filenameParamValidator)

    try {
      await this.mapService.delete(payload.params.filename)
    } catch (error) {
      if (error.message === 'not_found') {
        return response.status(404).send({
          message: `Map file with key ${payload.params.filename} not found`,
        })
      }
      throw error // Re-throw any other errors and let the global error handler catch
    }

    return {
      message: 'Map file deleted successfully',
    }
  }

  // --- Map extraction ---

  async extractRegions({ response }: HttpContext) {
    const regions = mapExtractService.getRegions()
    return response.json({ regions })
  }

  async extractStart({ request, response }: HttpContext) {
    const { regionId } = request.only(['regionId'])
    if (!regionId || typeof regionId !== 'string') {
      return response.status(400).json({ error: 'regionId is required' })
    }

    try {
      await mapExtractService.extract(regionId)
      return response.json({ success: true, message: `Extraction started for ${regionId}` })
    } catch (error) {
      const status = (error as any).message?.includes('already in progress') ? 409 : 503
      return response.status(status).json({
        error: error instanceof Error ? error.message : 'Extraction failed',
      })
    }
  }

  async extractStatus({ response }: HttpContext) {
    return response.json(mapExtractService.getStatus())
  }

  // --- Map Markers ---

  async listMarkers({}: HttpContext) {
    return await MapMarker.query().orderBy('created_at', 'asc')
  }

  async createMarker({ request }: HttpContext) {
    const payload = await request.validateUsing(
      vine.compile(
        vine.object({
          name: vine.string().trim().minLength(1).maxLength(255),
          longitude: vine.number(),
          latitude: vine.number(),
          color: vine.string().trim().maxLength(20).optional(),
        })
      )
    )
    const marker = await MapMarker.create({
      name: payload.name,
      longitude: payload.longitude,
      latitude: payload.latitude,
      color: payload.color ?? 'orange',
    })
    return marker
  }

  async updateMarker({ request, response }: HttpContext) {
    const { id } = request.params()
    const marker = await MapMarker.find(id)
    if (!marker) {
      return response.status(404).send({ message: 'Marker not found' })
    }
    const payload = await request.validateUsing(
      vine.compile(
        vine.object({
          name: vine.string().trim().minLength(1).maxLength(255).optional(),
          color: vine.string().trim().maxLength(20).optional(),
        })
      )
    )
    if (payload.name !== undefined) marker.name = payload.name
    if (payload.color !== undefined) marker.color = payload.color
    await marker.save()
    return marker
  }

  async deleteMarker({ request, response }: HttpContext) {
    const { id } = request.params()
    const marker = await MapMarker.find(id)
    if (!marker) {
      return response.status(404).send({ message: 'Marker not found' })
    }
    await marker.delete()
    return { message: 'Marker deleted' }
  }
}
