import type { ActivityItem, StatItem, SystemStatusItem } from './types';

export const mockStats: StatItem[] = [
  { label: 'Active Investigations', value: 3 },
  { label: 'Open Alerts', value: 12 },
  { label: 'Reports This Week', value: 5 },
];

export const mockActivity: ActivityItem[] = [
  { id: '1', label: 'New alert flagged', time: '10:32' },
  { id: '2', label: 'Investigation #204 updated', time: '09:15' },
  { id: '3', label: 'Report exported', time: 'Yesterday' },
];

export const mockSystemStatus: SystemStatusItem[] = [
  { label: 'Workspace', tone: 'success' },
  { label: 'Local Storage', tone: 'success' },
  { label: 'AI Copilot', tone: 'muted' },
];
