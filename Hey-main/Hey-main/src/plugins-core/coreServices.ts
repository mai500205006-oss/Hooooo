/**
 * Core Services API — عقود (Interfaces) بس لخدمات المنصّة الأساسية.
 * مفيش أي Implementation ولا Instance هنا — تعريفات بس، عشان الـ Plugins
 * المستقبلية تستقبلها عبر PluginContext.services من غير ما تعتمد على تفاصيل التنفيذ.
 */

/** خدمة التسجيل (Logging) — نفس مستويات الـ logger الموجود في @utils/logger */
export interface LoggerService {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
}

/** خدمة تخزين عامة (Key/Value) — من غير ما تحدد المصدر (Local Storage أو غيره) */
export interface StorageService {
  get(key: string): string | null;
  set(key: string, value: string): void;
  remove(key: string): void;
}

/** خدمة إشعارات للمستخدم داخل الواجهة */
export interface NotificationService {
  notify(message: string, level?: 'info' | 'success' | 'warning' | 'error'): void;
}

/** ناقل أحداث بسيط (Pub/Sub) بين الـ Plugins */
export interface EventBusService {
  on(event: string, handler: (payload?: unknown) => void): void;
  off(event: string, handler: (payload?: unknown) => void): void;
  emit(event: string, payload?: unknown): void;
}

/** خدمة قراءة إعدادات المنصّة (Read-only من منظور الـ Plugin) */
export interface ConfigurationService {
  get<T = unknown>(key: string): T | undefined;
}

/**
 * مجموعة كل الـ Core Services اللي بتتمرر للـ Plugin عبر PluginContext.services —
 * مكان واحد بس بدل ما كل خدمة تتمرر لوحدها.
 */
export interface PluginServices {
  logger: LoggerService;
  storage: StorageService;
  notifications: NotificationService;
  eventBus: EventBusService;
  configuration: ConfigurationService;
}
