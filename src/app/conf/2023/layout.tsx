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
        url: "http://graphql.org/img/conf/social-pk.jpg",
        alt: "GraphQLConf 2023 hosted by the GraphQL Foundation. September 19-21, 2023. San Francisco Bay Area, California",
      },
    ],
  },
  title: {
    absolute: "",
    template: "%s | GraphQLConf 2023",
  },
  keywords: ["GraphQL", "GraphQLConf", "GraphQLConf 2023"],
} satisfies Metadata

export default function ConfLayout({
  children,
}: {
  children: ReactNode
}): ReactElement {
  // Change to similar color to separate it from the 2024 info
  const primary = "#d946ef"
  const hover = "#c026d3"
  return (
    <>
      <style>{`
        .text-primary,
        .hover\\:text-primary:hover {
          color: ${primary};
        }
        .bg-primary {
          background: ${primary};
        }
        .hover\\:bg-primary\\/40:hover {
          background: ${hover};
        }
      `}</style>
      <Header
        logo={
          <NextLink
            href="/conf/2023"
            className="nextra-logo flex items-center gap-2 text-white"
          >
            <GraphQLConf className="h-6" />
            <span className="select-none text-xl/none">2023</span>
          </NextLink>
        }
        links={[
          { children: "Speakers", href: "/conf/2023/speakers" },
          { children: "Sessions", href: "/conf/2023/sessions" },
          { children: "Gallery", href: "/conf/2023/gallery" },
          // For some reason link `/conf/2023/schedule` redirects to `/conf/2023/sessions`, avoid
          // client side routing for this route to fix it
          {
            children: "Schedule",
            href: "/conf/2023/schedule",
          },
          { children: "FAQ", href: "/conf/2023/faq" },
          { children: "GraphQLConf 2024", href: "/conf/2024" },
        ]}
      />
      {children}
      <Footer
        logo={
          <NextLink href="/conf/2023" className="nextra-logo text-white">
            <div className="flex items-center gap-2">
              <GraphQLConf className="h-6" />
              <span className="select-none text-xl/none">2023</span>
            </div>
            <HostedByGraphQLFoundation className="mt-2 h-5" />
          </NextLink>
        }
        links={[
          [
            { children: "Speakers", href: "/conf/2023/speakers" },
            { children: "Sessions", href: "/conf/2023/sessions" },
            { children: "Gallery", href: "/conf/2023/gallery" },
            { children: "Schedule", href: "/conf/2023/schedule" },
          ],
          [
            { children: "FAQ", href: "/conf/2023/faq" },
            { children: "Contact Us", href: "/conf/2023/faq/#contact" },
          ],
          [
            { children: "GraphQL", href: "/" },
            { children: "GraphQL Foundation", href: "/foundation" },
            {
              children: "Code of Conduct",
              href: "/conf/2023/faq/#codeofconduct",
            },
            { children: "Diversity & Inclusion", href: "/conf/2023/faq/#dni" },
          ],
        ]}
      />
    </>
  )
}
