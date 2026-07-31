import type { DateRange } from '../types';

const OPTIONS: { value: DateRange; label: string }[] = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: 'all', label: 'All time' },
];

export function DateRangeSelector({
  value,
  onChange,
}: {
  value: DateRange;
  onChange: (v: DateRange) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as DateRange)}
      className="bg-rk-bg border border-rk-border rounded-md px-2 py-1.5 text-sm text-rk-text"
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
