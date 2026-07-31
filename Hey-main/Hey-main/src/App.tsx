import { useEffect, lazy, Suspense } from 'react';
import { AppShell } from '@components/layout';
import { CommandPalette, ComingSoon, LoadingSpinner, NotFound } from '@components/shared';
import { useUIStore } from '@store/uiStore';
import { Routes, Route } from 'react-router-dom';
import { WorkspaceContextProvider } from './context/WorkspaceContext';
import { APP_ROUTES } from '@constants/routes';

// كل Feature بتتحمل عند الحاجة فقط — بيقلل الحجم الأولي ويحسّن سرعة الفتح
const DashboardPage = lazy(() => import('@features/dashboard').then((m) => ({ default: m.DashboardPage })));
const InvestigationsPage = lazy(() => import('@features/investigations').then((m) => ({ default: m.InvestigationsPage })));
const WorkspacePage = lazy(() => import('@features/workspace').then((m) => ({ default: m.WorkspacePage })));
const FilesPage = lazy(() => import('@features/files').then((m) => ({ default: m.FilesPage })));
const SearchPage = lazy(() => import('@features/search').then((m) => ({ default: m.SearchPage })));
const NotesPage = lazy(() => import('@features/notes').then((m) => ({ default: m.NotesPage })));
const SettingsPage = lazy(() => import('@features/settings').then((m) => ({ default: m.SettingsPage })));
const PcapPage = lazy(() => import('@features/pcap').then((m) => ({ default: m.PcapPage })));
const ReportsPage = lazy(() => import('@features/reports').then((m) => ({ default: m.ReportsPage })));
const OsintPage = lazy(() => import('@features/osint').then((m) => ({ default: m.OsintPage })));
const TimelinePage = lazy(() => import('@features/timeline').then((m) => ({ default: m.TimelinePage })));
const CasesPage = lazy(() => import('@features/cases').then((m) => ({ default: m.CasesPage })));
const EvidencePage = lazy(() => import('@features/evidence').then((m) => ({ default: m.EvidencePage })));
const IocPage = lazy(() => import('@features/ioc').then((m) => ({ default: m.IocPage })));
const ThreatIntelPage = lazy(() => import('@features/threat-intel').then((m) => ({ default: m.ThreatIntelPage })));
const CorrelationPage = lazy(() => import('@features/correlation').then((m) => ({ default: m.CorrelationPage })));
const GraphPage = lazy(() => import('@features/graph').then((m) => ({ default: m.GraphPage })));
const AnalyticsPage = lazy(() => import('@features/analytics').then((m) => ({ default: m.AnalyticsPage })));
const ImportExportPage = lazy(() => import('@features/import-export').then((m) => ({ default: m.ImportExportPage })));
const AuditLogPage = lazy(() => import('@features/audit-log').then((m) => ({ default: m.AuditLogPage })));

function App() {
  const theme = useUIStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <WorkspaceContextProvider>
      <CommandPalette />
      <AppShell>
        <Suspense fallback={<LoadingSpinner label="Loading page..." />}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/investigations" element={<InvestigationsPage />} />
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="/files" element={<FilesPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/pcap" element={<PcapPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/osint" element={<OsintPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/evidence" element={<EvidencePage />} />
            <Route path="/ioc" element={<IocPage />} />
            <Route path="/threat-intel" element={<ThreatIntelPage />} />
            <Route path="/correlation" element={<CorrelationPage />} />
            <Route path="/graph" element={<GraphPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/import-export" element={<ImportExportPage />} />
            <Route path="/audit-log" element={<AuditLogPage />} />
            {APP_ROUTES.filter((r) => r.comingSoon).map((r) => (
              <Route key={r.path} path={r.path} element={<ComingSoon label={r.label} />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppShell>
    </WorkspaceContextProvider>
  );
}

export default App;
