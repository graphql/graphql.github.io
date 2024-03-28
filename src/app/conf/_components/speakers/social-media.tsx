import { TwitterIcon, FacebookIcon, LinkedInIcon, InstagramIcon } from "@/icons"

export type SocialMediaIconServiceType =
  | "twitter"
  | "linkedin"
  | "facebook"
  | "instagram"

export const SocialMediaIcon = ({
  service,
}: {
  service: SocialMediaIconServiceType
}) => {
  const classes = "h-7 hover:text-primary transition-colors"

  switch (service) {
    case "twitter":
      return <TwitterIcon className={classes} />
    case "linkedin":
      return <LinkedInIcon className={classes} />
    case "facebook":
      return <FacebookIcon className={classes} />
    case "instagram":
      return <InstagramIcon className={classes} />
    default:
      throw new Error(`Can't found social icon for "${service}" service.`)
  }
}
