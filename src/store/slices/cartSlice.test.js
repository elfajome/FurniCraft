import { beforeEach, describe, expect, it } from 'vitest'
import reducer, {
  addItem,
  clearCart,
  removeItem,
  selectCartCount,
  selectCartTotal,
  updateQuantity,
} from './cartSlice'

describe('cartSlice integration', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('adds a new product then increases quantity when added again', () => {
    const item = { id: 1, name: 'Syltherine', price: 6800, quantity: 1 }

    let state = reducer(undefined, addItem(item))
    state = reducer(state, addItem(item))

    expect(state.items).toHaveLength(1)
    expect(state.items[0].quantity).toBe(2)
  })

  it('removes item when quantity is updated to zero', () => {
    const item = { id: 2, name: 'Leviosa', price: 7200, quantity: 1 }
    let state = reducer(undefined, addItem(item))

    state = reducer(state, updateQuantity({ id: 2, quantity: 0 }))
    expect(state.items).toEqual([])
  })

  it('calculates count and total using selectors', () => {
    let state = reducer(undefined, addItem({ id: 1, name: 'A', price: 100, quantity: 2 }))
    state = reducer(state, addItem({ id: 2, name: 'B', price: 50, quantity: 1 }))

    const wrappedState = { cart: state }
    expect(selectCartCount(wrappedState)).toBe(3)
    expect(selectCartTotal(wrappedState)).toBe(250)
  })

  it('supports remove and clear actions', () => {
    let state = reducer(undefined, addItem({ id: 3, name: 'C', price: 200, quantity: 1 }))
    state = reducer(state, removeItem(3))
    expect(state.items).toEqual([])

    state = reducer(state, addItem({ id: 4, name: 'D', price: 300, quantity: 1 }))
    state = reducer(state, clearCart())
    expect(state.items).toEqual([])
  })
})
