import { useMemo, useState } from 'react';
import { PageHeader, LoadingSpinner, ErrorBoundary } from '@components/shared';
import { registerPlugin } from '@plugins-core';
import { useDomainStore } from '@store/domainStore';
import { useNotes } from './useNotes';
import { NotesToolbar } from './components/NotesToolbar';
import { NotesFilterPanel } from './components/NotesFilterPanel';
import { NoteList } from './components/NoteList';
import { NoteEditor } from './components/NoteEditor';
import { EmptyState } from './components/EmptyState';
import type { NotesFilter, NotesSortMode } from './types';

registerPlugin({ id: 'notes', name: 'Knowledge Hub', version: '0.1.0', slot: 'main' });

export function NotesPage() {
  // UI state — محلي على الصفحة، مش مشترك عبر التطبيق
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<NotesSortMode>('newest');
  const [filter, setFilter] = useState<NotesFilter>({ kind: 'all' });

  // Domain state — الـ Note النشطة، جزء من الـ domain store العام زي activeInvestigationId
  const activeNoteId = useDomainStore((s) => s.activeNoteId);
  const setActiveNote = useDomainStore((s) => s.setActiveNote);

  const { notes, isLoading, createNote, updateNote, deleteNote, togglePin, toggleFavorite } = useNotes();

  const folders = useMemo(
    () => Array.from(new Set(notes.map((n) => n.folder))).sort((a, b) => a.localeCompare(b)),
    [notes]
  );
  const tags = useMemo(
    () => Array.from(new Set(notes.flatMap((n) => n.tags))).sort((a, b) => a.localeCompare(b)),
    [notes]
  );

  const filtered = useMemo(() => {
    return notes.filter((n) => {
      const matchesQuery =
        query.trim() === '' ||
        n.title.toLowerCase().includes(query.toLowerCase()) ||
        n.content.toLowerCase().includes(query.toLowerCase()) ||
        n.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));

      const matchesFilter =
        filter.kind === 'all' ||
        (filter.kind === 'favorites' && n.favorite) ||
        (filter.kind === 'folder' && n.folder === filter.folder) ||
        (filter.kind === 'tag' && n.tags.includes(filter.tag));

      return matchesQuery && matchesFilter;
    });
  }, [notes, query, filter]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    switch (sort) {
      case 'oldest':
        return copy.sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
      case 'az':
        return copy.sort((a, b) => a.title.localeCompare(b.title));
      case 'newest':
      default:
        return copy.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    }
  }, [filtered, sort]);

  const activeNote = notes.find((n) => n.id === activeNoteId) ?? null;

  const handleCreate = () => {
    const note = createNote();
    setActiveNote(note.id);
  };

  const handleDelete = (id: string) => {
    deleteNote(id);
    if (activeNoteId === id) setActiveNote(null);
  };

  return (
    <div>
      <PageHeader title="Notes" subtitle="Knowledge Hub — your personal notes space" />

      {isLoading ? (
        <LoadingSpinner label="Loading notes..." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1 space-y-4">
            <NotesFilterPanel folders={folders} tags={tags} filter={filter} onFilterChange={setFilter} />
          </div>

          <div className="lg:col-span-1 space-y-3">
            <NotesToolbar
              query={query}
              onQueryChange={setQuery}
              sort={sort}
              onSortChange={setSort}
              onCreate={handleCreate}
            />
            <NoteList
              notes={sorted}
              activeId={activeNoteId}
              onSelect={setActiveNote}
              onTogglePin={togglePin}
              onToggleFavorite={toggleFavorite}
            />
          </div>

          <div className="lg:col-span-2">
            <ErrorBoundary featureName="notes-editor">
              {activeNote ? (
                <NoteEditor
                  note={activeNote}
                  onChange={(patch) => updateNote(activeNote.id, patch)}
                  onDelete={() => handleDelete(activeNote.id)}
                  onTogglePin={() => togglePin(activeNote.id)}
                  onToggleFavorite={() => toggleFavorite(activeNote.id)}
                />
              ) : (
                <EmptyState
                  title="No note selected."
                  hint="Pick a note from the list, or create a new one."
                  actionLabel="+ New Note"
                  onAction={handleCreate}
                />
              )}
            </ErrorBoundary>
          </div>
        </div>
      )}
    </div>
  );
}
