export type OsintSource =
  | 'Whois'
  | 'DNS'
  | 'GeoIP'
  | 'Shodan'
  | 'CertLog'
  | 'PasteBin'
  | 'Social';

export type OsintTargetType = 'ip' | 'domain' | 'email' | 'username' | 'hash';

export interface OsintResult {
  id: string;
  query: string;
  targetType: OsintTargetType;
  source: OsintSource;
  title: string;
  summary: string;
  data: Record<string, unknown>;
  confidence: 'high' | 'medium' | 'low';
  fetchedAt: string;
}

export interface QueryHistoryEntry {
  id: string;
  query: string;
  source: OsintSource | 'all';
  resultsCount: number;
  searchedAt: string;
}

export const OSINT_SOURCES: OsintSource[] = [
  'Whois',
  'DNS',
  'GeoIP',
  'Shodan',
  'CertLog',
  'PasteBin',
  'Social',
];

export const CONFIDENCE_TONE = {
  high: 'success',
  medium: 'warning',
  low: 'danger',
} as const;

export const SOURCE_TONE: Record<OsintSource, 'success' | 'warning' | 'danger' | 'muted'> = {
  Whois: 'muted',
  DNS: 'muted',
  GeoIP: 'muted',
  Shodan: 'danger',
  CertLog: 'success',
  PasteBin: 'warning',
  Social: 'muted',
};
