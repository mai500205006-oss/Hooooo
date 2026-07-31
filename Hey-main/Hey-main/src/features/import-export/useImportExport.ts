import { useEffect, useMemo, useState } from 'react';
import { logger } from '@utils/logger';
import {
  mockBackupHistory,
  mockImportPreview,
  mockModules,
  mockValidationChecks,
} from './data.mock';
import type { BackupEntry, ImportPreviewItem, ModuleOption, OperationStatus, ValidationCheck } from './types';

const MODULES_STORAGE_KEY = 'red_king.import_export.modules.v1';
const BACKUP_HISTORY_STORAGE_KEY = 'red_king.import_export.backup_history.v1';
const IMPORT_PREVIEW_STORAGE_KEY = 'red_king.import_export.import_preview.v1';
const VALIDATION_CHECKS_STORAGE_KEY = 'red_king.import_export.validation_checks.v1';
const PROGRESS_STEP_MS = 180;

function loadModules(): ModuleOption[] {
  try {
    const raw = localStorage.getItem(MODULES_STORAGE_KEY);
    if (!raw) return mockModules;
    const parsed = JSON.parse(raw) as ModuleOption[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockModules;
  } catch (error) {
    logger.warn('Failed to read modules from Local Storage — falling back to mock data', { error }, 'import-export');
    return mockModules;
  }
}

function saveModules(modules: ModuleOption[]): void {
  try {
    localStorage.setItem(MODULES_STORAGE_KEY, JSON.stringify(modules));
  } catch (error) {
    logger.error('Failed to persist modules to Local Storage', error, 'import-export');
  }
}

function loadBackupHistory(): BackupEntry[] {
  try {
    const raw = localStorage.getItem(BACKUP_HISTORY_STORAGE_KEY);
    if (!raw) return mockBackupHistory;
    const parsed = JSON.parse(raw) as BackupEntry[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockBackupHistory;
  } catch (error) {
    logger.warn('Failed to read backup history from Local Storage — falling back to mock data', { error }, 'import-export');
    return mockBackupHistory;
  }
}

function saveBackupHistory(backupHistory: BackupEntry[]): void {
  try {
    localStorage.setItem(BACKUP_HISTORY_STORAGE_KEY, JSON.stringify(backupHistory));
  } catch (error) {
    logger.error('Failed to persist backup history to Local Storage', error, 'import-export');
  }
}

function loadImportPreview(): ImportPreviewItem[] {
  try {
    const raw = localStorage.getItem(IMPORT_PREVIEW_STORAGE_KEY);
    if (!raw) return mockImportPreview;
    const parsed = JSON.parse(raw) as ImportPreviewItem[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockImportPreview;
  } catch (error) {
    logger.warn('Failed to read import preview from Local Storage — falling back to mock data', { error }, 'import-export');
    return mockImportPreview;
  }
}

function loadValidationChecks(): ValidationCheck[] {
  try {
    const raw = localStorage.getItem(VALIDATION_CHECKS_STORAGE_KEY);
    if (!raw) return mockValidationChecks;
    const parsed = JSON.parse(raw) as ValidationCheck[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockValidationChecks;
  } catch (error) {
    logger.warn('Failed to read validation checks from Local Storage — falling back to mock data', { error }, 'import-export');
    return mockValidationChecks;
  }
}

function useSimulatedProgress() {
  const [status, setStatus] = useState<OperationStatus>('idle');
  const [percent, setPercent] = useState(0);

  const run = (shouldFail = false) => {
    setStatus('running');
    setPercent(0);
    let current = 0;
    const timer = window.setInterval(() => {
      current += 10 + Math.round(Math.random() * 15);
      if (current >= 100) {
        current = 100;
        window.clearInterval(timer);
        setStatus(shouldFail ? 'error' : 'success');
      }
      setPercent(current);
    }, PROGRESS_STEP_MS);
  };

  const reset = () => {
    setStatus('idle');
    setPercent(0);
  };

  return { status, percent, run, reset };
}

export function useImportExport() {
  const [isLoading, setIsLoading] = useState(true);
  const [modules, setModules] = useState<ModuleOption[]>([]);
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([]);
  const [backupHistory, setBackupHistory] = useState<BackupEntry[]>([]);
  const [importPreview, setImportPreview] = useState<ImportPreviewItem[]>([]);
  const [validationBase, setValidationBase] = useState<ValidationCheck[]>([]);
  const [importFileName, setImportFileName] = useState<string | null>(null);
  const [restoreTargetId, setRestoreTargetId] = useState<string | null>(null);

  const exportOp = useSimulatedProgress();
  const importOp = useSimulatedProgress();

  useEffect(() => {
    const loadedModules = loadModules();
    setModules(loadedModules);
    setSelectedModuleIds(loadedModules.map((m) => m.id));
    setBackupHistory(loadBackupHistory());
    setImportPreview(loadImportPreview());
    setValidationBase(loadValidationChecks());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    saveModules(modules);
  }, [modules, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    saveBackupHistory(backupHistory);
  }, [backupHistory, isLoading]);

  const toggleModule = (id: string) => {
    setSelectedModuleIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  };

  const startExport = () => exportOp.run(selectedModuleIds.length === 0);

  const chooseMockFile = () => {
    setImportFileName('red_king_backup_2026-07-24.json');
    importOp.reset();
  };

  const startImport = () => {
    if (!importFileName) return;
    importOp.run(false);
  };

  const conflictCount = useMemo(
    () => importPreview.filter((p) => p.status === 'conflict').length,
    [importPreview]
  );

  const validationChecks = useMemo(
    () =>
      validationBase.map((c) =>
        c.id === 'v3' && conflictCount > 0 ? { ...c, passed: false } : c
      ),
    [validationBase, conflictCount]
  );

  const requestRestore = (id: string) => setRestoreTargetId(id);
  const cancelRestore = () => setRestoreTargetId(null);
  const confirmRestore = () => {
    setRestoreTargetId(null);
    importOp.run(false);
  };

  return {
    isLoading,
    modules,
    selectedModuleIds,
    toggleModule,
    exportStatus: exportOp.status,
    exportPercent: exportOp.percent,
    startExport,
    resetExport: exportOp.reset,
    importFileName,
    chooseMockFile,
    importPreview,
    validationChecks,
    importStatus: importOp.status,
    importPercent: importOp.percent,
    startImport,
    resetImport: importOp.reset,
    backupHistory,
    restoreTargetId,
    requestRestore,
    cancelRestore,
    confirmRestore,
  };
}
