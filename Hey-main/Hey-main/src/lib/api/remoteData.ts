import { logger } from '@utils/logger';
import { hiveDelete, hiveGet, hivePost, hivePut, HiveEnvelope } from './hiveClient';

async function unwrapEnvelope<T>(envelope: HiveEnvelope<T>): Promise<T> {
  if (!envelope.success) {
    throw new Error(envelope.message ?? 'Backend responded with failure');
  }
  return envelope.data;
}

export async function fetchRemoteOrFallback<T>(path: string, fallback: T, scope: string): Promise<T> {
  try {
    const envelope = await hiveGet<T>(path);
    return await unwrapEnvelope(envelope);
  } catch (error) {
    logger.warn(`Backend unavailable for ${scope}, falling back to local defaults`, { error }, scope);
    return fallback;
  }
}

export async function postRemote<T>(path: string, body: unknown, scope: string): Promise<T | null> {
  try {
    const envelope = await hivePost<T>(path, body);
    return await unwrapEnvelope(envelope);
  } catch (error) {
    logger.warn(`Backend POST failed for ${scope}`, { error }, scope);
    return null;
  }
}

export async function putRemote<T>(path: string, body: unknown, scope: string): Promise<T | null> {
  try {
    const envelope = await hivePut<T>(path, body);
    return await unwrapEnvelope(envelope);
  } catch (error) {
    logger.warn(`Backend PUT failed for ${scope}`, { error }, scope);
    return null;
  }
}

export async function deleteRemote<T>(path: string, scope: string): Promise<T | null> {
  try {
    const envelope = await hiveDelete<T>(path);
    return await unwrapEnvelope(envelope);
  } catch (error) {
    logger.warn(`Backend DELETE failed for ${scope}`, { error }, scope);
    return null;
  }
}
