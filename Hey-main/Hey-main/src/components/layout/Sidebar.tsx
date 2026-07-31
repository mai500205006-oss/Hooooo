import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from '@constants/routes';

export function Sidebar() {
  return (
    <aside className="w-56 shrink-0 bg-rk-surface border-e border-rk-border p-3 space-y-1">
      {APP_ROUTES.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/'}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md text-sm cursor-pointer ${
              isActive
                ? 'bg-rk-surfaceHover text-rk-accent'
                : 'text-rk-muted hover:bg-rk-surfaceHover hover:text-rk-text'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
}
