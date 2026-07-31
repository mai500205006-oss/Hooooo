import { useEffect, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { StatusBar } from './StatusBar';
import { Workspace } from './Workspace';
import { ErrorBoundary } from '@components/shared';
import { useUIStore } from '@store/uiStore';

export function AppShell({ children }: { children?: ReactNode }) {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setCommandPaletteOpen = useUIStore((s) => s.setCommandPaletteOpen);
  const commandPaletteOpen = useUIStore((s) => s.commandPaletteOpen);

  // Ctrl/Cmd+K يفتح Command Palette من أي مكان في التطبيق
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <ErrorBoundary featureName="sidebar">
            <Sidebar />
          </ErrorBoundary>
        )}
        <ErrorBoundary featureName="workspace">
          <Workspace>{children}</Workspace>
        </ErrorBoundary>
      </div>
      <StatusBar />
    </div>
  );
}
