import { PageHeader, LoadingSpinner } from '@components/shared';
import { registerPlugin } from '@plugins-core';
import { useTimeline } from './useTimeline';
import { TimelineFilterBar } from './components/TimelineFilterBar';
import { TimelineList } from './components/TimelineList';
import { TimelineEventDetails } from './components/TimelineEventDetails';

registerPlugin({ id: 'timeline', name: 'Timeline', version: '0.1.0', slot: 'main' });

export function TimelinePage() {
  const { isLoading, events, query, setQuery, filters, setType, activeId, setActiveId, activeEvent } = useTimeline();

  return (
    <div>
      <PageHeader title="Timeline" subtitle="Chronological view of workspace activity — mock data only" />

      {isLoading ? (
        <LoadingSpinner label="Loading timeline..." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <TimelineFilterBar query={query} onQueryChange={setQuery} type={filters.type} onTypeChange={setType} />
            <TimelineList events={events} activeId={activeId} onSelect={setActiveId} />
          </div>

          <div className="lg:col-span-1">
            <TimelineEventDetails event={activeEvent} />
          </div>
        </div>
      )}
    </div>
  );
}
