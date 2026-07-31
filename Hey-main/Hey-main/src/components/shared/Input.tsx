import type { InputHTMLAttributes } from 'react';

export function Input({ className = '', ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`bg-rk-bg border border-rk-border rounded-md px-3 py-1.5 text-sm text-rk-text placeholder:text-rk-muted focus:outline-none focus:border-rk-accent ${className}`}
      {...rest}
    />
  );
}
