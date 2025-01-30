import { ReactElement, ReactNode } from "react"
import { Metadata } from "next"
import { Header } from "../_components/header"
import { Footer } from "../_components/footer"
import { GraphQLConf, HostedByGraphQLFoundation } from "@/icons"
import NextLink from "next/link"
import { Rubik } from "next/font/google"

const rubik = Rubik({
  weight: ["700", "600", "500", "400", "300"],
  subsets: ["latin"],
})

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
          { children: "Sponsor", href: "/conf/2025/#sponsors" },
          { children: "Speakers", href: "/conf/2025/#speakers" },
          { children: "Register", href: "/conf/2025/#register" },
          { children: "Recap", href: "/conf/2024" },
          { children: "Resources", href: "/conf/2025/resources" },
          { children: "FAQ", href: "/conf/2025/#faq" },
        ]}
        is2025
      />
      <div
        style={{
          fontFamily: rubik.style.fontFamily,
        }}
      >
        {children}
      </div>
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
            { children: "Sponsor", href: "/conf/2025/#sponsors" },
            { children: "Speakers", href: "/#speakers" },
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
              href: "/conf/2025/resources/#code-of-conduct",
            },
            {
              children: "Diversity & Inclusion",
              href: "/conf/2025/resources/#diversity--inclusion",
            },
          ],
        ]}
      />
    </>
  )
}
