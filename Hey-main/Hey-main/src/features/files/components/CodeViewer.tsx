export function CodeViewer({ content }: { content: string }) {
  return (
    <pre className="bg-rk-bg border border-rk-border rounded-md p-3 text-sm font-mono text-rk-text overflow-auto">
      {content}
    </pre>
  );
}
