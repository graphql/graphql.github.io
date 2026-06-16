export function partition<T, X extends T>(
  array: T[],
  predicate: (item: T) => item is X,
): [X[], Exclude<T, X>[]]
export function partition<T>(
  array: T[],
  predicate: (item: T) => boolean,
): [T[], T[]]
export function partition<T>(
  array: T[],
  predicate: (item: T) => boolean,
): [T[], T[]] {
  const left: T[] = []
  const right: T[] = []

  for (const item of array) {
    if (predicate(item)) {
      left.push(item)
    } else {
      right.push(item)
    }
  }
  return [left, right]
}
