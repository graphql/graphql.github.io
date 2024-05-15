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
            className="text-white flex gap-2 items-center nextra-logo"
          >
            <GraphQLConf className="h-6" />
            <span className="text-xl/none select-none">2024</span>
          </NextLink>
        }
        links={[
          { children: "FAQ", href: "/conf/2024/faq" },
          { children: "Speak", href: "/conf/2024/speak" },
          { children: "Register", href: "https://cvent.me/gk2dRw" },
          { children: "Sponsor", href: "/conf/2024/sponsor" },
          { children: "Partner", href: "/conf/2024/partner" },
          {
            children: "Speakers",
            href: "/conf/2024/speakers",
            "aria-disabled": true,
          },
          {
            children: "Schedule",
            href: "/conf/2024/schedule",
            "aria-disabled": true,
          },
          { children: "GraphQLConf 2023", href: "/conf/2023" },
        ]}
      />
      {children}
      <Footer
        logo={
          <NextLink href="/conf/2024" className="text-white nextra-logo">
            <div className="flex gap-2 items-center">
              <GraphQLConf className="h-6" />
              <span className="text-xl/none select-none">2024</span>
            </div>
            <HostedByGraphQLFoundation className="h-5 mt-2" />
          </NextLink>
        }
        links={[
          [
            { children: "Speak", href: "/conf/2024/speak" },
            { children: "Register", href: "https://cvent.me/gk2dRw" },
            { children: "Sponsor", href: "/conf/2024/sponsor" },
            { children: "Partner", href: "/conf/2024/partner" },
            {
              children: "Speakers",
              href: "/conf/2024/speakers",
              "aria-disabled": true,
            },
            {
              children: "Schedule",
              href: "/conf/2024/schedule",
              "aria-disabled": true,
            },
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
