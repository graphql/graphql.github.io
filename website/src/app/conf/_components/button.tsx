import { ReactElement, ReactNode } from "react"
import { clsx } from "clsx"

interface ButtonProps {
  children: ReactNode
  className?: string
  href?: string
  disabled?: boolean
}

export function Button({
  href,
  className,
  children,
  disabled,
}: ButtonProps): ReactElement {
  return disabled ? (
    <span
      className={clsx(
        "cursor-default transition ease-in-out no-underline inline-flex text-center w-[fit-content] border-0 py-2 px-6 rounded text-sm sm:text-base whitespace-nowrap",
        "bg-gray-400 text-white font-medium",
        className,
      )}
    >
      {children}
    </span>
  ) : (
    <a
      aria-disabled={disabled}
      className={clsx(
        "cursor-pointer transition ease-in-out no-underline inline-flex text-center w-[fit-content] border-0 py-2 px-6 focus:outline-none hover:drop-shadow-md rounded text-sm sm:text-base whitespace-nowrap",
        "bg-primary hover:bg-primary/40 text-white font-medium",
        className,
      )}
      href={href}
      {...(href?.startsWith("https://") && {
        target: "_blank",
        rel: "noreferrer",
      })}
    >
      {children}
    </a>
  )
}
