export interface ModuleOption {
  id: string;
  label: string;
  count: number;
}

export type OperationStatus = 'idle' | 'running' | 'success' | 'error';

export interface BackupEntry {
  id: string;
  name: string;
  date: string;
  size: string;
  modules: number;
}

export interface ImportPreviewItem {
  module: string;
  count: number;
  status: 'ok' | 'warning' | 'conflict';
}

export interface ValidationCheck {
  id: string;
  label: string;
  passed: boolean;
}
