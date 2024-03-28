"use client"

import { usePathname } from "next/navigation"
import { useMounted } from "nextra/hooks"

export default function Page() {
  const pathname = usePathname()
  const mounted = useMounted()

  const repo = {
    origin: "https://github.com",
    owner: "graphql",
    name: "graphql.github.io",
  }

  const title = `Found broken \`${mounted ? pathname?.replace(/\/$/, "") : ""}\` link. Please fix!`
  const labels = "bug"

  const url = `${repo.origin}/${repo.owner}/${
    repo.name
  }/issues/new?title=${encodeURIComponent(title)}&labels=${labels}`

  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h1 className="text-white text-4xl">404: Page Not Found</h1>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="mt-6 text-primary underline decoration-from-font [text-underline-position:from-font]"
      >
        Submit an issue about broken link →
      </a>
    </div>
  )
}
