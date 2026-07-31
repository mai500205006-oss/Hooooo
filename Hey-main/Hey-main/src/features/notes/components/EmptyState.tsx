import { Button } from '@components/shared';

export function EmptyState({
  title,
  hint,
  actionLabel,
  onAction,
}: {
  title: string;
  hint?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <p className="text-rk-text text-sm mb-1">{title}</p>
      {hint && <p className="text-rk-muted text-xs mb-4">{hint}</p>}
      {actionLabel && onAction && (
        <Button variant="ghost" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
