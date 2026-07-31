import { Panel } from '@components/shared';
import { REPORT_CATEGORIES } from '../types';
import type { ReportFiltersState } from '../types';

export function ReportFilters({
  filters,
  onChange,
}: {
  filters: ReportFiltersState;
  onChange: (filters: ReportFiltersState) => void;
}) {
  const rowClass = (active: boolean) =>
    `block w-full text-start px-2 py-1.5 rounded-md text-sm cursor-pointer ${
      active ? 'bg-rk-surfaceHover text-rk-accent' : 'text-rk-muted hover:bg-rk-surfaceHover hover:text-rk-text'
    }`;

  return (
    <Panel title="Filters">
      <div>
        <button className={rowClass(filters.category === 'all')} onClick={() => onChange({ category: 'all' })}>
          All Categories
        </button>
        {REPORT_CATEGORIES.map((category) => (
          <button
            key={category}
            className={rowClass(filters.category === category)}
            onClick={() => onChange({ category })}
          >
            {category}
          </button>
        ))}
      </div>
    </Panel>
  );
}
