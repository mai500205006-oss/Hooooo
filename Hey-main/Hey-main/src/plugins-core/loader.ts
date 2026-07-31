/**
 * PluginLoader — بيحمّل PluginManifest objects جاهزة (مش Dynamic Import ولا Auto-discovery).
 * بيتحقق من الحقول المطلوبة قبل التسجيل، وبيرفض الـ ids المكرّرة.
 */

import type { PluginManifest } from './contract';
import { PluginRegistry } from './pluginRegistry';
import { validatePluginManifest } from './validation';
import { logger } from '@utils/logger';

export class PluginLoader {
  constructor(private readonly registry: PluginRegistry) {}

  /** يتحقق من الـ manifest ويسجّله لو سليم — بيرجع true لو اتسجّل فعلًا */
  load(manifest: PluginManifest): boolean {
    const result = validatePluginManifest(manifest);
    if (!result.valid) {
      logger.warn(
        `Plugin manifest rejected (${result.errors.join(', ')})`,
        undefined,
        'plugins-core'
      );
      return false;
    }

    if (this.registry.has(manifest.id)) {
      logger.warn(`Plugin "${manifest.id}" already registered — تم التجاهل.`, undefined, 'plugins-core');
      return false;
    }

    return this.registry.add(manifest);
  }

  /** يحمّل مجموعة manifests دفعة واحدة */
  loadAll(manifests: PluginManifest[]): void {
    for (const manifest of manifests) this.load(manifest);
  }

  /** قائمة للقراءة فقط بكل الـ Plugins المحمّلة بنجاح */
  list(): readonly PluginManifest[] {
    return this.registry.list();
  }
}
