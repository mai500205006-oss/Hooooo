import { Panel } from '@components/shared/Panel';
import { CodeViewer } from './CodeViewer';
import { TextViewer } from './TextViewer';
import { JsonViewer } from './JsonViewer';
import { useFiles } from '../useFiles';

export function FilePreview({ fileId }: { fileId: string | null }) {
  const { files } = useFiles();
  const file = files.find((f) => f.id === fileId);

  if (!file) {
    return (
      <Panel title="Preview">
        <p className="text-rk-muted text-sm">افتح ملف من الـ Explorer لعرضه هنا.</p>
      </Panel>
    );
  }

  return (
    <Panel title={file.path}>
      {file.kind === 'code' && <CodeViewer content={file.content} />}
      {file.kind === 'text' && <TextViewer content={file.content} />}
      {file.kind === 'json' && <JsonViewer content={file.content} />}
    </Panel>
  );
}
