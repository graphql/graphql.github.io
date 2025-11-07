import clsx from "clsx"

const maskEven =
  "repeating-linear-gradient(to right, transparent, transparent var(--stripe-width), black var(--stripe-width), black calc(var(--stripe-width) * 2))"

const maskOdd =
  "repeating-linear-gradient(to right, black, black var(--stripe-width), transparent var(--stripe-width), transparent calc(var(--stripe-width) * 2))"

export interface StripesDecorationProps {
  evenClassName?: string
  oddClassName?: string
  stripeWidth?: string
}

export function StripesDecoration({
  stripeWidth = "12px",
  evenClassName,
  oddClassName,
}: StripesDecorationProps) {
  return (
    <>
      {evenClassName && (
        <div
          className={clsx("absolute inset-0", evenClassName)}
          style={{
            ...({ "--stripe-width": stripeWidth } as React.CSSProperties),
            maskImage: maskEven,
            WebkitMaskImage: maskEven,
          }}
        />
      )}
      {oddClassName && (
        <div
          className={clsx("absolute inset-0", oddClassName)}
          style={{
            ...({ "--stripe-width": stripeWidth } as React.CSSProperties),
            maskImage: maskOdd,
            WebkitMaskImage: maskOdd,
          }}
        />
      )}
    </>
  )
}
