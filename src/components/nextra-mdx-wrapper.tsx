import type { ReactElement, ReactNode } from "react"
import { useMounted } from "nextra/hooks"
import { Heading } from "nextra"
import { useConfig, useThemeConfig, SkipNavContent } from "nextra-theme-docs"
import { clsx } from "clsx"

import { LearnNavLinkCard, ArrowNavLinks } from "./nav-links"
import { Sidebar } from "./sidebar"
import { renderComponent } from "./utils/render-component"
import { TableOfContents } from "./table-of-contents"
import { Breadcrumbs } from "../_design-system/breadcrumbs"

const classes = {
  toc: clsx("nextra-toc order-last max-xl:hidden w-64 shrink-0 print:hidden"),
  main: clsx("w-full break-words"),
}

export interface NextraMdxWrapperProps {
  toc?: Heading[]
  children?: React.ReactNode
}

export function NextraMdxWrapper({
  toc = [],
  children,
}: NextraMdxWrapperProps) {
  const config = useConfig()
  const {
    activeType,
    activeThemeContext: themeContext,
    docsDirectories,
    directories,
  } = config.normalizePagesResult

  if (themeContext.toc && typeof themeContext.toc === "object") {
    toc = themeContext.toc
  }

  const tocEl =
    activeType === "page" ||
    !themeContext.toc ||
    themeContext.layout !== "default" ? (
      themeContext.layout !== "full" &&
      themeContext.layout !== "raw" && (
        <nav className={classes.toc} aria-label="table of contents" />
      )
    ) : (
      <nav className={classes.toc} aria-label="table of contents">
        <TableOfContents toc={toc} filePath={config.filePath} />
      </nav>
    )

  const isLearnPage = config.filePath.includes("/learn/")
  const showLearnNavLinkCard =
    activeType !== "page" && themeContext.pagination && isLearnPage

  return (
    <>
      <div
        className={clsx(
          "mx-auto flex pb-8",
          themeContext.layout !== "raw" && "max-w-[90rem]",
          !showLearnNavLinkCard && "xl:pb-12",
        )}
      >
        <Sidebar
          docsDirectories={docsDirectories}
          fullDirectories={directories}
          toc={toc}
          asPopover={config.hideSidebar}
          includePlaceholder={themeContext.layout === "default"}
        />
        {tocEl}
        <SkipNavContent />
        <Body isLearnPage={isLearnPage}>{children}</Body>
      </div>
      {showLearnNavLinkCard && (
        <LearnNavLinkCard
          flatDocsDirectories={config.normalizePagesResult.flatDocsDirectories}
          currentIndex={config.normalizePagesResult.activeIndex}
        />
      )}
    </>
  )
}

function Body({
  children,
  isLearnPage,
}: {
  children: ReactNode
  isLearnPage: boolean
}): ReactElement {
  const config = useConfig()
  const themeConfig = useThemeConfig()
  const mounted = useMounted()
  const {
    activeThemeContext: themeContext,
    activeType,
    activeIndex,
    flatDocsDirectories,
    activePath,
  } = config.normalizePagesResult

  if (themeContext.layout === "raw") {
    return <div className={classes.main}>{children}</div>
  }

  const date =
    themeContext.timestamp && themeConfig.gitTimestamp && config.timestamp
      ? new Date(config.timestamp)
      : null

  const gitTimestampEl =
    // Because a user's time zone may be different from the server page
    mounted && date ? (
      <div className="mb-8 mt-12 block text-xs text-neu-500 ltr:text-right rtl:text-left">
        {renderComponent(themeConfig.gitTimestamp, { timestamp: date })}
      </div>
    ) : (
      <div className="mt-16" />
    )

  const content = (
    <>
      {renderComponent(themeContext.topContent)}
      {children}
      {gitTimestampEl}
      {renderComponent(themeContext.bottomContent)}
      {activeType !== "page" && themeContext.pagination && !isLearnPage && (
        <ArrowNavLinks
          flatDocsDirectories={flatDocsDirectories}
          currentIndex={activeIndex}
        />
      )}
    </>
  )

  const body = themeConfig.main ? (
    <themeConfig.main>{content}</themeConfig.main>
  ) : (
    content
  )

  if (themeContext.layout === "full") {
    return (
      <article
        className={clsx(
          classes.main,
          "nextra-content min-h-[calc(100vh-var(--nextra-navbar-height))] pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]",
        )}
      >
        {body}
      </article>
    )
  }

  return (
    <article
      className={clsx(
        classes.main,
        "nextra-content flex min-h-[calc(100vh-var(--nextra-navbar-height))] min-w-0 justify-center pb-8 pr-[calc(env(safe-area-inset-right)-1.5rem)]",
        themeContext.typesetting === "article" &&
          "nextra-body-typesetting-article",
      )}
    >
      <main className="w-full min-w-0 max-w-6xl px-6 pt-4 md:px-12">
        {activeType !== "page" && themeContext.breadcrumb && (
          <Breadcrumbs activePath={activePath} className="mt-1.5" />
        )}
        {body}
      </main>
    </article>
  )
}
