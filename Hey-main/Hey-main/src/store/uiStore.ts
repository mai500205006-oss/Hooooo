import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeMode } from '@types';

interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
}

/**
 * theme و sidebarOpen بس بيتحفظوا (Sprint 11 — Settings) — دول تفضيلات
 * واجهة حقيقية المستخدم بيتوقع إنها تفضل زي ما سابها بعد الـ refresh.
 * commandPaletteOpen مقصود منه يفضل مؤقت (UI transient state) فمش بيتحفظ.
 */
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      theme: 'dark',
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'red_king.ui.v1',
      partialize: (s) => ({ theme: s.theme, sidebarOpen: s.sidebarOpen }),
    }
  )
);
