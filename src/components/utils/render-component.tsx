export function renderComponent<T>(
  ComponentOrNode: React.FC<T> | React.ReactNode,
  props?: T,
) {
  if (!ComponentOrNode) return null
  if (typeof ComponentOrNode !== "function") return ComponentOrNode
  return <ComponentOrNode {...props!} />
}
