export type EvidenceType = 'file' | 'network' | 'log' | 'screenshot' | 'physical';

export interface CustodyEntry {
  id: string;
  action: string;
  handler: string;
  timestamp: string;
}

export interface Attachment {
  id: string;
  name: string;
  sizeLabel: string;
  kind: 'document' | 'image' | 'capture' | 'archive';
}

export interface Evidence {
  id: string;
  title: string;
  type: EvidenceType;
  description: string;
  tags: string[];
  collectedAt: string;
  custody: CustodyEntry[];
  attachments: Attachment[];
}

export interface EvidenceFiltersState {
  type: EvidenceType | 'all';
}

export const DEFAULT_EVIDENCE_FILTERS: EvidenceFiltersState = {
  type: 'all',
};

export const EVIDENCE_TYPES: EvidenceType[] = ['file', 'network', 'log', 'screenshot', 'physical'];

export const TYPE_LABEL: Record<EvidenceType, string> = {
  file: 'File',
  network: 'Network',
  log: 'Log',
  screenshot: 'Screenshot',
  physical: 'Physical',
};

export const TYPE_TONE: Record<EvidenceType, 'success' | 'warning' | 'danger' | 'muted'> = {
  file: 'muted',
  network: 'warning',
  log: 'muted',
  screenshot: 'success',
  physical: 'danger',
};
