import {
  GitHubIcon,
  DiscordIcon,
  TwitterIcon,
  LinkedInIcon,
  YouTubeIcon,
  FacebookIcon,
} from "@/icons"
import clsx from "clsx"

const anchorProps = {
  target: "_blank",
  rel: "noreferrer",
}

export interface SocialIconsProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: 4 | 6
}

export function SocialIcons({
  className,
  count = 6,
  ...rest
}: SocialIconsProps) {
  return (
    <div
      className={clsx(
        "flex items-center gap-1 *:p-2 *:outline-none *:transition-colors hover:*:text-primary focus:*:text-primary focus:*:ring focus:*:ring-primary [&_svg]:h-5",
        className,
      )}
      {...rest}
    >
      <a href="https://github.com/graphql" aria-label="GitHub" {...anchorProps}>
        <GitHubIcon />
      </a>
      <a
        href="https://discord.graphql.org"
        aria-label="Discord"
        {...anchorProps}
      >
        <DiscordIcon className="fill-current" />
      </a>
      <a
        href="https://twitter.com/graphql"
        aria-label="Twitter"
        {...anchorProps}
      >
        <TwitterIcon />
      </a>
      <a
        href="https://linkedin.com/company/graphql-foundation"
        aria-label="LinkedIn"
        {...anchorProps}
      >
        <LinkedInIcon />
      </a>
      {count === 6 && (
        <>
          <a
            href="https://youtube.com/@GraphQLFoundation"
            aria-label="YouTube"
            {...anchorProps}
          >
            <YouTubeIcon className="fill-current" />
          </a>
          <a
            href="https://facebook.com/groups/graphql.community"
            aria-label="Facebook"
            {...anchorProps}
          >
            <FacebookIcon />
          </a>
        </>
      )}
    </div>
  )
}
