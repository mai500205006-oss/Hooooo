import { Input } from '@components/shared';
import { CASE_STATUSES, STATUS_LABEL } from '../types';
import type { CaseStatus } from '../types';

export function CaseToolbar({
  query,
  onQueryChange,
  status,
  onStatusChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  status: CaseStatus | 'all';
  onStatusChange: (v: CaseStatus | 'all') => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-3">
      <Input
        placeholder="Search cases..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="flex-1"
      />
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as CaseStatus | 'all')}
        className="bg-rk-bg border border-rk-border rounded-md px-2 text-sm text-rk-text"
      >
        <option value="all">All Statuses</option>
        {CASE_STATUSES.map((s) => (
          <option key={s} value={s}>
            {STATUS_LABEL[s]}
          </option>
        ))}
      </select>
    </div>
  );
}
