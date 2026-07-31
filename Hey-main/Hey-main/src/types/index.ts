/**
 * أنواع مشتركة على مستوى المشروع كله.
 * كل Feature هيكون ليه ملف types خاص بيه جوه features/<name>/types.ts
 * وهنا بس اللي مشترك عبر أكتر من feature.
 */

// عقد أساسي للـ Plugin — الشكل بس دلوقتي، المنطق الفعلي هيتبني وقت الحاجة
export interface PluginContract {
  id: string;
  name: string;
  version: string;
}

export type ThemeMode = 'dark' | 'light';

export interface SelectedEntity {
  type: string;
  id: string;
  label: string;
}

export {};
