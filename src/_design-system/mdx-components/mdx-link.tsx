import { forwardRef } from "react"
import { clsx } from "clsx"

import { Anchor } from "@/app/conf/_design-system/anchor"

export const MdxLink = forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a">
>(function MdxLink(props, ref) {
  return (
    <Anchor
      {...props}
      ref={ref}
      className={clsx(
        "gql-focus-visible typography-link text-neu-900 underline-offset-2",
        props.className,
      )}
      href={props.href || ""}
    >
      {props.children}
    </Anchor>
  )
})
