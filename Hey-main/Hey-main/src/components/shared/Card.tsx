import type { HTMLAttributes } from 'react';

export function Card({ className = '', ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-rk-surface border border-rk-border rounded-lg p-4 ${className}`}
      {...rest}
    />
  );
}
