import { Badge, Button } from '@components/shared';
import { useUIStore } from '@store/uiStore';

export function Header() {
  const setCommandPaletteOpen = useUIStore((s) => s.setCommandPaletteOpen);
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <header className="h-12 shrink-0 bg-rk-surface border-b border-rk-border flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={toggleSidebar} aria-label="Toggle sidebar">
          ☰
        </Button>
        <span className="text-rk-accent font-mono text-sm tracking-wider">RED KING</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge tone="success">Online</Badge>
        <Button variant="ghost" onClick={() => setCommandPaletteOpen(true)}>
          ⌘K
        </Button>
        <Button variant="ghost" onClick={toggleTheme}>
          {theme === 'dark' ? '🌙' : '☀️'}
        </Button>
      </div>
    </header>
  );
}
