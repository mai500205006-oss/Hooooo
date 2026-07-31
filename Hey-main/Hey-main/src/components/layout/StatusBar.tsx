import { useWorkspaceContext } from '@/context/WorkspaceContext';

export function StatusBar() {
  const { currentRoute, activeWorkspaceId, selectedEntity } = useWorkspaceContext();
  return (
    <footer className="h-6 shrink-0 bg-rk-surface border-t border-rk-border flex items-center gap-4 px-4 text-xs text-rk-muted">
      <span>route: {currentRoute}</span>
      <span>workspace: {activeWorkspaceId}</span>
      <span>selected: {selectedEntity ? selectedEntity.label : 'none'}</span>
    </footer>
  );
}
