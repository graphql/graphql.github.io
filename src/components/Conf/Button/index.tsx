import React, { ReactElement, ReactNode } from "react"
import { clsx } from "clsx"

interface ButtonProps {
  children: ReactNode
  className?: string
  href?: string
}

function ButtonConf({ href, className, children }: ButtonProps): ReactElement {
  return (
    <a
      className={clsx(
        "cursor-pointer transition ease-in-out no-underline inline-flex text-center w-[fit-content] border-0 py-2 px-6 no-underline hover:no-underline focus:outline-none hover:drop-shadow-md hover:[transform:scale(1.05)] rounded text-sm sm:text-base whitespace-nowrap",
        "bg-[--rhodamine] text-white font-medium",
        className
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

export default ButtonConf
