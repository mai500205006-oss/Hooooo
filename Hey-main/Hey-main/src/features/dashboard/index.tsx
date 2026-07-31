import { StatsWidget } from './components/StatsWidget';
import { ActivityWidget } from './components/ActivityWidget';
import { SystemStatusWidget } from './components/SystemStatusWidget';
import { PageHeader } from '@components/shared/PageHeader';
import { registerPlugin } from '@plugins-core';

registerPlugin({ id: 'dashboard', name: 'Dashboard', version: '0.1.0', slot: 'main' });

export function DashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <StatsWidget />
        </div>
        <ActivityWidget />
        <SystemStatusWidget />
      </div>
    </div>
  );
}
