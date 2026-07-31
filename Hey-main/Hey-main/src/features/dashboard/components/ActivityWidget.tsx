import { Panel } from '@components/shared/Panel';
import { useDashboard } from '../useDashboard';

export function ActivityWidget() {
  const { activity } = useDashboard();

  return (
    <Panel title="Recent Activity">
      <ul className="space-y-2">
        {activity.map((a) => (
          <li key={a.id} className="flex justify-between text-sm">
            <span className="text-rk-text">{a.label}</span>
            <span className="text-rk-muted text-xs">{a.time}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
