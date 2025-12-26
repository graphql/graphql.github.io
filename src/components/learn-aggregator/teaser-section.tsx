import { ReactNode, useState } from "react"
import { clsx } from "clsx"

import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"

import { Eyebrow } from "@/_design-system/eyebrow"

import { Button } from "@/app/conf/_design-system/button"

export interface TeaserSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow: string
  title: string
  description: string
  cta: ReactNode
  items: Array<{
    title: string
    description: string
    href: string
    icon: string
    section: "getting-started" | "best-practices"
  }>
  firstIconsEager?: boolean
}
export function TeaserSection({
  eyebrow,
  title,
  description,
  cta,
  items,
  firstIconsEager,
  className,
  ...rest
}: TeaserSectionProps) {
  const [showingMore, showMore] = useState(false)

  return (
    <section
      className={clsx(
        "gql-container gql-section flex items-start gap-8 max-lg:flex-col max-lg:pt-6 lg:gap-12 lg:pb-24 xl:gap-16",
        className,
      )}
      {...rest}
    >
      <header className="flex max-w-[720px] flex-col gap-6 text-left lg:max-w-[540px]">
        <div className="flex flex-col gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="typography-h2 text-pretty text-neu-900">{title}</h2>
          <p className="typography-body-md text-pretty text-neu-800">
            {description}
          </p>
          {cta}
        </div>
      </header>
      <div>
        <ul className="grid grid-cols-1 justify-stretch gap-4 sm:max-lg:grid-cols-2 lg:gap-8">
          {items.map((item, index) => {
            return (
              <TeaserSectionListItem
                key={index}
                number={index + 1}
                title={item.title}
                description={item.description}
                href={item.href}
                section={item.section}
                className={clsx(
                  !showingMore &&
                    "lg:[&:nth-child(n+4)]:hidden [&:nth-child(n+5)]:hidden",
                )}
                icon={
                  <img
                    src={item.icon}
                    width={72}
                    height={72}
                    className="aspect-square lg:size-[138px]"
                    loading={index < 2 && firstIconsEager ? "eager" : "lazy"}
                    alt=""
                  />
                }
              />
            )
          })}
        </ul>
        {!showingMore && (
          <Button
            className="mt-4 w-full lg:mt-8"
            variant="secondary"
            onClick={() => showMore(true)}
          >
            {/* we don't display "Show less" because scroll restoriation is not worth the effort, and the user already scrolled to the next section */}
            Show more
          </Button>
        )}
      </div>
    </section>
  )
}

interface TeaserSectionListItemProps
  extends React.HTMLAttributes<HTMLLIElement> {
  number: number
  title: string
  description: string
  icon: ReactNode
  section: "getting-started" | "best-practices"
  href: string
}
function TeaserSectionListItem({
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

        <span className="flex flex-col gap-1 px-2 pt-2 [grid-area:header] lg:px-4 lg:pt-4">
          <span className="typography-body-sm text-neu-700 max-lg:typography-body-md">
            {/* TODO: Are we really sure these are Lessons? */}
            Lesson {number}
          </span>
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
