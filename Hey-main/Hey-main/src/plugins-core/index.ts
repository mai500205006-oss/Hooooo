/**
 * Barrel export — نقطة دخول واحدة لنظام الـ Plugins.
 */

export { registerPlugin, getPlugins, getPlugin } from './registry';
export { PluginLoader } from './loader';
export { PluginRegistry } from './pluginRegistry';
export { validatePluginManifest } from './validation';
export type { PluginValidationResult } from './validation';
export type { Plugin } from './types';
export type {
  PluginManifest,
  PluginMetadata,
  PluginCapability,
  PluginMenuItem,
  PluginLifecycle,
  PluginContext,
} from './contract';
export type {
  LoggerService,
  StorageService,
  NotificationService,
  EventBusService,
  ConfigurationService,
  PluginServices,
} from './coreServices';
export { definePlugin, createPluginContext, isSupportedApiVersion, isSdkCompatible, SDK_VERSION, SUPPORTED_API_VERSIONS } from './sdk';
export type { PluginApiVersion } from './sdk';
export { defineAdapter, PluginAdapterRegistry, loadThroughAdapter } from './adapter';
export type { PluginAdapter } from './adapter';
