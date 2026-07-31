import type { Investigation, TimelineEvent, Evidence } from './types';

export const mockInvestigations: Investigation[] = [
  { id: 'inv-1', title: 'Suspicious login pattern', status: 'open', updatedAt: '10:32' },
  { id: 'inv-2', title: 'Unusual outbound traffic', status: 'in-progress', updatedAt: '09:15' },
  { id: 'inv-3', title: 'Phishing attempt review', status: 'closed', updatedAt: 'Yesterday' },
];

export const mockTimeline: TimelineEvent[] = [
  { id: 't1', investigationId: 'inv-1', label: 'Investigation opened', time: '08:00' },
  { id: 't2', investigationId: 'inv-1', label: 'Note added', time: '08:45' },
  { id: 't3', investigationId: 'inv-1', label: 'Status changed to open', time: '10:32' },
];

export const mockEvidence: Evidence[] = [
  { id: 'e1', investigationId: 'inv-1', name: 'login_screenshot.png', kind: 'image' },
  { id: 'e2', investigationId: 'inv-1', name: 'notes.txt', kind: 'note' },
];
