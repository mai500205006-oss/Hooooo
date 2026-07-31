import { useEffect, useMemo, useState } from 'react';
import { logger } from '@utils/logger';
import { mockEvidence } from './data.mock';
import { DEFAULT_EVIDENCE_FILTERS } from './types';
import type { Evidence, EvidenceFiltersState, EvidenceType } from './types';

const STORAGE_KEY = 'red_king.evidence.v1';

function loadEvidence(): Evidence[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return mockEvidence;
    const parsed = JSON.parse(raw) as Evidence[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockEvidence;
  } catch (error) {
    logger.warn('Failed to read evidence from Local Storage — falling back to mock data', { error }, 'evidence');
    return mockEvidence;
  }
}

function saveEvidence(evidence: Evidence[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(evidence));
  } catch (error) {
    logger.error('Failed to persist evidence to Local Storage', error, 'evidence');
  }
}

/**
 * Hook مسؤول عن الـ Domain Data الخاصة بميزة Evidence Locker:
 * تحميل + حفظ تلقائي في Local Storage، بنفس نمط useNotes.ts —
 * مفيش Backend ولا API — Local Storage بس، حسب فلسفة المشروع الحالية.
 */
export function useEvidence() {
  const [isLoading, setIsLoading] = useState(true);
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<EvidenceFiltersState>(DEFAULT_EVIDENCE_FILTERS);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setEvidence(loadEvidence());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    saveEvidence(evidence);
  }, [evidence, isLoading]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return evidence
      .filter((e) => {
        const matchesQuery =
          q === '' ||
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.tags.some((tag) => tag.toLowerCase().includes(q));
        const matchesType = filters.type === 'all' || e.type === filters.type;
        return matchesQuery && matchesType;
      })
      .sort((a, b) => b.collectedAt.localeCompare(a.collectedAt));
  }, [evidence, query, filters]);

  const setType = (type: EvidenceType | 'all') => setFilters({ type });
  const activeEvidence = filtered.find((e) => e.id === activeId) ?? null;

  return { isLoading, evidence: filtered, query, setQuery, filters, setType, activeId, setActiveId, activeEvidence };
}
