import { useFiles } from '../useFiles';

export function FileTabs({
  openIds,
  activeId,
  onSelect,
  onClose,
}: {
  openIds: string[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
}) {
  const { files } = useFiles();

  if (openIds.length === 0) return null;

  return (
    <div className="flex border-b border-rk-border mb-3">
      {openIds.map((id) => {
        const file = files.find((f) => f.id === id);
        if (!file) return null;
        const active = id === activeId;
        return (
          <div
            key={id}
            onClick={() => onSelect(id)}
            className={`px-3 py-1.5 text-sm cursor-pointer border-e border-rk-border flex items-center gap-2 ${
              active ? 'bg-rk-surfaceHover text-rk-accent' : 'text-rk-muted hover:text-rk-text'
            }`}
          >
            {file.name}
            <span
              onClick={(e) => {
                e.stopPropagation();
                onClose(id);
              }}
              className="hover:text-rk-accent"
            >
              ×
            </span>
          </div>
        );
      })}
    </div>
  );
}
