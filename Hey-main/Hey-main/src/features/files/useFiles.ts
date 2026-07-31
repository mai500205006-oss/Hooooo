import { useEffect, useState } from 'react';
import { logger } from '@utils/logger';
import { mockFiles, mockRecentFileIds } from './data.mock';
import type { WorkspaceFile } from './types';

const STORAGE_KEY = 'red_king.files.v1';

interface FilesState {
  files: WorkspaceFile[];
  recentFileIds: string[];
}

function defaultState(): FilesState {
  return {
    files: mockFiles,
    recentFileIds: mockRecentFileIds,
  };
}

function loadState(): FilesState {
  const seed = defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed;

    const parsed = JSON.parse(raw) as Partial<FilesState>;
    return {
      files: Array.isArray(parsed.files) && parsed.files.length > 0 ? parsed.files : seed.files,
      recentFileIds: Array.isArray(parsed.recentFileIds) ? parsed.recentFileIds : seed.recentFileIds,
    };
  } catch (error) {
    logger.warn('Failed to read files from Local Storage — falling back to defaults', { error }, 'files');
    return seed;
  }
}

function saveState(state: FilesState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    logger.error('Failed to persist files to Local Storage', error, 'files');
  }
}

/**
 * Hook مسؤول عن الـ Domain Data الخاصة بميزة Files:
 * تحميل + حفظ تلقائي في Local Storage، بنفس نمط useNotes.ts —
 * مفيش Backend ولا API — Local Storage بس، حسب فلسفة المشروع الحالية.
 */
export function useFiles() {
  const [state, setState] = useState<FilesState>(loadState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setState(loadState());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    saveState(state);
  }, [state, isLoading]);

  return {
    files: state.files,
    recentFileIds: state.recentFileIds,
    isLoading,
  };
}
