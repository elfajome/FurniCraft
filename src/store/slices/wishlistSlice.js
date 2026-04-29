import { createSlice } from '@reduxjs/toolkit'
import { servicesFacade } from '../../services'

const initialState = {
  items: servicesFacade.wishlist.load(),
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addWishlistItem(state, action) {
      const item = action.payload
      const exists = state.items.some((i) => i.id === item.id)
      if (!exists) {
        state.items.push(item)
        servicesFacade.wishlist.save(state.items)
      }
    },
    removeWishlistItem(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload)
      servicesFacade.wishlist.save(state.items)
    },
    toggleWishlistItem(state, action) {
      const item = action.payload
      const exists = state.items.some((i) => i.id === item.id)
      if (exists) {
        state.items = state.items.filter((i) => i.id !== item.id)
      } else {
        state.items.push(item)
      }
      servicesFacade.wishlist.save(state.items)
    },
    clearWishlist(state) {
      state.items = []
      servicesFacade.wishlist.save([])
    },
  },
})

export const {
  addWishlistItem,
  removeWishlistItem,
  toggleWishlistItem,
  clearWishlist,
} = wishlistSlice.actions

export const selectWishlistItems = (state) => state.wishlist.items
export const selectWishlistCount = (state) => state.wishlist.items.length
export const selectIsWishlisted = (productId) => (state) =>
  state.wishlist.items.some((item) => item.id === productId)

export default wishlistSlice.reducer
