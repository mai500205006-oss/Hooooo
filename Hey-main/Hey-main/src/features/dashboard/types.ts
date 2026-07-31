export interface StatItem {
  label: string;
  value: number;
}

export interface ActivityItem {
  id: string;
  label: string;
  time: string;
}

export type SystemStatusTone = 'success' | 'muted';

export interface SystemStatusItem {
  label: string;
  tone: SystemStatusTone;
}
