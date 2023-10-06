import React, { ComponentProps } from "react"
import { images } from "../../../utils/conf-images"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"

function chunk<T>(arr: T[], len: number): T[][] {
  var chunks = [],
    i = 0,
    n = arr.length

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)))
  }

  return chunks
}

function Img({ src, alt = "gallery" }: ComponentProps<"img">) {
  return (
    <Zoom>
      <img
        alt={alt}
        className="object-cover aspect-video w-full hover:opacity-75 rounded-md"
        src={src}
      />
    </Zoom>
  )
}

const GalleryConf = () => {
  return (
    <div className="py-20">
      <div className="container px-3 py-6 mx-auto">
        {chunk(images, 6).map((c, i) => (
          <div key={i} className="flex max-lg:flex-col flex-wrap">
            <div className="flex flex-wrap lg:w-1/2">
              {c[0] && (
                <div className="md:p-2 p-1 lg:w-1/2">
                  <Img src={c[0]} />
                </div>
              )}
              {c[1] && (
                <div className="md:p-2 p-1 lg:w-1/2">
                  <Img src={c[1]} />
                </div>
              )}
              {c[2] && (
                <div className="md:p-2 p-1 lg:w-full">
                  <Img src={c[2]} />
                </div>
              )}
            </div>
            <div className="lg:w-1/2">
              {c[3] && (
                <div className="md:p-2 p-1 w-full">
                  <Img src={c[3]} />
                </div>
              )}
              <div className="flex">
                {c[4] && (
                  <div className="md:p-2 p-1 lg:w-1/2">
                    <Img src={c[4]} />
                  </div>
                )}
                {c[5] && (
                  <div className="md:p-2 p-1 lg:w-1/2">
                    <Img src={c[5]} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GalleryConf
