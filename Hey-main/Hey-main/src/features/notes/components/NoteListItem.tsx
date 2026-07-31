import { Badge } from '@components/shared';
import type { Note } from '../types';

function snippet(content: string): string {
  const plain = content.replace(/[#*`>[\]()-]/g, '').trim();
  return plain.length > 80 ? `${plain.slice(0, 80)}…` : plain || 'No content yet.';
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function NoteListItem({
  note,
  active,
  onSelect,
  onTogglePin,
  onToggleFavorite,
}: {
  note: Note;
  active: boolean;
  onSelect: () => void;
  onTogglePin: () => void;
  onToggleFavorite: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`px-3 py-2 rounded-md cursor-pointer ${
        active ? 'bg-rk-surfaceHover' : 'hover:bg-rk-surfaceHover'
      }`}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <div className="text-sm text-rk-text truncate">
            {note.pinned && <span title="Pinned">📌 </span>}
            {note.title || 'Untitled Note'}
          </div>
          <div className="text-xs text-rk-muted mt-0.5">{snippet(note.content)}</div>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            aria-label="Toggle favorite"
            className={note.favorite ? 'text-rk-accent' : 'text-rk-muted hover:text-rk-text'}
          >
            {note.favorite ? '★' : '☆'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin();
            }}
            aria-label="Toggle pin"
            className={note.pinned ? 'text-rk-accent' : 'text-rk-muted hover:text-rk-text'}
          >
            📌
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mt-1.5">
        <div className="flex flex-wrap gap-1">
          {note.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} tone="muted">
              #{tag}
            </Badge>
          ))}
        </div>
        <span className="text-xs text-rk-muted shrink-0">{formatDate(note.updatedAt)}</span>
      </div>
    </div>
  );
}
