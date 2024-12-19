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

  const referrer = mounted && document.referrer
  const title = `Found broken \`${mounted ? pathname?.replace(/\/$/, "") : ""}\` link${referrer ? ` from \`${referrer}\`` : ""}. Please fix!`
  const labels = "bug"

  const url = `${repo.origin}/${repo.owner}/${
    repo.name
  }/issues/new?title=${encodeURIComponent(title)}&labels=${labels}`

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <h1 className="text-4xl text-white">404: Page Not Found</h1>
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
