import clsx from "clsx"
import { Button } from "../../../app/conf/_design-system/button"

export function PlayButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      variant="tertiary"
      className={clsx(
        "ml-auto h-min !p-0.5 !text-neu-800 before:absolute before:-inset-3 hover:!text-neu-900",
        className,
      )}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <svg fill="currentColor" viewBox="0 0 24 24" className="size-4">
        <path d="M10 20H8V4h2v2h2v3h2v2h2v2h-2v2h-2v3h-2v2z" />
      </svg>
      {!props.disabled && <span className="sr-only">Run query</span>}
    </Button>
  )
}
