import { useEffect } from 'react';
import { useUIStore } from '@store/uiStore';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@constants/routes';

const COMMANDS = APP_ROUTES.map((route) => ({
  label: `Go to ${route.label}`,
  path: route.path,
}));

export function CommandPalette() {
  const open = useUIStore((s) => s.commandPaletteOpen);
  const setOpen = useUIStore((s) => s.setCommandPaletteOpen);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-start justify-center pt-32 z-50"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-96 bg-rk-surface border border-rk-border rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-3 py-2 border-b border-rk-border text-xs text-rk-muted">
          Command Palette (mock)
        </div>
        {COMMANDS.map((c) => (
          <div
            key={c.path}
            className="px-3 py-2 text-sm text-rk-text hover:bg-rk-surfaceHover cursor-pointer"
            onClick={() => {
              navigate(c.path);
              setOpen(false);
            }}
          >
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}
