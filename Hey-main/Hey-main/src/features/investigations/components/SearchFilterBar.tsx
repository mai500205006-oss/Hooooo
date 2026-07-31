import { Input } from '@components/shared/Input';
import type { InvestigationStatus } from '../types';

const STATUSES: (InvestigationStatus | 'all')[] = ['all', 'open', 'in-progress', 'closed'];

export function SearchFilterBar({
  query,
  onQueryChange,
  status,
  onStatusChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  status: InvestigationStatus | 'all';
  onStatusChange: (v: InvestigationStatus | 'all') => void;
}) {
  return (
    <div className="flex gap-2 mb-3">
      <Input
        placeholder="Search investigations..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="flex-1"
      />
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as InvestigationStatus | 'all')}
        className="bg-rk-bg border border-rk-border rounded-md px-2 text-sm text-rk-text"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
