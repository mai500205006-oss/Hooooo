import { create } from 'zustand';
import type { SelectedEntity } from '@types';

/**
 * Context state — "أين أنا وماذا أنظر إليه الآن".
 * مختلف عن UI state (شكل الواجهة) ومختلف عن Domain state (البيانات نفسها).
 */
interface ContextState {
  currentRoute: string;
  setCurrentRoute: (route: string) => void;

  activeWorkspaceId: string;
  setActiveWorkspaceId: (id: string) => void;

  selectedEntity: SelectedEntity | null;
  setSelectedEntity: (entity: SelectedEntity | null) => void;
}

export const useContextStore = create<ContextState>((set) => ({
  currentRoute: '/',
  setCurrentRoute: (route) => set({ currentRoute: route }),

  activeWorkspaceId: 'default',
  setActiveWorkspaceId: (id) => set({ activeWorkspaceId: id }),

  selectedEntity: null,
  setSelectedEntity: (entity) => set({ selectedEntity: entity }),
}));
