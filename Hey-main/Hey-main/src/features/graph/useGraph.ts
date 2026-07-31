import { useEffect, useMemo, useState } from 'react';
import { mockEntities, mockRelationships } from '@features/correlation';
import type { Entity, EntityType } from '@features/correlation';
import type { ZoomLevel } from './types';
import { layoutNodes, visibleEdges } from './layout';

const LOAD_DELAY_MS = 350;

export function useGraph() {
  const [isLoading, setIsLoading] = useState(true);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<EntityType | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState<ZoomLevel>(100);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setEntities(mockEntities);
      setIsLoading(false);
    }, LOAD_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredEntities = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entities.filter((e) => {
      const matchesQuery = q === '' || e.title.toLowerCase().includes(q);
      const matchesType = typeFilter === 'all' || e.type === typeFilter;
      return matchesQuery && matchesType;
    });
  }, [entities, query, typeFilter]);

  const nodes = useMemo(() => layoutNodes(filteredEntities), [filteredEntities]);
  const edges = useMemo(() => visibleEdges(mockRelationships, nodes), [nodes]);

  const selectedNode = nodes.find((n) => n.entity.id === selectedId) ?? null;

  const neighborCount = useMemo(() => {
    if (!selectedNode) return 0;
    return mockRelationships.filter(
      (r) => r.fromId === selectedNode.entity.id || r.toId === selectedNode.entity.id
    ).length;
  }, [selectedNode]);

  return {
    isLoading,
    query,
    setQuery,
    typeFilter,
    setTypeFilter,
    nodes,
    edges,
    selectedId,
    setSelectedId,
    selectedNode,
    neighborCount,
    zoom,
    setZoom,
  };
}
