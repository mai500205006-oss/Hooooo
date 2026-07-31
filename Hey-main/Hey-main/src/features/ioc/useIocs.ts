import { useEffect, useMemo, useState } from 'react';
import { logger } from '@utils/logger';
import { mockIocs } from './data.mock';
import { DEFAULT_IOC_FILTERS } from './types';
import type { Ioc, IocFiltersState, IocStatus, IocType } from './types';

const STORAGE_KEY = 'red_king.ioc.v1';

function loadIocs(): Ioc[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return mockIocs;
    const parsed = JSON.parse(raw) as Ioc[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockIocs;
  } catch (error) {
    logger.warn('Failed to read IOCs from Local Storage — falling back to mock data', { error }, 'ioc');
    return mockIocs;
  }
}

function saveIocs(iocs: Ioc[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(iocs));
  } catch (error) {
    logger.error('Failed to persist IOCs to Local Storage', error, 'ioc');
  }
}

/**
 * Hook مسؤول عن الـ Domain Data الخاصة بميزة IOC Manager:
 * تحميل + حفظ تلقائي في Local Storage، بنفس نمط useNotes.ts —
 * مفيش Backend ولا API — Local Storage بس، حسب فلسفة المشروع الحالية.
 */
export function useIocs() {
  const [isLoading, setIsLoading] = useState(true);
  const [iocs, setIocs] = useState<Ioc[]>([]);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<IocFiltersState>(DEFAULT_IOC_FILTERS);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setIocs(loadIocs());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    saveIocs(iocs);
  }, [iocs, isLoading]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return iocs
      .filter((ioc) => {
        const matchesQuery =
          q === '' ||
          ioc.value.toLowerCase().includes(q) ||
          ioc.description.toLowerCase().includes(q) ||
          ioc.tags.some((tag) => tag.toLowerCase().includes(q));
        const matchesType = filters.type === 'all' || ioc.type === filters.type;
        const matchesStatus = filters.status === 'all' || ioc.status === filters.status;
        return matchesQuery && matchesType && matchesStatus;
      })
      .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen));
  }, [iocs, query, filters]);

  const setType = (type: IocType | 'all') => setFilters((prev) => ({ ...prev, type }));
  const setStatus = (status: IocStatus | 'all') => setFilters((prev) => ({ ...prev, status }));
  const activeIoc = filtered.find((ioc) => ioc.id === activeId) ?? null;

  return {
    isLoading,
    iocs: filtered,
    query,
    setQuery,
    filters,
    setType,
    setStatus,
    activeId,
    setActiveId,
    activeIoc,
  };
}
