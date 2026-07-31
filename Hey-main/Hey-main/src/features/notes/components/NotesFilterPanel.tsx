import { Panel, Badge } from '@components/shared';
import type { NotesFilter } from '../types';

function isSameFilter(a: NotesFilter, b: NotesFilter): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === 'folder' && b.kind === 'folder') return a.folder === b.folder;
  if (a.kind === 'tag' && b.kind === 'tag') return a.tag === b.tag;
  return true;
}

export function NotesFilterPanel({
  folders,
  tags,
  filter,
  onFilterChange,
}: {
  folders: string[];
  tags: string[];
  filter: NotesFilter;
  onFilterChange: (filter: NotesFilter) => void;
}) {
  const rowClass = (active: boolean) =>
    `block w-full text-start px-2 py-1.5 rounded-md text-sm cursor-pointer ${
      active ? 'bg-rk-surfaceHover text-rk-accent' : 'text-rk-muted hover:bg-rk-surfaceHover hover:text-rk-text'
    }`;

  return (
    <Panel title="Filters">
      <div className="space-y-3">
        <div>
          <button
            className={rowClass(isSameFilter(filter, { kind: 'all' }))}
            onClick={() => onFilterChange({ kind: 'all' })}
          >
            All Notes
          </button>
          <button
            className={rowClass(isSameFilter(filter, { kind: 'favorites' }))}
            onClick={() => onFilterChange({ kind: 'favorites' })}
          >
            ★ Favorites
          </button>
        </div>

        {folders.length > 0 && (
          <div>
            <div className="text-xs text-rk-muted mb-1 px-2">Folders</div>
            {folders.map((folder) => (
              <button
                key={folder}
                className={rowClass(isSameFilter(filter, { kind: 'folder', folder }))}
                onClick={() => onFilterChange({ kind: 'folder', folder })}
              >
                {folder}
              </button>
            ))}
          </div>
        )}

        {tags.length > 0 && (
          <div>
            <div className="text-xs text-rk-muted mb-1 px-2">Tags</div>
            <div className="flex flex-wrap gap-1.5 px-2">
              {tags.map((tag) => (
                <span key={tag} onClick={() => onFilterChange({ kind: 'tag', tag })} className="cursor-pointer">
                  <Badge tone={isSameFilter(filter, { kind: 'tag', tag }) ? 'success' : 'muted'}>#{tag}</Badge>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}
