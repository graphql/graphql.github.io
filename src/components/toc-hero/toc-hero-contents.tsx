import { clsx } from "clsx"

import { ChevronRight } from "@/app/conf/_design-system/pixelarticons/chevron-right"
import { slugify } from "@/app/(main)/resources/[category]/categories-config"

export interface TocHeroContentsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  sections: (string | { name: string; href: string })[]
}

export function TocHeroContents({
  sections,
  className,
  ...rest
}: TocHeroContentsProps) {
  return (
    <div
      {...rest}
      className={clsx(
        "mt-2 w-full border border-neu-300 bg-neu-0/[.64] dark:border-neu-100 lg:mt-4",
        className,
      )}
    >
      <h2 className="typography-body-lg px-4 py-2.5 text-center md:py-4">
        What will you find here?
      </h2>
      <ul
        className={clsx(
          "grid grid-flow-row-dense gap-px border-t border-inherit bg-neu-300 dark:bg-neu-100",
          sections.length % 3 === 0
            ? "grid-cols-2 lg:grid-cols-[repeat(3,1fr)]"
            : sections.length > 2
              ? "grid-cols-2"
              : "grid-cols-1",
          sections.length > 3 && "grid-rows-2",
        )}
      >
        {sections.map((section, i) => {
          const { name, href } =
            typeof section === "string"
              ? {
                  name: section,
                  href: `#${slugify(section)}`,
                }
              : section

          const isLastOdd =
            sections.length > 2 &&
            sections.length % 2 === 1 &&
            i === sections.length - 1

          return (
            <li
              key={i}
              className={
                isLastOdd
                  ? sections.length % 3 === 0
                    ? "col-span-2 lg:col-span-1"
                    : "col-span-2"
                  : undefined
              }
            >
              <a
                className="flex h-full items-center gap-2 bg-neu-0 p-2 text-left hover:bg-neu-50 max-sm:text-sm sm:gap-2 sm:p-3 lg:py-5"
                href={href}
              >
                <ChevronRight className="size-4 shrink-0 translate-x-[0.5px]" />
                {name}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
