import { PageHeader, LoadingSpinner } from '@components/shared';
import { registerPlugin } from '@plugins-core';
import { useCorrelation } from './useCorrelation';
import { EntityList } from './components/EntityList';
import { RelatedEntitiesPanel } from './components/RelatedEntitiesPanel';
import { RelationshipDetailsPanel } from './components/RelationshipDetailsPanel';

registerPlugin({ id: 'correlation', name: 'Correlation Engine', version: '0.1.0', slot: 'main' });

// جزء من الـ public API — بيسمح لـ features تانية (زي graph) تعيد استخدام
// نفس الـ mock data من غير ما تخترق ملفات داخلية في الـ feature.
import { loadEntities, loadRelationships } from './useCorrelation';
export const mockEntities = loadEntities();
export const mockRelationships = loadRelationships();
export type { Entity, EntityType, Relationship, RelationshipType } from './types';

export function CorrelationPage() {
  const {
    isLoading,
    query,
    setQuery,
    typeFilter,
    setTypeFilter,
    filteredEntities,
    selectedEntity,
    selectEntity,
    relatedEntities,
    selectedRelatedId,
    setSelectedRelatedId,
    selectedRelation,
  } = useCorrelation();

  return (
    <div>
      <PageHeader
        title="Correlation Engine"
        subtitle="Explore relationships between cases, investigations, evidence, and more"
      />

      {isLoading ? (
        <LoadingSpinner label="Building correlation graph..." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1">
            <EntityList
              entities={filteredEntities}
              query={query}
              onQueryChange={setQuery}
              typeFilter={typeFilter}
              onTypeFilterChange={setTypeFilter}
              activeId={selectedEntity?.id ?? null}
              onSelect={selectEntity}
            />
          </div>

          <div className="lg:col-span-2">
            <RelatedEntitiesPanel
              selectedEntity={selectedEntity}
              related={relatedEntities}
              activeRelatedId={selectedRelatedId}
              onSelectRelated={setSelectedRelatedId}
            />
          </div>

          <div className="lg:col-span-1">
            <RelationshipDetailsPanel selectedEntity={selectedEntity} relation={selectedRelation} />
          </div>
        </div>
      )}
    </div>
  );
}
