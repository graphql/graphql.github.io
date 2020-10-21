import React from "react"
import Link from "../Link"

interface LinkItem {
  section: string
  text: string
  href: string
}

const links: LinkItem[] = [
  { section: "learn", text: "Learn", href: "/learn/" },
  { section: "code", text: "Code", href: "/code/" },
  { section: "community", text: "Community", href: "/community/" },
  {
    section: "spec",
    text: "Spec",
    href: "https://graphql.github.io/graphql-spec/",
  },
  {
    section: "codeofconduct",
    text: "Code of Conduct",
    href: "/codeofconduct/",
  },
  {
    section: "foundation",
    text: "Foundation",
    href: "https://foundation.graphql.org/",
  },
  { section: "landscape", text: "Landscape", href: "https://l.graphql.org/" },
]

export default () => (
  <nav>
    {links.map(link => (
      <Link key={link.section} href={link.href}>
        {link.text}
      </Link>
    ))}
  </nav>
)
