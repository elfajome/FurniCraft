import { createSlice } from '@reduxjs/toolkit'
import { servicesFacade } from '../../services'

const initialState = {
  items: servicesFacade.cart.load(),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const { id, name, price, quantity = 1, image } = action.payload
      const existing = state.items.find((i) => i.id === id) 
      if (existing) {
        existing.quantity += quantity
      } else {
        state.items.push({ id, name, price, quantity, image: image || null })
      }
      servicesFacade.cart.save(state.items)
    },
    removeItem(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload)
      servicesFacade.cart.save(state.items)
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      const item = state.items.find((i) => i.id === id)
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id)
        } else {
          item.quantity = quantity
        }
        servicesFacade.cart.save(state.items)
      }
    },
    clearCart(state) {
      state.items = []
      servicesFacade.cart.save([])
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions

// Selectors
// These can be used in components to access cart data from the Redux store without directly referencing the state structure
export const selectCartItems = (state) => state.cart.items
// Example: selectCartCount and selectCartTotal can be used to display the number of items in the cart and the total price
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

export default cartSlice.reducer
