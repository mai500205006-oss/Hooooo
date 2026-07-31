import type { Entity } from '@features/correlation';

export type ZoomLevel = 50 | 75 | 100 | 125 | 150;

export interface GraphNode {
  entity: Entity;
  x: number;
  y: number;
}

export interface GraphEdge {
  id: string;
  fromId: string;
  toId: string;
}
