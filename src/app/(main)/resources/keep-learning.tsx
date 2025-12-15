import { clsx } from "clsx"

import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"
import { Anchor } from "@/app/conf/_design-system/anchor"

import blurCorner from "./[category]/blur-corner.webp"

export function KeepLearning({
  title,
  href,
  stripes,
  className,
}: {
  title: string
  href: string
  stripes: string
  className?: string
}) {
  return (
    <section
      className={clsx(
        "gql-container gql-section flex justify-between",
        className,
      )}
    >
      <h2 className="typography-h2 max-md:hidden">Keep Learning</h2>
      <Anchor
        href={href}
        className="relative max-w-[656px] flex-1 border border-neu-200 p-4 dark:border-neu-50 md:p-6 lg:p-8"
      >
        <span className="typography-menu flex gap-1 text-pri-base dark:text-pri-light">
          Next
          <ArrowDownIcon className="size-4 -rotate-90" />
        </span>
        <p className="typography-h3 mt-8">{title}</p>
        <Stripes stripes={stripes} />
      </Anchor>
    </section>
  )
}

function Stripes({ stripes }: { stripes: string }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        maskImage: `url(${blurCorner.src})`,
        WebkitMaskImage: `url(${blurCorner.src})`,
      }}
    >
      <StripesDecoration evenClassName={stripes} angle="-90deg" />
    </div>
  )
}
