import { ComponentProps, ReactElement } from "react"
import { clsx } from "clsx"
import NextLink from "next/link"

export function Card({
  children,
  className,
  as: Component = "div",
  ...props
}: ComponentProps<"div"> & {
  as?: string | typeof NextLink
}): ReactElement {
  const isLink = Component === "a" || Component === NextLink

  return (
    <Component
      className={clsx(
        "border border-zinc-200 bg-white p-8 dark:border-[#414141] dark:bg-neutral-800 lg:p-12",
        "rounded-none",
        isLink && [
          "hover:!border-primary hover:shadow-2xl hover:shadow-primary/10 hover:dark:bg-neutral-700/50",
          "transition-colors dark:shadow-none",
        ],
        className,
      )}
      {...((props as any).href?.startsWith("https://") && {
        target: "_blank",
        rel: "noreferrer",
      })}
      {...props}
    >
      {children}
    </Component>
  )
}
