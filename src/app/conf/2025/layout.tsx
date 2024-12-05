import { ReactElement, ReactNode } from "react"
import { Metadata } from "next"
import { Header } from "../_components/header"
import { Footer } from "../_components/footer"
import { GraphQLConf, HostedByGraphQLFoundation } from "@/icons"
import NextLink from "next/link"

export const metadata = {
  description:
    "The official GraphQL conference hosted by the GraphQL Foundation.",
  openGraph: {
    images: [
      {
        url: "/img/og-graphql-conf-2025.jpeg",
        alt: "GraphQLConf 2025 hosted by the GraphQL Foundation. September 10-12, 2025. San Francisco Bay Area, California",
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
            className="text-white flex gap-2 items-center nextra-logo"
          >
            <GraphQLConf className="h-6" />
            <span className="text-xl/none select-none">2025</span>
          </NextLink>
        }
        links={[
          { children: "Sponsor", href: "/conf/2025/sponsor" },
          { children: "Speakers", href: "/conf/2025/speakers" },
          { children: "Register", href: "/conf/2025/register" },
          { children: "Recap", href: "/conf/2025/recap" },
          { children: "FAQ", href: "/conf/2025/faq" },
        ]}
        is2025
      />
      {children}
      <Footer
        logo={
          <NextLink href="/conf/2025" className="text-white nextra-logo">
            <div className="flex gap-2 items-center">
              <GraphQLConf className="h-6" />
              <span className="text-xl/none select-none">2025</span>
            </div>
            <HostedByGraphQLFoundation className="h-5 mt-2" />
          </NextLink>
        }
        links={[
          [
            { children: "Schedule", href: "/conf/2025/schedule" },
            { children: "Speakers", href: "/conf/2025/speakers" },
            { children: "Gallery", href: "/conf/2025/gallery" },
            { children: "Speakers", href: "/conf/2025/speakers" },
            { children: "GraphQLConf 2023", href: "/conf/2023" },
          ],
          [
            { children: "FAQ", href: "/conf/2025/faq" },
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
