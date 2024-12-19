import { ReactElement, ReactNode } from "react"
import { clsx } from "clsx"

interface ButtonProps {
  children: ReactNode
  className?: string
  href?: string
  disabled?: boolean
  target?: "_blank"
}

export function Button({
  target,
  href,
  className,
  children,
  disabled,
}: ButtonProps): ReactElement {
  return disabled ? (
    <span
      className={clsx(
        "inline-flex w-fit cursor-default whitespace-nowrap rounded border-0 px-6 py-2 text-center text-sm no-underline transition ease-in-out sm:text-base",
        "bg-gray-400 font-medium text-white",
        className,
      )}
    >
      {children}
    </span>
  ) : (
    <a
      aria-disabled={disabled}
      className={clsx(
        "inline-flex w-fit cursor-pointer whitespace-nowrap rounded border-0 px-6 py-2 text-center text-sm no-underline transition ease-in-out hover:drop-shadow-md focus:outline-none sm:text-base",
        "bg-primary font-medium text-white hover:bg-primary/40",
        className,
      )}
      href={href}
      target={target}
      {...(href?.startsWith("https://") && {
        target: "_blank",
        rel: "noreferrer",
      })}
    >
      {children}
    </a>
  )
}
