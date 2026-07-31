import type { TextareaHTMLAttributes } from 'react';

export function Textarea({ className = '', ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`bg-rk-bg border border-rk-border rounded-md px-3 py-1.5 text-sm text-rk-text placeholder:text-rk-muted focus:outline-none focus:border-rk-accent resize-none ${className}`}
      {...rest}
    />
  );
}
