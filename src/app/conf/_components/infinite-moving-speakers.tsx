import React, { ReactElement, CSSProperties, Children, ReactNode } from "react"
import { clsx } from "clsx"

export function InfiniteMovingSpeakers({
  children,
  pauseOnHover = true,
  className,
}: {
  children: ReactNode
  pauseOnHover?: boolean
  className?: string
}): ReactElement {
  const content = Children.map(children, (child, index) => (
    <li key={index} className="shrink-0">
      {child}
    </li>
  ))

  return (
    <div
      className={clsx(
        "relative w-full overflow-x-hidden overflow-y-visible [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
      style={
        {
          "--animation-duration": "300s",
          "--animation-direction": "forwards",
        } as CSSProperties
      }
    >
      <ul
        className={clsx(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {content}
        {content}
      </ul>
    </div>
  )
}
