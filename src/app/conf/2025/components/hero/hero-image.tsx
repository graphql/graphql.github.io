import Image from "next-image-export-optimizer"

import heroPhoto from "./hero-photo.jpeg"

export function HeroImage() {
  return (
    <div className="z-[2] bg-blk">
      <Image
        src={heroPhoto}
        width={1920}
        height={560}
        alt="five speakers at GraphQLConf 2024"
        className="mx-auto h-[560px] w-[1920px] max-w-full object-cover"
      />
    </div>
  )
}
