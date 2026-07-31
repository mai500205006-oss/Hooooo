import type { ActivityDatum, ActivityItem, KpiDatum, SeverityDatum, StatusDatum, TagDatum } from './types';

export const mockKpis: KpiDatum[] = [
  { id: 'cases', label: 'Cases', value: 12, delta: 2 },
  { id: 'evidence', label: 'Evidence', value: 34, delta: 5 },
  { id: 'iocs', label: 'IOCs', value: 58, delta: -3 },
  { id: 'threats', label: 'Threats', value: 9, delta: 1 },
  { id: 'notes', label: 'Notes', value: 21, delta: 4 },
];

export const mockSeverity: SeverityDatum[] = [
  { label: 'Critical', value: 4 },
  { label: 'High', value: 11 },
  { label: 'Medium', value: 19 },
  { label: 'Low', value: 15 },
  { label: 'Info', value: 9 },
];

export const mockStatus: StatusDatum[] = [
  { label: 'Open', value: 14 },
  { label: 'In Progress', value: 8 },
  { label: 'Closed', value: 22 },
];

export const mockActivity: ActivityDatum[] = [
  { day: 'Sat', value: 3 },
  { day: 'Sun', value: 5 },
  { day: 'Mon', value: 8 },
  { day: 'Tue', value: 4 },
  { day: 'Wed', value: 9 },
  { day: 'Thu', value: 6 },
  { day: 'Fri', value: 2 },
];

export const mockTopTags: TagDatum[] = [
  { tag: 'phishing', count: 14 },
  { tag: 'credential-leak', count: 10 },
  { tag: 'malware', count: 8 },
  { tag: 'recon', count: 6 },
  { tag: 'internal', count: 5 },
];

export const mockRecentActivity: ActivityItem[] = [
  { id: 'a1', label: 'New IOC added — evil-domain.example', time: '10:32' },
  { id: 'a2', label: 'Case #12 updated', time: '09:58' },
  { id: 'a3', label: 'Evidence attached to Case #12', time: '09:15' },
  { id: 'a4', label: 'Threat intel profile reviewed', time: 'Yesterday' },
  { id: 'a5', label: 'Note tagged with "phishing"', time: 'Yesterday' },
];
