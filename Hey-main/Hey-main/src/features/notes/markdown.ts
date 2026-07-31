/**
 * محوّل Markdown بسيط جدًا لعرض الـ Live Preview — بدون أي مكتبة خارجية.
 * بيغطي الأساسيات بس (headers, bold, italic, code, links, lists, quotes).
 * مش parser كامل — الهدف معاينة سريعة، مش توافق 100% مع CommonMark.
 */

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderInline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-rk-bg border border-rk-border text-xs">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-rk-accent hover:underline" target="_blank" rel="noreferrer">$1</a>'
    );
}

export function renderMarkdown(markdown: string): string {
  const safe = escapeHtml(markdown);
  const lines = safe.split('\n');
  const html: string[] = [];
  let listOpen = false;
  let codeOpen = false;

  const closeList = () => {
    if (listOpen) {
      html.push('</ul>');
      listOpen = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine;

    if (line.trim().startsWith('```')) {
      codeOpen = !codeOpen;
      html.push(codeOpen ? '<pre class="bg-rk-bg border border-rk-border rounded-md p-2 text-xs overflow-x-auto"><code>' : '</code></pre>');
      continue;
    }
    if (codeOpen) {
      html.push(line + '\n');
      continue;
    }

    if (/^###\s+/.test(line)) {
      closeList();
      html.push(`<h3 class="text-sm font-semibold text-rk-text mt-3 mb-1">${renderInline(line.replace(/^###\s+/, ''))}</h3>`);
    } else if (/^##\s+/.test(line)) {
      closeList();
      html.push(`<h2 class="text-base font-semibold text-rk-text mt-3 mb-1">${renderInline(line.replace(/^##\s+/, ''))}</h2>`);
    } else if (/^#\s+/.test(line)) {
      closeList();
      html.push(`<h1 class="text-lg font-semibold text-rk-text mt-3 mb-1">${renderInline(line.replace(/^#\s+/, ''))}</h1>`);
    } else if (/^>\s?/.test(line)) {
      closeList();
      html.push(`<blockquote class="border-s-2 border-rk-accent ps-2 text-rk-muted italic">${renderInline(line.replace(/^>\s?/, ''))}</blockquote>`);
    } else if (/^[-*]\s+/.test(line)) {
      if (!listOpen) {
        html.push('<ul class="list-disc ps-5 space-y-0.5">');
        listOpen = true;
      }
      html.push(`<li>${renderInline(line.replace(/^[-*]\s+/, ''))}</li>`);
    } else if (line.trim() === '') {
      closeList();
    } else {
      closeList();
      html.push(`<p class="text-sm text-rk-text leading-relaxed">${renderInline(line)}</p>`);
    }
  }
  closeList();

  return html.join('\n');
}
