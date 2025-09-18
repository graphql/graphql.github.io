import { ReactElement, ReactNode } from "react"
import { Metadata } from "next"

import { NewFontsStyleTag } from "../../fonts"
import "../../colors.css"

import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"

// @ts-expect-error: we want to import the same version as Nextra for the main page
import { ThemeProvider } from "next-themes"
import { GraphQLConfLogoLink } from "./components/graphql-conf-logo-link"
import { GALLERY_LINK } from "./links"

export const metadata = {
  description:
    "Join the official GraphQL Conference by the GraphQL Foundation in Amsterdam, Netherlands, from September 8-10, 2025. Discover the future of GraphQL with leading experts, workshops, and networking opportunities.",
  openGraph: {
    images: [
      {
        url: "/img/og-graphql-conf-2025.jpeg",
        alt: "GraphQLConf 2025 hosted by the GraphQL Foundation. September 08-10, 2025. Amsterdam, Netherlands",
      },
    ],
  },
  title: {
    absolute: "",
    template: "%s | GraphQLConf 2025",
  },
  keywords: ["GraphQL", "GraphQLConf", "GraphQLConf 2025"],
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
        year={2025}
        links={[
          { children: "Schedule", href: "/conf/2025/schedule" },
          { children: "Speakers", href: "/conf/2025/speakers" },
          { children: "Sponsors", href: "/conf/2025/#sponsors" },
          { children: "Resources", href: "/conf/2025/resources" },
          {
            children: "Event Photos",
            href: GALLERY_LINK,
          },
          { children: "FAQ", href: "/conf/2025/#faq" },
        ]}
      />
      <ThemeProvider attribute="class">
        <div className="bg-neu-0 text-neu-900 antialiased">{children}</div>
      </ThemeProvider>
      <Footer
        logo={<GraphQLConfLogoLink year={2025} />}
        links={[
          { children: "Sponsor", href: "/conf/2025/#sponsors" },
          { children: "Speakers", href: "/#speakers" },
          { children: "GraphQLConf 2024", href: "/conf/2024" },
          { children: "FAQ", href: "#faq" },
          { children: "Contact Us", href: "/conf/2025/resources/#contact" },
          { children: "GraphQL", href: "/" },
          { children: "GraphQL Foundation", href: "/foundation" },
          [
            {
              children: "Code of Conduct",
              href: "/conf/2025/code-of-conduct",
            },
            {
              children: "Inclusion & Accessibility",
              href: "/conf/2025/resources/#inclusion--accessibility",
            },
          ],
        ]}
      />
    </>
  )
}
