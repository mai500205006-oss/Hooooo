import { Panel } from '@components/shared';
import type { ActivityItem } from '../types';

export function RecentActivityPanel({ items }: { items: ActivityItem[] }) {
  return (
    <Panel title="Recent Activity">
      {items.length === 0 ? (
        <p className="text-rk-muted text-sm">No recent activity.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {items.map((a) => (
            <li key={a.id} className="flex justify-between">
              <span className="text-rk-text">{a.label}</span>
              <span className="text-rk-muted text-xs shrink-0 ms-2">{a.time}</span>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
