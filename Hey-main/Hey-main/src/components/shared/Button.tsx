import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
}

export function Button({ variant = 'primary', className = '', ...rest }: Props) {
  const base = 'px-3 py-1.5 rounded-md text-sm font-medium transition-colors';
  const styles = {
    primary: 'bg-rk-accent text-white hover:bg-rk-accent-dim',
    ghost: 'bg-transparent text-rk-text border border-rk-border hover:bg-rk-surface',
    danger: 'bg-red-900 text-white hover:bg-red-800',
  };
  return <button className={`${base} ${styles[variant]} ${className}`} {...rest} />;
}
