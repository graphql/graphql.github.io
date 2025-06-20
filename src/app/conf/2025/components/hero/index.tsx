import { CalendarIcon } from "@/app/conf/_design-system/pixelarticons/calendar-icon"
import { PinIcon } from "@/app/conf/_design-system/pixelarticons/pin-icon"

import GraphQLFoundationWordmark from "../../assets/graphql-foundation-wordmark.svg?svgr"

import { ImageLoaded } from "../image-loaded"
import blurBean from "./blur-bean-cropped.webp"

export function Hero({
  pageName,
  year,
  children,
  bottom,
}: {
  pageName?: string
  year: string
  children: React.ReactNode
  bottom?: React.ReactNode
}) {
  return (
    <article className="gql-conf-navbar-strip relative isolate flex flex-col justify-center bg-pri-base text-neu-0 selection:bg-blk/40 before:bg-white/30 dark:bg-pri-darker dark:text-neu-900 dark:selection:bg-white/40 before:dark:bg-blk/40">
      <article className="relative">
        <HeroStripes />
        <div className="gql-conf-container mx-auto flex max-w-full flex-col gap-12 overflow-hidden p-4 pt-6 sm:p-8 sm:pt-12 md:gap-12 md:bg-left md:p-12 lg:px-24 lg:pb-16 lg:pt-24">
          <div className="flex gap-10 max-md:flex-col md:justify-between">
            {pageName ? (
              <div>
                <span className="typography-h3 text-sec-base">
                  GraphQLConf {year}
                </span>
                <h1 className="typography-d1">{pageName}</h1>
              </div>
            ) : (
              <h1 className="typography-d1 flex flex-wrap gap-2">
                <span>GraphQLConf</span>
                <span className="text-sec-base">{year}</span>
              </h1>
            )}
            <div className="flex h-min items-center gap-4">
              <span className="typography-body-sm whitespace-pre">
                hosted by
              </span>
              <GraphQLFoundationWordmark width={128} height={34.877} />
            </div>
          </div>

          <div className="flex flex-col gap-8">{children}</div>
        </div>
      </article>
      {bottom}
    </article>
  )
}

export function HeroDateAndLocation() {
  return (
    <div className="typography-body-md flex flex-col gap-4 md:flex-row md:gap-6">
      <div className="flex items-center gap-2">
        <CalendarIcon className="size-5 sm:size-6" />
        <time dateTime="2025-09-08">September 08</time>
        <span>-</span>
        <time dateTime="2025-09-10">10, 2025</time>
      </div>
      <div className="flex items-center gap-2">
        <PinIcon className="size-5 sm:size-6" />
        <address className="not-italic">Amsterdam, Netherlands</address>
      </div>
    </div>
  )
}

const maskEven =
  "repeating-linear-gradient(to right, transparent, transparent 12px, black 12px, black 24px)"
const maskOdd =
  "repeating-linear-gradient(to right, black, black 12px, transparent 12px, transparent 24px)"

export function HeroStripes() {
  return (
    <ImageLoaded
      role="presentation"
      image={blurBean}
      className="pointer-events-none absolute inset-x-0 bottom-[-385px] top-[-203px] -z-10 translate-y-12 opacity-0 transition duration-[400ms] ease-linear [mask-size:100%_50%] data-[loaded=true]:translate-y-0 data-[loaded=true]:opacity-100 sm:[mask-size:125%] xl:[mask-size:100%]"
      style={{
        maskImage: `url(${blurBean.src})`,
        WebkitMaskImage: `url(${blurBean.src})`,
        // maskSize: "100%", // todo: (very low priority) need the newly exported full blur bean with rotation to match the mobile design 1-1
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    >
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--color-pri-light))_0%,hsl(319deg_100%_90%_/_0.2)_100%)] dark:bg-[linear-gradient(180deg,hsl(var(--color-pri-dark))_0%,hsl(319_100%_20%_/_1)_100%)]"
        style={{
          maskImage: maskEven,
          WebkitMaskImage: maskEven,
        }}
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,hsl(319deg_100%_90%_/_0.2)_0%,hsl(var(--color-pri-base))_100%)] dark:bg-[linear-gradient(180deg,hsl(319_100%_30%_/_1)_0%,hsl(var(--color-pri-dark))_100%)]"
        style={{
          maskImage: maskOdd,
          WebkitMaskImage: maskOdd,
        }}
      />
    </ImageLoaded>
  )
}
