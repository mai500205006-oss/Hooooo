import { Panel, Badge } from '@components/shared';
import type { CaptureFileInfo } from '../types';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function FileInfoPanel({ info }: { info: CaptureFileInfo }) {
  return (
    <Panel title="File Information">
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between">
          <span className="text-rk-muted">Name</span>
          <span className="text-rk-text truncate max-w-[60%]">{info.fileName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-rk-muted">Size</span>
          <span className="text-rk-text">{formatBytes(info.fileSize)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-rk-muted">Packets</span>
          <Badge tone="muted">{info.packetCount}</Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-rk-muted">Duration</span>
          <span className="text-rk-text">{info.durationSeconds}s</span>
        </div>
        <div className="flex justify-between">
          <span className="text-rk-muted">Link Type</span>
          <span className="text-rk-text">{info.linkType}</span>
        </div>
      </div>
    </Panel>
  );
}
