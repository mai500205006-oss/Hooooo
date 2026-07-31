import { useState } from 'react';
import { APP_VERSION } from '@config';
import { logger } from '@utils/logger';

const STORAGE_PREFIX = 'red_king.';

interface DataBundle {
  app: 'RED_KING';
  appVersion: string;
  exportedAt: string;
  data: Record<string, string>;
}

export type DataActionState = 'idle' | 'exported' | 'imported' | 'cleared' | 'error';

function collectKeys(): string[] {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(STORAGE_PREFIX)) keys.push(key);
  }
  return keys;
}

function isDataBundle(value: unknown): value is DataBundle {
  return (
    typeof value === 'object' &&
    value !== null &&
    (value as DataBundle).app === 'RED_KING' &&
    typeof (value as DataBundle).data === 'object'
  );
}

/**
 * Hook مسؤول عن إدارة كل البيانات المخزّنة محليًا عبر التطبيق كله
 * (مش feature واحدة بس) — Export / Import / Clear، كله Local Storage
 * بدون Backend ولا API، حسب فلسفة المشروع.
 */
export function useLocalData() {
  const [state, setState] = useState<DataActionState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const keys = collectKeys();
  const keyCount = keys.length;

  const exportData = (): void => {
    try {
      const data: Record<string, string> = {};
      for (const key of keys) {
        const value = localStorage.getItem(key);
        if (value !== null) data[key] = value;
      }

      const bundle: DataBundle = {
        app: 'RED_KING',
        appVersion: APP_VERSION,
        exportedAt: new Date().toISOString(),
        data,
      };

      const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `red-king-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);

      setState('exported');
      setErrorMessage(null);
    } catch (error) {
      logger.error('Failed to export local data', error, 'settings');
      setState('error');
      setErrorMessage('تعذّر تصدير البيانات.');
    }
  };

  const importData = async (file: File): Promise<void> => {
    try {
      const text = await file.text();
      const parsed: unknown = JSON.parse(text);

      if (!isDataBundle(parsed)) {
        throw new Error('Invalid RED KING backup file');
      }

      for (const [key, value] of Object.entries(parsed.data)) {
        if (key.startsWith(STORAGE_PREFIX)) localStorage.setItem(key, value);
      }

      setState('imported');
      setErrorMessage(null);
      // كل الـ stores والـ hooks بتقرأ من Local Storage عند التحميل بس —
      // إعادة تحميل الصفحة أبسط طريقة تضمن إن كل حاجة تتزامن مع البيانات المستوردة
      window.location.reload();
    } catch (error) {
      logger.error('Failed to import local data', error, 'settings');
      setState('error');
      setErrorMessage('الملف ده مش نسخة احتياطية صالحة من RED KING.');
    }
  };

  const clearData = (): void => {
    try {
      for (const key of keys) localStorage.removeItem(key);
      setState('cleared');
      setErrorMessage(null);
      window.location.reload();
    } catch (error) {
      logger.error('Failed to clear local data', error, 'settings');
      setState('error');
      setErrorMessage('تعذّر مسح البيانات.');
    }
  };

  return { keyCount, state, errorMessage, exportData, importData, clearData };
}
