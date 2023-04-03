import React from "react"
import { ReactComponent as GitHubIcon } from "../../../../static/img/logos/github.svg"
import { ReactComponent as DiscordIcon } from "../../../../static/img/logos/discord.svg"
import { ReactComponent as TwitterIcon } from "../../../../static/img/logos/twitter.svg"

const SocialIcons = () => {
  return (
    <>
      <a
        className="ml-5 mt-3 text-white cursor-pointer"
        href="https://github.com/graphql"
        target="_blank"
      >
        <GitHubIcon className="h-5 w-auto" />
      </a>
      <a
        className="ml-5 mt-3 text-white cursor-pointer"
        href="https://discord.graphql.org"
        target="_blank"
      >
        <DiscordIcon className="h-5 w-auto" />
      </a>
      <a
        className="ml-5 mt-3 text-white cursor-pointer"
        href="https://twitter.com/graphql"
        target="_blank"
      >
        <TwitterIcon className="h-5 w-auto" />
      </a>
      <a
        className="ml-5 mt-3 text-white cursor-pointer"
        href="https://linkedin.com/company/graphql-foundation"
        target="_blank"
      >
        {/* LinkedIn */}
        <svg
          fill="currentColor"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path
            stroke="none"
            d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
          />
          <circle cx="4" cy="4" r="2" stroke="none" />
        </svg>
      </a>
      <a
        className="ml-5 mt-3 text-white cursor-pointer"
        href="https://youtube.com/@GraphQLFoundation"
        target="_blank"
      >
        {/* YouTube */}
        <svg
          fill="currentColor"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0"
          className="w-5 h-5"
          viewBox="0 0 30 30"
          width="30px"
          height="30px"
        >
          <path d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z" />
        </svg>
      </a>
      <a
        className="ml-5 mt-3 text-white cursor-pointer"
        href="https://facebook.com/groups/graphql.community"
        target="_blank"
      >
        {/* Facebook */}
        <svg
          fill="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      </a>
    </>
  )
}

export default SocialIcons
