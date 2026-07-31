import type { Entity, Relationship } from './types';

/**
 * كيانات وعلاقات Mock مستقلة تمامًا — بدون أي import من features تانية،
 * بيحافظ على قاعدة العزل. الهدف هنا إظهار شكل الـ Correlation Graph بصريًا فقط.
 */
export const mockEntities: Entity[] = [
  { id: 'case-12', type: 'Case', title: 'Case #12 — Credential leak', summary: 'Active case bundling related findings.' },
  { id: 'case-07', type: 'Case', title: 'Case #7 — Phishing wave', summary: 'Closed case, kept for reference.' },

  { id: 'inv-1', type: 'Investigation', title: 'Suspicious login pattern', summary: 'Open investigation, status: open.' },
  { id: 'inv-2', type: 'Investigation', title: 'Unusual outbound traffic', summary: 'In-progress investigation.' },

  { id: 'ev-1', type: 'Evidence', title: 'login_screenshot.png', summary: 'Image evidence with chain of custody.' },
  { id: 'ev-2', type: 'Evidence', title: 'notes.txt', summary: 'Text note attached as evidence.' },

  { id: 'note-1', type: 'Note', title: 'First note', summary: 'Local knowledge-hub note.' },

  { id: 'tl-1', type: 'Timeline Event', title: 'Status changed to open', summary: 'Timeline entry at 10:32.' },
  { id: 'tl-2', type: 'Timeline Event', title: 'Investigation opened', summary: 'Timeline entry at 08:00.' },

  { id: 'ioc-1', type: 'IOC', title: '185.23.x.x', summary: 'Malicious IP, medium confidence.' },
  { id: 'ioc-2', type: 'IOC', title: 'evil-domain.example', summary: 'Phishing domain IOC.' },

  { id: 'ti-1', type: 'Threat Intel', title: 'APT-mock-12 campaign', summary: 'Malware family profile.' },

  { id: 'pcap-1', type: 'PCAP', title: 'sample_capture_01.pcap', summary: 'Sample packet capture.' },

  { id: 'osint-1', type: 'OSINT', title: 'username_recon query', summary: 'Saved OSINT search.' },
];

export const mockRelationships: Relationship[] = [
  { id: 'r1', fromId: 'case-12', toId: 'inv-1', type: 'part_of', note: 'Investigation opened under this case.' },
  { id: 'r2', fromId: 'case-12', toId: 'ev-1', type: 'linked_evidence', note: 'Screenshot attached as supporting evidence.' },
  { id: 'r3', fromId: 'case-12', toId: 'note-1', type: 'referenced_in', note: 'Note referenced from the case file.' },
  { id: 'r4', fromId: 'inv-1', toId: 'tl-1', type: 'related_to', note: 'Status change recorded on the timeline.' },
  { id: 'inv-1-tl-2', fromId: 'inv-1', toId: 'tl-2', type: 'related_to', note: 'Opening event recorded on the timeline.' },
  { id: 'r5', fromId: 'inv-1', toId: 'ioc-1', type: 'associated_with', note: 'IP observed during the login attempts.' },
  { id: 'r6', fromId: 'ioc-1', toId: 'ti-1', type: 'mentions', note: 'IP appears in the threat intel profile.' },
  { id: 'r7', fromId: 'inv-2', toId: 'ioc-2', type: 'associated_with', note: 'Domain contacted during outbound traffic.' },
  { id: 'r8', fromId: 'inv-2', toId: 'pcap-1', type: 'linked_evidence', note: 'Traffic captured in this PCAP sample.' },
  { id: 'r9', fromId: 'ioc-2', toId: 'osint-1', type: 'related_to', note: 'Domain surfaced during OSINT recon.' },
  { id: 'r10', fromId: 'case-07', toId: 'inv-2', type: 'part_of', note: 'Phishing wave case links this investigation.' },
  { id: 'r11', fromId: 'ev-2', toId: 'note-1', type: 'referenced_in', note: 'Note content mirrors this evidence text.' },
];
