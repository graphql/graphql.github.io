import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"

import logoMask from "./logo-mask.webp"

export interface CtaCardSectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode
  description: string
  children: React.ReactNode
}

export function CtaCardSection({
  className,
  title: heading,
  description,
  children,
  ...rest
}: CtaCardSectionProps) {
  return (
    <div className="gql-section">
      <section
        className="relative overflow-hidden bg-gradient-to-r from-pri-dark to-pri-base p-6 dark:from-pri-darker dark:to-pri-dark sm:p-16"
        {...rest}
      >
        <div className="relative z-10 flex flex-col gap-10 sm:items-start [@media(max-width:420px)]:text-center">
          <div className="flex flex-col gap-6">
            <h2 className="typography-d1 text-neu-0 dark:text-neu-900">
              {heading}
            </h2>
            <p className="typography-body-lg max-w-[555px] text-pretty text-neu-50 dark:text-neu-800">
              {description}
            </p>
          </div>

          {children}
        </div>

        <div
          role="presentation"
          // prettier-ignore
          className="
              pointer-events-none absolute
              sm:bottom-[-277px] inset-0 sm:left-1/3 xl:left-1/2 sm:top-[-107px] xl:right-[-391px]
              [--start:hsl(var(--color-sec-base))]
              [--end:hsl(var(--color-sec-lighter))]
              dark:[--start:hsl(var(--color-sec-dark))]
              dark:[--end:hsl(var(--color-sec-base))]

              [mask-size:cover]
              max-sm:[mask-position:center] max-sm:opacity-50
              sm:[mask-size:1117px]
            "
          style={{
            maskImage: `url(${logoMask.src})`,
            maskRepeat: "no-repeat",
          }}
        >
          <StripesDecoration
            stripeWidth="5.2px"
            oddClassName="bg-[linear-gradient(180deg,var(--start)_0%,var(--end)_100%)]"
          />
        </div>
      </section>
    </div>
  )
}
