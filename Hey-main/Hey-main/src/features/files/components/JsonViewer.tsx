export function JsonViewer({ content }: { content: string }) {
  return (
    <pre className="bg-rk-bg border border-rk-border rounded-md p-3 text-sm font-mono text-green-400 overflow-auto">
      {content}
    </pre>
  );
}
