import { ComponentProps } from "react"
import { clsx } from "clsx"

const badgeVariants = {
  default:
    "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/85",
}

export function Badge({
  className,
  variant = "default",
  ...props
}: {
  variant?: keyof typeof badgeVariants
} & ComponentProps<"span">) {
  return (
    <span
      className={clsx(
        "select-none rounded-md border px-1.5 py-0.5 text-[10px]/none transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  )
}
