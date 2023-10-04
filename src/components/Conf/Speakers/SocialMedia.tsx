import React from "react"
import { ReactComponent as TwitterIcon } from "../../../../static/img/logos/twitter.svg"
import { ReactComponent as FacebookIcon } from "../../../../static/img/logos/facebook.svg"
import { ReactComponent as InstagramIcon } from "../../../../static/img/logos/instagram.svg"
import { ReactComponent as SnapChatIcon } from "../../../../static/img/logos/snapchat.svg"
import { ReactComponent as LinkedinIcon } from "../../../../static/img/logos/linkedin.svg"
import clsx from "clsx"

export type SocialMediaIconServiceType =
  | "twitter"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "snapchat"

export const SocialMediaIcon = ({
  className = "",
  service,
}: {
  className?: string
  service: SocialMediaIconServiceType
}) => {
  const classes = clsx(
    "w-5 h-5 lg:w-6 lg:h-6 hover:fill-[#F5009B] hover:text-[#F5009B] transition-all text-black",
    className
  )

  switch (service) {
    case "twitter":
      return <TwitterIcon className={classes} />
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
