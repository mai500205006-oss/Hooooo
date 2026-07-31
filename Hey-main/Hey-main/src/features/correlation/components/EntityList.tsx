import { Input, Panel, Badge } from '@components/shared';
import { EntityTypeFilter } from './EntityTypeFilter';
import type { Entity, EntityType } from '../types';

export function EntityList({
  entities,
  query,
  onQueryChange,
  typeFilter,
  onTypeFilterChange,
  activeId,
  onSelect,
}: {
  entities: Entity[];
  query: string;
  onQueryChange: (v: string) => void;
  typeFilter: EntityType | 'all';
  onTypeFilterChange: (t: EntityType | 'all') => void;
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <Panel title="Entities">
      <div className="space-y-2 mb-3">
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search entities..."
          className="w-full"
        />
        <EntityTypeFilter active={typeFilter} onChange={onTypeFilterChange} />
      </div>

      {entities.length === 0 ? (
        <p className="text-rk-muted text-sm">No entities match.</p>
      ) : (
        <div className="space-y-1">
          {entities.map((e) => (
            <div
              key={e.id}
              onClick={() => onSelect(e.id)}
              className={`px-3 py-2 rounded-md cursor-pointer flex justify-between items-center ${
                e.id === activeId ? 'bg-rk-surfaceHover' : 'hover:bg-rk-surfaceHover'
              }`}
            >
              <span className="text-sm text-rk-text">{e.title}</span>
              <Badge>{e.type}</Badge>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}
