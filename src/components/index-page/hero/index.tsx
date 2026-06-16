import { StripesDecoration } from "@/app/conf/_design-system/stripes-decoration"
import CheckIcon from "@/app/conf/_design-system/pixelarticons/check.svg?svgr"
import { Button } from "@/app/conf/_design-system/button"
import { ImageLoaded } from "@/app/conf/2025/components/image-loaded"

import logoBlurred from "./logo-blurred.webp"
import Head from "next/head"

export function Hero() {
  return (
    <div className="relative bg-neu-50 dark:bg-neu-50/10">
      <div className="gql-container flex flex-col-reverse lg:grid lg:grid-cols-2">
        <div className="flex max-w-4xl flex-col justify-center gap-4 p-4 lg:min-h-[800px] xl:gap-8 xl:py-24 xl:pl-24 xl:pr-10">
          <h1 className="typography-h1 max-w-3xl text-neu-900">
            The query language for modern APIs
          </h1>

          <ul className="flex flex-col gap-2">
            {[
              "Typesafe schemas, secure requests",
              "Frictionless distributed development",
              "Data driven UI at scale",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-1">
                <CheckIcon className="size-6 shrink-0 text-pri-base max-lg:mt-px" />
                <p className="text-pretty text-neu-800">{item}</p>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Button href="/#how-it-works">Try it out</Button>
            <Button href="/learn" variant="secondary">
              <span className="sr-only">Read the </span> Docs
            </Button>
          </div>
        </div>
        <HeroStripes />
      </div>
    </div>
  )
}

function HeroStripes() {
  return (
    <div className="pointer-events-none relative overflow-hidden max-lg:h-[210px]">
      <Head>
        <link
          rel="preload"
          as="image"
          href={logoBlurred.src}
          type="image/webp"
          fetchPriority="high"
        />
      </Head>
      <ImageLoaded
        image={logoBlurred}
        className="relative h-full bg-gradient-to-b from-pri-base to-pri-lighter opacity-0 transition-opacity duration-[1.5s] [mask-position:center_12%] [mask-size:110%] data-[loaded=true]:opacity-100 dark:to-pri-base sm:[mask-size:auto_300%] lg:[mask-position:7%_7%] lg:[mask-size:200%]"
        style={{
          maskImage: `url(${logoBlurred.src})`,
          WebkitMaskImage: `url(${logoBlurred.src})`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
      <StripesDecoration
        stripeWidth="5px"
        oddClassName="bg-gradient-to-b from-sec-base to-pri-lighter dark:from-sec-darker dark:to-pri-darker"
      />
    </div>
  )
}
