import { useMemo } from 'react';
import { renderMarkdown } from '../markdown';

export function MarkdownPreview({ content }: { content: string }) {
  const html = useMemo(() => renderMarkdown(content), [content]);

  if (!content.trim()) {
    return <p className="text-rk-muted text-sm italic">Nothing to preview yet.</p>;
  }

  // HTML متولّد محليًا من محوّل Markdown بسيط بيعمل escape للمحتوى الخام أولًا قبل أي تحويل
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
