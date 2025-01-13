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
    <div className="mt-6 grid grid-cols-2 gap-4">
      {items.map(({ icon: Icon, title, link, description }) => {
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
                "relative after:absolute after:right-4 after:top-4 after:font-sans after:content-['_↗']",
            )}
          >
            {/* @ts-expect-error */}
            {typeof Icon === "function" ? <Icon className="h-12" /> : Icon}
            <b className="mb-2 mt-4 text-center text-lg">{title}</b>
            <span
              className={`text-xs md:text-sm text-center${description ? "" : "break-all"}`}
            >
              {description ? description : link.replace(/^https?:\/\//, "")}
            </span>
          </Card>
        )
      })}
    </div>
  )
}
