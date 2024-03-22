import {
  GitHubIcon,
  DiscordIcon,
  TwitterIcon,
  LinkedInIcon,
  YouTubeIcon,
  FacebookIcon,
} from "@/icons"

export function SocialIcons() {
  return (
    <div className="flex gap-5 hover:*:text-primary *:transition-colors [&_svg]:h-5">
      <a href="https://github.com/graphql" target="_blank">
        <GitHubIcon />
      </a>
      <a href="https://discord.graphql.org" target="_blank">
        <DiscordIcon className="fill-current" />
      </a>
      <a href="https://twitter.com/graphql" target="_blank">
        <TwitterIcon />
      </a>
      <a href="https://linkedin.com/company/graphql-foundation" target="_blank">
        <LinkedInIcon />
      </a>
      <a href="https://youtube.com/@GraphQLFoundation" target="_blank">
        <YouTubeIcon className="fill-current" />
      </a>
      <a href="https://facebook.com/groups/graphql.community" target="_blank">
        <FacebookIcon />
      </a>
    </div>
  )
}
