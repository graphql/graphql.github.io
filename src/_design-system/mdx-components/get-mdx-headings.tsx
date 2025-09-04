/**
 * @file MDX Heading components.
 * Copied from `nextra-theme-docs` and restyled.
 */

import { clsx } from "clsx"
import {
  useSetActiveAnchor,
  useIntersectionObserver,
  useSlugs,
} from "nextra-theme-docs"

import { useEffect, useRef } from "react"

const headingClasses = {
  h1: "typography-h2 mt-2",
  h2: "typography-h3 mt-10",
  h3: "typography-body-lg mt-8",
  h4: "typography-body-md font-semibold mt-8",
  h5: "typography-label",
  h6: "typography-label",
}

const createHeading = (
  Tag: `h${2 | 3 | 4 | 5 | 6}`,
  context: { index: number },
) =>
  function Heading({
    children,
    id,
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"h2">): React.ReactElement {
    // Nextra tracks anchors in context
    const setActiveAnchor = useSetActiveAnchor()
    const slugs = useSlugs()
    const observer = useIntersectionObserver()
    const obRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
      const heading = obRef.current
      if (!id || !observer || !heading) return
      observer.observe(heading)
      slugs.set(heading, [id, (context.index += 1)])

      return () => {
        observer.disconnect()
        slugs.delete(heading)
        setActiveAnchor(f => {
          const ret = { ...f }
          delete ret[id]
          return ret
        })
      }
    }, [id, slugs, observer, setActiveAnchor])

    return (
      <Tag
        id={id}
        className={
          className === "sr-only"
            ? // can be added by footnotes
              "sr-only"
            : clsx(headingClasses[Tag], "text-neu-900", className)
        }
        {...props}
      >
        {children}
        {id && (
          <a
            href={`#${id}`}
            className="nextra-focus subheading-anchor"
            aria-label="Permalink for this section"
            ref={obRef}
          />
        )}
      </Tag>
    )
  }

export function getMdxHeadings() {
  const counter = ((globalThis as Record<string, any>).__headingsCounter ||= {
    index: 0,
  })

  return {
    h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
      <h1
        {...props}
        className={clsx(headingClasses.h1, "text-neu-900", props.className)}
      />
    ),
    h2: createHeading("h2", counter),
    h3: createHeading("h3", counter),
    h4: createHeading("h4", counter),
    h5: createHeading("h5", counter),
    h6: createHeading("h6", counter),
  }
}
