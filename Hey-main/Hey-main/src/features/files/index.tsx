import { useState } from 'react';
import { FileExplorer } from './components/FileExplorer';
import { FileTabs } from './components/FileTabs';
import { FilePreview } from './components/FilePreview';
import { RecentFiles } from './components/RecentFiles';
import { FileSearch } from './components/FileSearch';
import { PageHeader } from '@components/shared/PageHeader';
import { registerPlugin } from '@plugins-core';

registerPlugin({ id: 'files', name: 'File Workspace', version: '0.1.0', slot: 'main' });

export function FilesPage() {
  // UI state محلي بالكامل — التابات المفتوحة مش domain data
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const openFile = (id: string) => {
    setOpenIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
    setActiveId(id);
  };

  const closeFile = (id: string) => {
    setOpenIds((ids) => {
      const next = ids.filter((i) => i !== id);
      if (activeId === id) setActiveId(next[next.length - 1] ?? null);
      return next;
    });
  };

  return (
    <div>
      <PageHeader title="Files" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-4">
          <FileExplorer onOpen={openFile} />
          <RecentFiles onOpen={openFile} />
          <FileSearch onOpen={openFile} />
        </div>
        <div className="md:col-span-2">
          <FileTabs openIds={openIds} activeId={activeId} onSelect={setActiveId} onClose={closeFile} />
          <FilePreview fileId={activeId} />
        </div>
      </div>
    </div>
  );
}
