import { ReactElement, ReactNode } from "react"
import { Metadata } from "next"
import { Header } from "../_components/header"
import { Footer } from "../_components/footer"
import { GraphQLConf, HostedByGraphQLFoundation } from "@/icons"
import NextLink from "next/link"

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
      <Header
        logo={
          <NextLink
            href="/conf/2025"
            className="nextra-logo flex items-center gap-2 text-white"
          >
            <GraphQLConf className="h-6" />
            <span className="select-none text-xl/none">2025</span>
          </NextLink>
        }
        links={[
          { children: "Sponsor", href: "#sponsors" },
          { children: "Speakers", href: "#speakers" },
          { children: "Register", href: "#register" },
          { children: "Recap", href: "/conf/2024" },
          { children: "FAQ", href: "#faq" },
        ]}
        is2025
      />
      {children}
      <Footer
        logo={
          <NextLink href="/conf/2025" className="nextra-logo text-white">
            <div className="flex items-center gap-2">
              <GraphQLConf className="h-6" />
              <span className="select-none text-xl/none">2025</span>
            </div>
            <HostedByGraphQLFoundation className="mt-2 h-5" />
          </NextLink>
        }
        links={[
          [
            { children: "Sponsor", href: "#sponsors" },
            { children: "Speakers", href: "#speakers" },
            { children: "GraphQLConf 2024", href: "/conf/2024" },
          ],
          [
            { children: "FAQ", href: "#faq" },
            { children: "Contact Us", href: "/conf/2025/faq/#contact" },
          ],
          [
            { children: "GraphQL", href: "/" },
            { children: "GraphQL Foundation", href: "/foundation" },
            {
              children: "Code of Conduct",
              href: "/conf/2025/faq/#codeofconduct",
            },
            { children: "Diversity & Inclusion", href: "/conf/2025/faq/#dni" },
          ],
        ]}
      />
    </>
  )
}
