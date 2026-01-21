import Image from "next/image"

import heroPhoto from "./hero-photo.jpg"

export function HeroImage() {
  return (
    <div className="z-[2] bg-blk">
      <Image
        src={heroPhoto}
        placeholder="blur"
        width={1920}
        height={560}
        alt="five speakers at GraphQLConf 2025"
        className="mx-auto h-[560px] w-[1920px] max-w-full object-cover"
      />
    </div>
  )
}
