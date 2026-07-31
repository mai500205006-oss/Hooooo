import { Card } from '@components/shared/Card';
import { InvestigationListItem } from './InvestigationListItem';
import type { Investigation } from '../types';

export function InvestigationList({
  items,
  activeId,
  onSelect,
}: {
  items: Investigation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <Card className="p-2">
      {items.length === 0 && (
        <p className="text-rk-muted text-sm p-2">No investigations match.</p>
      )}
      <div className="space-y-1">
        {items.map((inv) => (
          <InvestigationListItem
            key={inv.id}
            investigation={inv}
            active={inv.id === activeId}
            onSelect={() => onSelect(inv.id)}
          />
        ))}
      </div>
    </Card>
  );
}
