import { Card, Badge, LoadingSpinner } from '@components/shared';
import { CONFIDENCE_TONE, SOURCE_TONE, type OsintResult } from '../types';

interface Props {
  results: OsintResult[];
  activeId: string | null;
  onSelect: (id: string) => void;
  isLoading: boolean;
  hasSearched: boolean;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function ResultsList({ results, activeId, onSelect, isLoading, hasSearched }: Props) {
  if (isLoading) {
    return <LoadingSpinner label="Querying sources…" />;
  }

  if (!hasSearched) {
    return (
      <Card className="text-center text-rk-muted text-sm py-8">
        Enter a query above to start an OSINT search.
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card className="text-center text-rk-muted text-sm py-8">
        No results found. Try a different query or source filter.
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {results.map((result) => (
        <Card
          key={result.id}
          onClick={() => onSelect(result.id)}
          className={`cursor-pointer transition-colors ${
            activeId === result.id ? 'border-rk-accent' : 'hover:border-rk-muted'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-sm text-rk-text truncate">{result.title}</div>
              <div className="text-xs text-rk-muted mt-0.5 line-clamp-2">{result.summary}</div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <Badge tone={SOURCE_TONE[result.source]}>{result.source}</Badge>
              <Badge tone={CONFIDENCE_TONE[result.confidence]}>{result.confidence}</Badge>
            </div>
          </div>
          <div className="text-xs text-rk-muted mt-2">{formatDate(result.fetchedAt)}</div>
        </Card>
      ))}
    </div>
  );
}
