import { ReactElement, ReactNode } from "react"
import { Metadata } from "next"
import { Header } from "../_components/header"
import { Footer } from "../_components/footer"
import { GraphQLConf, HostedByGraphQLFoundation } from "@/icons"
import NextLink from "next/link"
import { Button } from "../_components/button"

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
          { children: <span>FAQ</span>, href: "/conf/2024/faq" },
          { children: <span>Register</span>, href: "/conf/2024#attend" },
          { children: <span>Partner</span>, href: "/conf/2024/partner" },
          {
            children: <span>Schedule</span>,
            href: "https://graphqlconf2024.sched.com/",
          },
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
            { children: "Register", href: "https://cvent.me/gk2dRw" },
            { children: "Sponsor", href: "/conf/2024/partner" },
            { children: "Partner", href: "/conf/2024/partner#program" },
            {
              children: "Speakers",
              href: "/conf/2024/speakers",
              "aria-disabled": true,
            },
            {
              children: "Schedule",
              href: "https://graphqlconf2024.sched.com/",
            },
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
