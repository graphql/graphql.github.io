"use client"

import type { StaticImageData } from "next/image"
import { useEffect, useState } from "react"

const _cache = new Map<string, HTMLImageElement>()

export interface ImageLoadedProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string | StaticImageData
  fetchPriority?: "high" | "low" | "auto"
}

export function ImageLoaded({
  image,
  fetchPriority = "auto",
  ...rest
}: ImageLoadedProps) {
  const [loaded, setLoaded] = useState(false)
  const src = typeof image === "string" ? image : image.src

  const alreadyLoaded = _cache.get(src)?.complete

  useEffect(() => {
    let img: HTMLImageElement
    if (_cache.has(src)) {
      img = _cache.get(src)!
      if (img.complete) {
        setLoaded(true)
      } else {
        img.addEventListener("load", () => setLoaded(true))
      }
    } else {
      img = new Image()
      img.src = src
      img.fetchPriority = fetchPriority
      img.addEventListener("load", () => setLoaded(true))
      _cache.set(src, img)
    }
  }, [src, fetchPriority])

  return <div data-loaded={alreadyLoaded || loaded} {...rest} />
}
