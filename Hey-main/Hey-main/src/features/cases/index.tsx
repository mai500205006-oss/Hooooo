import { PageHeader, LoadingSpinner } from '@components/shared';
import { registerPlugin } from '@plugins-core';
import { useCases } from './useCases';
import { CaseToolbar } from './components/CaseToolbar';
import { CaseList } from './components/CaseList';
import { CaseDetails } from './components/CaseDetails';

registerPlugin({ id: 'cases', name: 'Case Builder', version: '0.1.0', slot: 'main' });

export function CasesPage() {
  const { isLoading, cases, query, setQuery, filters, setStatus, activeId, setActiveId, activeCase } = useCases();

  return (
    <div>
      <PageHeader title="Case Builder" subtitle="Browse cases and their related evidence, notes, and timeline" />

      {isLoading ? (
        <LoadingSpinner label="Loading cases..." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 space-y-3">
            <CaseToolbar query={query} onQueryChange={setQuery} status={filters.status} onStatusChange={setStatus} />
            <CaseList cases={cases} activeId={activeId} onSelect={setActiveId} />
          </div>

          <div className="lg:col-span-2">
            <CaseDetails caseItem={activeCase} />
          </div>
        </div>
      )}
    </div>
  );
}
