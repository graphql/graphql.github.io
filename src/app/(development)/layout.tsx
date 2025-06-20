import React from "react"
import { notFound } from "next/navigation"
import { NewFontsStyleTag } from "../fonts"

// @ts-expect-error: we want to import the same version as Nextra for the main page
import { ThemeProvider } from "next-themes"

import "../colors.css"

export default function DevelopmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (process.env.NODE_ENV !== "development") notFound()

  return (
    <>
      <NewFontsStyleTag />
      <ThemeProvider attribute="class">
        <div className="min-h-screen bg-neu-0 text-neu-900 antialiased">
          {children}
        </div>
      </ThemeProvider>
    </>
  )
}
