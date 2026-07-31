import { requestJson, type RequestOptions } from './transportClient';

export interface HiveEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

export async function hiveRequest<TResponse = unknown>(path: string, options: RequestOptions = {}): Promise<HiveEnvelope<TResponse>> {
  const response = await requestJson<TResponse>(path, options);
  return {
    success: true,
    data: response,
  };
}

export async function hiveGet<TResponse = unknown>(path: string): Promise<HiveEnvelope<TResponse>> {
  return hiveRequest<TResponse>(path, { method: 'GET' });
}

export async function hivePost<TResponse = unknown>(path: string, body?: unknown): Promise<HiveEnvelope<TResponse>> {
  return hiveRequest<TResponse>(path, { method: 'POST', body });
}

export async function hivePut<TResponse = unknown>(path: string, body?: unknown): Promise<HiveEnvelope<TResponse>> {
  return hiveRequest<TResponse>(path, { method: 'PUT', body });
}

export async function hiveDelete<TResponse = unknown>(path: string): Promise<HiveEnvelope<TResponse>> {
  return hiveRequest<TResponse>(path, { method: 'DELETE' });
}
