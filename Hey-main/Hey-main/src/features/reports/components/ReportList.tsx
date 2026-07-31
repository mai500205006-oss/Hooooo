import { Card, Badge } from '@components/shared';
import type { Report, ReportCategory } from '../types';

const CATEGORY_TONE: Record<ReportCategory, 'success' | 'warning' | 'danger' | 'muted'> = {
  Security: 'danger',
  Network: 'muted',
  Investigation: 'warning',
  System: 'muted',
  Compliance: 'success',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function ReportList({
  reports,
  activeId,
  onSelect,
}: {
  reports: Report[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  if (reports.length === 0) {
    return <Card className="text-center text-rk-muted text-sm py-8">No reports match the current filters.</Card>;
  }

  return (
    <div className="space-y-2">
      {reports.map((report) => (
        <Card
          key={report.id}
          onClick={() => onSelect(report.id)}
          className={`cursor-pointer transition-colors ${
            activeId === report.id ? 'border-rk-accent' : 'hover:border-rk-muted'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-sm text-rk-text truncate">{report.title}</div>
              <div className="text-xs text-rk-muted mt-0.5 line-clamp-2">{report.summary}</div>
            </div>
            <Badge tone={CATEGORY_TONE[report.category]}>{report.category}</Badge>
          </div>
          <div className="text-xs text-rk-muted mt-2">{formatDate(report.createdAt)}</div>
        </Card>
      ))}
    </div>
  );
}
