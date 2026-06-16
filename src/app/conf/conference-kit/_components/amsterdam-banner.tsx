import { CalendarIcon } from "@/app/conf/_design-system/pixelarticons/calendar-icon"
import { PinIcon } from "@/app/conf/_design-system/pixelarticons/pin-icon"
import { Tag } from "@/app/conf/_design-system/tag"
import fostLogo from "@/app/day/2026/assets/fost-logo.avif"
import amsterdamImage from "./amsterdam.png"

import { BannerFrame } from "./banner-frame"
import { QRCodeSVG } from "./qr-code"
import { BlobStripes } from "./blob-stripes"
import Image from "next/image"
import { GraphQLWordmarkLogo } from "@/icons"

export function AmsterdamBanner() {
  return (
    <BannerFrame
      slug="amsterdam"
      caption="GraphQL Day Amsterdam 2026"
      className="flex flex-col gap-7 bg-[#0A0B08] p-9 text-white"
    >
      <BlobStripes
        position="65% 35%"
        size="200%"
        stripeWidth="14px"
        evenClassName="bg-[linear-gradient(180deg,rgba(225,0,152,0.22)_0%,rgba(225,0,152,0.04)_100%)]"
        oddClassName="bg-[linear-gradient(180deg,rgba(225,0,152,0.06)_0%,rgba(132,0,89,0.18)_100%)]"
      />

      <div className="z-10 flex items-center">
        <GraphQLWordmarkLogo className="h-8 !fill-white" />
      </div>

      <h2 className="z-10 m-0 mt-16 text-[60px] font-medium leading-[1.05] tracking-tight">
        GraphQL Day
        <br />
        Amsterdam
        <br />
        2026
      </h2>

      <div className="z-10">
        <p
          className="typography-body-lg m-0 text-white/80"
          style={{ lineHeight: 1.4, textWrap: "pretty" }}
        >
          Community-organized GraphQL events at conferences worldwide.
        </p>
        <div className="mt-4 flex items-center gap-1">
          <Tag color={"hsl(var(--color-pri-base))"}>talks</Tag>
          <Tag color={"hsl(var(--color-pri-dark))"}>demos</Tag>
          <Tag color={"hsl(var(--color-neu-500))"}>community</Tag>
        </div>
      </div>

      <div className="flex-1" />
      <div
        className="z-10 mt-auto grid grid-cols-[44%_1fr] overflow-hidden border border-white/10 bg-white/[0.025]"
        style={{ height: 180 }}
      >
        <div className="relative overflow-hidden bg-pri-darker/15">
          <Image
            src={amsterdamImage}
            alt="Amsterdam canal houses"
            fill
            sizes="250px"
            placeholder="empty"
            className="object-cover opacity-80 hue-rotate-[-5deg]"
          />
        </div>
        <div className="flex flex-col gap-2 border-l border-white/10 p-[18px_18px_16px]">
          <div className="flex items-start gap-2.5">
            <CalendarIcon className="size-5 translate-y-0.5 text-pri-base" />
            <div className="typography-body-md">Jun 9–10, 2026</div>
          </div>
          <div className="flex items-start gap-2.5">
            <PinIcon className="size-5 translate-y-0.5 text-pri-base" />
            <div className="typography-body-md">
              Amsterdam,
              <br />
              The Netherlands
            </div>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2 border-t border-white/5 pt-3.5">
            <span
              className="typography-menu translate-y-px text-xs text-white/60"
              style={{ letterSpacing: "0.04em" }}
            >
              hosted at
            </span>
            <Image
              src={fostLogo}
              alt="FOST"
              width={60}
              height={20}
              placeholder="empty"
            />
          </div>
        </div>
      </div>

      <div className="z-10 flex h-24 items-center gap-5 border border-white/10 bg-white/[0.02] p-3.5">
        <div className="min-w-0 flex-1">
          <div className="typography-menu text-xs text-white/60">
            Visit the event
          </div>
          <div
            className="mt-1 text-[22px] font-medium"
            style={{ letterSpacing: "-0.01em" }}
          >
            graphql.org/day/amsterdam
          </div>
        </div>
        <div className="flex size-[80px] shrink-0 items-center justify-center border-[1.5px] border-pri-base p-1">
          <QRCodeSVG
            value="https://graphql.org/day/2026/amsterdam/"
            size={68}
            color="#FAFCF4"
          />
        </div>
      </div>
    </BannerFrame>
  )
}
