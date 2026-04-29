import { beforeEach, describe, expect, it, vi } from 'vitest'
import { cartService } from './cartService'

describe('cartService', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('loads empty array when cart does not exist', () => {
    expect(cartService.load()).toEqual([])
  })

  it('saves and loads cart items from localStorage', () => {
    const items = [{ id: 1, name: 'Chair', price: 6800, quantity: 2 }]
    cartService.save(items)
    expect(cartService.load()).toEqual(items)
  })

  it('handles malformed localStorage cart payload safely', () => {
    localStorage.setItem('furnicraft_cart', '{bad-json')
    expect(cartService.load()).toEqual([])
  })

  it('does not throw when localStorage setItem fails', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded')
    })
    expect(() => cartService.save([{ id: 1, quantity: 1 }])).not.toThrow()
  })
})
