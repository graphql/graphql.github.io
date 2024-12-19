import {
  GitHubIcon,
  DiscordIcon,
  TwitterIcon,
  LinkedInIcon,
  YouTubeIcon,
  FacebookIcon,
} from "@/icons"

const anchorProps = {
  target: "_blank",
  rel: "noreferrer",
}

export function SocialIcons() {
  return (
    <div className="flex items-center gap-5 *:outline-none *:transition-colors hover:*:text-primary focus:*:text-primary focus:*:ring focus:*:ring-primary [&_svg]:h-5">
      <a href="https://github.com/graphql" {...anchorProps}>
        <GitHubIcon />
      </a>
      <a href="https://discord.graphql.org" {...anchorProps}>
        <DiscordIcon className="fill-current" />
      </a>
      <a href="https://twitter.com/graphql" {...anchorProps}>
        <TwitterIcon />
      </a>
      <a
        href="https://linkedin.com/company/graphql-foundation"
        {...anchorProps}
      >
        <LinkedInIcon />
      </a>
      <a href="https://youtube.com/@GraphQLFoundation" {...anchorProps}>
        <YouTubeIcon className="fill-current" />
      </a>
      <a href="https://facebook.com/groups/graphql.community" {...anchorProps}>
        <FacebookIcon />
      </a>
    </div>
  )
}
