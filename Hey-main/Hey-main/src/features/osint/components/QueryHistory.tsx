import { Card, Button, Panel } from '@components/shared';
import type { QueryHistoryEntry } from '../types';

interface Props {
  history: QueryHistoryEntry[];
  onReplay: (entry: QueryHistoryEntry) => void;
  onClear: () => void;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function QueryHistory({ history, onReplay, onClear }: Props) {
  if (history.length === 0) {
    return (
      <Panel title="Search History">
        <p className="text-xs text-rk-muted">No searches yet.</p>
      </Panel>
    );
  }

  return (
    <Panel title="Search History">
      <div className="flex justify-end mb-2">
        <Button variant="ghost" onClick={onClear} className="text-xs py-0.5 px-2">
          Clear
        </Button>
      </div>
      <div className="space-y-1.5">
        {history.map((entry) => (
          <Card
            key={entry.id}
            onClick={() => onReplay(entry)}
            className="cursor-pointer p-2 hover:border-rk-muted transition-colors"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-rk-text font-mono truncate">{entry.query}</span>
              <span className="text-xs text-rk-muted shrink-0">
                {entry.resultsCount}
              </span>
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-xs text-rk-muted">{entry.source}</span>
              <span className="text-xs text-rk-muted">{formatTime(entry.searchedAt)}</span>
            </div>
          </Card>
        ))}
      </div>
    </Panel>
  );
}
