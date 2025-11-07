import {
  TwitterIcon,
  FacebookIcon,
  LinkedInIcon,
  InstagramIcon,
  GlobeIcon,
} from "@/icons"
import clsx from "clsx"

export type SocialMediaIconServiceType =
  | "twitter"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "website"

export const SocialMediaIcon = ({
  service,
  className,
}: {
  service: SocialMediaIconServiceType
  className?: string
}) => {
  const classes = clsx("h-7 hover:text-primary transition-colors", className)

  switch (service) {
    case "twitter":
      return <TwitterIcon className={classes} />
    case "linkedin":
      return <LinkedInIcon className={classes} />
    case "facebook":
      return <FacebookIcon className={classes} />
    case "instagram":
      return <InstagramIcon className={classes} />
    case "website":
      return <GlobeIcon className={classes} />
    default:
      throw new Error(`Can't found social icon for "${service}" service.`)
  }
}
