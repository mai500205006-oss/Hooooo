import { Panel } from '@components/shared';
import type { CaseTimelineRef } from '../types';

export function RelatedTimelineEvents({ events }: { events: CaseTimelineRef[] }) {
  return (
    <Panel title="Related Timeline Events">
      {events.length === 0 ? (
        <p className="text-xs text-rk-muted">No timeline events linked.</p>
      ) : (
        <ul className="border-s border-rk-border ps-3 space-y-2">
          {events.map((event) => (
            <li key={event.id} className="text-xs">
              <div className="text-rk-text">{event.title}</div>
              <p className="text-rk-muted mt-0.5">{new Date(event.occurredAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
