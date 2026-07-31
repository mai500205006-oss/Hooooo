export type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical';

export type ThreatConfidence = 'low' | 'medium' | 'high';

export type ThreatSource = 'OSINT' | 'Internal' | 'Community Feed' | 'Vendor Feed' | 'Honeypot';

export interface ThreatActor {
  name: string;
  aliases: string[];
  description: string;
}

export interface MalwareFamily {
  name: string;
  description: string;
}

export interface RelatedIocRef {
  id: string;
  value: string;
  type: 'ip' | 'domain' | 'url' | 'hash' | 'email';
}

export interface ThreatEntry {
  id: string;
  title: string;
  summary: string;
  severity: ThreatSeverity;
  confidence: ThreatConfidence;
  source: ThreatSource;
  actor: ThreatActor;
  malwareFamily: MalwareFamily;
  relatedIocs: RelatedIocRef[];
  publishedAt: string;
}

export interface ThreatFiltersState {
  severity: ThreatSeverity | 'all';
  source: ThreatSource | 'all';
}

export const DEFAULT_THREAT_FILTERS: ThreatFiltersState = {
  severity: 'all',
  source: 'all',
};

export const THREAT_SEVERITIES: ThreatSeverity[] = ['low', 'medium', 'high', 'critical'];
export const THREAT_SOURCES: ThreatSource[] = ['OSINT', 'Internal', 'Community Feed', 'Vendor Feed', 'Honeypot'];

export const SEVERITY_TONE: Record<ThreatSeverity, 'success' | 'warning' | 'danger' | 'muted'> = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
  critical: 'danger',
};

export const CONFIDENCE_TONE: Record<ThreatConfidence, 'success' | 'warning' | 'danger' | 'muted'> = {
  high: 'success',
  medium: 'warning',
  low: 'muted',
};
