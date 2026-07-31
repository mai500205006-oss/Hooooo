/**
 * PluginRegistry — تخزين رسمي للـ Plugins المسجّلة.
 * كلاس بسيط بيغلّف الـ Map، وبيعرض قائمة للقراءة فقط (Read-only).
 */

import type { PluginManifest } from './contract';

export class PluginRegistry {
  private plugins = new Map<string, PluginManifest>();

  has(id: string): boolean {
    return this.plugins.has(id);
  }

  get(id: string): PluginManifest | undefined {
    return this.plugins.get(id);
  }

  /** يضيف الـ Plugin — بيرجع false لو الـ id مسجّل قبل كده من غير ما يعمل حاجة */
  add(manifest: PluginManifest): boolean {
    if (this.plugins.has(manifest.id)) return false;
    this.plugins.set(manifest.id, manifest);
    return true;
  }

  /** قائمة للقراءة فقط بكل الـ Plugins المسجّلة */
  list(): readonly PluginManifest[] {
    return Array.from(this.plugins.values());
  }
}
