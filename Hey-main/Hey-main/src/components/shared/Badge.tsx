interface Props {
  children: React.ReactNode;
  tone?: 'success' | 'warning' | 'danger' | 'muted';
}

export function Badge({ children, tone = 'muted' }: Props) {
  const styles = {
    success: 'text-green-400 border-green-800',
    warning: 'text-yellow-400 border-yellow-800',
    danger: 'text-red-400 border-red-800',
    muted: 'text-rk-muted border-rk-border',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded border ${styles[tone]}`}>{children}</span>
  );
}
