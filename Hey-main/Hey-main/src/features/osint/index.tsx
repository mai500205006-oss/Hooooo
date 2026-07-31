import { PageHeader } from '@components/shared';
import { registerPlugin } from '@plugins-core';
import { useOsint } from './useOsint';
import { SearchPanel } from './components/SearchPanel';
import { ResultsList } from './components/ResultsList';
import { ResultViewer } from './components/ResultViewer';
import { QueryHistory } from './components/QueryHistory';

registerPlugin({ id: 'osint', name: 'OSINT', version: '0.1.0', slot: 'main' });

export function OsintPage() {
  const {
    query,
    setQuery,
    sourceFilter,
    setSourceFilter,
    results,
    isLoading,
    hasSearched,
    activeId,
    setActiveId,
    activeResult,
    history,
    replayHistory,
    clearHistory,
    search,
  } = useOsint();

  const handleSearch = () => search(query, sourceFilter);

  return (
    <div>
      <PageHeader title="OSINT" subtitle="Open-source intelligence lookup — mock data only" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Col 1 — Search History */}
        <div className="lg:col-span-1 space-y-4">
          <QueryHistory
            history={history}
            onReplay={replayHistory}
            onClear={clearHistory}
          />
        </div>

        {/* Col 2 — Search + Results */}
        <div className="lg:col-span-1 space-y-3">
          <SearchPanel
            query={query}
            onQueryChange={setQuery}
            sourceFilter={sourceFilter}
            onSourceFilterChange={setSourceFilter}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
          <ResultsList
            results={results}
            activeId={activeId}
            onSelect={setActiveId}
            isLoading={isLoading}
            hasSearched={hasSearched}
          />
        </div>

        {/* Col 3-4 — Detail viewer */}
        <div className="lg:col-span-2">
          <ResultViewer result={activeResult} />
        </div>
      </div>
    </div>
  );
}
