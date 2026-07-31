import { Panel, Badge } from '@components/shared';
import type { KpiDatum } from '../types';

export function KpiCards({ kpis }: { kpis: KpiDatum[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {kpis.map((k) => (
        <Panel key={k.id} title={k.label}>
          <div className="text-2xl text-rk-accent font-mono">{k.value}</div>
          <Badge tone={k.delta >= 0 ? 'success' : 'danger'}>
            {k.delta >= 0 ? '+' : ''}
            {k.delta}
          </Badge>
        </Panel>
      ))}
    </div>
  );
}
