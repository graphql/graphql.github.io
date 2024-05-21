import { ReactElement, ReactNode } from "react"
import { Metadata } from "next"
import { Roboto_Flex } from "next/font/google"
import GoogleAnalytics from "@/app/ga"
import "../globals.css"

const font = Roboto_Flex({
  subsets: ["latin"],
})

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
    <html lang="en" className={`scroll-smooth ${font.className}`}>
      <head>
        <style>{`html { scroll-padding-top: 5rem }`}</style>
      </head>
      <body className="bg-conf-black">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
