import { api } from '../api/client'
import { ENDPOINTS } from './api.endpoints'

/**
 * Authentication service - ready for backend integration.
 * Currently does not perform real requests; replace mock with api calls when backend is enabled.
 */
const USE_MOCK = !import.meta.env.VITE_API_BASE_URL

export const authService = {
  async login(credentials) {
    if (USE_MOCK) {
      return Promise.resolve({ user: { id: 1, email: credentials?.email }, token: 'mock-token' })
    }
    return api.post(ENDPOINTS.auth.login, credentials)
  },

  async register(data) {
    if (USE_MOCK) return Promise.resolve({ user: { id: 1, email: data?.email }, token: 'mock-token' })
    return api.post(ENDPOINTS.auth.register, data)
  },

  async getMe() {
    if (USE_MOCK) return Promise.resolve(null)
    return api.get(ENDPOINTS.auth.me)
  },

  async logout() {
    if (USE_MOCK) return Promise.resolve()
    return api.post(ENDPOINTS.auth.logout)
  },
}
