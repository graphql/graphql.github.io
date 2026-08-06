import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"
import CheckIcon from "@/app/conf/_design-system/pixelarticons/check.svg?svgr"
import logoMask from "@/app/conf/2026/components/cta-card-section/logo-mask.webp"
import { GraphQLWordmarkLogo } from "@/icons"

import { BannerFrame } from "./banner-frame"
import { BannerTrustedFooter } from "./trusted-logos"

const bullets = [
  "Typed schemas LLMs can reason about",
  "Frictionless distributed development",
  "One contract for UIs and autonomous agents",
]

export function AiHeroBanner() {
  return (
    <BannerFrame
      slug="ai-hero"
      caption="AI-native hero — generic"
      className="px-9 text-white"
      style={{
        background: "linear-gradient(180deg, #F2009A 0%, #500437 100%)",
      }}
    >
      <div className="flex h-24 items-center">
        <GraphQLWordmarkLogo className="h-8 !fill-white" />
      </div>

      <div className="mt-16 flex flex-col gap-9">
        <h2
          className="m-0 text-[64px] font-medium text-white"
          style={{
            lineHeight: 1.03,
            letterSpacing: "-0.025em",
            textWrap: "balance",
          }}
        >
          The API language for humans and agents
        </h2>

        <ul className="m-0 flex list-none flex-col gap-[18px] p-0">
          {bullets.map(text => (
            <li key={text} className="flex items-start gap-3">
              <span className="pt-1">
                <CheckIcon className="-mt-0.5 block size-8 shrink-0 text-white" />
              </span>
              <span
                className="text-[28px] text-white/95"
                style={{
                  lineHeight: 1.3,
                  textWrap: "pretty",
                  letterSpacing: "-0.01em",
                }}
              >
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pointer-events-none absolute inset-0 bottom-8 top-80 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.33), rgba(255,255,255,0.1))",
            maskImage: `url(${logoMask.src})`,
            WebkitMaskImage: `url(${logoMask.src})`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskSize: "100%",
            WebkitMaskSize: "100%",
            maskPosition: "center 70%",
            WebkitMaskPosition: "center 70%",
          }}
        />
        <StripesDecoration
          stripeWidth="5px"
          angle="90deg"
          oddClassName="bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0.18),rgba(255,255,255,0)_88%)]"
        />
      </div>

      <BannerTrustedFooter />
    </BannerFrame>
  )
}
