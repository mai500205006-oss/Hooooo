export function TextViewer({ content }: { content: string }) {
  return (
    <p className="text-sm text-rk-text whitespace-pre-wrap leading-relaxed">{content}</p>
  );
}
