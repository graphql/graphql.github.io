/**
 * @file BackToTop component extracted from Nextra
 */

import { clsx } from "clsx"
import { Button } from "nextra/components"
import { ArrowRightIcon } from "nextra/icons"
import type { ComponentProps, ReactElement, ReactNode } from "react"

const SCROLL_TO_OPTIONS = { top: 0, behavior: "smooth" } as const

const scrollToTop: ComponentProps<"button">["onClick"] = event => {
  const buttonElement = event.currentTarget
  const tocElement = buttonElement.parentElement!.parentElement!

  window.scrollTo(SCROLL_TO_OPTIONS)
  tocElement.scrollTo(SCROLL_TO_OPTIONS)

  // Fixes https://github.com/facebook/react/issues/20770
  // Fixes https://github.com/shuding/nextra/issues/2917
  buttonElement.disabled = true
}

export function BackToTop({
  children,
  className,
  hidden,
}: {
  children: ReactNode
  className?: string
  hidden: boolean
}): ReactElement {
  return (
    <Button
      // elements with `aria-hidden: true` must not be focusable or contain focusable elements
      aria-hidden={hidden ? "true" : undefined}
      onClick={scrollToTop}
      disabled={hidden}
      className={({ disabled }) =>
        clsx(
          "flex items-center gap-1.5",
          disabled ? "opacity-0" : "opacity-100",
          className,
        )
      }
    >
      {children}
      <ArrowRightIcon
        height="16"
        className="-rotate-90 rounded-full border border-current"
      />
    </Button>
  )
}
