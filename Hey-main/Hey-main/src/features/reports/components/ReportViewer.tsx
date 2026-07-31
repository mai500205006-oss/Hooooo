import { Card, Badge, Button } from '@components/shared';
import { exportReportAsJson, exportReportAsMarkdown } from '../exporters';
import type { Report } from '../types';

export function ReportViewer({ report }: { report: Report | null }) {
  if (!report) {
    return (
      <Card className="text-center text-rk-muted text-sm py-12">
        Select a report from the list to view its details.
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <h2 className="text-base text-rk-text">{report.title}</h2>
          <p className="text-xs text-rk-muted mt-1">{new Date(report.createdAt).toLocaleString()}</p>
        </div>
        <Badge tone="muted">{report.category}</Badge>
      </div>

      <div className="flex gap-2 mb-3">
        <Button variant="ghost" onClick={() => exportReportAsJson(report)}>
          ⬇ Export JSON
        </Button>
        <Button variant="ghost" onClick={() => exportReportAsMarkdown(report)}>
          ⬇ Export Markdown
        </Button>
      </div>

      <pre className="text-sm text-rk-text whitespace-pre-wrap font-mono bg-rk-bg border border-rk-border rounded-md p-3">
        {report.body}
      </pre>
    </Card>
  );
}
