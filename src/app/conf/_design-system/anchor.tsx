import { ForwardedRef, forwardRef, ReactElement } from "react"
import NextLink from "next/link"
import type { LinkProps as NextLinkProps } from "next/link"

const EXTERNAL_LINK_REGEX = /^(http|\/\/|#)/
const SIMPLE_LINK_REGEX = /^(#|mailto:)/

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace AnchorProps {
  interface IntrinsicAnchorProps
    extends React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    > {
    href: `#${string}` | `http${string}`
  }

  interface InternalAnchorProps extends NextLinkProps {}
}

export type AnchorProps =
  | AnchorProps.IntrinsicAnchorProps
  | AnchorProps.InternalAnchorProps

export const Anchor = forwardRef(function Anchor(
  props: AnchorProps,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  if (isInternal(props)) {
    return <NextLink {...props} ref={ref} />
  }

  // we want to show an error if developer doesn't pass a href, but there are cases where it may happen with data from Sched.
  const href = props.href || ""

  const addedProps = SIMPLE_LINK_REGEX.test(href)
    ? {
        // if a href is just an id, the browser just scrolls,
        // mailto: is also handled well by default
      }
    : {
        // otherwise, it's an external link, and we open it in a new tab
        rel: "noopener noreferrer",
        target: "_blank",
      }

  return <a ref={ref} {...addedProps} {...props} />
}) as (props: AnchorProps) => ReactElement

function isInternal(
  props: AnchorProps,
): props is AnchorProps.InternalAnchorProps {
  return (
    typeof props.href === "object" ||
    (typeof props.href === "string" && !EXTERNAL_LINK_REGEX.test(props.href))
  )
}
