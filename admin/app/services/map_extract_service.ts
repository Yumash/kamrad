import { spawn } from 'node:child_process'
import { join } from 'node:path'
import { readFileSync, existsSync } from 'node:fs'
import logger from '@adonisjs/core/services/logger'
import transmit from '@adonisjs/transmit/services/main'
import InstalledResource from '#models/installed_resource'
import { DateTime } from 'luxon'
import { getFileStatsIfExists, ensureDirectoryExists } from '../utils/fs.js'

interface MapRegion {
  id: string
  name: { ru: string; en: string }
  country: string
  bbox: [number, number, number, number]
  estimated_size_mb: number
}

interface MapRegionsSpec {
  planet_url: string
  regions: MapRegion[]
}

interface ExtractionStatus {
  status: 'idle' | 'extracting' | 'done' | 'error'
  regionId: string | null
  progress: string | null
  error: string | null
}

const PMTILES_BINARY = '/usr/local/bin/pmtiles'
const MAP_STORAGE_PATH = '/storage/maps/pmtiles'
const REGIONS_FILE = join(process.cwd(), '..', 'collections', 'map-regions.json')
const BROADCAST_CHANNEL = 'map-extract'

export class MapExtractService {
  private currentStatus: ExtractionStatus = {
    status: 'idle',
    regionId: null,
    progress: null,
    error: null,
  }

  getStatus(): ExtractionStatus {
    return { ...this.currentStatus }
  }

  getRegions(): MapRegion[] {
    try {
      // Try multiple paths (in Docker vs development)
      const paths = [
        REGIONS_FILE,
        join(process.cwd(), 'collections', 'map-regions.json'),
        join(process.cwd(), '..', 'collections', 'map-regions.json'),
      ]
      for (const p of paths) {
        if (existsSync(p)) {
          const data = JSON.parse(readFileSync(p, 'utf-8')) as MapRegionsSpec
          return data.regions
        }
      }
      logger.warn('[MapExtractService] map-regions.json not found')
      return []
    } catch (err) {
      logger.error('[MapExtractService] Failed to load regions:', err)
      return []
    }
  }

  getPlanetUrl(): string {
    try {
      const paths = [
        REGIONS_FILE,
        join(process.cwd(), 'collections', 'map-regions.json'),
        join(process.cwd(), '..', 'collections', 'map-regions.json'),
      ]
      for (const p of paths) {
        if (existsSync(p)) {
          const data = JSON.parse(readFileSync(p, 'utf-8')) as MapRegionsSpec
          return data.planet_url
        }
      }
    } catch {}
    return 'https://build.protomaps.com/20260325.pmtiles'
  }

  async extract(regionId: string): Promise<void> {
    if (this.currentStatus.status === 'extracting') {
      throw new Error('An extraction is already in progress')
    }

    // Check pmtiles binary
    if (!existsSync(PMTILES_BINARY)) {
      // Try local dev path
      const localBin = 'pmtiles'
      logger.warn(`[MapExtractService] ${PMTILES_BINARY} not found, trying '${localBin}'`)
    }

    const regions = this.getRegions()
    const region = regions.find((r) => r.id === regionId)
    if (!region) {
      throw new Error(`Region '${regionId}' not found`)
    }

    const outputDir = join(process.cwd(), MAP_STORAGE_PATH)
    await ensureDirectoryExists(outputDir)

    const date = new Date().toISOString().slice(0, 7).replace('-', '-')
    const outputFile = join(outputDir, `${regionId}_${date}.pmtiles`)
    const planetUrl = this.getPlanetUrl()
    const bboxStr = region.bbox.join(',')

    this.currentStatus = {
      status: 'extracting',
      regionId,
      progress: `Starting extraction of ${region.name.en}...`,
      error: null,
    }
    this._broadcast()

    const binary = existsSync(PMTILES_BINARY) ? PMTILES_BINARY : 'pmtiles'

    const proc = spawn(binary, [
      'extract',
      planetUrl,
      outputFile,
      `--bbox=${bboxStr}`,
      '--maxzoom=14',
    ])

    proc.stdout.on('data', (data: Buffer) => {
      const line = data.toString().trim()
      if (line) {
        this.currentStatus.progress = line
        this._broadcast()
        logger.debug(`[MapExtractService] ${line}`)
      }
    })

    proc.stderr.on('data', (data: Buffer) => {
      const line = data.toString().trim()
      if (line) {
        this.currentStatus.progress = line
        this._broadcast()
        logger.debug(`[MapExtractService] stderr: ${line}`)
      }
    })

    proc.on('close', async (code) => {
      if (code === 0) {
        // Register in InstalledResource
        try {
          const stats = await getFileStatsIfExists(outputFile)
          await InstalledResource.updateOrCreate(
            { resource_id: regionId, resource_type: 'map' },
            {
              version: date,
              url: `extracted:${planetUrl}`,
              file_path: outputFile,
              file_size_bytes: stats ? Number(stats.size) : null,
              installed_at: DateTime.now(),
            }
          )
        } catch (err) {
          logger.error('[MapExtractService] Failed to register resource:', err)
        }

        this.currentStatus = {
          status: 'done',
          regionId,
          progress: `Extraction complete: ${region.name.en}`,
          error: null,
        }
        logger.info(`[MapExtractService] Successfully extracted ${regionId} to ${outputFile}`)
      } else {
        this.currentStatus = {
          status: 'error',
          regionId,
          progress: null,
          error: `pmtiles extract failed with code ${code}`,
        }
        logger.error(`[MapExtractService] Extraction failed for ${regionId} with code ${code}`)
      }
      this._broadcast()
    })

    proc.on('error', (err) => {
      this.currentStatus = {
        status: 'error',
        regionId,
        progress: null,
        error: `Failed to start pmtiles: ${err.message}. Is pmtiles binary installed?`,
      }
      this._broadcast()
      logger.error('[MapExtractService] Process error:', err)
    })
  }

  private _broadcast() {
    try {
      transmit.broadcast(BROADCAST_CHANNEL, { ...this.currentStatus })
    } catch {}
  }
}
