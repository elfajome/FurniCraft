import { describe, expect, it, vi } from 'vitest'
import reducer, { addItem, removeItem, updateQuantity } from '../store/slices/cartSlice'

vi.mock('../services', () => ({
  servicesFacade: {
    cart: {
      load: () => [],
      save: () => {},
    },
  },
}))

function makeItem(id) {
  return {
    id,
    name: `Product ${id}`,
    price: 100 + (id % 50),
    quantity: 1,
    image: null,
  }
}

describe('cart slice performance', () => {
  it('adds 500 unique items in acceptable time', () => {
    let state = reducer(undefined, { type: '@@INIT' })
    const start = performance.now()

    for (let i = 1; i <= 500; i += 1) {
      state = reducer(state, addItem(makeItem(i)))
    }

    const elapsed = performance.now() - start
    expect(state.items).toHaveLength(500)
    expect(elapsed).toBeLessThan(1000)
  })

  it('updates quantities for 500 items in acceptable time', () => {
    let state = reducer(undefined, { type: '@@INIT' })
    for (let i = 1; i <= 500; i += 1) {
      state = reducer(state, addItem(makeItem(i)))
    }

    const start = performance.now()
    for (let i = 1; i <= 500; i += 1) {
      state = reducer(state, updateQuantity({ id: i, quantity: 3 }))
    }
    const elapsed = performance.now() - start

    expect(state.items[0].quantity).toBe(3)
    expect(elapsed).toBeLessThan(1000)
  })

  it('removes 250 items from large cart in acceptable time', () => {
    let state = reducer(undefined, { type: '@@INIT' })
    for (let i = 1; i <= 500; i += 1) {
      state = reducer(state, addItem(makeItem(i)))
    }

    const start = performance.now()
    for (let i = 1; i <= 250; i += 1) {
      state = reducer(state, removeItem(i))
    }
    const elapsed = performance.now() - start

    expect(state.items).toHaveLength(250)
    expect(elapsed).toBeLessThan(1000)
  })
})
