import { PageHeader, LoadingSpinner } from '@components/shared';
import { registerPlugin } from '@plugins-core';
import { useIocs } from './useIocs';
import { IocToolbar } from './components/IocToolbar';
import { IocFilters } from './components/IocFilters';
import { IocList } from './components/IocList';
import { IocDetails } from './components/IocDetails';

registerPlugin({ id: 'ioc', name: 'IOC Manager', version: '0.1.0', slot: 'main' });

export function IocPage() {
  const { isLoading, iocs, query, setQuery, filters, setType, setStatus, activeId, setActiveId, activeIoc } =
    useIocs();

  return (
    <div>
      <PageHeader title="IOC Manager" subtitle="Track indicators of compromise — mock data only" />

      {isLoading ? (
        <LoadingSpinner label="Loading indicators..." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1 space-y-4">
            <IocFilters filters={filters} onTypeChange={setType} onStatusChange={setStatus} />
          </div>

          <div className="lg:col-span-1 space-y-3">
            <IocToolbar query={query} onQueryChange={setQuery} />
            <IocList iocs={iocs} activeId={activeId} onSelect={setActiveId} />
          </div>

          <div className="lg:col-span-2">
            <IocDetails ioc={activeIoc} />
          </div>
        </div>
      )}
    </div>
  );
}
