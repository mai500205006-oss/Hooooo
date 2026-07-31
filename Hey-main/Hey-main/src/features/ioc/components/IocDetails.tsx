import { Card, Badge } from '@components/shared';
import { TYPE_LABEL, STATUS_LABEL, SEVERITY_TONE, STATUS_TONE } from '../types';
import type { Ioc } from '../types';

export function IocDetails({ ioc }: { ioc: Ioc | null }) {
  if (!ioc) {
    return (
      <Card className="text-center text-rk-muted text-sm py-12">
        Select an indicator from the list to view its details.
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <h2 className="text-base text-rk-text font-mono">{ioc.value}</h2>
        <div className="flex gap-1.5 shrink-0">
          <Badge tone="muted">{TYPE_LABEL[ioc.type]}</Badge>
          <Badge tone={SEVERITY_TONE[ioc.severity]}>{ioc.severity}</Badge>
          <Badge tone={STATUS_TONE[ioc.status]}>{STATUS_LABEL[ioc.status]}</Badge>
        </div>
      </div>

      <p className="text-sm text-rk-text mt-2">{ioc.description}</p>

      <div className="flex flex-wrap gap-1 mt-3">
        {ioc.tags.map((tag) => (
          <Badge key={tag} tone="muted">
            #{tag}
          </Badge>
        ))}
      </div>

      <div className="space-y-1.5 text-xs mt-4">
        <div className="flex justify-between">
          <span className="text-rk-muted">First Seen</span>
          <span className="text-rk-text">{new Date(ioc.firstSeen).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-rk-muted">Last Seen</span>
          <span className="text-rk-text">{new Date(ioc.lastSeen).toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
}
