/**
 * Egyptian Pound (EGP) formatting for display (Latin digits, grouping).
 */
export function formatEgpAmount(value) {
  return new Intl.NumberFormat('en-EG', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Number(value || 0))
}

/** e.g. "6,800 EGP" */
export function formatEgp(value) {
  return `${formatEgpAmount(value)} EGP`
}
