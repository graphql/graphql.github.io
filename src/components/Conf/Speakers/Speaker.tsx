import React, { FC } from "react"
import { Avatar } from "./Avatar"
import { ReactComponent as TwitterIcon } from "../../../../static/img/logos/twitter.svg"
import { ReactComponent as FacebookIcon } from "../../../../static/img/logos/facebook.svg"
import { ReactComponent as InstagramIcon } from "../../../../static/img/logos/instagram.svg"
import { ReactComponent as SnapChatIcon } from "../../../../static/img/logos/snapchat.svg"
import { ReactComponent as LinkedinIcon } from "../../../../static/img/logos/linkedin.svg"

export interface SchedSpeaker {
  username: string
  name: string
  about: string
  company?: string
  position?: string
  avatar?: string
  url?: string
  role: string
  location?: string
  socialurls?: { service: string; url: string }[]
}

type SocialMediaIconServiceType =
  | "twitter"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "snapchat"

const SocialMediaIcon = ({
  service,
}: {
  service: SocialMediaIconServiceType
}) => {
  switch (service) {
    case "twitter":
      return <TwitterIcon fill="#1C96E9" className="w-6 h-6 lg:w-7 lg:h-7" />
    case "linkedin":
      return <LinkedinIcon className="w-6 h-6 lg:w-7 lg:h-7" />
    case "facebook":
      return <FacebookIcon className="w-6 h-6 lg:w-7 lg:h-7" />
    case "instagram":
      return <InstagramIcon className="w-6 h-6 lg:w-7 lg:h-7" />
    case "snapchat":
      return <SnapChatIcon className="w-6 h-6 lg:w-7 lg:h-7" />
    default:
      return null
  }
}

const Speaker: FC<SchedSpeaker> = ({
  name,
  company,
  position,
  avatar,
  url,
  username,
  socialurls,
}) => {
  return (
    <div className="flex flex-col w-max max-w-[250px] items-center mb-10">
      <Avatar
        href={username}
        className="border-2 border-solid border-gray-300 rounded-full w-[250px] h-[250px]"
        avatar={avatar}
        name={name}
      />
      <div className="flex flex-col justify-center items-center mt-4 max-w-[95%] text-center">
        <a
          href={username}
          className="text-2xl font-bold mt-0 text-[#181E26] hover:underline cursor-pointer"
        >
          {name || "-"}
        </a>
        <p className="mt-2 mb-0 text-sm font-medium text-[#212a35]">
          {company ? (
            url ? (
              <a href={url} target="_blank" className="text-[#212a35]">
                {company}
              </a>
            ) : (
              company
            )
          ) : (
            "-"
          )}
        </p>
        <p className="mt-1 mb-0 text-sm text-[#2A3544]">{position || "-"}</p>
        <div className="flex flex-row justify-center items-center mt-2">
          {socialurls?.map((e, index) => {
            const isLastOne = socialurls.length - 1 === index
            return (
              <a
                href={e.url}
                target="_blank"
                className={isLastOne ? "" : "mr-2.5"}
              >
                <SocialMediaIcon
                  service={
                    e.service.toLowerCase() as SocialMediaIconServiceType
                  }
                />
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Speaker
