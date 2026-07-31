import type {
  FavoriteItem,
  ProjectFileNode,
  RecentActivityItem,
  SearchResultItem,
} from './types';

export const mockProjectTree: ProjectFileNode[] = [
  {
    id: 'p1',
    name: 'RED_KING',
    type: 'folder',
    children: [
      { id: 'p1-1', name: 'src', type: 'folder' },
      { id: 'p1-2', name: 'docs', type: 'folder' },
      { id: 'p1-3', name: 'README.md', type: 'file' },
    ],
  },
];

export const mockFavorites: FavoriteItem[] = [
  { id: 'f1', label: 'Dashboard' },
  { id: 'f2', label: 'Investigation #204' },
];

export const mockRecent: RecentActivityItem[] = [
  { id: 'r1', label: 'Opened README.md', time: '11:02' },
  { id: 'r2', label: 'Viewed Investigation #204', time: '10:40' },
  { id: 'r3', label: 'Edited notes.txt', time: '09:58' },
];

export const mockSearchResults: SearchResultItem[] = [
  { id: 's1', label: 'README.md', kind: 'file' },
  { id: 's2', label: 'Investigation #204', kind: 'investigation' },
  { id: 's3', label: 'System Status', kind: 'widget' },
];
