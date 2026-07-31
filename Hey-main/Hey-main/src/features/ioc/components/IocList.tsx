import { Card, Badge } from '@components/shared';
import { TYPE_LABEL, STATUS_LABEL, SEVERITY_TONE, STATUS_TONE } from '../types';
import type { Ioc } from '../types';

export function IocList({
  iocs,
  activeId,
  onSelect,
}: {
  iocs: Ioc[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  if (iocs.length === 0) {
    return <Card className="text-center text-rk-muted text-sm py-8">No IOCs match the current filters.</Card>;
  }

  return (
    <div className="space-y-2">
      {iocs.map((ioc) => (
        <Card
          key={ioc.id}
          onClick={() => onSelect(ioc.id)}
          className={`cursor-pointer transition-colors ${
            activeId === ioc.id ? 'border-rk-accent' : 'hover:border-rk-muted'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-sm text-rk-text font-mono truncate">{ioc.value}</div>
              <div className="text-xs text-rk-muted mt-0.5 line-clamp-2">{ioc.description}</div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <Badge tone="muted">{TYPE_LABEL[ioc.type]}</Badge>
              <Badge tone={SEVERITY_TONE[ioc.severity]}>{ioc.severity}</Badge>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-wrap gap-1">
              {ioc.tags.map((tag) => (
                <Badge key={tag} tone="muted">
                  #{tag}
                </Badge>
              ))}
            </div>
            <Badge tone={STATUS_TONE[ioc.status]}>{STATUS_LABEL[ioc.status]}</Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}
