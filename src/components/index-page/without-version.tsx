import { useEffect, useRef } from "react"
import { V1, V2, V3, V4, V5 } from "../code-blocks"
import { clsx } from "clsx"

export function WithoutVersion() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let i = -1
    const inView = ref.current!

    function move() {
      i = (i + 1) % 7
      inView.className = "step" + i
    }

    move()
    const interval = setInterval(move, 2200)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="index-gradient">
      <section
        className="conf-block container flex justify-around gap-14 max-lg:flex-col lg:flex-row-reverse lg:*:w-1/2"
        id="without-versions"
      >
        <div className="max-lg:text-center">
          <h2>
            Evolve your API <br className="max-lg:hidden" />
            without versions
          </h2>
          {/* Illustration showing more legs added to a graph? Or a type evolving over time? */}
          <p>
            Add new fields and types to your GraphQL API without impacting
            existing queries. Aging fields can be deprecated and hidden from
            tools. By using a single evolving version, GraphQL APIs give apps
            continuous access to new features and encourage cleaner, more
            maintainable server code.
          </p>
        </div>
        <div
          className={clsx(
            "type-evolution mx-auto",
            "[&_div.nextra-code]:h-full",
            "rounded-md border border-gray-300 dark:border-neutral-700 [&_pre]:h-full [&_pre]:rounded-none [&_pre]:ring-0",
            // Set background as nextra code block bg color
            "_bg-white dark:_bg-black",
          )}
          aria-hidden
        >
          <div id="typeEvolveView" ref={ref}>
            <div className="v1">
              <V1 />
            </div>
            <div className="v2">
              <V2 />
            </div>
            <div className="v3">
              <V3 />
            </div>
            <div className="v4">
              <V4 />
            </div>
            <div className="v5">
              <V5 />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
