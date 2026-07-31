import { Badge } from '@components/shared/Badge';
import type { Investigation } from '../types';

const TONE: Record<Investigation['status'], 'success' | 'warning' | 'muted'> = {
  open: 'warning',
  'in-progress': 'success',
  closed: 'muted',
};

export function InvestigationListItem({
  investigation,
  active,
  onSelect,
}: {
  investigation: Investigation;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`px-3 py-2 rounded-md cursor-pointer flex justify-between items-center ${
        active ? 'bg-rk-surfaceHover' : 'hover:bg-rk-surfaceHover'
      }`}
    >
      <div>
        <div className="text-sm text-rk-text">{investigation.title}</div>
        <div className="text-xs text-rk-muted">{investigation.updatedAt}</div>
      </div>
      <Badge tone={TONE[investigation.status]}>{investigation.status}</Badge>
    </div>
  );
}
