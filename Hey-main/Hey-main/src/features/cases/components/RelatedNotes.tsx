import { Panel } from '@components/shared';
import type { CaseNoteRef } from '../types';

export function RelatedNotes({ notes }: { notes: CaseNoteRef[] }) {
  return (
    <Panel title="Related Notes">
      {notes.length === 0 ? (
        <p className="text-xs text-rk-muted">No notes attached.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li key={note.id} className="text-xs">
              <div className="text-rk-text">{note.title}</div>
              <p className="text-rk-muted mt-0.5">{note.excerpt}</p>
              <p className="text-rk-muted mt-0.5">{new Date(note.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
