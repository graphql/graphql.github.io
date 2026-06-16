import { ReactElement, ReactNode } from "react"
import { Metadata } from "next"
import { ThemeProvider } from "next-themes"

import { NewFontsStyleTag } from "../../fonts"
import "../../colors.css"

import { Navbar } from "../2026/components/navbar"
import { Footer } from "../2026/components/footer"
import { GraphQLConfLogoLink } from "../2026/components/graphql-conf-logo-link"
import { GALLERY_LINK } from "../2026/links"

export const metadata: Metadata = {
  title: {
    absolute: "Conference Kit | GraphQL",
    template: "%s | GraphQL Conference Kit",
  },
  description:
    "Print-ready roll-up banners for GraphQL Foundation conferences and community events.",
}

export default function ConferenceKitLayout({
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
          {
            children: "Register",
            href: "https://register.linuxfoundation.org/graphql-conf-2026",
          },
          { children: "Schedule", href: "/conf/2026/schedule" },
          { children: "Speakers", href: "/conf/2026/speakers" },
          { children: "Sponsors", href: "/conf/2026/#sponsors" },
          { children: "Resources", href: "/conf/2026/resources" },
          { children: "Conference Kit", href: "/conf/conference-kit" },
          { children: "2025 Event Photos", href: GALLERY_LINK },
        ]}
      />
      <ThemeProvider attribute="class">
        <div className="bg-neu-0 text-neu-900 antialiased">{children}</div>
      </ThemeProvider>
      <Footer
        logo={<GraphQLConfLogoLink year={2026} />}
        links={[
          { children: "Conference Kit", href: "/conf/conference-kit" },
          { children: "Sponsor", href: "/conf/2026/#sponsors" },
          { children: "GraphQL", href: "/" },
          { children: "GraphQL Foundation", href: "/foundation" },
        ]}
      />
    </>
  )
}
