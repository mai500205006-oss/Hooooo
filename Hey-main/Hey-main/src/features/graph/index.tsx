import { PageHeader, LoadingSpinner, Panel } from '@components/shared';
import { registerPlugin } from '@plugins-core';
import { useGraph } from './useGraph';
import { EntitySelector } from './components/EntitySelector';
import { GraphCanvas } from './components/GraphCanvas';
import { NodeDetailsPanel } from './components/NodeDetailsPanel';
import { ZoomControl } from './components/ZoomControl';

registerPlugin({ id: 'graph', name: 'Graph Explorer', version: '0.1.0', slot: 'main' });

export function GraphPage() {
  const {
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
  } = useGraph();

  return (
    <div>
      <PageHeader
        title="Graph Explorer"
        subtitle="Visual mock graph built on top of the Correlation Engine data"
      />

      {isLoading ? (
        <LoadingSpinner label="Laying out graph..." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1">
            <EntitySelector
              entities={nodes.map((n) => n.entity)}
              query={query}
              onQueryChange={setQuery}
              typeFilter={typeFilter}
              onTypeFilterChange={setTypeFilter}
              activeId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          <div className="lg:col-span-2 space-y-3">
            <Panel title="Canvas">
              <div className="flex justify-end mb-2">
                <ZoomControl zoom={zoom} onChange={setZoom} />
              </div>
              {nodes.length === 0 ? (
                <p className="text-rk-muted text-sm">No entities match — adjust search or filter.</p>
              ) : (
                <GraphCanvas
                  nodes={nodes}
                  edges={edges}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  zoom={zoom}
                />
              )}
            </Panel>
          </div>

          <div className="lg:col-span-1">
            <NodeDetailsPanel node={selectedNode} neighborCount={neighborCount} />
          </div>
        </div>
      )}
    </div>
  );
}
