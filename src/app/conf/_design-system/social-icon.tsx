import {
  TwitterIcon,
  FacebookIcon,
  LinkedInFilledIcon,
  InstagramIcon,
  GlobeIcon,
} from "@/icons"

export type SocialIconType =
  | "twitter"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "website"

export const SocialIconType = {
  /**
   * We need to keep this array to show social icons in a
   * consistent order in speaker cards even if they come
   * from an external source.
   */
  all: [
    "linkedin",
    "twitter",
    "instagram",
    "facebook",
    "website",
  ] satisfies SocialIconType[],
}

export interface SocialIconProps extends React.SVGProps<SVGSVGElement> {
  type: SocialIconType | (string & {})
}

export const SocialIcon = ({ type, ...rest }: SocialIconProps) => {
  switch (type.toLowerCase()) {
    case "twitter":
      return <TwitterIcon {...rest} />
    case "linkedin":
      return <LinkedInFilledIcon {...rest} />
    case "facebook":
      return <FacebookIcon {...rest} />
    case "instagram":
      return <InstagramIcon {...rest} />
    case "website":
      return <GlobeIcon {...rest} />
    default:
      throw new Error(`Can't found social icon for "${type}".`)
  }
}

export function urlForUser(type: SocialIconType, handleOrWebsite: string) {
  switch (type) {
    case "twitter":
      return `https://x.com/${handleOrWebsite}`
    case "linkedin":
      return `https://www.linkedin.com/in/${handleOrWebsite}`
    case "instagram":
      return `https://www.instagram.com/${handleOrWebsite}`
    case "facebook":
      return `https://www.facebook.com/${handleOrWebsite}`
    case "website":
      return handleOrWebsite
    default:
      throw new Error(`Can't found social icon for "${type}".`)
  }
}
