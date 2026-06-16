export function throttle(fn: () => void, delay: number) {
  let timeout: NodeJS.Timeout | null = null
  return () => {
    if (timeout) return
    timeout = setTimeout(() => {
      fn()
      timeout = null
    }, delay)
  }
}
