export function LoadingSpinner({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-rk-muted text-sm p-4">
      <span className="w-3 h-3 rounded-full border-2 border-rk-accent border-t-transparent animate-spin" />
      {label}
    </div>
  );
}
