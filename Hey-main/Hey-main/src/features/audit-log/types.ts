export type AuditActionType = 'Create' | 'Update' | 'Delete' | 'Login' | 'Export' | 'System';

export type AuditSeverity = 'info' | 'warning' | 'critical';

export interface AuditLogEntry {
  id: string;
  action: string;
  actor: string;
  type: AuditActionType;
  severity: AuditSeverity;
  target: string;
  occurredAt: string;
}

export interface AuditLogFiltersState {
  type: AuditActionType | 'all';
}

export const DEFAULT_AUDIT_FILTERS: AuditLogFiltersState = {
  type: 'all',
};

export const AUDIT_ACTION_TYPES: AuditActionType[] = [
  'Create',
  'Update',
  'Delete',
  'Login',
  'Export',
  'System',
];

export const AUDIT_SEVERITY_TONE: Record<AuditSeverity, 'success' | 'warning' | 'danger' | 'muted'> = {
  info: 'muted',
  warning: 'warning',
  critical: 'danger',
};
