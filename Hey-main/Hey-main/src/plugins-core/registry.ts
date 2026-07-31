import type { Plugin } from './types';
import { PluginRegistry } from './pluginRegistry';
import { PluginLoader } from './loader';

/**
 * registerPlugin/getPlugins/getPlugin فضلوا بنفس التوقيع والسلوك تمامًا —
 * دلوقتي بس بيستخدموا PluginRegistry + PluginLoader من جوه (Sprint Platform-2).
 */
const registry = new PluginRegistry();
const loader = new PluginLoader(registry);

export function registerPlugin(plugin: Plugin): void {
  loader.load(plugin);
}

export function getPlugins(): Plugin[] {
  return [...loader.list()];
}

export function getPlugin(id: string): Plugin | undefined {
  return registry.get(id);
}
