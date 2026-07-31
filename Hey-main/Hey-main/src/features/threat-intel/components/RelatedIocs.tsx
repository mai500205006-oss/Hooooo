import { Panel, Badge } from '@components/shared';
import type { RelatedIocRef } from '../types';

export function RelatedIocs({ iocs }: { iocs: RelatedIocRef[] }) {
  return (
    <Panel title="Related IOCs">
      {iocs.length === 0 ? (
        <p className="text-xs text-rk-muted">No related indicators.</p>
      ) : (
        <ul className="space-y-2">
          {iocs.map((ioc) => (
            <li key={ioc.id} className="flex items-center justify-between text-xs">
              <span className="text-rk-text font-mono truncate">{ioc.value}</span>
              <Badge tone="muted">{ioc.type}</Badge>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
