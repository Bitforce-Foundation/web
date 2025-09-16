export function normalizeBase(url: string): string {
  return url.replace(/\/$/, '')
}

export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL || 'https://bitforce-api.ru'
  return normalizeBase(raw)
}

export function getAuthBaseUrl(): string {
  const base = getApiBaseUrl()
  return base.endsWith('/api/v1') ? base : `${base}/api/v1`
}

