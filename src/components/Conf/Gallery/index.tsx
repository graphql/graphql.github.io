import React from "react"

const GalleryConf = () => {
  const images: number[] = [1, 2, 3, 4, 5, 6, 7, 8]
  const randomArrayImages: number[] = images.sort(() => Math.random() - 0.5)

  return (
    <div className="mb-5">
      <div className="container px-3 py-6 mx-auto">
        <h1 className="text-center text-4xl text-white mb-10 font-bold">
          Gallery
        </h1>
        <h2 className="text-center text-white text-lg mt-2 mb-10">
          Full album link will be shared as soon as edited photos are available.
        </h2>
        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-1/2 hover:opacity-50 cursor-pointer">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src={`/img/conf/Gallery/${randomArrayImages[0]}.jpg`}
              />
            </div>
            <div className="md:p-2 p-1 w-1/2 hover:opacity-50 cursor-pointer">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src={`/img/conf/Gallery/${randomArrayImages[1]}.jpg`}
              />
            </div>
            <div className="md:p-2 p-1 w-full hover:opacity-50 cursor-pointer">
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src={`/img/conf/Gallery/${randomArrayImages[2]}.jpg`}
              />
            </div>
            <div className="md:p-2 p-1 w-1/2 hover:opacity-50 cursor-pointer">
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src={`/img/conf/Gallery/${randomArrayImages[3]}.jpg`}
              />
            </div>
            <div className="md:p-2 p-1 w-1/2 hover:opacity-50 cursor-pointer">
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src={`/img/conf/Gallery/${randomArrayImages[4]}.jpg`}
              />
            </div>
          </div>
          <div className="flex flex-wrap w-1/2 hover:opacity-50 cursor-pointer">
            <div className="md:p-2 p-1 w-full">
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src={`/img/conf/Gallery/${randomArrayImages[5]}.jpg`}
              />
            </div>
            <div className="md:p-2 p-1 w-1/2 hover:opacity-50 cursor-pointer">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src={`/img/conf/Gallery/${randomArrayImages[6]}.jpg`}
              />
            </div>
            <div className="md:p-2 p-1 w-1/2 hover:opacity-50 cursor-pointer">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src={`/img/conf/Gallery/${randomArrayImages[7]}.jpg`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GalleryConf
