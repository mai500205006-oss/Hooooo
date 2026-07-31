import { Card, Badge } from '@components/shared';
import { AUDIT_SEVERITY_TONE } from '../types';
import type { AuditLogEntry } from '../types';

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function AuditLogTable({ entries }: { entries: AuditLogEntry[] }) {
  if (entries.length === 0) {
    return <Card className="text-center text-rk-muted text-sm py-8">No audit entries match the current filters.</Card>;
  }

  return (
    <Card className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-start text-xs text-rk-muted border-b border-rk-border">
            <th className="text-start font-medium py-2 pe-3">Action</th>
            <th className="text-start font-medium py-2 pe-3">Target</th>
            <th className="text-start font-medium py-2 pe-3">Actor</th>
            <th className="text-start font-medium py-2 pe-3">Type</th>
            <th className="text-start font-medium py-2">When</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id} className="border-b border-rk-border last:border-0 hover:bg-rk-surfaceHover">
              <td className="py-2 pe-3 text-rk-text">{entry.action}</td>
              <td className="py-2 pe-3 text-rk-muted">{entry.target}</td>
              <td className="py-2 pe-3 text-rk-muted">{entry.actor}</td>
              <td className="py-2 pe-3">
                <Badge tone={AUDIT_SEVERITY_TONE[entry.severity]}>{entry.type}</Badge>
              </td>
              <td className="py-2 text-rk-muted whitespace-nowrap">{formatDateTime(entry.occurredAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
