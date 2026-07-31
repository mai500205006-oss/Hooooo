import { Input } from '@components/shared';
import { TIMELINE_EVENT_TYPES } from '../types';
import type { TimelineEventType } from '../types';

export function TimelineFilterBar({
  query,
  onQueryChange,
  type,
  onTypeChange,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  type: TimelineEventType | 'all';
  onTypeChange: (v: TimelineEventType | 'all') => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-3">
      <Input
        placeholder="Search timeline..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="flex-1"
      />
      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value as TimelineEventType | 'all')}
        className="bg-rk-bg border border-rk-border rounded-md px-2 text-sm text-rk-text"
      >
        <option value="all">All Types</option>
        {TIMELINE_EVENT_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
