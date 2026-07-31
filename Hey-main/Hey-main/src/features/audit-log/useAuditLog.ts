import { useEffect, useMemo, useState } from 'react';
import { logger } from '@utils/logger';
import { mockAuditLog } from './data.mock';
import type { AuditLogEntry, AuditLogFiltersState, AuditActionType } from './types';
import { DEFAULT_AUDIT_FILTERS } from './types';

const STORAGE_KEY = 'red_king.audit_log.v1';

function loadEntries(): AuditLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return mockAuditLog;
    const parsed = JSON.parse(raw) as AuditLogEntry[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockAuditLog;
  } catch (error) {
    logger.warn('Failed to read audit log from Local Storage — falling back to mock data', { error }, 'audit-log');
    return mockAuditLog;
  }
}

function saveEntries(entries: AuditLogEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    logger.error('Failed to persist audit log to Local Storage', error, 'audit-log');
  }
}

/**
 * Hook مسؤول عن الـ Domain Data الخاصة بميزة Audit Log:
 * تحميل + حفظ تلقائي في Local Storage، بنفس نمط useNotes.ts —
 * مفيش Backend ولا API — Local Storage بس، حسب فلسفة المشروع الحالية.
 */
export function useAuditLog() {
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState<AuditLogEntry[]>([]);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<AuditLogFiltersState>(DEFAULT_AUDIT_FILTERS);

  useEffect(() => {
    setEntries(loadEntries());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    saveEntries(entries);
  }, [entries, isLoading]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries
      .filter((e) => {
        const matchesQuery =
          q === '' ||
          e.action.toLowerCase().includes(q) ||
          e.actor.toLowerCase().includes(q) ||
          e.target.toLowerCase().includes(q);
        const matchesType = filters.type === 'all' || e.type === filters.type;
        return matchesQuery && matchesType;
      })
      .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
  }, [entries, query, filters]);

  const setType = (type: AuditActionType | 'all') => setFilters({ type });

  return { isLoading, entries: filtered, query, setQuery, filters, setType };
}
