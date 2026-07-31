import { ProjectExplorer } from './components/ProjectExplorer';
import { NotesPanel } from './components/NotesPanel';
import { FavoritesPanel } from './components/FavoritesPanel';
import { RecentActivityPanel } from './components/RecentActivityPanel';
import { QuickActions } from './components/QuickActions';
import { GlobalSearch } from './components/GlobalSearch';
import { PageHeader } from '@components/shared/PageHeader';
import { registerPlugin } from '@plugins-core';

registerPlugin({ id: 'workspace', name: 'Developer Workspace', version: '0.1.0', slot: 'main' });

export function WorkspacePage() {
  return (
    <div>
      <PageHeader title="Workspace" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-4">
          <ProjectExplorer />
          <FavoritesPanel />
        </div>
        <div className="space-y-4">
          <GlobalSearch />
          <QuickActions />
        </div>
        <div className="space-y-4">
          <NotesPanel />
          <RecentActivityPanel />
        </div>
      </div>
    </div>
  );
}
