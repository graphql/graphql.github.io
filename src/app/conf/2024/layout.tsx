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
        url: "/img/og-graphql-conf-2024.jpeg",
        alt: "GraphQLConf 2024 hosted by the GraphQL Foundation. September 10-12, 2024. San Francisco Bay Area, California",
      },
    ],
  },
  title: {
    absolute: "",
    template: "%s | GraphQLConf 2024",
  },
  keywords: ["GraphQL", "GraphQLConf", "GraphQLConf 2024"],
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
            href="/conf/2024"
            className="nextra-logo flex items-center gap-2 text-white"
          >
            <GraphQLConf className="h-6" />
            <span className="select-none text-xl/none">2024</span>
          </NextLink>
        }
        links={[
          { children: "Schedule", href: "/conf/2024/schedule" },
          { children: "Speakers", href: "/conf/2024/speakers" },
          { children: "FAQ", href: "/conf/2024/faq" },
          { children: "Gallery", href: "/conf/2024/gallery" },
        ]}
      />
      {children}
      <Footer
        logo={
          <NextLink href="/conf/2024" className="nextra-logo text-white">
            <div className="flex items-center gap-2">
              <GraphQLConf className="h-6" />
              <span className="select-none text-xl/none">2024</span>
            </div>
            <HostedByGraphQLFoundation className="mt-2 h-5" />
          </NextLink>
        }
        links={[
          [
            { children: "Schedule", href: "/conf/2024/schedule" },
            { children: "Speakers", href: "/conf/2024/speakers" },
            { children: "Gallery", href: "/conf/2024/gallery" },
            { children: "Speakers", href: "/conf/2024/speakers" },
            { children: "GraphQLConf 2023", href: "/conf/2023" },
          ],
          [
            { children: "FAQ", href: "/conf/2024/faq" },
            { children: "Contact Us", href: "/conf/2024/faq/#contact" },
          ],
          [
            { children: "GraphQL", href: "/" },
            { children: "GraphQL Foundation", href: "/foundation" },
            {
              children: "Code of Conduct",
              href: "/conf/2024/faq/#codeofconduct",
            },
            { children: "Diversity & Inclusion", href: "/conf/2024/faq/#dni" },
          ],
        ]}
      />
    </>
  )
}
