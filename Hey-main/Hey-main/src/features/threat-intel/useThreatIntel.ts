import { useEffect, useMemo, useState } from 'react';
import { logger } from '@utils/logger';
import { mockThreatFeed } from './data.mock';
import { DEFAULT_THREAT_FILTERS } from './types';
import type { ThreatEntry, ThreatFiltersState, ThreatSeverity, ThreatSource } from './types';

const STORAGE_KEY = 'red_king.threat_intel.v1';

function loadFeed(): ThreatEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return mockThreatFeed;
    const parsed = JSON.parse(raw) as ThreatEntry[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockThreatFeed;
  } catch (error) {
    logger.warn('Failed to read threat feed from Local Storage — falling back to mock data', { error }, 'threat-intel');
    return mockThreatFeed;
  }
}

function saveFeed(feed: ThreatEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feed));
  } catch (error) {
    logger.error('Failed to persist threat feed to Local Storage', error, 'threat-intel');
  }
}

/**
 * Hook مسؤول عن الـ Domain Data الخاصة بميزة Threat Intelligence:
 * تحميل + حفظ تلقائي في Local Storage، بنفس نمط useNotes.ts —
 * مفيش Backend ولا API — Local Storage بس، حسب فلسفة المشروع الحالية.
 */
export function useThreatIntel() {
  const [isLoading, setIsLoading] = useState(true);
  const [feed, setFeed] = useState<ThreatEntry[]>([]);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<ThreatFiltersState>(DEFAULT_THREAT_FILTERS);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setFeed(loadFeed());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    saveFeed(feed);
  }, [feed, isLoading]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return feed
      .filter((entry) => {
        const matchesQuery =
          q === '' ||
          entry.title.toLowerCase().includes(q) ||
          entry.summary.toLowerCase().includes(q) ||
          entry.actor.name.toLowerCase().includes(q) ||
          entry.malwareFamily.name.toLowerCase().includes(q);
        const matchesSeverity = filters.severity === 'all' || entry.severity === filters.severity;
        const matchesSource = filters.source === 'all' || entry.source === filters.source;
        return matchesQuery && matchesSeverity && matchesSource;
      })
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [feed, query, filters]);

  const setSeverity = (severity: ThreatSeverity | 'all') => setFilters((prev) => ({ ...prev, severity }));
  const setSource = (source: ThreatSource | 'all') => setFilters((prev) => ({ ...prev, source }));
  const activeEntry = filtered.find((entry) => entry.id === activeId) ?? null;

  return {
    isLoading,
    feed: filtered,
    query,
    setQuery,
    filters,
    setSeverity,
    setSource,
    activeId,
    setActiveId,
    activeEntry,
  };
}
