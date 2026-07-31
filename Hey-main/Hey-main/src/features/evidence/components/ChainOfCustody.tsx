import { Panel } from '@components/shared';
import type { CustodyEntry } from '../types';

export function ChainOfCustody({ entries }: { entries: CustodyEntry[] }) {
  return (
    <Panel title="Chain of Custody">
      {entries.length === 0 ? (
        <p className="text-xs text-rk-muted">No custody records.</p>
      ) : (
        <ul className="border-s border-rk-border ps-3 space-y-2">
          {entries.map((entry) => (
            <li key={entry.id} className="text-xs">
              <div className="text-rk-text">{entry.action}</div>
              <p className="text-rk-muted mt-0.5">
                {entry.handler} — {new Date(entry.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
