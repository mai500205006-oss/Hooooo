import { Panel } from '@components/shared/Panel';
import { useWorkspace } from '../useWorkspace';

export function RecentActivityPanel() {
  const { recentActivity } = useWorkspace();

  return (
    <Panel title="Recent Activity">
      <ul className="space-y-2 text-sm">
        {recentActivity.map((r) => (
          <li key={r.id} className="flex justify-between">
            <span className="text-rk-text">{r.label}</span>
            <span className="text-rk-muted text-xs">{r.time}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
