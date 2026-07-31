import { Panel, Badge } from '@components/shared';
import { RelationshipBadge } from './RelationshipBadge';
import type { Entity } from '../types';
import type { RelatedEntity } from '../useCorrelation';

export function RelationshipDetailsPanel({
  selectedEntity,
  relation,
}: {
  selectedEntity: Entity | null;
  relation: RelatedEntity | null;
}) {
  if (!selectedEntity || !relation) {
    return (
      <Panel title="Relationship Details">
        <p className="text-rk-muted text-sm">اختر كيان مرتبط من اللوحة الوسطى لعرض تفاصيل العلاقة.</p>
      </Panel>
    );
  }

  return (
    <Panel title="Relationship Details">
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-rk-text">{selectedEntity.title}</span>
          <Badge>{selectedEntity.type}</Badge>
        </div>
        <div className="flex items-center gap-2 text-rk-muted">
          <RelationshipBadge type={relation.relationship.type} />
          <span>{relation.direction === 'outgoing' ? '→' : '←'}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-rk-text">{relation.entity.title}</span>
          <Badge>{relation.entity.type}</Badge>
        </div>
        <p className="text-rk-muted text-xs border-t border-rk-border pt-3">{relation.relationship.note}</p>
      </div>
    </Panel>
  );
}
