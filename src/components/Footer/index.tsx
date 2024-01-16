import React from "react"
import Link from "../Link"
import { ReactComponent as GitHubIcon } from "../../../static/img/logos/github.svg"
import { ReactComponent as TwitterIcon } from "../../../static/img/logos/twitter.svg"
import { ReactComponent as DiscordIcon } from "../../../static/img/logos/discord.svg"
import { ReactComponent as StackOverflowIcon } from "../../../static/img/logos/stackoverflow.svg"
import { ReactComponent as EditIcon } from "../../../static/img/edit.svg"

interface LinkItem {
  text: string
  href: string
  icon?: string
}

interface FooterLinks {
  text: string
  href?: string
  subsections: LinkItem[]
}

const getLinks = (sourcePath?: string): FooterLinks[] => [
  {
    text: "Learn",
    href: "/learn/",
    subsections: [
      { text: "Introduction to GraphQL", href: "/learn/" },
      { text: "Best Practices", href: "/learn/best-practices/" },
      { text: "Frequently Asked Questions", href: "/faq/" },
      { text: "Training Courses", href: "/community/users/#training-courses" },
    ],
  },
  {
    text: "Code",
    href: "/code",
    subsections: [
      {
        text: "GitHub",
        href: "https://github.com/graphql",
        icon: GitHubIcon,
      },
      { text: "GraphQL Specification", href: "https://spec.graphql.org" },
      { text: "Libraries & Tools", href: "/code/" },
      { text: "Services & Vendors", href: "/code/#services" },
    ],
  },
  {
    text: "Community",
    href: "/community",
    subsections: [
      {
        text: "@graphql",
        href: "https://twitter.com/graphql",
        icon: TwitterIcon,
      },
      {
        text: "Discord",
        href: "https://discord.graphql.org/",
        icon: DiscordIcon,
      },
      {
        text: "Stack Overflow",
        href: "http://stackoverflow.com/questions/tagged/graphql",
        icon: StackOverflowIcon,
      },
      { text: "Resources", href: "/community/users/" },
      { text: "Events", href: "/community/upcoming-events/" },
      { text: "Landscape", href: "https://landscape.graphql.org" },
      { text: "Shop", href: "https://store.graphql.org" },
    ],
  },
  {
    text: "& More",
    subsections: [
      { text: "News Blog", href: "/blog/" },
      { text: "GraphQL Foundation", href: "/foundation/" },
      { text: "GraphQL Community Grant", href: "/foundation/community-grant/" },
      { text: "Logo and Brand Guidelines", href: "/brand" },
      { text: "Code of Conduct", href: "/codeofconduct/" },
      { text: "Contact Us", href: "/foundation/contact/" },
      sourcePath && {
        text: "Edit this page",
        href:
          "https://github.com/graphql/graphql.github.io/edit/source/" +
          sourcePath,
        icon: EditIcon,
      },
    ].filter(Boolean) as LinkItem[],
  },
]

const Footer = ({ sourcePath }: { sourcePath?: string }) => {
  return (
    <div>
      <footer>
        <section className="sitemap">
          <Link href="/" className="nav-home" aria-label="Homepage" />
          {getLinks(sourcePath).map((section, i) => (
            <div key={i}>
              <h5>
                {section.href ? (
                  <Link href={section.href}>{section.text}</Link>
                ) : (
                  <span>{section.text}</span>
                )}
              </h5>
              {section.subsections.map((subsection, i) => (
                <Link
                  key={i}
                  href={subsection.href}
                  className="!flex items-center gap-2"
                >
                  {subsection.icon && <subsection.icon />}
                  {subsection.text}
                </Link>
              ))}
            </div>
          ))}
        </section>
        <section className="copyright">
          Copyright © {`${new Date().getFullYear()}`} The GraphQL Foundation.
          All rights reserved.
          <br />
          For web site terms of use, trademark policy and general project
          policies please see&nbsp;
          <a href="https://lfprojects.org" target="_blank">
            https://lfprojects.org
          </a>
          .
        </section>
      </footer>
    </div>
  )
}

export default Footer
