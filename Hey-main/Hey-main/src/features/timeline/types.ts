export type TimelineEventType = 'Investigation' | 'Network' | 'Alert' | 'Note' | 'System';

export type TimelineSeverity = 'info' | 'warning' | 'critical';

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  type: TimelineEventType;
  severity: TimelineSeverity;
  occurredAt: string;
}

export interface TimelineFiltersState {
  type: TimelineEventType | 'all';
}

export const DEFAULT_TIMELINE_FILTERS: TimelineFiltersState = {
  type: 'all',
};

export const TIMELINE_EVENT_TYPES: TimelineEventType[] = [
  'Investigation',
  'Network',
  'Alert',
  'Note',
  'System',
];

export const SEVERITY_TONE: Record<TimelineSeverity, 'success' | 'warning' | 'danger' | 'muted'> = {
  info: 'muted',
  warning: 'warning',
  critical: 'danger',
};
