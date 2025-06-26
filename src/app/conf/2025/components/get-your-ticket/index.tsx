import { clsx } from "clsx"

import { ImageLoaded } from "../image-loaded"

import { TicketPeriods } from "./ticket-periods"

import blurBean from "./blur-bean.webp"

export function GetYourTicket({ className }: { className?: string }) {
  return (
    <section
      className={clsx(
        "dark relative overflow-hidden bg-pri-dark px-4 py-8 lg:py-16 xl:py-24",
        className,
      )}
    >
      <Stripes />
      <div className="gql-conf-container gql-conf-section relative">
        <header className="flex flex-wrap justify-between gap-6 md:items-end">
          <h2 className="typography-h2 whitespace-pre text-white">
            Get your ticket
          </h2>
          <p className="typography-body-lg text-neu-800">
            The registration deadline is 23:59 CET on the respective date.
          </p>
        </header>

        <div className="mt-6 grid gap-px backdrop-blur-[6px] md:mt-10 md:grid-cols-3">
          <TicketPeriods />
        </div>
      </div>
    </section>
  )
}

const maskEven =
  "repeating-linear-gradient(to right, transparent, transparent 12px, black 12px, black 24px)"
const maskOdd =
  "repeating-linear-gradient(to right, black, black 12px, transparent 12px, transparent 24px)"

function Stripes() {
  return (
    <ImageLoaded
      role="presentation"
      image={blurBean}
      className="pointer-events-none absolute inset-x-0 bottom-[-385px] top-[-203px] translate-y-12 opacity-0 transition duration-[400ms] ease-linear [mask-position:70%_60%] *:opacity-100 data-[loaded=true]:translate-y-0 data-[loaded=true]:opacity-100 max-3xl:[mask-size:220%] max-md:[mask-size:800%] md:*:opacity-30 lg:*:opacity-50 xl:*:opacity-60 3xl:[mask-position:70%_39%]"
      style={{
        maskImage: `url(${blurBean.src})`,
        WebkitMaskImage: `url(${blurBean.src})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, hsl(var(--color-pri-light)) 0%, hsl(var(--color-pri-lighter)) 100%)",
          maskImage: maskEven,
          WebkitMaskImage: maskEven,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg,hsl(319deg 100% 90% / 0.2) 0%, hsl(var(--color-pri-base)) 100%)",
          maskImage: maskOdd,
          WebkitMaskImage: maskOdd,
        }}
      />
    </ImageLoaded>
  )
}
