import { PageHeader } from '@components/shared';
import { registerPlugin } from '@plugins-core';
import { AppearanceSection } from './components/AppearanceSection';
import { DataManagementSection } from './components/DataManagementSection';
import { AboutSection } from './components/AboutSection';

registerPlugin({ id: 'settings', name: 'Settings', version: '0.1.0', slot: 'main' });

export function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" subtitle="Appearance, data, and app info" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AppearanceSection />
        <DataManagementSection />
        <div className="lg:col-span-2">
          <AboutSection />
        </div>
      </div>
    </div>
  );
}
