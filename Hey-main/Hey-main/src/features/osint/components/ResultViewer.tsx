import { Card, Badge, Button } from '@components/shared';
import { CONFIDENCE_TONE, SOURCE_TONE, type OsintResult } from '../types';

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function downloadJson(result: OsintResult): void {
  const content = JSON.stringify(result, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `osint-${slug(result.title)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function ResultViewer({ result }: { result: OsintResult | null }) {
  if (!result) {
    return (
      <Card className="text-center text-rk-muted text-sm py-12">
        Select a result from the list to view its details.
      </Card>
    );
  }

  return (
    <Card>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <h2 className="text-base text-rk-text">{result.title}</h2>
          <p className="text-xs text-rk-muted mt-1">{result.summary}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge tone={SOURCE_TONE[result.source]}>{result.source}</Badge>
          <Badge tone={CONFIDENCE_TONE[result.confidence]}>
            Confidence: {result.confidence}
          </Badge>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-3 mb-3 text-xs text-rk-muted">
        <span>
          Target:{' '}
          <span className="text-rk-text font-mono">{result.query}</span>
        </span>
        <span>
          Type:{' '}
          <span className="text-rk-text">{result.targetType}</span>
        </span>
        <span>
          Fetched:{' '}
          <span className="text-rk-text">
            {new Date(result.fetchedAt).toLocaleString()}
          </span>
        </span>
      </div>

      {/* Export */}
      <div className="flex gap-2 mb-3">
        <Button variant="ghost" onClick={() => downloadJson(result)}>
          ⬇ Export JSON
        </Button>
      </div>

      {/* Raw data */}
      <div>
        <p className="text-xs text-rk-muted mb-1">Raw Data</p>
        <pre className="text-sm text-rk-text whitespace-pre-wrap font-mono bg-rk-bg border border-rk-border rounded-md p-3 overflow-x-auto">
          {JSON.stringify(result.data, null, 2)}
        </pre>
      </div>
    </Card>
  );
}
