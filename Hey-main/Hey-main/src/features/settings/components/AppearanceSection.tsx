import { Panel } from '@components/shared';
import { useUIStore } from '@store/uiStore';
import type { ThemeMode } from '@types';

const THEME_OPTIONS: { value: ThemeMode; label: string }[] = [
  { value: 'dark', label: '🌙 Dark' },
  { value: 'light', label: '☀️ Light' },
];

export function AppearanceSection() {
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  const segmentClass = (active: boolean) =>
    `px-3 py-1.5 rounded-md text-sm cursor-pointer ${
      active ? 'bg-rk-surfaceHover text-rk-accent' : 'text-rk-muted hover:bg-rk-surfaceHover hover:text-rk-text'
    }`;

  return (
    <Panel title="Appearance">
      <div className="space-y-4">
        <div>
          <div className="text-xs text-rk-muted mb-1.5">Theme</div>
          <div className="flex gap-1.5">
            {THEME_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={segmentClass(theme === opt.value)}
                onClick={() => opt.value !== theme && toggleTheme()}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-rk-muted mb-1.5">Sidebar</div>
          <div className="flex gap-1.5">
            <button className={segmentClass(sidebarOpen)} onClick={() => !sidebarOpen && toggleSidebar()}>
              Expanded
            </button>
            <button className={segmentClass(!sidebarOpen)} onClick={() => sidebarOpen && toggleSidebar()}>
              Collapsed
            </button>
          </div>
        </div>

        <p className="text-xs text-rk-muted">التفضيلات دي بتتحفظ في المتصفح وبتفضل زي ما هي بعد أي refresh.</p>
      </div>
    </Panel>
  );
}
