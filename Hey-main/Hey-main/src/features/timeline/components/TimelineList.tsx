import { Card, Badge } from '@components/shared';
import { SEVERITY_TONE } from '../types';
import type { TimelineEvent } from '../types';

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function TimelineList({
  events,
  activeId,
  onSelect,
}: {
  events: TimelineEvent[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  if (events.length === 0) {
    return <Card className="text-center text-rk-muted text-sm py-8">No events match the current filters.</Card>;
  }

  return (
    <div className="border-s border-rk-border ps-4 space-y-3">
      {events.map((event) => (
        <div key={event.id} className="relative">
          <span className="absolute -start-[1.35rem] top-2 w-2 h-2 rounded-full bg-rk-accent" />
          <Card
            onClick={() => onSelect(event.id)}
            className={`cursor-pointer transition-colors ${
              activeId === event.id ? 'border-rk-accent' : 'hover:border-rk-muted'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-sm text-rk-text truncate">{event.title}</div>
                <div className="text-xs text-rk-muted mt-0.5 line-clamp-2">{event.description}</div>
              </div>
              <Badge tone={SEVERITY_TONE[event.severity]}>{event.type}</Badge>
            </div>
            <div className="text-xs text-rk-muted mt-2">{formatDateTime(event.occurredAt)}</div>
          </Card>
        </div>
      ))}
    </div>
  );
}
