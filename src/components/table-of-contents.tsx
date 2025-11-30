// todo: paste table of contents from Nextra and customize styles

import { clsx } from "clsx"
import { type Heading } from "nextra"
import { removeLinks } from "nextra/remove-links"
import { useActiveAnchor, useThemeConfig } from "nextra-theme-docs"
import { useEffect, useRef, type ReactElement } from "react"
import scrollIntoView from "scroll-into-view-if-needed"

import { Anchor } from "../app/conf/_design-system/anchor"
import { renderComponent } from "./utils/render-component"
import { BackToTop } from "./back-to-top"

export type TableOfContentsProps = {
  toc: Heading[]
  filePath: string
}

const linkClassName = clsx(
  "text-xs",
  "text-neu-700",
  "hover:text-neu-800 hover:underline",
)

export function TableOfContents({
  toc,
  filePath,
}: TableOfContentsProps): ReactElement {
  const activeAnchor = useActiveAnchor()
  const tocRef = useRef<HTMLUListElement>(null)
  const themeConfig = useThemeConfig()

  const hasHeadings = toc.length > 0
  const hasMetaInfo = Boolean(
    themeConfig.feedback.content ||
      themeConfig.editLink.component ||
      themeConfig.toc.extraContent ||
      themeConfig.toc.backToTop,
  )

  const activeSlug = Object.entries(activeAnchor).find(
    ([, { isActive }]) => isActive,
  )?.[0]
  const activeIndex = toc.findIndex(({ id }) => id === activeSlug)

  useEffect(() => {
    if (!activeSlug) return
    const anchor = tocRef.current?.querySelector(`a[href="#${activeSlug}"]`)

    if (anchor) {
      scrollIntoView(anchor, {
        behavior: "smooth",
        block: "center",
        inline: "center",
        scrollMode: "always",
        boundary: tocRef.current!.parentElement,
      })
    }
  }, [activeSlug])

  return (
    <div
      className={clsx(
        "nextra-scrollbar sticky top-16 overflow-y-auto px-4 pt-6 text-sm [hyphens:auto]",
        "max-h-[calc(100vh-var(--nextra-navbar-height)-env(safe-area-inset-bottom))] ltr:-mr-4 rtl:-ml-4",
      )}
    >
      {hasHeadings && (
        <>
          <p className="typography-menu mb-4 text-xs">
            {renderComponent(themeConfig.toc.title)}
          </p>
          <ul ref={tocRef}>
            {toc.map(({ id, value, depth }) => (
              <li className="_my-2 _scroll-my-6 _scroll-py-6" key={id}>
                <a
                  href={`#${id}`}
                  className={clsx(
                    "gql-focus-visible break-words text-neu-700 hover:text-neu-800 hover:underline contrast-more:text-neu-900",
                    {
                      2: "",
                      3: "ltr:ml-4 rtl:mr-4",
                      4: "ltr:ml-8 rtl:mr-8",
                      5: "ltr:ml-12 rtl:mr-12",
                      6: "ltr:ml-16 rtl:mr-16",
                    }[depth],
                    "block",
                    activeAnchor[id]?.isActive
                      ? "text-pri-base contrast-more:!text-pri-base dark:text-pri-light"
                      : "",
                  )}
                >
                  {removeLinks(value)}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      {hasMetaInfo && (
        <div
          className={clsx(
            hasHeadings &&
              "nextra-toc-footer mt-8 bg-[rgb(var(--nextra-bg))] pt-8",
            "sticky bottom-0 flex flex-col items-start gap-2 pb-8",
            "-mx-1 px-1", // to hide focused toc links
          )}
        >
          {themeConfig.feedback.content ? (
            <Anchor
              className={linkClassName}
              href={themeConfig.feedback.useLink()}
            >
              {renderComponent(themeConfig.feedback.content)}
            </Anchor>
          ) : null}

          {renderComponent(themeConfig.editLink.component, {
            filePath,
            className: linkClassName,
            children: renderComponent(themeConfig.editLink.content),
          })}

          {renderComponent(themeConfig.toc.extraContent)}

          {themeConfig.toc.backToTop && (
            <BackToTop className={linkClassName} hidden={activeIndex < 2}>
              {renderComponent(themeConfig.toc.backToTop)}
            </BackToTop>
          )}
        </div>
      )}
    </div>
  )
}
