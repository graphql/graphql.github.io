import { clsx } from "clsx"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import { learnPages } from "./learn-aggregator/learn-pages"

export function Cards({
  items,
  numbered,
}: {
  items: {
    icon?:
      | (({ className }: { className?: string }) => React.ReactNode)
      | React.ReactNode
    title: string
    description?: string
    link: string
  }[]
  numbered?: string
}) {
  return (
    <ul className="grid grid-cols-1 justify-stretch gap-2 pt-6 sm:grid-cols-2 lg:gap-4">
      {items.map((item, index) => {
        // Try to get section from learn-pages
        let section: "getting-started" | "best-practices" | undefined

        const path = item.link.replace(/^\/learn\//, "").replace(/\/$/, "")
        const learnPage = learnPages[path as keyof typeof learnPages]
        if (learnPage) {
          section = learnPage.section
        }

        return (
          <li key={item.title} className="flex text-neu-900">
            <a
              href={item.link}
              className={clsx(
                "gql-focus-visible grid w-full border border-neu-200 bg-neu-0 transition-colors [grid-template-areas:'header''desc'] [grid-template-rows:auto_1fr] hover:ring hover:ring-neu-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-neu-100 dark:hover:ring-neu-50 lg:[grid-template-areas:'header_header''desc_arrow'] lg:[grid-template-columns:1fr_64px]",
                section === "getting-started" &&
                  "bg-pri-lighter/10 dark:bg-pri-lighter/5",
                section === "best-practices" &&
                  "bg-sec-lighter/10 dark:bg-sec-lighter/5",
              )}
            >
              <span className="flex flex-col gap-1 [grid-area:header]">
                {numbered && (
                  <span className="typography-body-sm px-2 pt-2 text-neu-700 max-lg:typography-body-md lg:px-4 lg:pt-4">
                    {numbered} {index + 1}
                  </span>
                )}
                <span
                  className={clsx(
                    "typography-h3 flex items-center gap-2 border-neu-200 text-neu-900 dark:border-neu-100",
                    item.icon ? "border-b" : "pl-2 lg:pl-4",
                  )}
                >
                  {item.icon && (
                    <span className="flex items-center justify-center border-r border-neu-200 p-2 lg:p-4">
                      {typeof item.icon === "function" ? (
                        <item.icon className="size-8 shrink-0" />
                      ) : (
                        item.icon
                      )}
                    </span>
                  )}
                  {item.title}
                </span>
              </span>

              <p className="typography-body-sm text-pretty p-4 text-neu-900 [grid-area:desc] max-lg:typography-body-md max-lg:border-t max-lg:border-neu-200 dark:max-lg:border-neu-100">
                {item.description
                  ? item.description
                  : item.link.replace(/^https?:\/\//, "")}
              </p>

              <span
                className={clsx(
                  "hidden items-center justify-center place-self-end border-l border-neu-200 p-4 [grid-area:arrow] dark:border-neu-100 lg:flex",
                  item.icon ? "h-full" : "border-t",
                )}
              >
                <ArrowDownIcon className="size-8 shrink-0 -rotate-90" />
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
