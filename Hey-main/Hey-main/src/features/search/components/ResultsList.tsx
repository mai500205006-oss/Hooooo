import { Panel } from '@components/shared';
import { ResultItem } from './ResultItem';
import type { SearchResult } from '../types';

export function ResultsList({
  results,
  onOpen,
}: {
  results: SearchResult[];
  onOpen: (path: string) => void;
}) {
  return (
    <Panel title={`Results (${results.length})`}>
      {results.length === 0 ? (
        <p className="text-rk-muted text-sm">No results match your search.</p>
      ) : (
        <div className="space-y-1">
          {results.map((r) => (
            <ResultItem key={r.id} result={r} onOpen={() => onOpen(r.path)} />
          ))}
        </div>
      )}
    </Panel>
  );
}
