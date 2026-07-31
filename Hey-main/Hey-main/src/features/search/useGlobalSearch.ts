import { useEffect, useMemo, useState } from 'react';
import { logger } from '@utils/logger';
import { mockSearchIndex } from './data.mock';
import type { SearchCategory, SearchResult } from './types';

const STORAGE_KEY = 'red_king.search_index.v1';

function loadIndex(): SearchResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return mockSearchIndex;
    const parsed = JSON.parse(raw) as SearchResult[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockSearchIndex;
  } catch (error) {
    logger.warn('Failed to read search index from Local Storage — falling back to mock data', { error }, 'search');
    return mockSearchIndex;
  }
}

function saveIndex(index: SearchResult[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(index));
  } catch (error) {
    logger.error('Failed to persist search index to Local Storage', error, 'search');
  }
}

export function useGlobalSearch() {
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory | 'all'>('all');

  useEffect(() => {
    setIndex(loadIndex());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    saveIndex(index);
  }, [index, isLoading]);

  const categories = useMemo(
    () => Array.from(new Set(index.map((r) => r.category))).sort((a, b) => a.localeCompare(b)),
    [index]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return index.filter((r) => {
      const matchesQuery =
        q === '' || r.title.toLowerCase().includes(q) || r.snippet.toLowerCase().includes(q);
      const matchesCategory = category === 'all' || r.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [index, query, category]);

  return { isLoading, query, setQuery, category, setCategory, categories, results };
}
