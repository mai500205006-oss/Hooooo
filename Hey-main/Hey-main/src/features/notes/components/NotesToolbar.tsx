import { Input, Button } from '@components/shared';
import type { NotesSortMode } from '../types';

const SORT_OPTIONS: { value: NotesSortMode; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'az', label: 'A-Z' },
];

export function NotesToolbar({
  query,
  onQueryChange,
  sort,
  onSortChange,
  onCreate,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  sort: NotesSortMode;
  onSortChange: (v: NotesSortMode) => void;
  onCreate: () => void;
}) {
  return (
    <div className="flex gap-2 mb-3">
      <Input
        placeholder="Search notes..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="flex-1"
      />
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as NotesSortMode)}
        className="bg-rk-bg border border-rk-border rounded-md px-2 text-sm text-rk-text"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <Button onClick={onCreate}>+ New</Button>
    </div>
  );
}
