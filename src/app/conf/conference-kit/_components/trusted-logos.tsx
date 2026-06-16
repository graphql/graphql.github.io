import MetaLockup from "@/components/index-page/trusted-by/logos/Meta.svg?svgr"
import IBMWordmark from "@/components/index-page/trusted-by/logos/IBM.svg?svgr"
import AirBnBLockup from "@/components/index-page/trusted-by/logos/AirBnB.svg?svgr"
import IntuitWordmark from "@/components/index-page/trusted-by/logos/Intuit.svg?svgr"
import AWSLogo from "@/components/index-page/trusted-by/logos/AWS.svg?svgr"
import PayPalWordmark from "@/components/index-page/trusted-by/logos/PayPal.svg?svgr"
import NewYorkTimesWordmark from "@/components/index-page/trusted-by/logos/NewYorkTimes.svg?svgr"
import StarbucksWordmark from "@/components/index-page/trusted-by/logos/Starbucks.svg?svgr"
import GitHubLockup from "@/components/index-page/trusted-by/logos/GitHub.svg?svgr"
import ShopifyMonotoneLockup from "@/components/index-page/trusted-by/logos/ShopifyMonotone.svg?svgr"

interface TrustedLogo {
  name: string
  Component: React.FC<React.SVGProps<SVGElement>>
  // Optical heights tuned by eye so wordmarks share a consistent cap height
  // despite differing viewBox aspect ratios.
  height: number
}

export const TRUSTED_LOGOS: TrustedLogo[] = [
  { name: "Meta", Component: MetaLockup, height: 20 },
  { name: "AWS", Component: AWSLogo, height: 24 },
  { name: "Airbnb", Component: AirBnBLockup, height: 22 },
  { name: "Intuit", Component: IntuitWordmark, height: 22 },
  { name: "IBM", Component: IBMWordmark, height: 22 },
  { name: "PayPal", Component: PayPalWordmark, height: 22 },
  { name: "New York Times", Component: NewYorkTimesWordmark, height: 18 },
  { name: "Starbucks", Component: StarbucksWordmark, height: 24 },
  { name: "Shopify", Component: ShopifyMonotoneLockup, height: 22 },
  { name: "GitHub", Component: GitHubLockup, height: 26 },
]

// Logos collapsed to a single white silhouette via brightness(0) invert(1).
// We can't fix every per-element fill on third-party SVGs, so we forfeit
// brand color in exchange for predictable contrast on dark/gradient banners.
export function BannerTrustedFooter() {
  return (
    <div className="absolute inset-x-9 bottom-9 z-10">
      <div
        className="mb-3 font-mono text-[11px] uppercase text-white/55"
        style={{ letterSpacing: "0.04em" }}
      >
        Trusted in production
      </div>
      <div className="grid grid-cols-5 grid-rows-2 items-center gap-x-2 gap-y-3">
        {TRUSTED_LOGOS.map(({ name, Component, height }) => (
          <div
            key={name}
            className="flex h-[38px] min-w-0 items-center justify-center overflow-hidden"
            aria-label={name}
          >
            <Component
              className="max-h-full w-auto max-w-full shrink"
              style={{ height, filter: "brightness(0) invert(1)" }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
