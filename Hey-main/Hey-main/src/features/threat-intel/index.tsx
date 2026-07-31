import { PageHeader, LoadingSpinner } from '@components/shared';
import { registerPlugin } from '@plugins-core';
import { useThreatIntel } from './useThreatIntel';
import { ThreatToolbar } from './components/ThreatToolbar';
import { ThreatFilters } from './components/ThreatFilters';
import { ThreatFeedList } from './components/ThreatFeedList';
import { ThreatDetails } from './components/ThreatDetails';

registerPlugin({ id: 'threat-intel', name: 'Threat Intelligence', version: '0.1.0', slot: 'main' });

export function ThreatIntelPage() {
  const { isLoading, feed, query, setQuery, filters, setSeverity, setSource, activeId, setActiveId, activeEntry } =
    useThreatIntel();

  return (
    <div>
      <PageHeader title="Threat Intelligence" subtitle="Mock threat feed — actors, malware families, and related IOCs" />

      {isLoading ? (
        <LoadingSpinner label="Loading threat feed..." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1 space-y-4">
            <ThreatFilters filters={filters} onSeverityChange={setSeverity} onSourceChange={setSource} />
          </div>

          <div className="lg:col-span-1 space-y-3">
            <ThreatToolbar query={query} onQueryChange={setQuery} />
            <ThreatFeedList feed={feed} activeId={activeId} onSelect={setActiveId} />
          </div>

          <div className="lg:col-span-2">
            <ThreatDetails entry={activeEntry} />
          </div>
        </div>
      )}
    </div>
  );
}
