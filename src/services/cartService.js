const CART_STORAGE_KEY = 'furnicraft_cart'


const parseSafe = (raw, fallback = []) => {
  try {
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export const cartService = {
  load() {
    if (typeof localStorage === 'undefined') return []
    return parseSafe(localStorage.getItem(CART_STORAGE_KEY), [])
  },

  save(items) {
    if (typeof localStorage === 'undefined') return
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      console.error('Error saving cart')
    }
  },
}
