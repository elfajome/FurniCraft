import { describe, expect, it } from 'vitest'
import { formatEgp, formatEgpAmount } from './formatEgp'

describe('formatEgp utilities', () => {
  it('formats numeric amount with thousand separators', () => {
    expect(formatEgpAmount(6800)).toBe('6,800')
  })

  it('returns zero for undefined-like values', () => {
    expect(formatEgpAmount(undefined)).toBe('0')
  })

  it('adds currency suffix in full formatter', () => {
    expect(formatEgp(2450)).toBe('2,450 EGP')
  })
})
