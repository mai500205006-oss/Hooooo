import { Panel } from '@components/shared/Panel';
import { useFiles } from '../useFiles';

const ICON: Record<string, string> = { code: '💻', text: '📄', json: '🧩' };

export function FileExplorer({ onOpen }: { onOpen: (id: string) => void }) {
  const { files } = useFiles();

  return (
    <Panel title="File Explorer">
      <ul className="space-y-1 text-sm">
        {files.map((f) => (
          <li
            key={f.id}
            onClick={() => onOpen(f.id)}
            className="text-rk-text hover:text-rk-accent cursor-pointer"
          >
            {ICON[f.kind]} {f.path}
          </li>
        ))}
      </ul>
    </Panel>
  );
}
