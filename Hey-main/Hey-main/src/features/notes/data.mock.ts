import type { Note } from './types';

/**
 * بيانات ابتدائية — بتتحمّل مرة واحدة بس لو الـ Local Storage فاضي.
 * بعد كده كل التعديلات بتتحفظ في Local Storage مباشرة.
 */
export const mockNotes: Note[] = [
  {
    id: 'n1',
    title: 'Welcome to Knowledge Hub',
    content:
      '# Welcome\n\nThis is your personal notes space.\n\n- Write in **Markdown**\n- Pin important notes\n- Organize with folders and tags',
    folder: 'Inbox',
    tags: ['guide'],
    pinned: true,
    favorite: false,
    createdAt: '2026-07-20T09:00:00.000Z',
    updatedAt: '2026-07-20T09:00:00.000Z',
  },
  {
    id: 'n2',
    title: 'Investigation #204 — Notes',
    content:
      '## Findings\n\n1. Login pattern flagged from unusual IP range\n2. Cross-checked with `access_log.csv`\n\n> Needs follow-up with evidence panel.',
    folder: 'Investigations',
    tags: ['investigation', 'follow-up'],
    pinned: false,
    favorite: true,
    createdAt: '2026-07-21T10:15:00.000Z',
    updatedAt: '2026-07-22T08:30:00.000Z',
  },
  {
    id: 'n3',
    title: 'Weekly Review Template',
    content:
      '### This Week\n\n- [ ] Review open investigations\n- [ ] Export reports\n- [ ] Clean up files workspace',
    folder: 'Templates',
    tags: ['template', 'weekly'],
    pinned: false,
    favorite: false,
    createdAt: '2026-07-19T12:00:00.000Z',
    updatedAt: '2026-07-19T12:00:00.000Z',
  },
];
