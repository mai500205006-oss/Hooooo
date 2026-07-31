import { Panel } from '@components/shared';
import { IOC_TYPES, IOC_STATUSES, TYPE_LABEL, STATUS_LABEL } from '../types';
import type { IocFiltersState, IocStatus, IocType } from '../types';

export function IocFilters({
  filters,
  onTypeChange,
  onStatusChange,
}: {
  filters: IocFiltersState;
  onTypeChange: (type: IocType | 'all') => void;
  onStatusChange: (status: IocStatus | 'all') => void;
}) {
  const segmentClass = (active: boolean) =>
    `px-2 py-1 rounded-md text-xs cursor-pointer ${
      active ? 'bg-rk-surfaceHover text-rk-accent' : 'text-rk-muted hover:bg-rk-surfaceHover hover:text-rk-text'
    }`;

  return (
    <Panel title="Filters">
      <div className="space-y-4">
        <div>
          <div className="text-xs text-rk-muted mb-1.5">Type</div>
          <div className="flex flex-wrap gap-1.5">
            <button className={segmentClass(filters.type === 'all')} onClick={() => onTypeChange('all')}>
              All
            </button>
            {IOC_TYPES.map((t) => (
              <button key={t} className={segmentClass(filters.type === t)} onClick={() => onTypeChange(t)}>
                {TYPE_LABEL[t]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-rk-muted mb-1.5">Status</div>
          <div className="flex flex-wrap gap-1.5">
            <button className={segmentClass(filters.status === 'all')} onClick={() => onStatusChange('all')}>
              All
            </button>
            {IOC_STATUSES.map((s) => (
              <button key={s} className={segmentClass(filters.status === s)} onClick={() => onStatusChange(s)}>
                {STATUS_LABEL[s]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
