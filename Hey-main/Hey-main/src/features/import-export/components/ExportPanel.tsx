import { Panel, Button } from '@components/shared';
import { ModuleSelector } from './ModuleSelector';
import { ProgressPanel } from './ProgressPanel';
import type { ModuleOption, OperationStatus } from '../types';

export function ExportPanel({
  modules,
  selectedIds,
  onToggle,
  status,
  percent,
  onExport,
}: {
  modules: ModuleOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  status: OperationStatus;
  percent: number;
  onExport: () => void;
}) {
  return (
    <Panel title="Export Workspace">
      <ModuleSelector modules={modules} selectedIds={selectedIds} onToggle={onToggle} />
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-rk-muted">{selectedIds.length} module(s) selected</span>
        <Button onClick={onExport} disabled={status === 'running'}>
          Export Selected
        </Button>
      </div>
      <ProgressPanel status={status} percent={percent} />
    </Panel>
  );
}
