/**
 * Barrel export — نقطة دخول واحدة للـ Zustand stores.
 * الثلاثة منفصلين عمدًا (UI / Domain / Context) — البرل هنا للراحة بس،
 * مش دمج للـ state نفسه.
 */

export { useUIStore } from './uiStore';
export { useDomainStore } from './domainStore';
export { useContextStore } from './contextStore';
