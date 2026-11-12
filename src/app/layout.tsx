import { ReactElement, ReactNode } from "react"
import { Metadata } from "next"
import GoogleAnalytics from "@/app/ga"
import {
  DEFAULT_SOCIAL_IMAGE,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/social-metadata"

import "../conf.css"
import "../globals.css"

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "GraphQL",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    site: "@graphql",
    card: "summary_large_image",
  },
  metadataBase: new URL(SITE_URL),
  keywords: ["GraphQL"],
  applicationName: "GraphQL.ORG",
  title: {
    default: "GraphQL",
    template: "%s | GraphQL",
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}): ReactElement {
  return (
    <html
      lang="en"
      className="scroll-smooth motion-reduce:scroll-auto"
      // ThemeProvider adds a `light`/`dark` class
      suppressHydrationWarning
    >
      <head>
        <style>{`html { scroll-padding-top: 5rem }`}</style>
      </head>
      <body className="bg-neu-0">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
