import { ReactElement } from "react"

export function isSpanElement(
  child: React.ReactNode,
): child is ReactElement<{ children: React.ReactNode }> {
  return (
    typeof child === "object" &&
    !!child &&
    (child as ReactElement).type === "span"
  )
}
