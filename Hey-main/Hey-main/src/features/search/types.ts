export type SearchCategory =
  | 'Investigation'
  | 'Note'
  | 'Case'
  | 'Evidence'
  | 'IOC'
  | 'Threat Intel'
  | 'OSINT'
  | 'Report'
  | 'Timeline'
  | 'File'
  | 'PCAP';

export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  category: SearchCategory;
  path: string;
}
