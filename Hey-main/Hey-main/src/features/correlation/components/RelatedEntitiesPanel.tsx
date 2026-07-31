import { Panel, Badge } from '@components/shared';
import { RelationshipBadge } from './RelationshipBadge';
import type { Entity } from '../types';
import type { RelatedEntity } from '../useCorrelation';

export function RelatedEntitiesPanel({
  selectedEntity,
  related,
  activeRelatedId,
  onSelectRelated,
}: {
  selectedEntity: Entity | null;
  related: RelatedEntity[];
  activeRelatedId: string | null;
  onSelectRelated: (id: string) => void;
}) {
  if (!selectedEntity) {
    return (
      <Panel title="Related Entities">
        <p className="text-rk-muted text-sm">اختر كيان من القائمة على الشمال لعرض العلاقات بتاعته.</p>
      </Panel>
    );
  }

  return (
    <Panel title={`Related to: ${selectedEntity.title}`}>
      {related.length === 0 ? (
        <p className="text-rk-muted text-sm">No related entities found.</p>
      ) : (
        <div className="space-y-1">
          {related.map((r) => (
            <div
              key={r.relationship.id}
              onClick={() => onSelectRelated(r.entity.id)}
              className={`px-3 py-2 rounded-md cursor-pointer flex justify-between items-center ${
                r.entity.id === activeRelatedId ? 'bg-rk-surfaceHover' : 'hover:bg-rk-surfaceHover'
              }`}
            >
              <div>
                <div className="text-sm text-rk-text">{r.entity.title}</div>
                <div className="text-xs text-rk-muted">
                  {r.direction === 'outgoing' ? '→' : '←'} <Badge>{r.entity.type}</Badge>
                </div>
              </div>
              <RelationshipBadge type={r.relationship.type} />
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}
