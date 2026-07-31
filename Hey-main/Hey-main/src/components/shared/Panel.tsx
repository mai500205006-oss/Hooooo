import type { ReactNode } from 'react';
import { Card } from './Card';

export function Panel({
  title,
  children,
  className = '',
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <h3 className="text-sm text-rk-muted mb-3">{title}</h3>
      {children}
    </Card>
  );
}
