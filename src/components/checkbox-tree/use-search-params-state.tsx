import { use, useCallback, useMemo, useSyncExternalStore } from "react"

type SetSearchParamsAction =
  | string
  | URLSearchParams
  | ((prev: URLSearchParams) => URLSearchParams | void)

interface SetSearchParamsOptions {
  replace?: boolean
}

const listeners = new Set<() => void>()
let restoreHistory: (() => void) | null = null

const notifyListeners = () => {
  listeners.forEach(listener => listener())
}

const subscribe = (listener: () => void) => {
  if (typeof window === "undefined") {
    return () => {}
  }

  if (listeners.size === 0) {
    window.addEventListener("popstate", notifyListeners)
    patchHistory()
  }

  listeners.add(listener)

  return () => {
    listeners.delete(listener)

    if (listeners.size === 0) {
      window.removeEventListener("popstate", notifyListeners)
      restorePatchedHistory()
    }
  }
}

const patchHistory = () => {
  if (restoreHistory || typeof window === "undefined") return

  const { history } = window
  const originalPushState = history.pushState
  const originalReplaceState = history.replaceState

  const patchedPushState: History["pushState"] = (...args) => {
    const result = originalPushState.apply(history, args)
    notifyListeners()
    return result
  }

  const patchedReplaceState: History["replaceState"] = (...args) => {
    const result = originalReplaceState.apply(history, args)
    notifyListeners()
    return result
  }

  history.pushState = patchedPushState
  history.replaceState = patchedReplaceState

  restoreHistory = () => {
    history.pushState = originalPushState
    history.replaceState = originalReplaceState
    restoreHistory = null
  }
}

const restorePatchedHistory = () => {
  restoreHistory?.()
}

const getClientSnapshot = () =>
  typeof window === "undefined" ? "" : window.location.search

const getServerSnapshot = () => ""

const formatSearchFromAction = (
  action: SetSearchParamsAction,
  current: URLSearchParams,
) => {
  if (typeof action === "function") {
    const draft = new URLSearchParams(current)
    const result = action(draft)
    return result ?? draft
  }

  if (typeof action === "string") {
    const normalized = action.startsWith("?") ? action.slice(1) : action
    return new URLSearchParams(normalized)
  }

  return new URLSearchParams(action)
}

/**
 * Next.js Pages Router doesn't have `useSearchParams`, and we need one for Tools and Libraries checkbox tree.
 */
export function useSearchParamsState() {
  const search = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  )

  const searchParams = useMemo(() => {
    const normalized = search.startsWith("?") ? search.slice(1) : search
    return new URLSearchParams(normalized)
  }, [search])

  const setSearchParams = useCallback(
    (action: SetSearchParamsAction, options?: SetSearchParamsOptions) => {
      if (typeof window === "undefined") return

      const current = new URLSearchParams(window.location.search)
      const nextParams = formatSearchFromAction(action, current)
      const nextQuery = nextParams.toString()
      const nextSearch = nextQuery ? `?${nextQuery}` : ""

      if (nextSearch === window.location.search) return

      const url = new URL(window.location.href)

      url.search = nextQuery

      const method = options?.replace ? "replaceState" : "pushState"

      window.history[method](
        window.history.state,
        "",
        `${url.pathname}${url.search}${url.hash}`,
      )
    },
    [],
  )

  return [searchParams, setSearchParams] as const
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace useSearchParamsState {
  type SetSearchParams = (
    action: SetSearchParamsAction,
    options?: SetSearchParamsOptions,
  ) => void
}
