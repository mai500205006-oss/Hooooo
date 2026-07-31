import type { Entity, Relationship } from '@features/correlation';
import type { GraphEdge, GraphNode } from './types';

export const CANVAS_WIDTH = 640;
export const CANVAS_HEIGHT = 420;

/** ترتيب الـ nodes في دايرة حوالين مركز الـ canvas — تخطيط ثابت وبسيط */
export function layoutNodes(entities: Entity[]): GraphNode[] {
  const centerX = CANVAS_WIDTH / 2;
  const centerY = CANVAS_HEIGHT / 2;
  const radius = Math.min(centerX, centerY) - 60;
  const count = entities.length || 1;

  return entities.map((entity, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    return {
      entity,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });
}

/** الروابط اللي طرفيها موجودين في مجموعة الـ nodes الظاهرة بس */
export function visibleEdges(relationships: Relationship[], nodes: GraphNode[]): GraphEdge[] {
  const ids = new Set(nodes.map((n) => n.entity.id));
  return relationships
    .filter((r) => ids.has(r.fromId) && ids.has(r.toId))
    .map((r) => ({ id: r.id, fromId: r.fromId, toId: r.toId }));
}
