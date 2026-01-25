"use client"

import { useState } from "react"
import { clsx } from "clsx"
import Image from "next/image"
import type { StaticImageData } from "next/image"

import { Marquee } from "@/app/conf/_design-system/marquee"

import { imagesByYear } from "./images"

const YEARS = ["2024", "2023"] as const
type Year = (typeof YEARS)[number]

export interface GalleryStripProps extends React.HTMLAttributes<HTMLElement> {}

export function GalleryStrip({ className, ...rest }: GalleryStripProps) {
  const [selectedYear, setSelectedYear] = useState<Year>("2024")

  return (
    <section
      role="presentation"
      className={clsx("py-8 md:py-16", className)}
      {...rest}
    >
      <div className="flex gap-3.5 px-4 max-md:items-center md:px-24">
        {YEARS.map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={clsx(
              "gql-focus-visible typography-menu p-1",
              selectedYear === year
                ? "bg-sec-light text-neu-900 dark:text-neu-0"
                : "text-neu-800",
            )}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="mt-6 w-full md:mt-10">
        <Marquee
          gap={8}
          speed={35}
          drag
          reverse
          className="cursor-[var(--cursor-grabbing,grab)] touch-pan-y"
        >
          {imagesByYear[selectedYear].map((image, i) => {
            const key = `${selectedYear}-${i}`

            return <GalleryStripImage key={key} image={image} index={i} />
          })}
        </Marquee>
      </div>
    </section>
  )
}

function GalleryStripImage({
  image,
  index,
}: {
  image: StaticImageData
  index: number
}) {
  return (
    <div className="relative md:px-2">
      <Image
        data-index={index}
        src={image}
        placeholder="blur"
        alt=""
        role="presentation"
        // intrinsic 799x533
        height={320}
        width={index % 4 === 2 ? 256 : index % 3 === 2 ? 420 : 480}
        className="pointer-events-none h-[320px] object-cover"
      />
    </div>
  )
}
