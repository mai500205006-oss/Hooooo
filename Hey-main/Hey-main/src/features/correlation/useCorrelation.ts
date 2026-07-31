import { useEffect, useMemo, useState } from 'react';
import { logger } from '@utils/logger';
import { mockEntities, mockRelationships } from './data.mock';
import type { Entity, EntityType, Relationship } from './types';

const ENTITIES_STORAGE_KEY = 'red_king.correlation.entities.v1';
const RELATIONSHIPS_STORAGE_KEY = 'red_king.correlation.relationships.v1';

export interface RelatedEntity {
  entity: Entity;
  relationship: Relationship;
  direction: 'outgoing' | 'incoming';
}

export function loadEntities(): Entity[] {
  try {
    const raw = localStorage.getItem(ENTITIES_STORAGE_KEY);
    if (!raw) return mockEntities;
    const parsed = JSON.parse(raw) as Entity[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockEntities;
  } catch (error) {
    logger.warn('Failed to read entities from Local Storage — falling back to mock data', { error }, 'correlation');
    return mockEntities;
  }
}

function saveEntities(entities: Entity[]): void {
  try {
    localStorage.setItem(ENTITIES_STORAGE_KEY, JSON.stringify(entities));
  } catch (error) {
    logger.error('Failed to persist entities to Local Storage', error, 'correlation');
  }
}

export function loadRelationships(): Relationship[] {
  try {
    const raw = localStorage.getItem(RELATIONSHIPS_STORAGE_KEY);
    if (!raw) return mockRelationships;
    const parsed = JSON.parse(raw) as Relationship[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockRelationships;
  } catch (error) {
    logger.warn('Failed to read relationships from Local Storage — falling back to mock data', { error }, 'correlation');
    return mockRelationships;
  }
}

function saveRelationships(relationships: Relationship[]): void {
  try {
    localStorage.setItem(RELATIONSHIPS_STORAGE_KEY, JSON.stringify(relationships));
  } catch (error) {
    logger.error('Failed to persist relationships to Local Storage', error, 'correlation');
  }
}

export function useCorrelation() {
  const [isLoading, setIsLoading] = useState(true);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<EntityType | 'all'>('all');
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [selectedRelatedId, setSelectedRelatedId] = useState<string | null>(null);

  useEffect(() => {
    setEntities(loadEntities());
    setRelationships(loadRelationships());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    saveEntities(entities);
  }, [entities, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    saveRelationships(relationships);
  }, [relationships, isLoading]);

  const filteredEntities = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entities.filter((e) => {
      const matchesQuery =
        q === '' || e.title.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q);
      const matchesType = typeFilter === 'all' || e.type === typeFilter;
      return matchesQuery && matchesType;
    });
  }, [entities, query, typeFilter]);

  const selectedEntity = entities.find((e) => e.id === selectedEntityId) ?? null;

  const relatedEntities: RelatedEntity[] = useMemo(() => {
    if (!selectedEntity) return [];
    const items: RelatedEntity[] = [];
    for (const rel of relationships) {
      if (rel.fromId === selectedEntity.id) {
        const entity = entities.find((e) => e.id === rel.toId);
        if (entity) items.push({ entity, relationship: rel, direction: 'outgoing' });
      } else if (rel.toId === selectedEntity.id) {
        const entity = entities.find((e) => e.id === rel.fromId);
        if (entity) items.push({ entity, relationship: rel, direction: 'incoming' });
      }
    }
    return items;
  }, [entities, relationships, selectedEntity]);

  const selectedRelation = relatedEntities.find((r) => r.entity.id === selectedRelatedId) ?? null;

  const selectEntity = (id: string) => {
    setSelectedEntityId(id);
    setSelectedRelatedId(null);
  };

  return {
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
  };
}
