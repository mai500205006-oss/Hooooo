import type { EntityType } from '@features/correlation';

export const TYPE_COLOR: Record<EntityType, string> = {
  Case: '#c0392b',
  Investigation: '#c98a2e',
  Evidence: '#2e8b57',
  Note: '#8a8d93',
  'Timeline Event': '#4a90d9',
  IOC: '#b04ac9',
  'Threat Intel': '#e0562e',
  PCAP: '#2eb8b8',
  OSINT: '#d9c14a',
};
