import { Card, Badge } from '@components/shared';
import { SEVERITY_TONE, CONFIDENCE_TONE } from '../types';
import type { ThreatEntry } from '../types';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function ThreatFeedList({
  feed,
  activeId,
  onSelect,
}: {
  feed: ThreatEntry[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  if (feed.length === 0) {
    return <Card className="text-center text-rk-muted text-sm py-8">No threats match the current filters.</Card>;
  }

  return (
    <div className="space-y-2">
      {feed.map((entry) => (
        <Card
          key={entry.id}
          onClick={() => onSelect(entry.id)}
          className={`cursor-pointer transition-colors ${
            activeId === entry.id ? 'border-rk-accent' : 'hover:border-rk-muted'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-sm text-rk-text truncate">{entry.title}</div>
              <div className="text-xs text-rk-muted mt-0.5 line-clamp-2">{entry.summary}</div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <Badge tone={SEVERITY_TONE[entry.severity]}>{entry.severity}</Badge>
              <Badge tone={CONFIDENCE_TONE[entry.confidence]}>{entry.confidence} conf.</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-rk-muted">
            <span>{entry.source}</span>
            <span>{formatDate(entry.publishedAt)}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
