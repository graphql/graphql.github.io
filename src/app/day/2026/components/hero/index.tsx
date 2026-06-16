import { ReactNode } from "react"
import clsx from "clsx"

import { CalendarIcon } from "@/app/conf/_design-system/pixelarticons/calendar-icon"
import { PinIcon } from "@/app/conf/_design-system/pixelarticons/pin-icon"

import fostLogo from "../../assets/fost-logo.avif"
import {
  StripesDecoration,
  StripesDecorationProps,
} from "@/app/conf/_design-system/stripes-decoration"

import { ImageLoaded } from "../image-loaded"
import blurBean from "@/app/conf/2026/components/hero/blur-bean-cropped.webp"

export type HeroProps = {
  pageName?: string
  children?: React.ReactNode
  bottom?: React.ReactNode
  colorScheme?: "primary" | "neutral"
  stripes?: ReactNode
} & (
  | { year: string | number; subtitle?: never }
  | { year?: never; subtitle: string }
)

export function Hero(props: HeroProps) {
  const colorScheme = props.colorScheme || "primary"

  return (
    <article
      className={clsx(
        "gql-conf-navbar-strip relative flex flex-col justify-center selection:bg-blk/40 before:bg-white/30 before:dark:bg-blk/40",
        colorScheme === "primary"
          ? "bg-pri-base text-neu-0 dark:bg-pri-darker dark:text-neu-900 dark:selection:bg-white/40"
          : "bg-neu-100 dark:bg-neu-50/25",
      )}
    >
      <article className="relative">
        {props.stripes || <HeroStripes />}
        <div className="gql-container mx-auto flex max-w-full flex-col gap-12 overflow-hidden p-4 pt-6 sm:p-8 sm:pt-12 md:gap-12 md:bg-left md:p-12 lg:px-24 lg:pb-16 lg:pt-24">
          <div className="flex gap-4 max-md:flex-col md:justify-between md:gap-10">
            {props.pageName ? (
              <div>
                <span
                  className={clsx(
                    "typography-body-lg lg:typography-h3",
                    colorScheme === "primary"
                      ? "text-sec-base"
                      : "text-pri-base",
                  )}
                >
                  {props.year ? `GraphQL Day ${props.year}` : props.subtitle}
                </span>
                <h1 className="typography-d1">{props.pageName}</h1>
              </div>
            ) : (
              <h1 className="typography-d1 flex flex-wrap gap-2 leading-none">
                <span>GraphQL Day</span>
                <span
                  className={clsx(
                    "typography-h1 w-full",
                    colorScheme === "primary"
                      ? "text-sec-base"
                      : "text-pri-base",
                  )}
                >
                  {props.year || props.subtitle}
                </span>
              </h1>
            )}
            <div className="flex h-min items-center gap-3">
              <span className="typography-body-sm whitespace-pre">
                hosted at
              </span>
              <img
                src={fostLogo.src}
                alt="FOST"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">{props.children}</div>
        </div>
      </article>
      {props.bottom}
    </article>
  )
}

export function HeroDateAndLocation({
  date,
  dateTime,
  location,
}: {
  date: string
  dateTime: string
  location: string
}) {
  return (
    <div className="typography-body-md flex flex-col gap-4 md:flex-row md:gap-6">
      <div className="flex items-center gap-2">
        <CalendarIcon className="size-5 sm:size-6" />
        <time dateTime={dateTime}>{date}</time>
      </div>
      <div className="flex items-center gap-2">
        <PinIcon className="size-5 sm:size-6" />
        <address className="not-italic">{location}</address>
      </div>
    </div>
  )
}

export interface HeroStripesProps extends StripesDecorationProps {
  className?: string
}
export function HeroStripes({ className, ...rest }: HeroStripesProps) {
  return (
    <ImageLoaded
      role="presentation"
      image={blurBean}
      className={clsx(
        "pointer-events-none absolute inset-x-0 bottom-[-385px] top-[-203px] -z-10 translate-y-12 opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] [mask-size:100%_50%] data-[loaded=true]:translate-y-0 data-[loaded=true]:opacity-100 sm:[mask-size:125%] xl:[mask-size:100%]",
        className,
      )}
      style={{
        maskImage: `url(${blurBean.src})`,
        WebkitMaskImage: `url(${blurBean.src})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    >
      <StripesDecoration
        evenClassName="bg-[linear-gradient(in_oklch_180deg,hsl(var(--color-pri-light))_0%,hsl(29.7deg_100%_45.1%/_0)_100%)] dark:bg-[linear-gradient(in_oklch_180deg,hsl(var(--color-pri-base)/0.1)_0%,hsl(var(--color-pri-dark)_/.35)_100%)]"
        // hsl(29.7deg, 86.1%, 45.1%)
        oddClassName="bg-[linear-gradient(180deg,hsl(319deg_100%_90%_/_0.2)_0%,hsl(var(--color-pri-base))_100%)] dark:bg-[linear-gradient(180deg,hsl(319_100%_30%_/_1)_0%,hsl(29.7deg_100%_45.1%_/_1)_100%)]"
        {...rest}
      />
    </ImageLoaded>
  )
}
