import type { BackupEntry, ImportPreviewItem, ModuleOption, ValidationCheck } from './types';

export const mockModules: ModuleOption[] = [
  { id: 'cases', label: 'Cases', count: 12 },
  { id: 'investigations', label: 'Investigations', count: 3 },
  { id: 'evidence', label: 'Evidence', count: 34 },
  { id: 'notes', label: 'Notes', count: 21 },
  { id: 'ioc', label: 'IOCs', count: 58 },
  { id: 'threat-intel', label: 'Threat Intel', count: 9 },
  { id: 'timeline', label: 'Timeline', count: 40 },
  { id: 'files', label: 'Files', count: 3 },
  { id: 'pcap', label: 'PCAP Captures', count: 2 },
  { id: 'osint', label: 'OSINT', count: 6 },
  { id: 'reports', label: 'Reports', count: 4 },
  { id: 'correlation', label: 'Correlation Links', count: 12 },
];

export const mockBackupHistory: BackupEntry[] = [
  { id: 'b1', name: 'red_king_backup_2026-07-20.json', date: '2026-07-20 09:12', size: '482 KB', modules: 12 },
  { id: 'b2', name: 'red_king_backup_2026-07-10.json', date: '2026-07-10 21:40', size: '410 KB', modules: 10 },
  { id: 'b3', name: 'red_king_backup_2026-06-28.json', date: '2026-06-28 14:05', size: '355 KB', modules: 9 },
];

export const mockImportPreview: ImportPreviewItem[] = [
  { module: 'Cases', count: 12, status: 'ok' },
  { module: 'Evidence', count: 34, status: 'ok' },
  { module: 'Notes', count: 19, status: 'warning' },
  { module: 'IOCs', count: 58, status: 'conflict' },
];

export const mockValidationChecks: ValidationCheck[] = [
  { id: 'v1', label: 'Schema version matches', passed: true },
  { id: 'v2', label: 'All module IDs unique', passed: true },
  { id: 'v3', label: 'No broken cross-references', passed: true },
  { id: 'v4', label: 'File size within expected range', passed: true },
];
