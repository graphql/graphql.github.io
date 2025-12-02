import { clsx } from "clsx"

import { ChevronRight } from "@/app/conf/_design-system/pixelarticons/chevron-right"

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
        className="grid grid-flow-row-dense grid-rows-2 gap-px border-t border-inherit bg-neu-300 dark:bg-neu-100"
        style={{
          gridTemplateColumns: `repeat(${sections.length / 2}, 1fr)`,
        }}
      >
        {sections.map((section, i) => {
          const { name, href } =
            typeof section === "string"
              ? {
                  name: section,
                  href: `#${section.toLowerCase().replace(/ /g, "-")}`,
                }
              : section

          return (
            <li key={i}>
              <a
                className="flex items-center gap-2 whitespace-nowrap bg-neu-0 p-3 hover:bg-neu-50 lg:py-5"
                href={href}
              >
                <ChevronRight className="size-4 translate-x-[0.5px]" />
                {name}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
