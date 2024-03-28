import { Avatar } from "./avatar"
import { SocialMediaIcon, SocialMediaIconServiceType } from "./social-media"
import { SchedSpeaker } from "@/app/conf/2023/types"
import NextLink from "next/link"

export function Speaker({
  name,
  company,
  position,
  avatar,
  username,
  socialurls,
}: SchedSpeaker) {
  return (
    <div className="flex flex-col items-center">
      <NextLink href={`/conf/2023/speakers/${username}`} className="group">
        <Avatar
          className="group-hover:border-primary transition-colors border-2 border-transparent rounded-full size-[150px] lg:size-[230px]"
          avatar={avatar}
          name={name}
        />
        <div className="flex flex-col justify-center items-center mt-1.5 max-w-[150px] lg:max-w-[230px] text-center">
          <span className="group-hover:text-primary transition-colors group-hover:no-underline text-[22px] font-bold text-[#181E26] hover:underline cursor-pointer">
            {name}
          </span>
          <span className="text-sm font-bold text-[#212a35]">
            {company || "–"}
          </span>
          <p className="text-sm text-[#2A3544]">{position || "–"}</p>
        </div>
      </NextLink>
      <div className="flex gap-2 pt-2 items-stretch">
        {socialurls.map(e => (
          <a key={e.service} href={e.url} target="_blank" rel="noreferrer">
            <SocialMediaIcon
              service={e.service.toLowerCase() as SocialMediaIconServiceType}
            />
          </a>
        ))}
      </div>
    </div>
  )
}
