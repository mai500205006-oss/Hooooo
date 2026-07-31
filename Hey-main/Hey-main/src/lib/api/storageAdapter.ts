import { logger } from '@utils/logger';
import { hiveDelete, hiveGet, hivePost, HiveEnvelope } from './hiveClient';

const STORAGE_API_BASE = '/api/storage';

function storagePath(key: string): string {
  return `${STORAGE_API_BASE}/${encodeURIComponent(key)}`;
}

interface StorageEnvelope<T> {
  value: T;
}

async function unwrap<T>(envelope: HiveEnvelope<StorageEnvelope<T>>): Promise<T> {
  if (!envelope.success) {
    throw new Error(envelope.message ?? 'Storage request failed');
  }
  return envelope.data.value;
}

function loadLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (error) {
    logger.warn(`Failed to parse local storage for ${key}`, { error }, 'storageAdapter');
    return fallback;
  }
}

async function loadRemote<T>(key: string): Promise<T | null> {
  try {
    return await unwrap<T>(await hiveGet<StorageEnvelope<T>>(storagePath(key)));
  } catch (error) {
    logger.warn(`Failed to load remote storage for ${key}`, { error }, 'storageAdapter');
    return null;
  }
}

export function loadFeatureDataLocal<T>(key: string, fallback: T): T {
  return loadLocal(key, fallback);
}

export async function loadFeatureDataRemote<T>(key: string, fallback: T, scope: string): Promise<T> {
  const remote = await loadRemote<T>(key);
  if (remote !== null) return remote;
  logger.info(`Falling back to local data for ${scope}`, { key }, 'storageAdapter');
  return fallback;
}

export async function saveFeatureData<T>(key: string, value: T, scope: string): Promise<void> {
  try {
    await hivePost<StorageEnvelope<T>>(storagePath(key), { value });
  } catch (error) {
    logger.warn(`Failed to save remote storage for ${scope}`, { error }, scope);
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (localError) {
      logger.error(`Failed to persist ${key} to local storage as fallback`, localError, scope);
    }
  }
}

export async function deleteFeatureData(key: string, scope: string): Promise<void> {
  try {
    await hiveDelete(storagePath(key));
  } catch (error) {
    logger.warn(`Failed to delete remote storage for ${scope}`, { error }, scope);
    localStorage.removeItem(key);
  }
}
