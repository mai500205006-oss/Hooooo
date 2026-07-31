import type { Report } from './types';

export const mockReports: Report[] = [
  {
    id: 'r1',
    title: 'Weekly Network Traffic Summary',
    category: 'Network',
    summary: 'Overview of traffic patterns captured across the local lab network this week.',
    body:
      '# Weekly Network Traffic Summary\n\n' +
      '## Overview\nTraffic volume stayed within normal ranges across 192.168.1.0/24.\n\n' +
      '## Highlights\n- TLS handshakes dominate outbound traffic\n- Periodic SSDP discovery broadcasts from local devices\n- No unexpected external destinations observed\n\n' +
      '## Recommendation\nContinue routine monitoring, no action required.',
    createdAt: '2026-07-20T08:00:00.000Z',
  },
  {
    id: 'r2',
    title: 'Investigation #204 — Findings Report',
    category: 'Investigation',
    summary: 'Consolidated findings from the login anomaly investigation.',
    body:
      '# Investigation #204 — Findings Report\n\n' +
      '## Summary\nLogin attempts flagged from an unusual IP range were cross-checked against access logs.\n\n' +
      '## Timeline\n1. Anomaly detected\n2. Access log correlation performed\n3. Evidence attached to case file\n\n' +
      '## Status\nClosed — no further action needed.',
    createdAt: '2026-07-22T10:30:00.000Z',
  },
  {
    id: 'r3',
    title: 'Plugin Registry Audit',
    category: 'System',
    summary: 'Audit of all registered plugins and their declared slots.',
    body:
      '# Plugin Registry Audit\n\n' +
      '## Registered Plugins\n- dashboard\n- investigations\n- files\n- notes\n- settings\n- pcap\n\n' +
      '## Notes\nAll plugins registered without id collisions. Registry remains descriptive-only.',
    createdAt: '2026-07-18T09:15:00.000Z',
  },
  {
    id: 'r4',
    title: 'TLS Certificate Diagnostics',
    category: 'Security',
    summary: 'Certificate chain review for internal and external endpoints.',
    body:
      '# TLS Certificate Diagnostics\n\n' +
      '## Scope\nReviewed certificate chains observed during recent capture sessions.\n\n' +
      '## Findings\n- All observed certificates valid and unexpired\n- No self-signed certificates on external endpoints\n\n' +
      '## Recommendation\nNo immediate action required; re-check next quarter.',
    createdAt: '2026-07-15T14:00:00.000Z',
  },
  {
    id: 'r5',
    title: 'Data Handling Compliance Checklist',
    category: 'Compliance',
    summary: 'Self-review checklist confirming local-only data storage practices.',
    body:
      '# Data Handling Compliance Checklist\n\n' +
      '## Checklist\n- [x] No backend storage of personal data\n- [x] Local Storage scoped per feature\n- [x] Export/Import available for user data\n\n' +
      '## Conclusion\nCurrent practices align with the personal, local-first philosophy of the workspace.',
    createdAt: '2026-07-10T11:45:00.000Z',
  },
  {
    id: 'r6',
    title: 'SSDP/UPnP Device Profiling',
    category: 'Network',
    summary: 'Profile of devices discovered via SSDP broadcasts on the lab network.',
    body:
      '# SSDP/UPnP Device Profiling\n\n' +
      '## Devices Observed\n- 2 media renderers\n- 1 router (UPnP IGD)\n\n' +
      '## Notes\nNo unexpected devices responding to M-SEARCH queries.',
    createdAt: '2026-07-12T16:20:00.000Z',
  },
];
