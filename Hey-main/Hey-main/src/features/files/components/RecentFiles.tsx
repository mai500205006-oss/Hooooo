import { Panel } from '@components/shared/Panel';
import { useFiles } from '../useFiles';

export function RecentFiles({ onOpen }: { onOpen: (id: string) => void }) {
  const { files, recentFileIds } = useFiles();
  const recentFiles = recentFileIds
    .map((id) => files.find((f) => f.id === id))
    .filter(Boolean);

  return (
    <Panel title="Recent Files">
      <ul className="space-y-1 text-sm">
        {recentFiles.map((f) => (
          <li
            key={f!.id}
            onClick={() => onOpen(f!.id)}
            className="text-rk-text hover:text-rk-accent cursor-pointer"
          >
            {f!.name}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
