import type { ReactNode } from 'react';

export function Workspace({ children }: { children?: ReactNode }) {
  return <main className="flex-1 overflow-auto p-4">{children}</main>;
}
