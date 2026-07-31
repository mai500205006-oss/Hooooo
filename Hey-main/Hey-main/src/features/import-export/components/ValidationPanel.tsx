import { Panel, Badge } from '@components/shared';
import type { ValidationCheck } from '../types';

export function ValidationPanel({ checks }: { checks: ValidationCheck[] }) {
  return (
    <Panel title="Validation">
      {checks.length === 0 ? (
        <p className="text-rk-muted text-sm">Choose a file to run validation.</p>
      ) : (
        <ul className="space-y-1.5">
          {checks.map((c) => (
            <li key={c.id} className="flex items-center justify-between text-sm">
              <span className="text-rk-text">{c.label}</span>
              <Badge tone={c.passed ? 'success' : 'danger'}>{c.passed ? 'Pass' : 'Fail'}</Badge>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
