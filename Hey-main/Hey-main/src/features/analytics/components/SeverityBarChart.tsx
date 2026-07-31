import { Panel } from '@components/shared';
import type { SeverityDatum } from '../types';

const COLOR: Record<SeverityDatum['label'], string> = {
  Critical: '#c0392b',
  High: '#e0562e',
  Medium: '#c98a2e',
  Low: '#2e8b57',
  Info: '#4a90d9',
};

export function SeverityBarChart({ data }: { data: SeverityDatum[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <Panel title="Severity Distribution">
      {data.length === 0 ? (
        <p className="text-rk-muted text-sm">No data.</p>
      ) : (
        <div className="space-y-2">
          {data.map((d) => (
            <div key={d.label} className="flex items-center gap-2">
              <span className="w-16 text-xs text-rk-muted shrink-0">{d.label}</span>
              <div className="flex-1 h-3 bg-rk-surfaceHover rounded overflow-hidden">
                <div
                  className="h-full rounded"
                  style={{ width: `${(d.value / max) * 100}%`, backgroundColor: COLOR[d.label] }}
                />
              </div>
              <span className="w-6 text-xs text-rk-text text-end">{d.value}</span>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}
