import type { SearchResult } from './types';

/**
 * فهرس ثابت يمثّل عناوين موجودة في features تانية، بدون ما يستورد
 * أي حاجة داخلية منها — بيحافظ على قاعدة العزل بين الـ features
 * (كل تواصل حقيقي مستقبلي هيبقى عن طريق public API لو احتجناه).
 */
export const mockSearchIndex: SearchResult[] = [
  { id: 's1', title: 'Suspicious login pattern', snippet: 'Investigation — open', category: 'Investigation', path: '/investigations' },
  { id: 's2', title: 'Unusual outbound traffic', snippet: 'Investigation — in-progress', category: 'Investigation', path: '/investigations' },
  { id: 's3', title: 'First note — مجرد مثال محلي', snippet: 'Note in default folder', category: 'Note', path: '/notes' },
  { id: 's4', title: 'Case #12 — Credential leak', snippet: 'Linked evidence + timeline', category: 'Case', path: '/cases' },
  { id: 's5', title: 'login_screenshot.png', snippet: 'Evidence — image, chain of custody logged', category: 'Evidence', path: '/evidence' },
  { id: 's6', title: '185.23.x.x', snippet: 'IOC — malicious IP, medium confidence', category: 'IOC', path: '/ioc' },
  { id: 's7', title: 'APT-mock-12 campaign', snippet: 'Threat Intel — malware family profile', category: 'Threat Intel', path: '/threat-intel' },
  { id: 's8', title: 'username_recon query', snippet: 'OSINT — saved search history', category: 'OSINT', path: '/osint' },
  { id: 's9', title: 'Weekly Summary Report', snippet: 'Report — exported PDF (mock)', category: 'Report', path: '/reports' },
  { id: 's10', title: 'Status changed to open', snippet: 'Timeline event — 10:32', category: 'Timeline', path: '/timeline' },
  { id: 's11', title: 'config.json', snippet: 'File — src/config.json', category: 'File', path: '/files' },
  { id: 's12', title: 'sample_capture_01.pcap', snippet: 'PCAP — sample capture', category: 'PCAP', path: '/pcap' },
];
