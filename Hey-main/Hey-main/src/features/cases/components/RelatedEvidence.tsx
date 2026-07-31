import { Panel, Badge } from '@components/shared';
import type { CaseEvidence } from '../types';

export function RelatedEvidence({ evidence }: { evidence: CaseEvidence[] }) {
  return (
    <Panel title="Related Evidence">
      {evidence.length === 0 ? (
        <p className="text-xs text-rk-muted">No evidence attached.</p>
      ) : (
        <ul className="space-y-2">
          {evidence.map((item) => (
            <li key={item.id} className="text-xs">
              <div className="flex items-center gap-2">
                <Badge tone="muted">{item.type}</Badge>
                <span className="text-rk-text">{item.title}</span>
              </div>
              <p className="text-rk-muted mt-0.5">{item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
