/**
 * Plugin Contract — العقد الرسمي لأي Plugin في RED KING.
 * الملف ده تعريفات (Types) بس، من غير أي منطق أو Side Effects.
 * الهدف: توحيد شكل الـ Plugin قبل ما الـ Features تبدأ تستخدمه فعليًا.
 */

import type { PluginServices } from './coreServices';

/** بيانات التعريف الأساسية لأي Plugin */
export interface PluginMetadata {
  id: string;
  name: string;
  version: string;
  /** وصف مختصر اختياري للـ Plugin */
  description?: string;
}

/**
 * قدرة (Capability) بيعلنها الـ Plugin — نص حر عمدًا (زي 'ui' أو 'background')
 * عشان الـ Features المختلفة تقدر تضيف قدرات جديدة من غير ما تعدّل العقد نفسه.
 */
export type PluginCapability = string;

/** وصف اختياري لعنصر قائمة/تنقّل بيتبع الـ Plugin — وصفي بس، مش مصدر التوجيه الفعلي */
export interface PluginMenuItem {
  label: string;
  path?: string;
  icon?: string;
  order?: number;
}

/**
 * Hooks اختيارية لدورة حياة الـ Plugin. مفيش تنفيذ فعلي لها دلوقتي —
 * موجودة كجزء من العقد بس عشان تُستخدم لاحقًا.
 */
export interface PluginLifecycle {
  onRegister?: (context: PluginContext) => void;
  onUnregister?: (context: PluginContext) => void;
}

/** الـ Context اللي بيتمرر لـ Lifecycle Hooks — بيشمل كل الـ Core Services عبر حقل واحد */
export interface PluginContext {
  pluginId: string;
  services: PluginServices;
}

/**
 * الـ Manifest الكامل لأي Plugin — العقد الرسمي.
 * كل الحقول الجديدة اختيارية عمدًا للحفاظ على التوافق مع الـ Plugins الحالية
 * اللي بتسجّل نفسها بـ { id, name, version, slot } بس.
 */
export interface PluginManifest extends PluginMetadata {
  /** المكان اللي الـ plugin هيظهر فيه (sidebar, dashboard, ...) — مجرد وصف الآن */
  slot?: string;
  capabilities?: PluginCapability[];
  menu?: PluginMenuItem;
  lifecycle?: PluginLifecycle;
}
