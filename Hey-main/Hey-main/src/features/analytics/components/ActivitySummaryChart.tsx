import { Panel } from '@components/shared';
import type { ActivityDatum } from '../types';

export function ActivitySummaryChart({ data }: { data: ActivityDatum[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <Panel title="Timeline Activity Summary">
      {data.length === 0 ? (
        <p className="text-rk-muted text-sm">No activity recorded.</p>
      ) : (
        <div className="flex items-end gap-3 h-32">
          {data.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-rk-text">{d.value}</span>
              <div
                className="w-full bg-rk-accent-dim rounded-t"
                style={{ height: `${(d.value / max) * 80}px`, backgroundColor: '#c0392b55' }}
              />
              <span className="text-[10px] text-rk-muted">{d.day}</span>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}
