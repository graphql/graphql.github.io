import { ComponentProps, ReactElement } from "react"
import { clsx } from "clsx"

export function Tag({
  children,
  className,
  as: Component = "span",
  ...props
}: ComponentProps<"span"> & {
  as?: string
}): ReactElement {
  return (
    // @ts-expect-error -- fixme
    <Component
      className={clsx(
        "roboto-mono rounded bg-zinc-200 px-2.5 py-1 text-xs font-bold capitalize dark:bg-zinc-700",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
