import type { Report } from './types';

function download(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function slug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function exportReportAsJson(report: Report): void {
  download(`${slug(report.title)}.json`, JSON.stringify(report, null, 2), 'application/json');
}

export function exportReportAsMarkdown(report: Report): void {
  const markdown =
    `${report.body}\n\n---\n` +
    `*Category: ${report.category} — Created: ${new Date(report.createdAt).toLocaleDateString()}*\n`;
  download(`${slug(report.title)}.md`, markdown, 'text/markdown');
}
