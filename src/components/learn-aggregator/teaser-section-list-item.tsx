import { clsx } from "clsx"

import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"

export interface TeaserSectionListItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  number?: number
  title: string
  description: string
  icon: React.ReactNode
  section: "getting-started" | "best-practices"
  href: string
}
export function TeaserSectionListItem({
  number,
  title,
  description,
  icon,
  section,
  href,
  className,
  ...rest
}: TeaserSectionListItemProps) {
  return (
    <li className={clsx("flex text-neu-900", className)} {...rest}>
      <a
        href={href}
        className="gql-focus-visible grid w-full border border-neu-200 bg-neu-0 transition-colors [grid-template-areas:'icon_header''desc_desc'] [grid-template-columns:72px_1fr] [grid-template-rows:auto_1fr] hover:ring hover:ring-neu-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-neu-100 dark:hover:ring-neu-50 lg:[grid-template-areas:'icon_header_header''icon_desc_arrow'] lg:[grid-template-columns:190px_1fr_64px]"
      >
        <span
          className={clsx(
            "flex aspect-square h-full w-[72px] items-center justify-center border-neu-200 p-2 [grid-area:icon] dark:border-neu-100 lg:min-w-[190px]",
            section === "getting-started" &&
              "bg-pri-lighter/10 dark:bg-pri-lighter/5",
            section === "best-practices" &&
              "bg-sec-lighter dark:bg-sec-lighter/5",
          )}
        >
          {icon}
        </span>

        <span
          className={clsx(
            "flex flex-col gap-1 px-2 [grid-area:header] lg:px-4",
            number === undefined ? "pt-4 lg:pt-6" : "pt-2 lg:pt-4",
          )}
        >
          {number !== undefined && (
            <span className="typography-body-sm text-neu-700 max-lg:typography-body-md">
              {/* TODO: Are we really sure these are Lessons? */}
              Lesson {number}
            </span>
          )}
          <span className="typography-h3 font-normal text-neu-900">
            {title}
          </span>
        </span>

        <p className="typography-body-sm text-pretty p-4 text-neu-900 [grid-area:desc] max-lg:typography-body-md max-lg:border-t max-lg:border-neu-200 dark:max-lg:border-neu-100">
          {description}
        </p>

        <span className="hidden items-center justify-center place-self-end border-l border-t border-neu-200 p-4 [grid-area:arrow] dark:border-neu-100 lg:flex">
          <ArrowDownIcon className="size-8 shrink-0 -rotate-90" />
        </span>
      </a>
    </li>
  )
}
