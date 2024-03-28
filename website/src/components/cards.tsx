import { ReactElement } from "react"
import { Card } from "./card"
import { clsx } from "clsx"
import NextLink from "next/link"

export function Cards({
  items,
}: {
  items: {
    icon: ReactElement
    title: string
    description?: string
    link: string
  }[]
}) {
  return (
    <div className="grid grid-cols-2 mt-6 gap-4">
      {items.map(
        ({
          icon: Icon,
          title,
          link,
          description = link.replace(/^https?:\/\//, ""),
        }) => {
          const isExternal = link.startsWith("https://")
          return (
            <Card
              key={title}
              as={isExternal ? "a" : NextLink}
              // @ts-expect-error
              href={link}
              className={clsx(
                "flex flex-col items-center",
                isExternal &&
                  "relative after:content-['_↗'] after:font-sans after:absolute after:right-4 after:top-4",
              )}
            >
              {/* @ts-expect-error */}
              {typeof Icon === "function" ? <Icon className="h-6" /> : Icon}
              <b className="mt-4 text-lg text-center">{title}</b>
              <span className="text-xs md:text-sm">{description}</span>
            </Card>
          )
        },
      )}
    </div>
  )
}
