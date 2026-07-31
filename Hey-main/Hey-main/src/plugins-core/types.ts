/**
 * تعريفات الـ Plugin العامة — بتستخدم عقد الـ Plugin الرسمي (contract.ts).
 * الاسم `Plugin` اتسيب زي ما هو للتوافق الخلفي مع كل الـ Features الحالية
 * اللي بتعمل import له من هنا.
 */

import type { PluginManifest } from './contract';

/** Alias للتوافق الخلفي — Plugin دلوقتي هو نفسه PluginManifest بالعقد الرسمي */
export type Plugin = PluginManifest;
