import { ReactElement, ReactNode } from "react"
import { Metadata } from "next"
import GoogleAnalytics from "@/app/ga"

import "../conf.css"
import "../globals.css"

export const metadata: Metadata = {
  twitter: {
    site: "@graphql",
    card: "summary_large_image",
  },
  metadataBase: new URL("https://graphql.org"),
  keywords: ["GraphQL"],
  applicationName: "GraphQL.ORG",
  title: {
    absolute: "",
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
      className="scroll-smooth"
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
