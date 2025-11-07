import { useEffect } from "react"

export function useOnClickOutside(
  refs: React.RefObject<HTMLElement | null>[],
  handler: (event: MouseEvent) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const path = event.composedPath()
      if (refs.every(ref => !ref.current || !path.includes(ref.current))) {
        handler(event)
        return
      }
    }

    document.addEventListener("click", listener)
    return () => document.removeEventListener("click", listener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
