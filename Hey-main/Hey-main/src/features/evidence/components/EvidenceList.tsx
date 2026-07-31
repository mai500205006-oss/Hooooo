import { Card, Badge } from '@components/shared';
import { TYPE_TONE, TYPE_LABEL } from '../types';
import type { Evidence } from '../types';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function EvidenceList({
  evidence,
  activeId,
  onSelect,
}: {
  evidence: Evidence[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  if (evidence.length === 0) {
    return <Card className="text-center text-rk-muted text-sm py-8">No evidence matches the current filters.</Card>;
  }

  return (
    <div className="space-y-2">
      {evidence.map((item) => (
        <Card
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`cursor-pointer transition-colors ${
            activeId === item.id ? 'border-rk-accent' : 'hover:border-rk-muted'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-sm text-rk-text truncate">{item.title}</div>
              <div className="text-xs text-rk-muted mt-0.5 line-clamp-2">{item.description}</div>
            </div>
            <Badge tone={TYPE_TONE[item.type]}>{TYPE_LABEL[item.type]}</Badge>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.map((tag) => (
              <Badge key={tag} tone="muted">
                #{tag}
              </Badge>
            ))}
          </div>
          <div className="text-xs text-rk-muted mt-2">Collected {formatDate(item.collectedAt)}</div>
        </Card>
      ))}
    </div>
  );
}
