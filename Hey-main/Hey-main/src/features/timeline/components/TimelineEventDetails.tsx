import { Panel, Badge } from '@components/shared';
import { SEVERITY_TONE } from '../types';
import type { TimelineEvent } from '../types';

export function TimelineEventDetails({ event }: { event: TimelineEvent | null }) {
  if (!event) {
    return (
      <Panel title="Event Details">
        <p className="text-center text-rk-muted text-sm py-8">Select an event from the timeline to see its details.</p>
      </Panel>
    );
  }

  return (
    <Panel title="Event Details">
      <div className="flex items-start justify-between gap-2 mb-3">
        <h2 className="text-sm text-rk-text">{event.title}</h2>
        <Badge tone={SEVERITY_TONE[event.severity]}>{event.severity}</Badge>
      </div>
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-rk-muted">Type</span>
          <Badge tone="muted">{event.type}</Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-rk-muted">Occurred</span>
          <span className="text-rk-text">{new Date(event.occurredAt).toLocaleString()}</span>
        </div>
      </div>
      <p className="text-sm text-rk-text mt-3">{event.description}</p>
    </Panel>
  );
}
