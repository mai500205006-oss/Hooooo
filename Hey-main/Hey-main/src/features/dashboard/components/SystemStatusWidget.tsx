import { Panel, Badge } from '@components/shared';
import { useDashboard } from '../useDashboard';

export function SystemStatusWidget() {
  const { systemStatus } = useDashboard();

  return (
    <Panel title="System Status">
      <div className="space-y-2">
        {systemStatus.map((s) => (
          <div key={s.label} className="flex justify-between items-center text-sm">
            <span className="text-rk-text">{s.label}</span>
            <Badge tone={s.tone}>{s.tone === 'success' ? 'OK' : 'Idle'}</Badge>
          </div>
        ))}
      </div>
    </Panel>
  );
}
