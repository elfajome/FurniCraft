/**
 * Read environment variables from Vite.
 * Use this file instead of import.meta.env directly so config source can be changed later.
 */
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
}
