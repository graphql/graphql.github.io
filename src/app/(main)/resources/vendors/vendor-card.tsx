import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import { GitHubIcon } from "@/icons"
import { MicroMarkdown } from "@/components/micro-markdown"
import type { VendorMetadata } from "@/resources/vendors/types"

import { VendorLogo, hasVendorLogo } from "./vendor-logo"

function githubUrl(github: string) {
  if (github.startsWith("http")) return github
  return `https://github.com/${github}`
}

export function VendorCard({ vendor }: { vendor: VendorMetadata }) {
  const showLogo = hasVendorLogo(vendor.slug)

  return (
    <li className="h-full">
      <div className="group relative flex h-full flex-col border border-neu-200 bg-neu-50 text-left text-neu-900 transition hover:ring hover:ring-neu-100 dark:border-neu-100 dark:bg-neu-50/25 dark:hover:ring-neu-50">
        <div className="flex items-center gap-3 border-b border-inherit p-4 md:p-6">
          <a
            href={vendor.url}
            target="_blank"
            rel="noreferrer"
            className="gql-focus-visible flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {showLogo ? (
              <span className="flex shrink-0 items-center justify-center">
                <VendorLogo slug={vendor.slug} />
              </span>
            ) : null}
            <h3 className="typography-h4 md:typography-h3 text-pretty text-neu-900">
              {vendor.name}
            </h3>
          </a>
          {vendor.github ? (
            <a
              href={githubUrl(vendor.github)}
              target="_blank"
              rel="noreferrer"
              aria-label={`${vendor.name} on GitHub`}
              className="gql-focus-visible ml-auto flex shrink-0 items-center justify-center p-1 text-neu-800 transition-colors hover:text-neu-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <GitHubIcon className="size-5 md:size-6" />
            </a>
          ) : null}
        </div>

        <MicroMarkdown
          text={vendor.description}
          className="typography-body-md text-pretty flex-1 p-4 text-neu-800 md:p-6"
        />

        <a
          href={vendor.url}
          target="_blank"
          rel="noreferrer"
          className="gql-focus-visible grid grid-cols-[1fr_auto] items-center divide-x divide-neu-200 border-t border-inherit focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 dark:divide-neu-100"
        >
          <span className="typography-body-sm flex items-center p-4 text-neu-800 md:p-6">
            Visit website
          </span>
          <div className="flex size-[53px] items-center justify-center md:size-[72px]">
            <ArrowDownIcon
              className="size-8 -rotate-90 md:size-10"
              aria-hidden
            />
          </div>
        </a>
      </div>
    </li>
  )
}
