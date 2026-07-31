import { Panel, Button, Badge } from '@components/shared';
import { ImportPreviewTable } from './ImportPreviewTable';
import { ProgressPanel } from './ProgressPanel';
import type { ImportPreviewItem, OperationStatus } from '../types';

export function ImportPanel({
  fileName,
  onChooseFile,
  preview,
  status,
  percent,
  onImport,
}: {
  fileName: string | null;
  onChooseFile: () => void;
  preview: ImportPreviewItem[];
  status: OperationStatus;
  percent: number;
  onImport: () => void;
}) {
  return (
    <Panel title="Import Workspace">
      <div className="flex items-center gap-2 mb-3">
        <Button variant="ghost" onClick={onChooseFile}>
          Choose Backup File
        </Button>
        {fileName ? (
          <Badge tone="success">{fileName}</Badge>
        ) : (
          <span className="text-xs text-rk-muted">No file selected</span>
        )}
      </div>

      {fileName ? (
        <>
          <ImportPreviewTable items={preview} />
          <div className="mt-3 flex justify-end">
            <Button onClick={onImport} disabled={status === 'running'}>
              Import Now
            </Button>
          </div>
          <ProgressPanel status={status} percent={percent} />
        </>
      ) : (
        <p className="text-rk-muted text-sm">اختر ملف backup لعرض المعاينة قبل الاستيراد.</p>
      )}
    </Panel>
  );
}
