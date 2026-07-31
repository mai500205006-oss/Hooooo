import { useEffect, useMemo, useState } from 'react';
import { logger } from '@utils/logger';
import { mockTimelineEvents } from './data.mock';
import type { TimelineEvent, TimelineFiltersState, TimelineEventType } from './types';
import { DEFAULT_TIMELINE_FILTERS } from './types';

const STORAGE_KEY = 'red_king.timeline.v1';

function loadEvents(): TimelineEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return mockTimelineEvents;
    const parsed = JSON.parse(raw) as TimelineEvent[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockTimelineEvents;
  } catch (error) {
    logger.warn('Failed to read timeline events from Local Storage — falling back to mock data', { error }, 'timeline');
    return mockTimelineEvents;
  }
}

function saveEvents(events: TimelineEvent[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    logger.error('Failed to persist timeline events to Local Storage', error, 'timeline');
  }
}

/**
 * Hook مسؤول عن الـ Domain Data الخاصة بميزة Timeline:
 * تحميل + حفظ تلقائي في Local Storage، بنفس نمط useNotes.ts —
 * مفيش Backend ولا API — Local Storage بس، حسب فلسفة المشروع الحالية.
 */
export function useTimeline() {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<TimelineFiltersState>(DEFAULT_TIMELINE_FILTERS);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setEvents(loadEvents());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    saveEvents(events);
  }, [events, isLoading]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events
      .filter((e) => {
        const matchesQuery =
          q === '' || e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q);
        const matchesType = filters.type === 'all' || e.type === filters.type;
        return matchesQuery && matchesType;
      })
      .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
  }, [events, query, filters]);

  const setType = (type: TimelineEventType | 'all') => setFilters({ type });
  const activeEvent = filtered.find((e) => e.id === activeId) ?? null;

  return { isLoading, events: filtered, query, setQuery, filters, setType, activeId, setActiveId, activeEvent };
}
