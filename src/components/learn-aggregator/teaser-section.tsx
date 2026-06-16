import { ReactNode, useState } from "react"
import { clsx } from "clsx"

import { Eyebrow } from "@/_design-system/eyebrow"
import { Button } from "@/app/conf/_design-system/button"

import { TeaserSectionListItem } from "./teaser-section-list-item"

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
