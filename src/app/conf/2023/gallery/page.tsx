import { Metadata } from "next"
import { images } from "./_conf-images"
import { ImageCarousel } from "../../_components/imageCarousel"
import React from "react"
import NextImage from "next-image-export-optimizer"

export const metadata: Metadata = {
  title: "Gallery",
}

function chunk<T>(arr: T[], len: number): T[][] {
  const chunks = []
  let i = 0

  while (i < arr.length) {
    chunks.push(arr.slice(i, (i += len)))
  }

  return chunks
}

export default function GalleryPage() {
  const currentImages = chunk(images, 6)

  return (
    <div className="bg-[#f4f6f8]">
      <div className="container conf-block gallery-page-images-list">
        {currentImages.map((c, i) => {
          function getCard(index: number, { size }: { size: "small" | "big" }) {
            const { width, height } =
              size === "small"
                ? { width: 370, height: 208 }
                : { width: 748, height: 420 }

            return (
              c[index] && (
                <div className="overflow-hidden rounded-md">
                  <NextImage
                    alt={"gallery image"}
                    className="object-cover aspect-video w-full hover:opacity-75"
                    src={c[index]}
                    width={width}
                    height={height}
                  />
                </div>
              )
            )
          }

          return (
            <div key={i} className="grid lg:grid-cols-2 gap-2 mb-2">
              <div className="gap-2 flex flex-col">
                <div className="grid grid-cols-2 gap-2">
                  {getCard(0, { size: "small" })}
                  {getCard(1, { size: "small" })}
                </div>
                {getCard(2, { size: "big" })}
              </div>
              <div className="gap-2 flex flex-col">
                {getCard(3, { size: "big" })}
                <div className="grid grid-cols-2 gap-2">
                  {getCard(4, { size: "small" })}
                  {getCard(5, { size: "small" })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <ImageCarousel index={0} images={images} />
    </div>
  )
}
