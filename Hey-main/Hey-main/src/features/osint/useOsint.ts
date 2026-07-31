import { useCallback, useEffect, useState } from 'react';
import { logger } from '@utils/logger';
import { mockOsintResults } from './data.mock';
import type { OsintResult, OsintSource, QueryHistoryEntry } from './types';

const LOAD_DELAY_MS = 500;
const CORPUS_STORAGE_KEY = 'red_king.osint.corpus.v1';
const HISTORY_STORAGE_KEY = 'red_king.osint.history.v1';
let historyCounter = 1;

function loadCorpus(): OsintResult[] {
  try {
    const raw = localStorage.getItem(CORPUS_STORAGE_KEY);
    if (!raw) return mockOsintResults;
    const parsed = JSON.parse(raw) as OsintResult[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockOsintResults;
  } catch (error) {
    logger.warn('Failed to read OSINT corpus from Local Storage — falling back to mock data', { error }, 'osint');
    return mockOsintResults;
  }
}

function loadHistory(): QueryHistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as QueryHistoryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    logger.warn('Failed to read OSINT history from Local Storage — falling back to empty history', { error }, 'osint');
    return [];
  }
}

function saveHistory(history: QueryHistoryEntry[]): void {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    logger.error('Failed to persist OSINT history to Local Storage', error, 'osint');
  }
}

/**
 * Hook مسؤول عن كل الـ Domain State الخاصة بميزة OSINT.
 * الـ Corpus بيتحمّل من Local Storage (مع بيانات Mock كـ seed)،
 * والـ History بيتحفظ تلقائي — بنفس نمط useNotes.ts.
 */
export function useOsint() {
  const [corpus] = useState<OsintResult[]>(() => loadCorpus());
  const [query, setQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<OsintSource | 'all'>('all');
  const [results, setResults] = useState<OsintResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [history, setHistory] = useState<QueryHistoryEntry[]>([]);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);

  useEffect(() => {
    setHistory(loadHistory());
    setIsHistoryLoaded(true);
  }, []);

  useEffect(() => {
    if (!isHistoryLoaded) return;
    saveHistory(history);
  }, [history, isHistoryLoaded]);

  const search = useCallback(
    (searchQuery: string, source: OsintSource | 'all') => {
      const q = searchQuery.trim();
      if (q === '') return;

      setIsLoading(true);
      setHasSearched(true);
      setActiveId(null);

      window.setTimeout(() => {
        const matched = corpus.filter((r) => {
          const matchesQuery =
            r.query.toLowerCase().includes(q.toLowerCase()) ||
            r.title.toLowerCase().includes(q.toLowerCase()) ||
            r.summary.toLowerCase().includes(q.toLowerCase());
          const matchesSource = source === 'all' || r.source === source;
          return matchesQuery && matchesSource;
        });

        setResults(matched);
        setIsLoading(false);

        // تسجيل في الـ History
        setHistory((prev) => [
          {
            id: `h${historyCounter++}`,
            query: q,
            source,
            resultsCount: matched.length,
            searchedAt: new Date().toISOString(),
          },
          ...prev.slice(0, 19), // الاحتفاظ بآخر 20 بحث بس
        ]);
      }, LOAD_DELAY_MS);
    },
    [corpus],
  );

  const replayHistory = useCallback(
    (entry: QueryHistoryEntry) => {
      setQuery(entry.query);
      setSourceFilter(entry.source);
      search(entry.query, entry.source);
    },
    [search],
  );

  const clearHistory = useCallback(() => setHistory([]), []);

  const activeResult = results.find((r) => r.id === activeId) ?? null;

  return {
    query,
    setQuery,
    sourceFilter,
    setSourceFilter,
    results,
    isLoading,
    hasSearched,
    activeId,
    setActiveId,
    activeResult,
    history,
    replayHistory,
    clearHistory,
    search,
  };
}
