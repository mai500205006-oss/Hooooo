export interface Note {
  id: string;
  title: string;
  /** المحتوى بصيغة Markdown */
  content: string;
  folder: string;
  tags: string[];
  pinned: boolean;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export type NotesSortMode = 'newest' | 'oldest' | 'az';

export type NotesFilter =
  | { kind: 'all' }
  | { kind: 'favorites' }
  | { kind: 'folder'; folder: string }
  | { kind: 'tag'; tag: string };

export const DEFAULT_FOLDER = 'Inbox';
