import { type KeyboardEvent } from 'react';
import { Input, Button, Panel } from '@components/shared';
import { OSINT_SOURCES, type OsintSource } from '../types';

interface Props {
  query: string;
  onQueryChange: (v: string) => void;
  sourceFilter: OsintSource | 'all';
  onSourceFilterChange: (v: OsintSource | 'all') => void;
  onSearch: () => void;
  isLoading: boolean;
}

export function SearchPanel({
  query,
  onQueryChange,
  sourceFilter,
  onSourceFilterChange,
  onSearch,
  isLoading,
}: Props) {
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <Panel title="Search">
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            className="flex-1"
            placeholder="IP, domain, email, username, hash…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKey}
            disabled={isLoading}
          />
          <Button onClick={onSearch} disabled={isLoading || query.trim() === ''}>
            {isLoading ? '…' : 'Search'}
          </Button>
        </div>

        <div>
          <p className="text-xs text-rk-muted mb-1.5">Source</p>
          <div className="flex flex-wrap gap-1.5">
            <SourceChip
              label="All"
              active={sourceFilter === 'all'}
              onClick={() => onSourceFilterChange('all')}
            />
            {OSINT_SOURCES.map((s) => (
              <SourceChip
                key={s}
                label={s}
                active={sourceFilter === s}
                onClick={() => onSourceFilterChange(s)}
              />
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function SourceChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
        active
          ? 'bg-rk-accent text-white border-rk-accent'
          : 'bg-transparent text-rk-muted border-rk-border hover:border-rk-accent hover:text-rk-text'
      }`}
    >
      {label}
    </button>
  );
}
