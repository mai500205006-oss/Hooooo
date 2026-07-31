import type { Case } from './types';

export const mockCases: Case[] = [
  {
    id: 'c1',
    title: 'Case #204 — Login Anomaly',
    status: 'closed',
    summary: 'Login attempts flagged from an unusual IP range, investigated and resolved.',
    createdAt: '2026-07-20T09:00:00.000Z',
    updatedAt: '2026-07-22T16:30:00.000Z',
    evidence: [
      { id: 'e1', title: 'auth.log excerpt', type: 'log', description: 'Failed login attempts from 203.0.113.14.' },
      { id: 'e2', title: 'Login capture.pcapng', type: 'network', description: 'Packet capture around the anomaly window.' },
    ],
    notes: [
      { id: 'n1', title: 'Access log correlation', excerpt: 'Cross-checked flagged IP against known ranges.', createdAt: '2026-07-21T14:05:00.000Z' },
    ],
    timelineEvents: [
      { id: 't1', title: 'Investigation #204 opened', occurredAt: '2026-07-20T09:12:00.000Z' },
      { id: 't6', title: 'Investigation #204 closed', occurredAt: '2026-07-22T16:30:00.000Z' },
    ],
  },
  {
    id: 'c2',
    title: 'Case #211 — Outbound Beacon',
    status: 'in_progress',
    summary: 'Repeated short outbound connections to an unfamiliar external host.',
    createdAt: '2026-07-23T11:00:00.000Z',
    updatedAt: '2026-07-24T09:00:00.000Z',
    evidence: [
      { id: 'e3', title: 'beacon-traffic.pcap', type: 'network', description: 'Periodic TCP sessions every ~60s.' },
      { id: 'e4', title: 'process-list.png', type: 'screenshot', description: 'Suspicious process observed at time of capture.' },
    ],
    notes: [
      { id: 'n2', title: 'Initial triage', excerpt: 'Host isolated pending further review.', createdAt: '2026-07-23T12:30:00.000Z' },
    ],
    timelineEvents: [{ id: 't2', title: 'Unusual outbound connection detected', occurredAt: '2026-07-20T09:15:00.000Z' }],
  },
  {
    id: 'c3',
    title: 'Case #218 — Certificate Expiry',
    status: 'open',
    summary: 'Internal service certificate approaching expiry, renewal tracked as a case.',
    createdAt: '2026-07-21T07:40:00.000Z',
    updatedAt: '2026-07-21T07:40:00.000Z',
    evidence: [{ id: 'e5', title: 'cert-chain.txt', type: 'file', description: 'Exported certificate chain for review.' }],
    notes: [],
    timelineEvents: [{ id: 't3', title: 'Certificate expiry warning', occurredAt: '2026-07-21T07:40:00.000Z' }],
  },
  {
    id: 'c4',
    title: 'Case #142 — SSDP Traffic Spike',
    status: 'archived',
    summary: 'Elevated SSDP discovery broadcasts, reviewed and found benign.',
    createdAt: '2026-07-23T10:20:00.000Z',
    updatedAt: '2026-07-23T18:00:00.000Z',
    evidence: [{ id: 'e6', title: 'ssdp-capture.pcapng', type: 'network', description: 'M-SEARCH broadcasts from local devices.' }],
    notes: [{ id: 'n3', title: 'Device inventory check', excerpt: 'All responding devices matched known inventory.', createdAt: '2026-07-23T17:00:00.000Z' }],
    timelineEvents: [{ id: 't7', title: 'SSDP broadcast spike', occurredAt: '2026-07-23T10:20:00.000Z' }],
  },
];
