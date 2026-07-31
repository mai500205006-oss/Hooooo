import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useContextStore } from '@store/contextStore';
import type { SelectedEntity } from '@types';

interface WorkspaceContextValue {
  currentRoute: string;
  activeWorkspaceId: string;
  selectedEntity: SelectedEntity | null;
  setSelectedEntity: (entity: SelectedEntity | null) => void;
  setActiveWorkspaceId: (id: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceContextProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const currentRoute = useContextStore((s) => s.currentRoute);
  const setCurrentRoute = useContextStore((s) => s.setCurrentRoute);
  const activeWorkspaceId = useContextStore((s) => s.activeWorkspaceId);
  const setActiveWorkspaceId = useContextStore((s) => s.setActiveWorkspaceId);
  const selectedEntity = useContextStore((s) => s.selectedEntity);
  const setSelectedEntity = useContextStore((s) => s.setSelectedEntity);

  // مزامنة الـ Route الحالي مع الـ Context Engine تلقائيًا
  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname, setCurrentRoute]);

  return (
    <WorkspaceContext.Provider
      value={{
        currentRoute,
        activeWorkspaceId,
        selectedEntity,
        setSelectedEntity,
        setActiveWorkspaceId,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

/** Hook موحد لقراءة/تعديل السياق الحالي — بديل الوصول المباشر للـ store */
export function useWorkspaceContext() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspaceContext must be used inside WorkspaceContextProvider');
  return ctx;
}
