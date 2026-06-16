import React from "react"
import { notFound } from "next/navigation"
import { NewFontsStyleTag } from "../fonts"

import { ThemeProvider } from "next-themes"

import "../colors.css"

export default function DevelopmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (
    process.env.NODE_ENV !== "development" &&
    process.env.VERCEL_ENV !== "preview"
  ) {
    notFound()
  }

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
