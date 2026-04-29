const WISHLIST_STORAGE_KEY = 'FurniCraft_wishlist'

const parseSafe = (raw, fallback = []) => {
  try {
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export const wishlistService = {
  load() {
    if (typeof localStorage === 'undefined') return []
    return parseSafe(localStorage.getItem(WISHLIST_STORAGE_KEY), [])
  },

  save(items) {
    if (typeof localStorage === 'undefined') return
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items))
    } catch {
      console.error('Error saving wishlist')
    }
  },
}
