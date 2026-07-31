import { PageHeader, LoadingSpinner } from '@components/shared';
import { registerPlugin } from '@plugins-core';
import { useAnalytics } from './useAnalytics';
import { KpiCards } from './components/KpiCards';
import { DateRangeSelector } from './components/DateRangeSelector';
import { SeverityBarChart } from './components/SeverityBarChart';
import { StatusBarChart } from './components/StatusBarChart';
import { ActivitySummaryChart } from './components/ActivitySummaryChart';
import { TopTagsTable } from './components/TopTagsTable';
import { RecentActivityPanel } from './components/RecentActivityPanel';

registerPlugin({ id: 'analytics', name: 'Analytics', version: '0.1.0', slot: 'main' });

export function AnalyticsPage() {
  const { isLoading, range, setRange, kpis, severity, status, activity, topTags, recentActivity } =
    useAnalytics();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <PageHeader title="Analytics" subtitle="Personal overview across the whole workspace" />
        <DateRangeSelector value={range} onChange={setRange} />
      </div>

      {isLoading ? (
        <LoadingSpinner label="Crunching numbers..." />
      ) : (
        <div className="space-y-4">
          <KpiCards kpis={kpis} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SeverityBarChart data={severity} />
            <StatusBarChart data={status} />
          </div>

          <ActivitySummaryChart data={activity} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TopTagsTable data={topTags} />
            <RecentActivityPanel items={recentActivity} />
          </div>
        </div>
      )}
    </div>
  );
}
