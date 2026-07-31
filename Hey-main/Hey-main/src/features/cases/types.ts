export type CaseStatus = 'open' | 'in_progress' | 'closed' | 'archived';

export interface CaseEvidence {
  id: string;
  title: string;
  type: 'file' | 'network' | 'log' | 'screenshot';
  description: string;
}

export interface CaseNoteRef {
  id: string;
  title: string;
  excerpt: string;
  createdAt: string;
}

export interface CaseTimelineRef {
  id: string;
  title: string;
  occurredAt: string;
}

export interface Case {
  id: string;
  title: string;
  status: CaseStatus;
  summary: string;
  createdAt: string;
  updatedAt: string;
  evidence: CaseEvidence[];
  notes: CaseNoteRef[];
  timelineEvents: CaseTimelineRef[];
}

export interface CaseFiltersState {
  status: CaseStatus | 'all';
}

export const DEFAULT_CASE_FILTERS: CaseFiltersState = {
  status: 'all',
};

export const CASE_STATUSES: CaseStatus[] = ['open', 'in_progress', 'closed', 'archived'];

export const STATUS_LABEL: Record<CaseStatus, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  closed: 'Closed',
  archived: 'Archived',
};

export const STATUS_TONE: Record<CaseStatus, 'success' | 'warning' | 'danger' | 'muted'> = {
  open: 'warning',
  in_progress: 'danger',
  closed: 'success',
  archived: 'muted',
};
