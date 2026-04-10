export function isValueInSet<T extends string>(
  value: unknown,
  set: readonly T[]
): value is T {
  return typeof value === 'string' && set.includes(value as T)
}
