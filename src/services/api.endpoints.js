/**
 * API endpoints - keep paths centralized so backend route changes are updated in one place
 */
export const ENDPOINTS = {
  // Products / furniture
  products: '/products',
  productById: (id) => `/products/${id}`,
  productCategories: '/products/categories',

  // Users / auth (future)
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
    logout: '/auth/logout',
  },

  // Cart / orders (future)
  cart: '/cart',
  orders: '/orders',
}
