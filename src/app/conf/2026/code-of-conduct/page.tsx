import type { Metadata } from "next"
import clsx from "clsx"

import { Anchor } from "@/app/conf/_design-system/anchor"
import { ServerComponentMarkdown } from "@/app/conf/_components/server-component-markdown"
import { Button } from "@/app/conf/_design-system/button"

import { NavbarPlaceholder } from "../components/navbar"
import { Hero, HeroStripes } from "../components/hero"
import "../resources/prose.css"

import markdown from "./code-of-conduct.mdx?raw"

export const metadata: Metadata = {
  title: "Code of Conduct | GraphQLConf 2026",
}

const components = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    return (
      <Anchor
        {...props}
        href={props.href ?? ""}
        className={clsx(props.className, "typography-link")}
      />
    )
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => {
    return <ul {...props} className={clsx(props.className, "-mt-6")} />
  },
  Callout: (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        {...props}
        className={clsx(
          props.className,
          "gql-prose-inner -mx-4 w-fit border border-neu-300 bg-neu-50 p-4 dark:border-neu-100 dark:bg-neu-50/50 max-md:border-x-0 xl:my-4",
        )}
      />
    )
  },
}

export default function ResourcesPage() {
  return (
    <>
      <NavbarPlaceholder className="top-0 bg-neu-100 before:bg-white/30 dark:bg-[#181A12] dark:before:bg-blk/40" />
      <Hero
        pageName="Code of conduct"
        subtitle="The Linux Foundation"
        colorScheme="neutral"
        stripes={
          <HeroStripes
            className="-scale-x-100 dark:data-[loaded=true]:opacity-80"
            evenClassName="bg-[linear-gradient(180deg,hsl(var(--color-sec-light))_0%,hsl(319deg_100%_90%_/_0.2)_100%)] dark:bg-[linear-gradient(180deg,hsl(var(--color-sec-dark))_0%,hsl(var(--color-neu-100))_100%)]"
            oddClassName="bg-[linear-gradient(180deg,hsl(319deg_100%_90%_/_0.2)_0%,hsl(var(--color-sec-base))_100%)] dark:bg-[linear-gradient(180deg,hsl(var(--color-sec-dark))_0%,hsl(var(--color-neu-0))_100%)]"
          />
        }
      >
        <Button
          href="https://events.linuxfoundation.org/about/code-of-conduct/"
          className="mt-[18px] w-fit"
        >
          See on The Linux Foundation
        </Button>
      </Hero>
      <main className="gql-all-anchors-focusable gql-conf-navbar-strip text-neu-900 before:bg-white/40 before:dark:bg-blk/30">
        <div className="gql-container gql-section xl:mb-16 xl:mt-8">
          <ServerComponentMarkdown
            markdown={markdown}
            extractToc
            render={({ mdx, data }) => {
              return (
                <div className="gql-prose md:max-lg:[&>:not(:first-child)]:mx-4">
                  <aside className="gql-sticky-aside row-span-8 -mt-1 w-fit sm:max-xl:grid sm:max-xl:grid-cols-2 sm:max-xl:bg-neu-100 sm:max-xl:p-4 dark:sm:max-xl:bg-neu-50/50 xl:max-w-[284px]">
                    {data.toc.map(({ value, id, depth }) => (
                      <a
                        key={id}
                        data-depth={depth}
                        className="raw typography-menu block p-4 py-2 text-neu-800 hover:bg-neu-100 hover:text-neu-900 dark:hover:bg-neu-50 max-xl:-ml-4"
                        style={{
                          paddingLeft: (depth - 2) * 16 + 16,
                        }}
                        href={`#${id}`}
                      >
                        {value}
                      </a>
                    ))}
                  </aside>
                  {mdx({ components })}
                </div>
              )
            }}
          />
        </div>
      </main>
    </>
  )
}
