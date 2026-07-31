export type IocType = 'ip' | 'domain' | 'url' | 'hash' | 'email';

export type IocSeverity = 'low' | 'medium' | 'high' | 'critical';

export type IocStatus = 'active' | 'blocked' | 'expired' | 'investigating';

export interface Ioc {
  id: string;
  value: string;
  type: IocType;
  severity: IocSeverity;
  status: IocStatus;
  description: string;
  tags: string[];
  firstSeen: string;
  lastSeen: string;
}

export interface IocFiltersState {
  type: IocType | 'all';
  status: IocStatus | 'all';
}

export const DEFAULT_IOC_FILTERS: IocFiltersState = {
  type: 'all',
  status: 'all',
};

export const IOC_TYPES: IocType[] = ['ip', 'domain', 'url', 'hash', 'email'];
export const IOC_STATUSES: IocStatus[] = ['active', 'blocked', 'expired', 'investigating'];

export const TYPE_LABEL: Record<IocType, string> = {
  ip: 'IP',
  domain: 'Domain',
  url: 'URL',
  hash: 'Hash',
  email: 'Email',
};

export const STATUS_LABEL: Record<IocStatus, string> = {
  active: 'Active',
  blocked: 'Blocked',
  expired: 'Expired',
  investigating: 'Investigating',
};

export const SEVERITY_TONE: Record<IocSeverity, 'success' | 'warning' | 'danger' | 'muted'> = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
  critical: 'danger',
};

export const STATUS_TONE: Record<IocStatus, 'success' | 'warning' | 'danger' | 'muted'> = {
  active: 'danger',
  blocked: 'success',
  expired: 'muted',
  investigating: 'warning',
};
