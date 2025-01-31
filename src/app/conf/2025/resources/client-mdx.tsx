"use client"

import Resources from "./resources.mdx"

export default function ResourcesPage() {
  return (
    <Resources
      components={{
        // @ts-expect-error - not sure how to type this
        a: props => {
          const isExternal = props.href.startsWith("http")
          if (isExternal) {
            return <a {...props} target="_blank" rel="noopener noreferrer" />
          }

          return <a {...props} />
        },
      }}
    />
  )
}
