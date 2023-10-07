import React, { ComponentProps, useEffect, useRef, useState } from "react"
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

function Img({
  src,
  alt = "gallery",
  isLast,
  newLimit,
}: ComponentProps<"img"> & {
  isLast?: boolean
  newLimit: () => any
}) {
  /**
   * Select the Card component with useRef
   */
  const cardRef = useRef<HTMLImageElement>(null)

  /**
   * Implement Intersection Observer to check if the last Card in the array is visible on the screen, then set a new limit
   */
  useEffect(() => {
    if (!cardRef?.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit()
        observer.unobserve(entry.target)
      }
    })

    observer.observe(cardRef.current)
  }, [isLast])

  return (
    <Zoom>
      <img
        alt={alt}
        className="object-cover aspect-video w-full hover:opacity-75 rounded-md"
        src={src}
        ref={cardRef}
      />
    </Zoom>
  )
}

const GalleryConf = () => {
  const [page, setPage] = useState(1)

  const currentImages = chunk(images, 6).slice(0, page)
  const lastSrc = currentImages.at(-1)!.at(-1)
  return (
    <div className="py-20">
      {currentImages.map((c, i) => {
        function getCard(index: number) {
          return (
            c[index] && (
              <Img
                src={c[index]}
                isLast={c[index] === lastSrc}
                newLimit={() => setPage(page + 1)}
              />
            )
          )
        }

        return (
          <div key={i} className="grid lg:grid-cols-2 gap-2">
            <div>
              <div className="grid grid-cols-2 gap-2">
                {getCard(0)}
                {getCard(1)}
              </div>
              {getCard(2)}
            </div>
            <div>
              {getCard(3)}
              <div className="grid grid-cols-2 gap-2">
                {getCard(4)}
                {getCard(5)}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default GalleryConf
