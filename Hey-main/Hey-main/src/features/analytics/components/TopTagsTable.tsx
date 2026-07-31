import { Panel } from '@components/shared';
import type { TagDatum } from '../types';

export function TopTagsTable({ data }: { data: TagDatum[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <Panel title="Top Tags">
      {data.length === 0 ? (
        <p className="text-rk-muted text-sm">No tags yet.</p>
      ) : (
        <table className="w-full text-sm">
          <tbody>
            {data.map((d) => (
              <tr key={d.tag}>
                <td className="py-1.5 text-rk-text pe-3 whitespace-nowrap">{d.tag}</td>
                <td className="py-1.5 w-full">
                  <div className="h-2 bg-rk-surfaceHover rounded overflow-hidden">
                    <div
                      className="h-full bg-rk-accent rounded"
                      style={{ width: `${(d.count / max) * 100}%` }}
                    />
                  </div>
                </td>
                <td className="py-1.5 ps-3 text-rk-muted text-xs text-end">{d.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Panel>
  );
}
