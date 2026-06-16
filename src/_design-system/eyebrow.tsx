import { clsx } from "clsx"

import { ChevronRight } from "@/app/conf/_design-system/pixelarticons/chevron-right"

export interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  as?: "p" | "span" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export function Eyebrow({
  children,
  className,
  as = "span",
  ...rest
}: EyebrowProps) {
  const Root = as
  return (
    <Root
      className={clsx(
        "typography-menu flex items-center gap-1 text-pri-base dark:text-pri-light",
        className,
      )}
      {...rest}
    >
      <ChevronRight className="size-4 translate-x-[0.5px]" />
      {children}
    </Root>
  )
}
