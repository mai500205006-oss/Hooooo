import type { WorkspaceFile } from './types';

export const mockFiles: WorkspaceFile[] = [
  {
    id: 'f1',
    name: 'App.tsx',
    path: 'src/App.tsx',
    kind: 'code',
    content: `function App() {\n  return <AppShell />;\n}\n\nexport default App;`,
  },
  {
    id: 'f2',
    name: 'README.md',
    path: 'README.md',
    kind: 'text',
    content: `RED KING\n\nمساحة عمل شخصية للتحليل والاستخبارات.`,
  },
  {
    id: 'f3',
    name: 'config.json',
    path: 'src/config.json',
    kind: 'json',
    content: JSON.stringify({ name: 'RED_KING', theme: 'dark', version: '0.1.0' }, null, 2),
  },
];

export const mockRecentFileIds = ['f1', 'f3'];
