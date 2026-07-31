import { Panel } from '@components/shared/Panel';
import { useDashboard } from '../useDashboard';

export function StatsWidget() {
  const { stats } = useDashboard();

  return (
    <Panel title="Quick Stats">
      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-2xl text-rk-accent font-mono">{s.value}</div>
            <div className="text-xs text-rk-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
