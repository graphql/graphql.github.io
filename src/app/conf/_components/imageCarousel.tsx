"use client"
import "react-medium-image-zoom/dist/styles.css"

import NextImage from "next-image-export-optimizer"
import { StaticImageData } from "next/image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ComponentProps } from "react"

const settings: ComponentProps<typeof Slider> = {
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  adaptiveHeight: true,
}

interface Props {
  images: StaticImageData[]
  index: number
}
export const ImageCarousel = ({ images, index }: Props) => {
  settings.initialSlide = index || 0
  return (
    <div className="z-[9999] fixed left-0 top-0 bg-[rgba(0,0,0,0.5)] h-screen w-screen flex justify-center">
      <div className="w-screen max-w-[1504px]">
        <Slider {...settings} className="rounded-2xl">
          {images.map(image => (
            <div className="w-max">
              <div className="flex justify-center ">
                <div className="max-w-max h-max flex justify-center w-full">
                  <img
                    key={image.src}
                    alt={"gallery image"}
                    className="h-full max-h-screen"
                    src={image.src}
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
