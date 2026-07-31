import { Badge } from '@components/shared';
import type { OperationStatus } from '../types';

export function ProgressPanel({ status, percent }: { status: OperationStatus; percent: number }) {
  if (status === 'idle') return null;

  return (
    <div className="space-y-2 mt-3">
      <div className="h-2 bg-rk-surfaceHover rounded overflow-hidden">
        <div
          className={`h-full rounded transition-all ${
            status === 'error' ? 'bg-red-600' : 'bg-rk-accent'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-rk-muted">{percent}%</span>
        {status === 'running' && <Badge tone="warning">Running...</Badge>}
        {status === 'success' && <Badge tone="success">Success</Badge>}
        {status === 'error' && <Badge tone="danger">Error — nothing selected</Badge>}
      </div>
    </div>
  );
}
