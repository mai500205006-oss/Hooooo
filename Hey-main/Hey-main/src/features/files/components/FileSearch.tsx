import { useState, useMemo } from 'react';
import { Panel, Input } from '@components/shared';
import { useFiles } from '../useFiles';

export function FileSearch({ onOpen }: { onOpen: (id: string) => void }) {
  const { files } = useFiles();
  const [query, setQuery] = useState('');

  const results = useMemo(
    () => files.filter((f) => f.path.toLowerCase().includes(query.toLowerCase())),
    [files, query]
  );

  return (
    <Panel title="File Search">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search files..."
        className="w-full mb-3"
      />
      <ul className="space-y-1 text-sm">
        {results.map((f) => (
          <li
            key={f.id}
            onClick={() => onOpen(f.id)}
            className="text-rk-text hover:text-rk-accent cursor-pointer"
          >
            {f.path}
          </li>
        ))}
        {query && results.length === 0 && <li className="text-rk-muted text-xs">No matches.</li>}
      </ul>
    </Panel>
  );
}
