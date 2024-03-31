import { Metadata } from "next"
import { images } from "./_conf-images"
import NextImage from "next-image-export-optimizer"
import { Zoom } from "../../_components/zoom"

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
      <div className="container conf-block">
        {currentImages.map((c, i) => {
          function getCard(index: number) {
            return (
              c[index] && (
                <Zoom>
                  <NextImage
                    alt="Gallery"
                    className="object-cover aspect-video w-full hover:opacity-75 rounded-md"
                    src={c[index]}
                  />
                </Zoom>
              )
            )
          }

          return (
            <div key={i} className="grid lg:grid-cols-2 gap-2 mb-2">
              <div className="gap-2 flex flex-col">
                <div className="grid grid-cols-2 gap-2">
                  {getCard(0)}
                  {getCard(1)}
                </div>
                {getCard(2)}
              </div>
              <div className="gap-2 flex flex-col">
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
    </div>
  )
}
