import type { ModuleOption } from '../types';

export function ModuleSelector({
  modules,
  selectedIds,
  onToggle,
}: {
  modules: ModuleOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  if (modules.length === 0) {
    return <p className="text-rk-muted text-sm">No modules available.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-1.5">
      {modules.map((m) => (
        <label
          key={m.id}
          className="flex items-center gap-2 text-sm text-rk-text px-2 py-1.5 rounded-md hover:bg-rk-surfaceHover cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selectedIds.includes(m.id)}
            onChange={() => onToggle(m.id)}
            className="accent-rk-accent"
          />
          {m.label} <span className="text-rk-muted text-xs">({m.count})</span>
        </label>
      ))}
    </div>
  );
}
