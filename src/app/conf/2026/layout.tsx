import { ReactElement, ReactNode } from "react"
import { Metadata } from "next"

import { NewFontsStyleTag } from "../../fonts"
import "../../colors.css"

import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"

import { ThemeProvider } from "next-themes"
import { GraphQLConfLogoLink } from "./components/graphql-conf-logo-link"
import { GALLERY_LINK } from "./links"

export const metadata = {
  description:
    "Join the official GraphQL Conference by the GraphQL Foundation in Menlo Park, California, from May 06-07, 2026. Discover the future of GraphQL with leading experts, workshops, and networking opportunities.",
  openGraph: {
    images: [
      {
        url: "/img/og-graphql-conf-2025.jpeg",
        alt: "GraphQLConf 2026 hosted by the GraphQL Foundation. May 06-07. Menlo Park, California",
      },
    ],
  },
  title: {
    absolute: "",
    template: "%s | GraphQLConf 2026",
  },
  keywords: ["GraphQL", "GraphQLConf", "GraphQLConf 2026"],
} satisfies Metadata

export default function Layout({
  children,
}: {
  children: ReactNode
}): ReactElement {
  return (
    <>
      <NewFontsStyleTag />
      <Navbar
        year={2026}
        links={[
          { children: "CFP", href: "https://sessionize.com/graphqlconf-2026/" },
          {
            children: "Register",
            href: "https://register.linuxfoundation.org/graphql-conf-2026",
          },
          { children: "Sponsors", href: "/conf/2026/#sponsors" },
          { children: "WG Day", href: "/conf/2026/wg-day" },
          { children: "Resources", href: "/conf/2026/resources" },
          {
            children: "2025 Event Photos",
            href: GALLERY_LINK,
          },
        ]}
      />
      <ThemeProvider attribute="class">
        <div className="bg-neu-0 text-neu-900 antialiased">{children}</div>
      </ThemeProvider>
      <Footer
        logo={<GraphQLConfLogoLink year={2026} />}
        links={[
          { children: "Sponsor", href: "/conf/2026/#sponsors" },
          { children: "Speakers", href: "/#speakers" },
          { children: "GraphQLConf 2025", href: "/conf/2025" },
          { children: "FAQ", href: "#faq" },
          { children: "Contact Us", href: "/conf/2026/resources/#contact" },
          { children: "GraphQL", href: "/" },
          { children: "GraphQL Foundation", href: "/foundation" },
          [
            {
              children: "Code of Conduct",
              href: "/conf/2026/code-of-conduct",
            },
            {
              children: "Inclusion & Accessibility",
              href: "/conf/2026/resources/#inclusion--accessibility",
            },
          ],
        ]}
      />
    </>
  )
}
