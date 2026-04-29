import { api } from '../api/client'
import { ENDPOINTS } from './api.endpoints'

/**
 * Product service
 * Currently uses mock data for development.
 * When backend is connected, replace mock returns with api.get/api.post as noted below each method.
 */
const USE_MOCK = !import.meta.env.VITE_API_BASE_URL

const mockProducts = [
  {
    id: 1,
    name: 'Syltherine',
    description: 'Stylish cafe chair',
    price: 6800,
    category: 'living',
    sku: 'SS001',
    tags: ['Sofa', 'Chair', 'Shop'],
    image:
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=70',
    gallery: [
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=70',
    ],
  },
  {
    id: 2,
    name: 'Leviosa',
    description: 'Stylish cafe chair',
    price: 7200,
    category: 'living',
    sku: 'SS002',
    tags: ['Sofa', 'Chair', 'Shop'],
    image:
      'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=70',
    gallery: [
      'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=70',
    ],
  },
  {
    id: 3,
    name: 'Lolito',
    description: 'Luxury big sofa',
    price: 38900,
    category: 'living',
    sku: 'SS003',
    tags: ['Sofa', 'Living', 'Shop'],
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=70',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=1200&q=70',
    ],
  },
  {
    id: 4,
    name: 'Respira',
    description: 'Outdoor bar table and stool',
    price: 15900,
    category: 'dining',
    sku: 'SS004',
    tags: ['Outdoor', 'Dining', 'Shop'],
    image:
      'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=70',
    gallery: [
      'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=70',
    ],
  },
  {
    id: 5,
    name: 'Grifo',
    description: 'Night lamp',
    price: 2450,
    category: 'bedroom',
    sku: 'SS005',
    tags: ['Bedroom', 'Lamp', 'Shop'],
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=70',
    gallery: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=70',
    ],
  },
  {
    id: 6,
    name: 'Muggo',
    description: 'Small mug',
    price: 320,
    category: 'bedroom',
    sku: 'SS006',
    tags: ['Kitchen', 'Mug', 'Shop'],
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=70',
    gallery: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=70',
    ],
  },
  {
    id: 7,
    name: 'Pingky',
    description: 'Cute bed set',
    price: 42500,
    category: 'bedroom',
    sku: 'SS007',
    tags: ['Bedroom', 'Bed', 'Shop'],
    image:
      'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=1200&q=70',
    gallery: [
      'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=70',
    ],
  },
  {
    id: 8,
    name: 'Potty',
    description: 'Minimalist flower pot',
    price: 890,
    category: 'office',
    sku: 'SS008',
    tags: ['Decor', 'Pot', 'Shop'],
    image:
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=70',
    gallery: [
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=70',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1200&q=70',
    ],
  },
]

export const productService = {
  // eslint-disable-next-line no-unused-vars
  async getProducts(params = {}) {
    if (USE_MOCK) return Promise.resolve({ data: mockProducts })
    // When backend is connected: return api.get(ENDPOINTS.products + '?' + new URLSearchParams(params))
    return api.get(ENDPOINTS.products)
  },

  async getProductById(id) {
    if (USE_MOCK) {
      const p = mockProducts.find((x) => x.id === Number(id))
      return Promise.resolve(p || null)
    }
    return api.get(ENDPOINTS.productById(id))
  },

  async getCategories() {
    if (USE_MOCK) return Promise.resolve(['living', 'dining', 'bedroom', 'office'])
    return api.get(ENDPOINTS.productCategories)
  },
}
