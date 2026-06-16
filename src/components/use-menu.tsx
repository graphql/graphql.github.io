import { useSyncExternalStore } from "react"

const createStore = () => {
  let state = false
  const listeners = new Set<() => void>()
  return {
    get: () => state,
    sub: (l: () => void) => (listeners.add(l), () => listeners.delete(l)),
    set: (action: boolean | ((prev: boolean) => boolean)) => {
      const val = typeof action === "function" ? action(state) : action
      if (val !== state) {
        state = val
        listeners.forEach(l => l())
      }
    },
  }
}

const store = createStore()

export const useMenu = () => ({
  menu: useSyncExternalStore(store.sub, store.get, store.get),
  setMenu: store.set,
})
