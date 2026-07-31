import { Panel } from '@components/shared';
import { THREAT_SEVERITIES, THREAT_SOURCES } from '../types';
import type { ThreatFiltersState, ThreatSeverity, ThreatSource } from '../types';

export function ThreatFilters({
  filters,
  onSeverityChange,
  onSourceChange,
}: {
  filters: ThreatFiltersState;
  onSeverityChange: (severity: ThreatSeverity | 'all') => void;
  onSourceChange: (source: ThreatSource | 'all') => void;
}) {
  const segmentClass = (active: boolean) =>
    `px-2 py-1 rounded-md text-xs cursor-pointer ${
      active ? 'bg-rk-surfaceHover text-rk-accent' : 'text-rk-muted hover:bg-rk-surfaceHover hover:text-rk-text'
    }`;

  return (
    <Panel title="Filters">
      <div className="space-y-4">
        <div>
          <div className="text-xs text-rk-muted mb-1.5">Severity</div>
          <div className="flex flex-wrap gap-1.5">
            <button className={segmentClass(filters.severity === 'all')} onClick={() => onSeverityChange('all')}>
              All
            </button>
            {THREAT_SEVERITIES.map((s) => (
              <button key={s} className={segmentClass(filters.severity === s)} onClick={() => onSeverityChange(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-rk-muted mb-1.5">Source</div>
          <div className="flex flex-wrap gap-1.5">
            <button className={segmentClass(filters.source === 'all')} onClick={() => onSourceChange('all')}>
              All
            </button>
            {THREAT_SOURCES.map((s) => (
              <button key={s} className={segmentClass(filters.source === s)} onClick={() => onSourceChange(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
