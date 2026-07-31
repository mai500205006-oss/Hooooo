import { Input } from '@components/shared';
import type { ReportSortMode } from '../types';

const SORT_OPTIONS: { value: ReportSortMode; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'az', label: 'A-Z' },
];

export function ReportToolbar({
  query,
  onQueryChange,
  sort,
  onSortChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  sort: ReportSortMode;
  onSortChange: (v: ReportSortMode) => void;
}) {
  return (
    <div className="flex gap-2 mb-3">
      <Input
        placeholder="Search reports..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="flex-1"
      />
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as ReportSortMode)}
        className="bg-rk-bg border border-rk-border rounded-md px-2 text-sm text-rk-text"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
