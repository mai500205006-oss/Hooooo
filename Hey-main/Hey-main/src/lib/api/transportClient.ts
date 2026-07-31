export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  timeoutMs?: number;
}

export interface ApiErrorDetails {
  status: number;
  message: string;
  payload?: unknown;
}

export class ApiError extends Error {
  public readonly status: number;
  public readonly payload?: unknown;

  constructor(details: ApiErrorDetails) {
    super(details.message);
    this.name = 'ApiError';
    this.status = details.status;
    this.payload = details.payload;
  }
}

function buildUrl(path: string): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim() ?? '';
  const normalizedBase = baseUrl.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

function resolveBody(body: unknown): BodyInit | undefined {
  if (body === undefined || body === null) {
    return undefined;
  }

  if (body instanceof FormData || body instanceof Blob || body instanceof ArrayBuffer || body instanceof URLSearchParams) {
    return body as BodyInit;
  }

  if (typeof body === 'string') {
    return body;
  }

  return JSON.stringify(body);
}

export async function requestJson<TResponse = unknown>(path: string, options: RequestOptions = {}): Promise<TResponse> {
  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? Number(import.meta.env.VITE_API_TIMEOUT_MS ?? 10_000);
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  const headers = new Headers(options.headers ?? {});
  if (!headers.has('Content-Type') && options.body !== undefined && options.body !== null && typeof options.body !== 'string' && !(options.body instanceof FormData) && !(options.body instanceof Blob) && !(options.body instanceof ArrayBuffer) && !(options.body instanceof URLSearchParams)) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const response = await fetch(buildUrl(path), {
      method: options.method ?? 'GET',
      headers,
      body: resolveBody(options.body),
      signal: options.signal ?? controller.signal,
    });

    const contentType = response.headers.get('content-type') ?? '';
    const payload = contentType.includes('application/json') ? await response.json() : await response.text();

    if (!response.ok) {
      throw new ApiError({
        status: response.status,
        message: typeof payload === 'string' ? payload : 'Request failed',
        payload,
      });
    }

    return (payload ?? undefined) as TResponse;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError({ status: 408, message: 'Request timed out' });
    }

    throw new ApiError({
      status: 500,
      message: error instanceof Error ? error.message : 'Unexpected request error',
      payload: error,
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}
