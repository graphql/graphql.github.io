import React, { FC } from "react"
import { Avatar } from "./Avatar"
import { ReactComponent as TwitterIcon } from "../../../../static/img/logos/twitter.svg"
import { ReactComponent as FacebookIcon } from "../../../../static/img/logos/facebook.svg"
import { ReactComponent as InstagramIcon } from "../../../../static/img/logos/instagram.svg"
import { ReactComponent as SnapChatIcon } from "../../../../static/img/logos/snapchat.svg"
import { ReactComponent as LinkedinIcon } from "../../../../static/img/logos/linkedin.svg"
import clsx from "clsx"

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
  className = "",
  service,
}: {
  className?: string
  service: SocialMediaIconServiceType
}) => {
  const classes = clsx("w-5 h-5 lg:w-6 lg:h-6", className)

  switch (service) {
    case "twitter":
      return <TwitterIcon fill="#0E031C" className={classes} />
    case "linkedin":
      return <LinkedinIcon className={classes} />
    case "facebook":
      return <FacebookIcon className={classes} />
    case "instagram":
      return <InstagramIcon className={classes} />
    case "snapchat":
      return <SnapChatIcon className={classes} />
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
    <div className="flex flex-col items-center">
      <a href={username} className="group hover:no-underline">
        <Avatar
          className="group-hover:shadow-[0px_0px_18px_#f5009b6b] shadow rounded-full w-[150px] h-[150px] lg:w-[230px] lg:h-[230px]"
          avatar={avatar}
          name={name}
        />
        <div className="flex flex-col justify-center items-center mt-1.5 max-w-[150px] lg:max-w-[230px] text-center">
          <span className="group-hover:text-[#F5009B] group-hover:no-underline text-[22px] font-bold mt-0 text-[#181E26] hover:underline cursor-pointer">
            {name || "-"}
          </span>
          <p className="mt-1 mb-0 text-sm font-medium text-[#212a35]">
            {company ? (
              url ? (
                <a
                  href={url}
                  target="_blank"
                  className="text-[#212a35] hover:no-underline"
                >
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
        </div>
      </a>
      <div className="flex flex-row justify-center items-center mt-2 space-x-2">
        {socialurls?.map(e => {
          return (
            <a href={e.url} target="_blank">
              <SocialMediaIcon
                className="hover:fill-[#F5009B] hover:text-[#F5009B] transition-all text-black"
                service={e.service.toLowerCase() as SocialMediaIconServiceType}
              />
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Speaker
