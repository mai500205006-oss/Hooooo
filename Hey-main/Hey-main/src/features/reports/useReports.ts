import { useEffect, useState } from 'react';
import { logger } from '@utils/logger';
import { mockReports } from './data.mock';
import type { Report } from './types';

const STORAGE_KEY = 'red_king.reports.v1';

function loadReports(): Report[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return mockReports;
    const parsed = JSON.parse(raw) as Report[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockReports;
  } catch (error) {
    logger.warn('Failed to read reports from Local Storage — falling back to mock data', { error }, 'reports');
    return mockReports;
  }
}

function saveReports(reports: Report[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (error) {
    logger.error('Failed to persist reports to Local Storage', error, 'reports');
  }
}

/**
 * Hook مسؤول عن الـ Domain Data الخاصة بميزة Reports:
 * تحميل + حفظ تلقائي في Local Storage، بنفس نمط useNotes.ts —
 * مفيش Backend ولا API — Local Storage بس، حسب فلسفة المشروع الحالية.
 */
export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setReports(loadReports());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    saveReports(reports);
  }, [reports, isLoading]);

  return { reports, isLoading };
}
