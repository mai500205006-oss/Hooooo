export type InvestigationStatus = 'open' | 'in-progress' | 'closed';

export interface Investigation {
  id: string;
  title: string;
  status: InvestigationStatus;
  updatedAt: string;
}

export interface TimelineEvent {
  id: string;
  investigationId: string;
  label: string;
  time: string;
}

export interface Evidence {
  id: string;
  investigationId: string;
  name: string;
  kind: string;
}
