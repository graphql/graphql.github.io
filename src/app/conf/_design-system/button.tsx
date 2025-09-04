import { clsx } from "clsx"
import { Anchor } from "./anchor"

type Size = "md" | "lg"
type Variant = "primary" | "secondary" | "tertiary"

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace ButtonProps {
  export interface BaseProps {
    size?: Size
    variant?: Variant
  }

  export interface AnchorProps
    extends BaseProps,
      React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      > {
    href: string
    as?: never
    className?: string
    disabled?: boolean
  }

  export interface ButtonProps
    extends BaseProps,
      React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      > {
    href?: never
    as?: never
    className?: string
    disabled?: boolean
    type?: "button" | "submit" | "reset"
    onClick?: React.MouseEventHandler<HTMLButtonElement>
  }

  /**
   * Use inside `<summary>` or as visual part of bigger interactive element.
   * Prefer `a` and `button` Buttons otherwise.
   */
  export interface NonInteractiveProps
    extends BaseProps,
      React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    href?: never
    as: "span" | "div"
    className?: string
  }
}

export type ButtonProps =
  | ButtonProps.AnchorProps
  | ButtonProps.ButtonProps
  | ButtonProps.NonInteractiveProps

export function Button(props: ButtonProps) {
  const className = clsx(
    "relative flex items-center justify-center gap-2.5 font-normal text-base/none text-neu-0 bg-neu-900 hover:bg-neu-800 active:bg-neu-700 font-sans h-14 px-8 data-[size=md]:h-12 data-[variant=secondary]:bg-neu-100 dark:data-[variant=secondary]:bg-neu-100/80 dark:data-[variant=secondary]:hover:bg-neu-200/50 data-[variant=secondary]:text-neu-900 data-[variant=secondary]:hover:bg-neu-200/75 data-[variant=secondary]:active:bg-neu-200/90 data-[variant=tertiary]:bg-neu-100 data-[variant=tertiary]:text-neu-900 data-[variant=tertiary]:hover:bg-neu-200 data-[variant=tertiary]:active:bg-neu-300 gql-focus-visible [aria-disabled]:bg-neu-800 aria-disabled:pointer-events-none dark:data-[variant=tertiary]:bg-neu-900/10 dark:data-[variant=tertiary]:text-neu-900 dark:data-[variant=tertiary]:hover:bg-neu-900/[.125] dark:data-[variant=tertiary]:active:bg-neu-800/20 dark:data-[variant=tertiary]:ring-1 dark:data-[variant=tertiary]:ring-inset dark:data-[variant=tertiary]:ring-neu-900/20",
    props.className,
  )

  const styleAttrs = { "data-size": props.size, "data-variant": props.variant }

  if ("href" in props && typeof props.href === "string") {
    const { className: _1, size: _2, disabled, children, ...rest } = props

    if (disabled) (rest as { href?: string }).href = undefined

    return (
      <Anchor
        className={className}
        aria-disabled={disabled}
        {...styleAttrs}
        {...rest}
      >
        {children}
      </Anchor>
    )
  }

  if (props.as) {
    const { className: _1, size: _2, children, as, ...rest } = props
    const Root = as as "span" // we don't need HTMLDivElement type
    return (
      <Root className={className} {...styleAttrs} {...rest}>
        {children}
      </Root>
    )
  }

  const { className: _1, size: _2, children, ...rest } = props

  return (
    <button className={className} {...styleAttrs} {...rest}>
      {children}
    </button>
  )
}
