import { Panel, Badge } from '@components/shared';
import type { Evidence } from '../types';

export function EvidencePanel({ items }: { items: Evidence[] }) {
  return (
    <Panel title="Evidence">
      <div className="space-y-2">
        {items.map((ev) => (
          <div key={ev.id} className="flex justify-between items-center text-sm">
            <span className="text-rk-text">{ev.name}</span>
            <Badge>{ev.kind}</Badge>
          </div>
        ))}
        {items.length === 0 && <p className="text-rk-muted text-sm">No evidence attached.</p>}
      </div>
    </Panel>
  );
}
