import { useEffect, useRef, useState } from 'react';
import { Card, Input, Textarea, Button, Badge } from '@components/shared';
import { MarkdownPreview } from './MarkdownPreview';
import type { Note } from '../types';

type ViewMode = 'split' | 'write' | 'preview';
const AUTOSAVE_DELAY_MS = 600;

export function NoteEditor({
  note,
  onChange,
  onDelete,
  onTogglePin,
  onToggleFavorite,
}: {
  note: Note;
  onChange: (patch: Partial<Omit<Note, 'id' | 'createdAt'>>) => void;
  onDelete: () => void;
  onTogglePin: () => void;
  onToggleFavorite: () => void;
}) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [folder, setFolder] = useState(note.folder);
  const [tagsDraft, setTagsDraft] = useState(note.tags.join(', '));
  const [view, setView] = useState<ViewMode>('split');
  const [saveState, setSaveState] = useState<'idle' | 'pending' | 'saved'>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // لما المستخدم يختار Note تانية، الـ Editor بيتزامن مع البيانات الجديدة
  // eslint-disable-next-line react-hooks/exhaustive-deps -- التزامن مقصود بس لما الـ id يتغيّر (تبديل Note)، مش على كل تعديل
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setFolder(note.folder);
    setTagsDraft(note.tags.join(', '));
    setSaveState('idle');
  }, [note.id]);

  const scheduleSave = (patch: Partial<Omit<Note, 'id' | 'createdAt'>>) => {
    setSaveState('pending');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onChange(patch);
      setSaveState('saved');
    }, AUTOSAVE_DELAY_MS);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const tags = tagsDraft
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            scheduleSave({ title: e.target.value });
          }}
          placeholder="Note title..."
          className="flex-1 min-w-[160px] text-base font-medium"
        />
        <div className="flex items-center gap-1">
          <Button variant="ghost" onClick={onToggleFavorite} aria-label="Toggle favorite">
            {note.favorite ? '★ Favorite' : '☆ Favorite'}
          </Button>
          <Button variant="ghost" onClick={onTogglePin} aria-label="Toggle pin">
            {note.pinned ? '📌 Pinned' : '📌 Pin'}
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Input
          value={folder}
          onChange={(e) => {
            setFolder(e.target.value);
            scheduleSave({ folder: e.target.value });
          }}
          placeholder="Folder..."
          className="w-40"
        />
        <Input
          value={tagsDraft}
          onChange={(e) => {
            setTagsDraft(e.target.value);
            scheduleSave({ tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) });
          }}
          placeholder="tags, comma, separated"
          className="flex-1 min-w-[180px]"
        />
        {tags.map((tag) => (
          <Badge key={tag} tone="muted">
            #{tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-1">
          {(['write', 'split', 'preview'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setView(mode)}
              className={`px-2 py-1 rounded-md text-xs capitalize ${
                view === mode ? 'bg-rk-surfaceHover text-rk-accent' : 'text-rk-muted hover:text-rk-text'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
        <span className="text-xs text-rk-muted">
          {saveState === 'pending' && 'Saving…'}
          {saveState === 'saved' && 'Saved'}
        </span>
      </div>

      <div className={`grid gap-3 ${view === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {view !== 'preview' && (
          <Textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              scheduleSave({ content: e.target.value });
            }}
            placeholder="Write in Markdown..."
            className="min-h-[320px] font-mono"
          />
        )}
        {view !== 'write' && (
          <div className="min-h-[320px] border border-rk-border rounded-md p-3 overflow-y-auto bg-rk-bg">
            <MarkdownPreview content={content} />
          </div>
        )}
      </div>
    </Card>
  );
}
