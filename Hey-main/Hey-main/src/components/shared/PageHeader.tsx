export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h1 className="text-lg text-rk-text font-mono">{title}</h1>
      {subtitle && <p className="text-xs text-rk-muted mt-0.5">{subtitle}</p>}
    </div>
  );
}
