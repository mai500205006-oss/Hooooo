/**
 * مصدر واحد لمسارات التطبيق — بيتستخدم في Sidebar, CommandPalette, وأي
 * مكان تاني محتاج يعرف صفحات التطبيق. أي صفحة جديدة تتضاف هنا بس.
 */

export interface AppRoute {
  path: string;
  label: string;
  /** الصفحات اللي لسه مبنيتش بتظهر بـ ComingSoon بدل Feature حقيقي */
  comingSoon?: boolean;
}

export const APP_ROUTES: readonly AppRoute[] = [
  { path: '/', label: 'Dashboard' },
  { path: '/investigations', label: 'Investigations' },
  { path: '/workspace', label: 'Workspace' },
  { path: '/files', label: 'Files' },
  { path: '/search', label: 'Global Search' },
  { path: '/notes', label: 'Notes' },
  { path: '/pcap', label: 'PCAP Viewer' },
  { path: '/copilot', label: 'AI Copilot', comingSoon: true },
  { path: '/reports', label: 'Reports' },
  { path: '/osint', label: 'OSINT' },
  { path: '/timeline', label: 'Timeline' },
  { path: '/cases', label: 'Case Builder' },
  { path: '/evidence', label: 'Evidence Locker' },
  { path: '/ioc', label: 'IOC Manager' },
  { path: '/threat-intel', label: 'Threat Intelligence' },
  { path: '/correlation', label: 'Correlation Engine' },
  { path: '/graph', label: 'Graph Explorer' },
  { path: '/analytics', label: 'Analytics' },
  { path: '/import-export', label: 'Import / Export' },
  { path: '/audit-log', label: 'Audit Log' },
  { path: '/settings', label: 'Settings' },
] as const;
