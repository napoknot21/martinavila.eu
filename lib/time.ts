/** Months since year 0 for an ISO month "YYYY-MM". */
export function monthIndex(iso: string): number {
  const [y, m] = iso.split('-').map(Number);
  return (y ?? 0) * 12 + ((m ?? 1) - 1);
}

/** Position of `iso` between `from` and `to`, as a fraction (0–1). */
export function fractionOf(iso: string, from: string, to: string): number {
  const a = monthIndex(from);
  const b = monthIndex(to);
  return (monthIndex(iso) - a) / (b - a);
}
