import type { SearchCategory } from '../types';

export function CategoryFilterBar({
  categories,
  active,
  onChange,
}: {
  categories: SearchCategory[];
  active: SearchCategory | 'all';
  onChange: (c: SearchCategory | 'all') => void;
}) {
  const options: (SearchCategory | 'all')[] = ['all', ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`text-xs px-2 py-1 rounded border ${
            active === c
              ? 'border-rk-accent text-rk-accent'
              : 'border-rk-border text-rk-muted hover:text-rk-text'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
