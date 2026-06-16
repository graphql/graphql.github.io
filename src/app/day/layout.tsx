import { ReactElement, ReactNode } from "react"
import { Metadata } from "next"

import { NewFontsStyleTag } from "../fonts"
import "../colors.css"

import { Navbar } from "./2026/components/navbar"
import { Footer } from "./2026/components/footer"

import { ThemeProvider } from "next-themes"
import { GraphQLDayLogoLink } from "./2026/components/graphql-day-logo-link"

export const metadata = {
  title: {
    absolute: "GraphQL Day",
    template: "%s | GraphQL Day",
  },
} satisfies Metadata

export default function DayLayout({
  children,
}: {
  children: ReactNode
}): ReactElement {
  return (
    <>
      <NewFontsStyleTag />
      <Navbar
        links={[
          { children: "All GraphQL Events", href: "/community/events/" },
          { children: "GraphQLConf", href: "/conf/2026" },
          {
            children: "GraphQL Day NYC",
            href: "/day/2026/nyc",
          },
        ]}
      />
      <ThemeProvider attribute="class">
        <div className="gql-all-anchors-focusable bg-neu-0 text-neu-900 antialiased">
          {children}
        </div>
      </ThemeProvider>
      <Footer
        logo={<GraphQLDayLogoLink />}
        links={[
          { children: "FOST", href: "https://www.joinfost.io" },
          { children: "GraphQL", href: "/" },
          { children: "GraphQLConf 2026", href: "/conf/2026" },
          {
            children: "Singapore Schedule",
            href: "/day/2026/singapore#schedule",
          },
          {
            children: "NYC Schedule",
            href: "/day/2026/nyc#schedule",
          },
          {
            children: "Code of Conduct",
            href: "https://www.apidays.global/legal/code-of-conduct#:~:text=Individuals%20who%20participate%20(or%20plan,during%20or%20after%20the%20event.",
          },
          {
            children: "FOST Manifesto",
            href: "https://www.futureofsoftwaretechnologies.com/manifesto",
          },
          { children: "All GraphQL Events", href: "/community/events/" },
          {
            children: "GraphQL Day Paris 2025",
            href: "https://graphql.day/2025",
          },
        ]}
      />
    </>
  )
}
