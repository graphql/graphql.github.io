import { ReactElement, CSSProperties, Children, ReactNode } from "react"
import { clsx } from "clsx"

const TimeToSeconds = {
  fast: "20s",
  normal: "40s",
  slow: "80s",
}

export function InfiniteMovingCards({
  children,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  children: ReactNode
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}): ReactElement {
  const content = Children.map(children, (child, index) => (
    <li key={index} className="w-[350px] max-w-full shrink-0 md:w-[450px]">
      {child}
    </li>
  ))

  return (
    <div
      className={clsx(
        "relative max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
      style={
        {
          "--animation-duration": TimeToSeconds[speed],
          "--animation-direction":
            direction === "left" ? "forwards" : "reverse",
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
