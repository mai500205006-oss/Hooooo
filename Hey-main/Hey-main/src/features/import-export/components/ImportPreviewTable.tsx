import { Badge } from '@components/shared';
import type { ImportPreviewItem } from '../types';

const TONE: Record<ImportPreviewItem['status'], 'success' | 'warning' | 'danger'> = {
  ok: 'success',
  warning: 'warning',
  conflict: 'danger',
};

export function ImportPreviewTable({ items }: { items: ImportPreviewItem[] }) {
  if (items.length === 0) {
    return <p className="text-rk-muted text-sm">No preview available yet.</p>;
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-rk-muted text-xs text-start">
          <th className="font-normal pb-1">Module</th>
          <th className="font-normal pb-1">Records</th>
          <th className="font-normal pb-1 text-end">Status</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.module} className="border-t border-rk-border">
            <td className="py-1.5 text-rk-text">{item.module}</td>
            <td className="py-1.5 text-rk-muted">{item.count}</td>
            <td className="py-1.5 text-end">
              <Badge tone={TONE[item.status]}>{item.status}</Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
