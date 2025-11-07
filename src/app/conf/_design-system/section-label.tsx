import { clsx } from "clsx"
import { ChevronRight } from "./pixelarticons/chevron-right"

export function SectionLabel({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode
  className?: string
  rest?: React.HTMLAttributes<HTMLSpanElement>
}) {
  return (
    <span
      className={clsx(
        "flex shrink-0 items-center gap-1 self-start whitespace-nowrap font-mono text-sm/none font-normal uppercase text-pri-base dark:text-pri-light",
        className,
      )}
      {...rest}
    >
      <ChevronRight className="shrink-0 translate-y-[-0.5px]" />
      {children}
    </span>
  )
}
