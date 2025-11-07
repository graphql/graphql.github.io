import { clsx } from "clsx"
import { Fragment, ReactNode } from "react"

import { Marquee } from "@/app/conf/_design-system/marquee"
import CodeIcon from "@/app/conf/_design-system/pixelarticons/code.svg?svgr"
import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"

import blurWave from "./blur.webp"

export interface MarqueeRowsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ReactNode[][]
  variant: "primary" | "secondary"
}

export function MarqueeRows({
  items,
  className,
  variant,
  ...rest
}: MarqueeRowsProps) {
  const separator = (
    <CodeIcon
      className={clsx(
        "size-8 md:size-10",
        variant === "primary"
          ? "text-pri-dark dark:text-pri-light"
          : "text-pri-base",
      )}
    />
  )

  return (
    <section
      className={clsx(
        "relative font-mono text-xl/none md:text-[56px]/none 3xl:[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]",
        variant === "primary" ? "text-pri-base" : "text-neu-900",
        className,
      )}
      {...rest}
    >
      {variant === "primary" && <Stripes />}
      {items.map((row, i) => (
        <Marquee
          key={i}
          gap={16}
          speed={35}
          speedOnHover={15}
          className="relative *:select-none"
          reverse={i % 2 === 1}
          drag
          separator={separator}
        >
          {row.map((item, j) => (
            <Fragment key={j}>
              {item}
              {j !== row.length - 1 && separator}
            </Fragment>
          ))}
        </Marquee>
      ))}
    </section>
  )
}

function Stripes() {
  return (
    <div
      role="presentation"
      // prettier-ignore
      // false positive
      // eslint-disable-next-line tailwindcss/no-contradicting-classname
      className="pointer-events-none absolute inset-0 -bottom-1/2

    [--start:hsl(var(--color-pri-light)/.6)]
    [--end:hsl(var(--color-pri-lighter)/.05)]
    dark:[--start:hsl(320_86_20/.6)]
    dark:[--end:hsl(var(--color-pri-base)/.025)]

    [mask-size:400%_100%]
    sm:[mask-size:cover]
  "
      style={{
        maskImage: `url(${blurWave.src})`,
        WebkitMaskImage: `url(${blurWave.src})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <StripesDecoration oddClassName="bg-[linear-gradient(180deg,var(--start)_0%,var(--end)_100%)]" />
    </div>
  )
}
