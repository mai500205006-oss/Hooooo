import { PageHeader, LoadingSpinner } from '@components/shared';
import { registerPlugin } from '@plugins-core';
import { useImportExport } from './useImportExport';
import { ExportPanel } from './components/ExportPanel';
import { ImportPanel } from './components/ImportPanel';
import { ValidationPanel } from './components/ValidationPanel';
import { BackupHistoryPanel } from './components/BackupHistoryPanel';

registerPlugin({ id: 'import-export', name: 'Import / Export Center', version: '0.1.0', slot: 'main' });

export function ImportExportPage() {
  const {
    isLoading,
    modules,
    selectedModuleIds,
    toggleModule,
    exportStatus,
    exportPercent,
    startExport,
    importFileName,
    chooseMockFile,
    importPreview,
    validationChecks,
    importStatus,
    importPercent,
    startImport,
    backupHistory,
    restoreTargetId,
    requestRestore,
    cancelRestore,
    confirmRestore,
  } = useImportExport();

  return (
    <div>
      <PageHeader title="Import / Export Center" subtitle="Backup, restore, and move your workspace" />

      {isLoading ? (
        <LoadingSpinner label="Loading workspace modules..." />
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ExportPanel
              modules={modules}
              selectedIds={selectedModuleIds}
              onToggle={toggleModule}
              status={exportStatus}
              percent={exportPercent}
              onExport={startExport}
            />
            <ImportPanel
              fileName={importFileName}
              onChooseFile={chooseMockFile}
              preview={importPreview}
              status={importStatus}
              percent={importPercent}
              onImport={startImport}
            />
          </div>

          <ValidationPanel checks={importFileName ? validationChecks : []} />

          <BackupHistoryPanel
            history={backupHistory}
            restoreTargetId={restoreTargetId}
            onRequestRestore={requestRestore}
            onCancelRestore={cancelRestore}
            onConfirmRestore={confirmRestore}
          />
        </div>
      )}
    </div>
  );
}
