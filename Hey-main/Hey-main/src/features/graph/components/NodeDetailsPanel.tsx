import { Panel, Badge } from '@components/shared';
import { TYPE_COLOR } from './typeColors';
import type { GraphNode } from '../types';

export function NodeDetailsPanel({
  node,
  neighborCount,
}: {
  node: GraphNode | null;
  neighborCount: number;
}) {
  if (!node) {
    return (
      <Panel title="Node Details">
        <p className="text-rk-muted text-sm">اختر node من الرسم أو من القائمة لعرض تفاصيله.</p>
      </Panel>
    );
  }

  return (
    <Panel title="Node Details">
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full border-2"
            style={{ borderColor: TYPE_COLOR[node.entity.type] }}
          />
          <span className="text-rk-text">{node.entity.title}</span>
        </div>
        <Badge>{node.entity.type}</Badge>
        <p className="text-rk-muted text-xs border-t border-rk-border pt-3">{node.entity.summary}</p>
        <p className="text-xs text-rk-muted">
          Connections: <span className="text-rk-text">{neighborCount}</span>
        </p>
      </div>
    </Panel>
  );
}
