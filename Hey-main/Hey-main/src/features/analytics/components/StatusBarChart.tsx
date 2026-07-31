import { Panel } from '@components/shared';
import type { StatusDatum } from '../types';

const COLOR: Record<StatusDatum['label'], string> = {
  Open: '#c98a2e',
  'In Progress': '#4a90d9',
  Closed: '#2e8b57',
};

export function StatusBarChart({ data }: { data: StatusDatum[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;

  return (
    <Panel title="Status Distribution">
      {data.length === 0 ? (
        <p className="text-rk-muted text-sm">No data.</p>
      ) : (
        <>
          <div className="h-4 rounded overflow-hidden flex">
            {data.map((d) => (
              <div
                key={d.label}
                style={{ width: `${(d.value / total) * 100}%`, backgroundColor: COLOR[d.label] }}
                title={`${d.label}: ${d.value}`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            {data.map((d) => (
              <div key={d.label} className="flex items-center gap-1.5 text-xs text-rk-muted">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: COLOR[d.label] }}
                />
                {d.label} ({d.value})
              </div>
            ))}
          </div>
        </>
      )}
    </Panel>
  );
}
