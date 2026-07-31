/**
 * Config module — مصدر واحد لبيانات التطبيق وقراءة الـ environment variables.
 * لسه مفيش Backend حقيقي (راجع .env.example)، لكن أي متغيّر مستقبلي
 * (VITE_AI_API_KEY, VITE_API_BASE_URL...) هيتقرأ من هنا بس، مش متفرق في الكود.
 */

export const APP_NAME = 'RED KING';
export const APP_VERSION = '0.1.0';

export const env = {
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;

/**
 * قراءة آمنة لمتغير بيئة اختياري (VITE_* فقط، حسب قيود Vite).
 * بترجع fallback لو المتغير مش موجود — بدل ما الكود يفجّر أو يفترض.
 */
export function getEnvVar(key: string, fallback = ''): string {
  const value = import.meta.env[key as keyof ImportMetaEnv];
  return typeof value === 'string' && value.length > 0 ? value : fallback;
}

export const config = {
  appName: APP_NAME,
  appVersion: APP_VERSION,
  env,
} as const;
