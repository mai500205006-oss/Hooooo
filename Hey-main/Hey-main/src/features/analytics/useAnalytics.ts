import { useEffect, useMemo, useState } from 'react';
import { logger } from '@utils/logger';
import {
  mockActivity,
  mockKpis,
  mockRecentActivity,
  mockSeverity,
  mockStatus,
  mockTopTags,
} from './data.mock';
import type {
  ActivityDatum,
  ActivityItem,
  DateRange,
  KpiDatum,
  SeverityDatum,
  StatusDatum,
  TagDatum,
} from './types';

const STORAGE_KEY = 'red_king.analytics.v1';

interface AnalyticsState {
  kpis: KpiDatum[];
  severity: SeverityDatum[];
  status: StatusDatum[];
  activity: ActivityDatum[];
  topTags: TagDatum[];
  recentActivity: ActivityItem[];
}

function defaultState(): AnalyticsState {
  return {
    kpis: mockKpis,
    severity: mockSeverity,
    status: mockStatus,
    activity: mockActivity,
    topTags: mockTopTags,
    recentActivity: mockRecentActivity,
  };
}

function loadState(): AnalyticsState {
  const seed = defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed;

    const parsed = JSON.parse(raw) as Partial<AnalyticsState>;
    return {
      kpis: Array.isArray(parsed.kpis) && parsed.kpis.length > 0 ? parsed.kpis : seed.kpis,
      severity: Array.isArray(parsed.severity) && parsed.severity.length > 0 ? parsed.severity : seed.severity,
      status: Array.isArray(parsed.status) && parsed.status.length > 0 ? parsed.status : seed.status,
      activity: Array.isArray(parsed.activity) && parsed.activity.length > 0 ? parsed.activity : seed.activity,
      topTags: Array.isArray(parsed.topTags) && parsed.topTags.length > 0 ? parsed.topTags : seed.topTags,
      recentActivity: Array.isArray(parsed.recentActivity) ? parsed.recentActivity : seed.recentActivity,
    };
  } catch (error) {
    logger.warn('Failed to read analytics state from Local Storage — falling back to defaults', { error }, 'analytics');
    return seed;
  }
}

function saveState(state: AnalyticsState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    logger.error('Failed to persist analytics state to Local Storage', error, 'analytics');
  }
}

/** مضاعف بسيط حسب المدى المختار — مجرد إحساس بصري بالتغيير، مفيش مصدر بيانات حقيقي */
const RANGE_MULTIPLIER: Record<DateRange, number> = {
  '7d': 1,
  '30d': 3.2,
  '90d': 7.5,
  all: 12,
};

export function useAnalytics() {
  const [state] = useState<AnalyticsState>(() => loadState());
  const [isLoading, setIsLoading] = useState(true);
  const [range, setRange] = useState<DateRange>('30d');

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    saveState(state);
  }, [state, isLoading]);

  const multiplier = RANGE_MULTIPLIER[range];

  const kpis = useMemo(
    () => state.kpis.map((k) => ({ ...k, value: Math.round(k.value * multiplier) })),
    [state.kpis, multiplier]
  );

  return {
    isLoading,
    range,
    setRange,
    kpis,
    severity: state.severity,
    status: state.status,
    activity: state.activity,
    topTags: state.topTags,
    recentActivity: state.recentActivity,
  };
}
