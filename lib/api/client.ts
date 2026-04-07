const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.trelvoltd.com/dollwigs/api'

interface RequestOptions {
  method?: string
  body?: unknown
  headers?: Record<string, string>
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('accessToken')
}

function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('refreshToken')
}

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export function clearTokens() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export async function api<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options
  const token = getToken()

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  // Try token refresh on 401
  if (res.status === 401 && getRefreshToken()) {
    const refreshed = await tryRefresh()
    if (refreshed) {
      return api<T>(path, options)
    }
    clearTokens()
    window.dispatchEvent(new Event('auth:logout'))
    throw new ApiError(401, 'Session expired')
  }

  if (res.status === 204) return undefined as T

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new ApiError(res.status, err.error || err.message || res.statusText)
  }

  return res.json()
}

async function tryRefresh(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: getRefreshToken() }),
    })
    if (!res.ok) return false
    const data = await res.json()
    localStorage.setItem('accessToken', data.accessToken)
    return true
  } catch {
    return false
  }
}
