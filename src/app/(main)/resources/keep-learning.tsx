// https://www.figma.com/design/aPUvZDSxJfYDJtPd7GF2sB/GraphQL.org--Working-File?node-id=2947-75981&m=dev

import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import blurCorner from "./[category]/blur-corner.webp"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"
import { Anchor } from "@/app/conf/_design-system/anchor"

export function KeepLearning({
  nextTitle,
  nextHref,
}: {
  nextTitle: string
  nextHref: string
}) {
  return (
    <section className="gql-container gql-section flex">
      <h2 className="max-md:hidden">Keep Learning</h2>
      <Anchor href={nextHref} className="relative">
        <span className="typography-menu flex gap-1 text-pri-base dark:text-pri-dark">
          Next
          <ArrowDownIcon className="size-4 -rotate-90" />
        </span>
        <p>{nextTitle}</p>
        <Stripes />
      </Anchor>
    </section>
  )
}

function Stripes() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        maskImage: `url(${blurCorner.src})`,
        WebkitMaskImage: `url(${blurCorner.src})`,
      }}
    >
      <StripesDecoration
        evenClassName="bg-[linear-gradient(90deg,hsl(var(--color-sec-lighter))_0_12px,hsl(var(--color-sec-light))_12px_24px)] dark:bg-[linear-gradient(90deg,hsl(var(--color-sec-dark)/0.22)_0_12px,hsl(var(--color-sec-base)/0.22)_12px_24px)]"
        // oddClassName="bg-[linear-gradient(90deg,hsl(var(--color-pri-light))_0_12px,hsl(var(--color-pri-base)/0)_12px_24px)] dark:bg-[linear-gradient(90deg,hsl(var(--color-sec-base)/0.14)_0_12px,hsl(var(--color-sec-light)/0.14)_12px_24px)]"
        angle="-90deg"
      />
    </div>
  )
}
