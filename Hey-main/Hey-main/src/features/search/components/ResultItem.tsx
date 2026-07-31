import { Badge } from '@components/shared';
import type { SearchResult } from '../types';

export function ResultItem({ result, onOpen }: { result: SearchResult; onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      className="px-3 py-2 rounded-md hover:bg-rk-surfaceHover cursor-pointer flex justify-between items-center"
    >
      <div>
        <div className="text-sm text-rk-text">{result.title}</div>
        <div className="text-xs text-rk-muted">{result.snippet}</div>
      </div>
      <Badge>{result.category}</Badge>
    </div>
  );
}
