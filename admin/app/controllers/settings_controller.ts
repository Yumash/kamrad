import KVStore from '#models/kv_store';
import { MapService } from '#services/map_service';
import { OllamaService } from '#services/ollama_service';
import { SystemService } from '#services/system_service';
import { updateSettingSchema } from '#validators/settings';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import type { KVStoreKey } from '../../types/kv_store.js';

@inject()
export default class SettingsController {
    constructor(
        private systemService: SystemService,
        private mapService: MapService,
        private ollamaService: OllamaService
    ) { }

    async system({ inertia }: HttpContext) {
        const systemInfo = await this.systemService.getSystemInfo();
        return inertia.render('settings/system', {
            system: {
                info: systemInfo
            }
        });
    }

    async apps({ inertia }: HttpContext) {
        const services = await this.systemService.getServices({ installedOnly: false });
        return inertia.render('settings/apps', {
            system: {
                services
            }
        });
    }
    
    async legal({ inertia }: HttpContext) {
        return inertia.render('settings/legal');
    }

    async support({ inertia }: HttpContext) {
        return inertia.render('settings/support');
    }

    async translate({ inertia }: HttpContext) {
        return inertia.render('settings/translate');
    }

    async maps({ inertia }: HttpContext) {
        const baseAssetsCheck = await this.mapService.ensureBaseAssets();
        const regionFiles = await this.mapService.listRegions();
        return inertia.render('settings/maps', {
            maps: {
                baseAssetsExist: baseAssetsCheck,
                regionFiles: regionFiles.files
            }
        });
    }

    async models({ inertia }: HttpContext) {
        const availableModels = await this.ollamaService.getAvailableModels({ sort: 'pulls', recommendedOnly: false, query: null, limit: 15 });
        const installedModels = await this.ollamaService.getModels();
        const chatSuggestionsEnabled = await KVStore.getValue('chat.suggestionsEnabled')
        const aiAssistantCustomName = await KVStore.getValue('ai.assistantCustomName')
        const ollamaCloudEnabled = await KVStore.getValue('ai.ollamaCloudEnabled')
        const ollamaFlashAttention = await KVStore.getValue('ai.ollamaFlashAttention')
        return inertia.render('settings/models', {
            models: {
                availableModels: availableModels?.models || [],
                installedModels: installedModels || [],
                settings: {
                    chatSuggestionsEnabled: chatSuggestionsEnabled ?? false,
                    aiAssistantCustomName: aiAssistantCustomName ?? '',
                    ollamaCloudEnabled: ollamaCloudEnabled ?? false,
                    ollamaFlashAttention: ollamaFlashAttention ?? true,
                }
            }
        });
    }

    async update({ inertia }: HttpContext) {
        const updateInfo = await this.systemService.checkLatestVersion();
        return inertia.render('settings/update', {
            system: {
                updateAvailable: updateInfo.updateAvailable,
                latestVersion: updateInfo.latestVersion,
                currentVersion: updateInfo.currentVersion
            }
        });
    }

    async zim({ inertia }: HttpContext) {
        return inertia.render('settings/zim/index')
    }

    async zimRemote({ inertia }: HttpContext) {
        return inertia.render('settings/zim/remote-explorer');
    }

    async getSetting({ request, response }: HttpContext) {
        const key = request.qs().key;
        const value = await KVStore.getValue(key as KVStoreKey);
        return response.status(200).send({ key, value });
    }

    async updateSetting({ request, response }: HttpContext) {
        const reqData = await request.validateUsing(updateSettingSchema);
        await this.systemService.updateSetting(reqData.key, reqData.value);
        return response.status(200).send({ success: true, message: 'Setting updated successfully' });
    }
}