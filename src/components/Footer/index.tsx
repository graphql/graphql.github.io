import React from "react"
import Link from "../Link"

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

const getLinks = (sourcePath: string): FooterLinks[] => [
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
        icon: "/img/logos/github.svg",
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
        icon: "/img/logos/twitter.svg",
      },
      {
        text: "Discord",
        href: "https://discord.graphql.org/",
        icon: "/img/logos/discord.svg",
      },
      {
        text: "Stack Overflow",
        href: "http://stackoverflow.com/questions/tagged/graphql",
        icon: "/img/logos/stackoverflow.svg",
      },
      { text: "Resources", href: "/community/users/" },
      { text: "Events", href: "/community/upcoming-events/" },
      { text: "Landscape", href: "https://landscape.graphql.org" },
    ],
  },
  {
    text: "& More",
    subsections: [
      { text: "News Blog", href: "/blog/" },
      { text: "GraphQL Foundation", href: "/foundation/" },
      { text: "Logo and Brand Guidelines", href: "/brand" },
      { text: "Code of Conduct", href: "/codeofconduct/" },
      { text: "Contact Us", href: "/foundation/contact/" },
      {
        text: "Edit this page",
        href:
          "https://github.com/graphql/graphql.github.io/edit/source/" +
          sourcePath,
        icon: "/img/edit.svg",
      },
    ],
  },
]

const Footer = ({ sourcePath }: { sourcePath: string }) => {
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
              {section.subsections.map((subsection: any, i) => (
                <Link key={i} href={subsection.href}>
                  {subsection.icon && <img src={subsection.icon} />}
                  {subsection.text}
                </Link>
              ))}
            </div>
          ))}
        </section>
        <section className="copyright">
          Copyright © {`${new Date().getFullYear()}`} The GraphQL Foundation.
          All rights reserved. The Linux Foundation has registered trademarks
          and uses trademarks. For a list of trademarks of The Linux Foundation,
          please see our{" "}
          <a href="https://www.linuxfoundation.org/trademark-usage">
            Trademark Usage
          </a>{" "}
          page. Linux is a registered trademark of Linus Torvalds.{" "}
          <a href="http://www.linuxfoundation.org/privacy">Privacy Policy</a>{" "}
          and <a href="http://www.linuxfoundation.org/terms">Terms of Use</a>.
        </section>
      </footer>
    </div>
  )
}

export default Footer
