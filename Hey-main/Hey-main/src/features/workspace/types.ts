export interface ProjectFileNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: ProjectFileNode[];
}

export interface FavoriteItem {
  id: string;
  label: string;
}

export interface RecentActivityItem {
  id: string;
  label: string;
  time: string;
}

export interface SearchResultItem {
  id: string;
  label: string;
  kind: string;
}

export interface WorkspaceNoteItem {
  id: string;
  text: string;
  createdAt: string;
}
