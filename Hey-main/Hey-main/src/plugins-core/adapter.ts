/**
 * Plugin Adapter Layer — Infrastructure بس عشان أدوات خارجية مستقبلية
 * تقدر تتكامل مع نظام الـ Plugins، من غير ما تبقى مرتبطة بـ React ولا
 * بأداة معيّنة. مفيش أي Adapter حقيقي هنا — Interfaces + Infra بس، ومفيش
 * Dynamic Discovery ولا Global State.
 */

import type { PluginManifest, PluginContext } from './contract';
import type { PluginLoader } from './loader';

/**
 * عقد أي Plugin Adapter — بيحوّل بيانات من مصدر خارجي (TSource) لـ
 * PluginManifest متوافق مع العقد الحالي (contract.ts). مفيش اعتماد على
 * React ولا على شكل أداة خارجية بعينها — TSource عام بالكامل.
 */
export interface PluginAdapter<TSource = unknown> {
  /** مُعرّف فريد للـ Adapter نفسه (مش لمصدر الـ Plugin اللي بيحوّله) */
  id: string;
  /** يحوّل بيانات المصدر لـ PluginManifest سليم حسب العقد الحالي */
  toManifest(source: TSource): PluginManifest;
  /** Hook اختياري لو الـ Adapter محتاج يوصل لـ Core Services وقت التهيئة */
  initialize?(context: PluginContext): void;
}

/** Identity helper بحت — بيحافظ على الـ Literal Types، بنفس روح definePlugin في الـ SDK */
export function defineAdapter<TSource, T extends PluginAdapter<TSource>>(adapter: T): T {
  return adapter;
}

/**
 * PluginAdapterRegistry — تخزين رسمي للـ Adapters المسجّلة (مش للـ Plugins
 * نفسها). نفس شكل PluginRegistry الموجود بالفعل، لكن مخصص للـ Adapters.
 */
export class PluginAdapterRegistry {
  private adapters = new Map<string, PluginAdapter>();

  has(id: string): boolean {
    return this.adapters.has(id);
  }

  get(id: string): PluginAdapter | undefined {
    return this.adapters.get(id);
  }

  /** يسجّل Adapter — بيرجع false لو الـ id مسجّل قبل كده من غير ما يعمل حاجة */
  add(adapter: PluginAdapter): boolean {
    if (this.adapters.has(adapter.id)) return false;
    this.adapters.set(adapter.id, adapter);
    return true;
  }

  /** قائمة للقراءة فقط بكل الـ Adapters المسجّلة */
  list(): readonly PluginAdapter[] {
    return Array.from(this.adapters.values());
  }
}

/**
 * يشغّل Adapter معيّن على مصدر معيّن، يحوّل الناتج لـ Manifest، وبعدين
 * يحمّله عبر PluginLoader الموجود بالفعل (Sprint Platform-2). الدالة دي
 * مجرد Glue — مفيش Global State ومفيش Instantiation لأي Loader/Registry
 * هنا؛ بيتم تمريرهم جاهزين من الطرف المستدعي.
 */
export function loadThroughAdapter<TSource>(
  adapter: PluginAdapter<TSource>,
  source: TSource,
  loader: PluginLoader
): boolean {
  const manifest = adapter.toManifest(source);
  return loader.load(manifest);
}
