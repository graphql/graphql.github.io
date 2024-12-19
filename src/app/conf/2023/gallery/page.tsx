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
      <div className="conf-block container">
        {currentImages.map((c, i) => {
          function getCard(index: number) {
            return (
              c[index] && (
                <Zoom>
                  <NextImage
                    alt="Gallery"
                    className="aspect-video w-full rounded-md object-cover hover:opacity-75"
                    src={c[index]}
                  />
                </Zoom>
              )
            )
          }

          return (
            <div key={i} className="mb-2 grid gap-2 lg:grid-cols-2">
              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  {getCard(0)}
                  {getCard(1)}
                </div>
                {getCard(2)}
              </div>
              <div className="flex flex-col gap-2">
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
