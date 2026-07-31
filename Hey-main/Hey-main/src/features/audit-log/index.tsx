import { PageHeader, LoadingSpinner } from '@components/shared';
import { registerPlugin } from '@plugins-core';
import { useAuditLog } from './useAuditLog';
import { AuditLogFilterBar } from './components/AuditLogFilterBar';
import { AuditLogTable } from './components/AuditLogTable';

registerPlugin({ id: 'audit-log', name: 'Audit Log', version: '0.1.0', slot: 'main' });

export function AuditLogPage() {
  const { isLoading, entries, query, setQuery, filters, setType } = useAuditLog();

  return (
    <div>
      <PageHeader title="Audit Log" subtitle="Record of actions across the workspace — mock data only" />

      {isLoading ? (
        <LoadingSpinner label="Loading audit log..." />
      ) : (
        <>
          <AuditLogFilterBar query={query} onQueryChange={setQuery} type={filters.type} onTypeChange={setType} />
          <AuditLogTable entries={entries} />
        </>
      )}
    </div>
  );
}
