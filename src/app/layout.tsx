import { ReactElement, ReactNode } from "react"
import type { Metadata } from "next"
import GoogleAnalytics from "@/app/ga"

// @ts-expect-error: we want to import the same version as Nextra for the main page
import { ThemeProvider } from "next-themes"

import { NewFontsStyleTag } from "./fonts"
import { MenuProvider } from "./(main)/menu-provider"

import "../globals.css"
import "./colors.css"

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
        <NewFontsStyleTag />
        <ThemeProvider attribute="class">
          <MenuProvider>
            <div className="isolate bg-neu-0 text-neu-900 antialiased">
              {children}
            </div>
          </MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
