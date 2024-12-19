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
  year,
}: SchedSpeaker) {
  return (
    <div className="flex flex-col items-center">
      <NextLink href={`/conf/${year}/speakers/${username}`} className="group">
        <Avatar
          className="size-[150px] rounded-full border-2 border-transparent transition-colors group-hover:border-primary lg:size-[230px]"
          avatar={avatar}
          name={name}
        />
        <div className="mt-1.5 flex max-w-[150px] flex-col items-center justify-center text-center lg:max-w-[230px]">
          <span className="cursor-pointer text-[22px] font-bold text-[#181E26] transition-colors hover:underline group-hover:text-primary group-hover:no-underline">
            {name}
          </span>
          <span className="text-sm font-bold text-[#212a35]">
            {company || "–"}
          </span>
          <p className="text-sm text-[#2A3544]">{position || "–"}</p>
        </div>
      </NextLink>
      <div className="flex items-stretch gap-2 pt-2">
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
