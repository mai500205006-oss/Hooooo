import { useMemo, useState } from 'react';
import { PageHeader, LoadingSpinner } from '@components/shared';
import { registerPlugin } from '@plugins-core';
import { useReports } from './useReports';
import { ReportToolbar } from './components/ReportToolbar';
import { ReportFilters } from './components/ReportFilters';
import { ReportList } from './components/ReportList';
import { ReportViewer } from './components/ReportViewer';
import { DEFAULT_REPORT_FILTERS, type ReportFiltersState, type ReportSortMode } from './types';

registerPlugin({ id: 'reports', name: 'Reports', version: '0.1.0', slot: 'main' });

export function ReportsPage() {
  // UI state — محلي على الصفحة، مش مشترك عبر التطبيق
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<ReportSortMode>('newest');
  const [filters, setFilters] = useState<ReportFiltersState>(DEFAULT_REPORT_FILTERS);
  const [activeId, setActiveId] = useState<string | null>(null);

  const { reports, isLoading } = useReports();

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === '' || r.title.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q);
      const matchesCategory = filters.category === 'all' || r.category === filters.category;
      return matchesQuery && matchesCategory;
    });
  }, [reports, query, filters]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    switch (sort) {
      case 'oldest':
        return copy.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      case 'az':
        return copy.sort((a, b) => a.title.localeCompare(b.title));
      case 'newest':
      default:
        return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
  }, [filtered, sort]);

  const activeReport = sorted.find((r) => r.id === activeId) ?? null;

  return (
    <div>
      <PageHeader title="Reports" subtitle="Browse, search, and export mock reports" />

      {isLoading ? (
        <LoadingSpinner label="Loading reports..." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-1 space-y-4">
            <ReportFilters filters={filters} onChange={setFilters} />
          </div>

          <div className="lg:col-span-1 space-y-3">
            <ReportToolbar query={query} onQueryChange={setQuery} sort={sort} onSortChange={setSort} />
            <ReportList reports={sorted} activeId={activeId} onSelect={setActiveId} />
          </div>

          <div className="lg:col-span-2">
            <ReportViewer report={activeReport} />
          </div>
        </div>
      )}
    </div>
  );
}
