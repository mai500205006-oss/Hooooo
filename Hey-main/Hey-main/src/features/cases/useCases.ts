import { useEffect, useMemo, useState } from 'react';
import { logger } from '@utils/logger';
import { mockCases } from './data.mock';
import { DEFAULT_CASE_FILTERS } from './types';
import type { Case, CaseFiltersState, CaseStatus } from './types';

const STORAGE_KEY = 'red_king.cases.v1';

function loadCases(): Case[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return mockCases;
    const parsed = JSON.parse(raw) as Case[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockCases;
  } catch (error) {
    logger.warn('Failed to read cases from Local Storage — falling back to mock data', { error }, 'cases');
    return mockCases;
  }
}

function saveCases(cases: Case[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
  } catch (error) {
    logger.error('Failed to persist cases to Local Storage', error, 'cases');
  }
}

/**
 * Hook مسؤول عن الـ Domain Data الخاصة بميزة Case Builder:
 * تحميل + حفظ تلقائي في Local Storage، بنفس نمط useNotes.ts —
 * مفيش Backend ولا API — Local Storage بس، حسب فلسفة المشروع الحالية.
 */
export function useCases() {
  const [isLoading, setIsLoading] = useState(true);
  const [cases, setCases] = useState<Case[]>([]);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<CaseFiltersState>(DEFAULT_CASE_FILTERS);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setCases(loadCases());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    saveCases(cases);
  }, [cases, isLoading]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cases
      .filter((c) => {
        const matchesQuery = q === '' || c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q);
        const matchesStatus = filters.status === 'all' || c.status === filters.status;
        return matchesQuery && matchesStatus;
      })
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [cases, query, filters]);

  const setStatus = (status: CaseStatus | 'all') => setFilters({ status });
  const activeCase = filtered.find((c) => c.id === activeId) ?? null;

  return { isLoading, cases: filtered, query, setQuery, filters, setStatus, activeId, setActiveId, activeCase };
}
