import { env } from '../config/env'

const getBaseUrl = () => env.apiBaseUrl
let apiClientSingleton = null

/**
 * Build the full API URL.
 * When backend is connected, use this for all requests.
 */
export const buildApiUrl = (path) => {
  const base = getBaseUrl().replace(/\/$/, '') 
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return base ? `${base}${normalizedPath}` : normalizedPath 
}

/**
 * Unified HTTP client - one place to manage headers, token, and error handling.
 * Later: add Authorization header from store or token storage.
 */
export async function apiRequest(path, options = {}) {
  const url = buildApiUrl(path)
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  // Later when auth is enabled:
  // const token = getToken() // from store or localStorage
  // if (token) headers.Authorization = `Bearer ${token}`

  const config = {
    ...options,
    headers,
  }

  const response = await fetch(url, config)
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const error = new Error(data?.message || `HTTP ${response.status}`)
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

/** Common HTTP method shortcuts */
const createApiClient = () => ({
  get: (path) => apiRequest(path, { method: 'GET' }),
  post: (path, body) => apiRequest(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => apiRequest(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch: (path, body) => apiRequest(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path) => apiRequest(path, { method: 'DELETE' }),
})

/**
 * Explicit Singleton access to the API client.
 * Functional style (no class): always returns the same client instance.
 */
// 
export const getApiClient = () => {
  if (!apiClientSingleton) {
    apiClientSingleton = Object.freeze(createApiClient()) // Freeze for immutability and thread safety
  }
  return apiClientSingleton
}

export const api = getApiClient()

