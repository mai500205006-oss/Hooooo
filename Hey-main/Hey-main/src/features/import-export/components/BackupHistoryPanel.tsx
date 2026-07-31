import { Panel, Button, Badge } from '@components/shared';
import type { BackupEntry } from '../types';

export function BackupHistoryPanel({
  history,
  restoreTargetId,
  onRequestRestore,
  onCancelRestore,
  onConfirmRestore,
}: {
  history: BackupEntry[];
  restoreTargetId: string | null;
  onRequestRestore: (id: string) => void;
  onCancelRestore: () => void;
  onConfirmRestore: () => void;
}) {
  return (
    <Panel title="Backup History">
      {history.length === 0 ? (
        <p className="text-rk-muted text-sm">No backups yet.</p>
      ) : (
        <div className="space-y-1.5">
          {history.map((b) => (
            <div
              key={b.id}
              className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-rk-surfaceHover"
            >
              <div>
                <div className="text-sm text-rk-text">{b.name}</div>
                <div className="text-xs text-rk-muted">
                  {b.date} · {b.size} · <Badge>{b.modules} modules</Badge>
                </div>
              </div>

              {restoreTargetId === b.id ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-rk-muted">Confirm?</span>
                  <Button variant="danger" onClick={onConfirmRestore}>
                    Yes, Restore
                  </Button>
                  <Button variant="ghost" onClick={onCancelRestore}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button variant="ghost" onClick={() => onRequestRestore(b.id)}>
                  Restore
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}
