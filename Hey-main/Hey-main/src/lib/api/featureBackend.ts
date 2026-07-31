import { logger } from '@utils/logger';
import { hiveDelete, hiveGet, hivePost, hivePut, type HiveEnvelope } from './hiveClient';

function unwrap<T>(envelope: HiveEnvelope<T>): T {
  if (!envelope.success) {
    throw new Error(envelope.message ?? 'Backend request failed');
  }
  return envelope.data;
}

export function loadLocalState<T>(storageKey: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (error) {
    logger.warn(`Failed to parse local state for ${storageKey}`, { error }, 'featureBackend');
    return fallback;
  }
}

export function saveLocalState<T>(storageKey: string, value: T, scope: string): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
  } catch (error) {
    logger.error(`Failed to persist ${storageKey} to local state`, error, scope);
  }
}

export async function loadBackendState<T>(apiPath: string, storageKey: string, fallback: T, scope: string): Promise<T> {
  try {
    const response = await hiveGet<T>(apiPath);
    return unwrap(response);
  } catch (error) {
    logger.warn(`Backend load failed for ${scope}; falling back to local state`, { error, storageKey, apiPath }, scope);
    return loadLocalState(storageKey, fallback);
  }
}

export async function saveBackendState<T>(apiPath: string, storageKey: string, value: T, scope: string, usePut = false): Promise<void> {
  try {
    const response = usePut ? await hivePut<T>(apiPath, value) : await hivePost<T>(apiPath, value);
    unwrap(response);
  } catch (error) {
    logger.warn(`Backend save failed for ${scope}; persisting locally instead`, { error, storageKey, apiPath }, scope);
    saveLocalState(storageKey, value, scope);
  }
}

export async function deleteBackendState(apiPath: string, storageKey: string, scope: string): Promise<void> {
  try {
    const response = await hiveDelete(apiPath);
    unwrap(response);
  } catch (error) {
    logger.warn(`Backend delete failed for ${scope}; removing local state instead`, { error, storageKey, apiPath }, scope);
    try {
      localStorage.removeItem(storageKey);
    } catch (localError) {
      logger.error(`Failed to remove local state for ${storageKey}`, localError, scope);
    }
  }
}
