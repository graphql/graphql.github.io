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
        "py-1 px-2.5 capitalize text-xs rounded bg-zinc-200 dark:bg-zinc-700 font-bold roboto-mono",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
