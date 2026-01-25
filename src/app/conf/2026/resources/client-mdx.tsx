"use client"

import Resources from "./resources.mdx"

export default function ResourcesPage() {
  return (
    <Resources
      components={{
        a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
          const isExternal = props.href?.startsWith("http")
          if (isExternal) {
            return <a {...props} target="_blank" rel="noopener noreferrer" />
          }

          return <a {...props} />
        },
        h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
          return (
            <h3
              className="typography-menu border-t border-neu-100 pt-2 text-pri-base dark:border-neu-50 dark:text-pri-light"
              {...props}
            >
              {props.children}
            </h3>
          )
        },
      }}
    />
  )
}
