import cn from "clsx"
import type { FC, ReactElement, ReactNode } from "react"

import classes from "./pre.module.css"

interface CodeBlockLabelProps {
  text: ReactNode
  icon?: FC<{ className?: string }>
  button?: ReactElement | false
  className?: string
}

export function CodeBlockLabel({
  text,
  icon: Icon,
  button,
  className,
}: CodeBlockLabelProps): ReactElement {
  return (
    <div
      className={cn(
        classes.label,
        "flex items-center gap-1.5 px-4 py-2 text-sm text-neu-800",
        className,
      )}
    >
      {Icon && <Icon className="_h-4 _w-auto _max-w-6 _shrink-0" />}
      <span className="_truncate">{text}</span>
      {button}
    </div>
  )
}
