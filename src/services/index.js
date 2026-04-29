import { productService } from './productService'
import { authService } from './authService'
import { cartService } from './cartService'
import { wishlistService } from './wishlistService'
import { ENDPOINTS } from './api.endpoints'

/**
 * Explicit Facade for app-level service usage.
 * Keeps feature layers isolated from low-level service file structure.
 */
export const servicesFacade = Object.freeze({
  products: {
    getProducts: (params) => productService.getProducts(params),
    getProductById: (id) => productService.getProductById(id),
    getCategories: () => productService.getCategories(),
  },
  auth: {
    login: (credentials) => authService.login(credentials),
    register: (data) => authService.register(data),
    getMe: () => authService.getMe(),
    logout: () => authService.logout(),
  },
  cart: {
    load: () => cartService.load(),
    save: (items) => cartService.save(items),
  },
  wishlist: {
    load: () => wishlistService.load(),
    save: (items) => wishlistService.save(items),
  },
})

// Keep direct exports for backward compatibility and gradual migration.
export { productService, authService, cartService, wishlistService, ENDPOINTS }
