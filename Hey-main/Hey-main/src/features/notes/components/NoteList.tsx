import { Panel } from '@components/shared';
import { NoteListItem } from './NoteListItem';
import { EmptyState } from './EmptyState';
import type { Note } from '../types';

export function NoteList({
  notes,
  activeId,
  onSelect,
  onTogglePin,
  onToggleFavorite,
}: {
  notes: Note[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onTogglePin: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}) {
  if (notes.length === 0) {
    return (
      <Panel title="Notes">
        <EmptyState title="No notes match this view." hint="Try a different filter or search term." />
      </Panel>
    );
  }

  const pinned = notes.filter((n) => n.pinned);
  const rest = notes.filter((n) => !n.pinned);

  return (
    <Panel title={`Notes (${notes.length})`} className="max-h-[70vh] overflow-y-auto">
      <div className="space-y-1">
        {pinned.map((note) => (
          <NoteListItem
            key={note.id}
            note={note}
            active={note.id === activeId}
            onSelect={() => onSelect(note.id)}
            onTogglePin={() => onTogglePin(note.id)}
            onToggleFavorite={() => onToggleFavorite(note.id)}
          />
        ))}
        {pinned.length > 0 && rest.length > 0 && <div className="border-t border-rk-border my-2" />}
        {rest.map((note) => (
          <NoteListItem
            key={note.id}
            note={note}
            active={note.id === activeId}
            onSelect={() => onSelect(note.id)}
            onTogglePin={() => onTogglePin(note.id)}
            onToggleFavorite={() => onToggleFavorite(note.id)}
          />
        ))}
      </div>
    </Panel>
  );
}
