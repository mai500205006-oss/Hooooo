import { Card, Badge } from '@components/shared';
import { STATUS_TONE, STATUS_LABEL } from '../types';
import type { Case } from '../types';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function CaseList({
  cases,
  activeId,
  onSelect,
}: {
  cases: Case[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  if (cases.length === 0) {
    return <Card className="text-center text-rk-muted text-sm py-8">No cases match the current filters.</Card>;
  }

  return (
    <div className="space-y-2">
      {cases.map((c) => (
        <Card
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`cursor-pointer transition-colors ${
            activeId === c.id ? 'border-rk-accent' : 'hover:border-rk-muted'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-sm text-rk-text truncate">{c.title}</div>
              <div className="text-xs text-rk-muted mt-0.5 line-clamp-2">{c.summary}</div>
            </div>
            <Badge tone={STATUS_TONE[c.status]}>{STATUS_LABEL[c.status]}</Badge>
          </div>
          <div className="text-xs text-rk-muted mt-2">Updated {formatDate(c.updatedAt)}</div>
        </Card>
      ))}
    </div>
  );
}
