import { PageHeader, LoadingSpinner } from '@components/shared';
import { registerPlugin } from '@plugins-core';
import { useEvidence } from './useEvidence';
import { EvidenceToolbar } from './components/EvidenceToolbar';
import { EvidenceList } from './components/EvidenceList';
import { EvidenceDetails } from './components/EvidenceDetails';

registerPlugin({ id: 'evidence', name: 'Evidence Locker', version: '0.1.0', slot: 'main' });

export function EvidencePage() {
  const { isLoading, evidence, query, setQuery, filters, setType, activeId, setActiveId, activeEvidence } =
    useEvidence();

  return (
    <div>
      <PageHeader title="Evidence Locker" subtitle="Browse evidence, chain of custody, and attachments" />

      {isLoading ? (
        <LoadingSpinner label="Loading evidence..." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 space-y-3">
            <EvidenceToolbar query={query} onQueryChange={setQuery} type={filters.type} onTypeChange={setType} />
            <EvidenceList evidence={evidence} activeId={activeId} onSelect={setActiveId} />
          </div>

          <div className="lg:col-span-2">
            <EvidenceDetails item={activeEvidence} />
          </div>
        </div>
      )}
    </div>
  );
}
