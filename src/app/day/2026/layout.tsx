import { ReactElement, ReactNode } from "react"
import { Metadata } from "next"

export const metadata = {
  description:
    "GraphQL Day @ FOST — community-organized GraphQL events at Future of Software Technologies conferences worldwide.",
  title: {
    absolute: "",
    template: "%s | GraphQL Day 2026",
  },
  keywords: ["GraphQL", "GraphQL Day", "FOST", "Conference", "2026"],
} satisfies Metadata

export default function Layout({
  children,
}: {
  children: ReactNode
}): ReactElement {
  return <>{children}</>
}
