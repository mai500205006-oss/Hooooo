import { Panel, Badge } from '@components/shared';
import type { Attachment } from '../types';

export function AttachmentsList({ attachments }: { attachments: Attachment[] }) {
  return (
    <Panel title="Attachments">
      {attachments.length === 0 ? (
        <p className="text-xs text-rk-muted">No attachments.</p>
      ) : (
        <ul className="space-y-2">
          {attachments.map((file) => (
            <li key={file.id} className="flex items-center justify-between text-xs">
              <div className="min-w-0">
                <div className="text-rk-text truncate">{file.name}</div>
                <div className="text-rk-muted">{file.sizeLabel}</div>
              </div>
              <Badge tone="muted">{file.kind}</Badge>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
