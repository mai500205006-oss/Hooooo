import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../layout';
import { TYPE_COLOR } from './typeColors';
import type { GraphEdge, GraphNode, ZoomLevel } from '../types';

const NODE_SIZE = 14;

export function GraphCanvas({
  nodes,
  edges,
  selectedId,
  onSelect,
  zoom,
}: {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  zoom: ZoomLevel;
}) {
  const findNode = (id: string) => nodes.find((n) => n.entity.id === id);

  return (
    <div className="bg-rk-bg border border-rk-border rounded-md overflow-auto p-2">
      <div
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top left',
        }}
        className="relative"
      >
        <svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="absolute inset-0">
          {edges.map((edge) => {
            const from = findNode(edge.fromId);
            const to = findNode(edge.toId);
            if (!from || !to) return null;
            const highlighted = selectedId === edge.fromId || selectedId === edge.toId;
            return (
              <line
                key={edge.id}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={highlighted ? '#c0392b' : '#1f2126'}
                strokeWidth={highlighted ? 1.5 : 1}
              />
            );
          })}
        </svg>

        {nodes.map((node) => {
          const active = node.entity.id === selectedId;
          const color = TYPE_COLOR[node.entity.type];
          return (
            <button
              key={node.entity.id}
              onClick={() => onSelect(node.entity.id)}
              style={{
                left: node.x - NODE_SIZE / 2,
                top: node.y - NODE_SIZE / 2,
                width: NODE_SIZE,
                height: NODE_SIZE,
                borderColor: color,
                boxShadow: active ? `0 0 0 3px ${color}55` : undefined,
              }}
              className={`absolute rounded-full border-2 bg-rk-surface hover:scale-125 transition-transform`}
              title={node.entity.title}
            >
              <span
                className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px]"
                style={{ color: active ? '#e6e6e6' : '#8a8d93' }}
              >
                {node.entity.title.length > 16
                  ? `${node.entity.title.slice(0, 16)}…`
                  : node.entity.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
