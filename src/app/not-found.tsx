"use client"

import { usePathname } from "next/navigation"
import { useMounted } from "nextra/hooks"
// @ts-expect-error
import { ThemeProvider } from "next-themes"

import { NewFontsStyleTag } from "./fonts"
import { Button } from "./conf/_design-system/button"

import "@/globals.css"
import "@/app/colors.css"

export default function Page() {
  const pathname = usePathname()
  const mounted = useMounted()

  const repo = {
    origin: "https://github.com",
    owner: "graphql",
    name: "graphql.github.io",
  }

  const referrer = mounted && document.referrer
  const title = `Found broken \`${mounted ? pathname?.replace(/\/$/, "") : ""}\` link${referrer ? ` from \`${referrer}\`` : ""}. Please fix!`
  const labels = "bug"

  const url = `${repo.origin}/${repo.owner}/${
    repo.name
  }/issues/new?title=${encodeURIComponent(title)}&labels=${labels}`

  return (
    <ThemeProvider attribute="class">
      <div className="flex h-dvh flex-col items-center justify-center gap-8 bg-neu-0 font-sans lg:gap-10">
        <NewFontsStyleTag />
        <FourOhFourIcon className="text-pri-base" />
        <h1 className="text-4xl text-neu-900">Page not found</h1>
        <div className="flex gap-4">
          <Button variant="primary" href={url}>
            Submit an issue about broken link
          </Button>
          <Button variant="secondary" href="/">
            Go back home
          </Button>
        </div>
      </div>
    </ThemeProvider>
  )
}

function FourOhFourIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="204"
      height="80"
      viewBox="0 0 204 80"
      fill="currentColor"
      className={className}
    >
      <title>404</title>
      <path d="M45.2399 80V57.4806H0V33.8414H11.3411V22.5194H22.5576V11.3219H34.0234V0H57.9519V80H45.2399ZM12.5874 44.9145H45.2399V12.5661H35.2696V23.7636H23.8039V34.9611H12.5874V44.9145Z" />
      <path d="M84.3652 80V68.8025H73.0241V11.3219H84.3652V0H119.51V11.3219H130.976V68.8025H119.51V80H84.3652ZM85.6115 67.5583H118.264V12.5661H85.6115V67.5583Z" />
      <path d="M191.288 80V57.4806H146.048V33.8414H157.389V22.5194H168.606V11.3219H180.071V0H204V80H191.288ZM158.636 44.9145H191.288V12.5661H181.318V23.7636H169.852V34.9611H158.636V44.9145Z" />
    </svg>
  )
}
