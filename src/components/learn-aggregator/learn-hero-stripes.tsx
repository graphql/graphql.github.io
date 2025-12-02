import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"

import blurBean from "./learn-blur-bean.webp"

export function LearnHeroStripes() {
  return (
    <div
      role="presentation"
      // eslint-disable-next-line tailwindcss/no-contradicting-classname
      className="pointer-events-none absolute inset-0 bg-neu-50 [--end-1:#FFF] [--end-2:rgb(255_204_239/.2)] [--start-1:#FFEAF8] [--start-2:hsl(var(--color-sec-lighter))] dark:[--end-1:hsl(75,15%,5%)] dark:[--end-2:hsl(319,100%,10%)] dark:[--start-1:hsl(319,100%,14%)] dark:[--start-2:hsl(319,100%,30%)] sm:h-[360px] lg:h-[calc(100%-163px)]"
      style={{
        maskImage: `url(${blurBean.src})`,
        WebkitMaskImage: `url(${blurBean.src})`,
        maskSize: "2200px",
        WebkitMaskSize: "2200px",
        maskPosition: "50% 60%",
        WebkitMaskPosition: "50% 60%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <StripesDecoration
        evenClassName="bg-[linear-gradient(180deg,var(--start-1)_-80%,var(--end-1)_102%)]"
        oddClassName="bg-[linear-gradient(180deg,var(--start-2)_-80%,var(--end-2)_102%)]"
      />
    </div>
  )
}
