import { clsx } from "clsx"
import { ReactNode } from "react"

export function EventsScrollview({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={clsx(
        "xs:nextra-scrollbar relative -mx-6 grid w-fit max-w-full grid-flow-col grid-rows-2 gap-2 overflow-auto p-6 scrollview-fade-x-16 scrollview-fade has-[>:only-child]:grid-rows-1 max-sm:min-w-[100vw] sm:-mx-1 sm:px-1 lg:gap-4",

        className,
      )}
    >
      {children}
    </div>
  )
}
