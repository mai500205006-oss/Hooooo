/**
 * RED KING Plugin SDK — Helpers بس، مفيش Side Effects ولا Global State
 * ولا أي Implementation لخدمات. الهدف إن الـ Plugins المستقبلية تستخدم
 * الـ Helpers دي بدل ما تبني الـ objects يدويًا، مع الحفاظ الكامل على
 * التوافق مع registerPlugin() الحالي.
 */

import type { PluginManifest, PluginContext } from './contract';
import type { PluginServices } from './coreServices';

/** نسخة الـ SDK نفسه */
export const SDK_VERSION = '1.0.0';

/** إصدارات الـ Plugin API المدعومة حاليًا */
export type PluginApiVersion = '1.0.0';

export const SUPPORTED_API_VERSIONS: readonly PluginApiVersion[] = ['1.0.0'];

/**
 * definePlugin — Identity function بحت، غرضها الحفاظ على الـ Literal Types
 * وقت كتابة الـ Manifest (زي autocomplete على slot/capabilities) من غير
 * ما تغيّر أو تتحقق من أي حاجة وقت التشغيل. مفيش أي Side Effect هنا.
 */
export function definePlugin<T extends PluginManifest>(manifest: T): T {
  return manifest;
}

/**
 * createPluginContext — بيبني PluginContext بشكل Type-safe من غير ما يعمل
 * Instantiate لأي Service. الـ Services لازم تتمرر جاهزة من الطرف اللي بيستدعي.
 */
export function createPluginContext(pluginId: string, services: PluginServices): PluginContext {
  return { pluginId, services };
}

/** Compatibility Helpers — Pure functions بس، بترجع نتيجة من غير أي Throw أو Log */

export function isSupportedApiVersion(version: string): version is PluginApiVersion {
  return (SUPPORTED_API_VERSIONS as readonly string[]).includes(version);
}

export function isSdkCompatible(apiVersion: string): boolean {
  return isSupportedApiVersion(apiVersion);
}
