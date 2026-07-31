import { Panel } from '@components/shared/Panel';
import type { TimelineEvent } from '../types';

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <Panel title="Timeline">
      <ul className="border-s border-rk-border ms-1 space-y-3">
        {events.map((e) => (
          <li key={e.id} className="ps-3 relative">
            <span className="absolute -start-[5px] top-1.5 w-2 h-2 rounded-full bg-rk-accent" />
            <div className="text-sm text-rk-text">{e.label}</div>
            <div className="text-xs text-rk-muted">{e.time}</div>
          </li>
        ))}
        {events.length === 0 && <p className="text-rk-muted text-sm">No timeline events.</p>}
      </ul>
    </Panel>
  );
}
