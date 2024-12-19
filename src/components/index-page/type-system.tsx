import { useEffect, useRef } from "react"
import { Query, Schema } from "../code-blocks"
import { clsx } from "clsx"

export function TypeSystem() {
  const queryRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const [queryCode, responseCode] = queryRef.current!.querySelectorAll(
      "code",
    ) as unknown as HTMLElement[]
    let line = 0
    const typeLines = [1, 5, 6, 5, 7, 12, 13, 8, 17, 18, 19, 12]
    const queryLines = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13]
    let timer: any

    const highlightLine = () => {
      // Reset previous line
      queryCode.children[queryLines.at(line - 1)!].classList.remove(
        "highlighted",
      )
      responseCode.children[typeLines.at(line - 1)!].classList.remove(
        "highlighted",
      )

      queryCode.children[queryLines.at(line)!].classList.add("highlighted")
      responseCode.children[typeLines.at(line)!].classList.add("highlighted")
      line = (line + 1) % typeLines.length

      timer = setTimeout(highlightLine, 1_000 + Math.random() * 200)
    }
    highlightLine()
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="index-gradient">
      <section
        className={clsx(
          "conf-block container flex gap-14 max-lg:flex-col lg:flex-row-reverse",
          "lg:*:w-1/2",
        )}
        id="type-system"
      >
        <div className="max-lg:text-center">
          <h2>
            Describe what's possible <br className="max-lg:hidden" />
            with a type system
          </h2>
          {/*Illustration of a type IDL following a query by line*/}
          {/*Under: a server <-> client (Capabilities, Requirements)?*/}
          <p>
            GraphQL APIs are organized in terms of types and fields, not
            endpoints. Access the full capabilities of your data from a single
            endpoint. GraphQL uses types to ensure Apps only ask for what's
            possible and provide clear and helpful errors. Apps can use types to
            avoid writing manual parsing code.
          </p>
        </div>
        <div
          className="nextra-codeblocks grid grid-cols-2 [&_.highlighted]:!bg-primary/50"
          aria-hidden
          ref={queryRef}
        >
          <Query />
          <Schema />
        </div>
      </section>
    </div>
  )
}
