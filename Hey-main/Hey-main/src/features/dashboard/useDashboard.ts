import { useEffect, useState } from 'react';
import { logger } from '@utils/logger';
import { mockActivity, mockStats, mockSystemStatus } from './data.mock';
import type { ActivityItem, StatItem, SystemStatusItem } from './types';

const STORAGE_KEY = 'red_king.dashboard.v1';

interface DashboardState {
  stats: StatItem[];
  activity: ActivityItem[];
  systemStatus: SystemStatusItem[];
}

function defaultState(): DashboardState {
  return {
    stats: mockStats,
    activity: mockActivity,
    systemStatus: mockSystemStatus,
  };
}

function loadState(): DashboardState {
  const seed = defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seed;

    const parsed = JSON.parse(raw) as Partial<DashboardState>;
    return {
      stats: Array.isArray(parsed.stats) && parsed.stats.length > 0 ? parsed.stats : seed.stats,
      activity: Array.isArray(parsed.activity) ? parsed.activity : seed.activity,
      systemStatus:
        Array.isArray(parsed.systemStatus) && parsed.systemStatus.length > 0
          ? parsed.systemStatus
          : seed.systemStatus,
    };
  } catch (error) {
    logger.warn('Failed to read dashboard state from Local Storage — falling back to defaults', { error }, 'dashboard');
    return seed;
  }
}

function saveState(state: DashboardState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    logger.error('Failed to persist dashboard state to Local Storage', error, 'dashboard');
  }
}

/**
 * Hook مسؤول عن الـ Domain Data الخاصة بميزة Dashboard:
 * تحميل + حفظ تلقائي في Local Storage، بنفس نمط useNotes.ts —
 * مفيش Backend ولا API — Local Storage بس، حسب فلسفة المشروع الحالية.
 */
export function useDashboard() {
  const [state] = useState<DashboardState>(() => loadState());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    saveState(state);
  }, [state, isLoading]);

  return {
    stats: state.stats,
    activity: state.activity,
    systemStatus: state.systemStatus,
    isLoading,
  };
}
