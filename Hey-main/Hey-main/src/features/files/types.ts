export type FileKind = 'code' | 'text' | 'json';

export interface WorkspaceFile {
  id: string;
  name: string;
  path: string;
  kind: FileKind;
  content: string;
}
