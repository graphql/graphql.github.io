import { useEffect, useRef } from "react"
import { PredictableResult } from "../../code-blocks"
import { Pre } from "nextra/components"
import { clsx } from "clsx"
import classes from "./index.module.css"

export function PredictableResults() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const showResponse = (num: Number) => {
      const lines = ref.current!.querySelectorAll(
        "code > span",
      ) as unknown as HTMLSpanElement[] & { children: HTMLSpanElement[] }[]

      if (num === 1) {
        Array.from(lines[2].children).at(-1)!.style.display = "none"
        lines[3].style.display = "none"
        lines[4].style.display = "none"
      } else if (num === 2 || num === 3) {
        Array.from(lines[2].children).at(-1)!.style.display = "inline"
        lines[3].style.display = "inline"
        if (num === 2) {
          Array.from(lines[3].children).at(-1)!.style.display = "none"
        } else {
          Array.from(lines[3].children).at(-1)!.style.display = "inline"
          lines[4].style.display = "inline"
        }
      }
    }
    let i = 0
    let forward = true
    let timer: any
    timer = setTimeout(type, 2000)
    showResponse(1)

    function type() {
      if (forward) {
        if (document.getElementById("ch" + i)) {
          document.getElementById("ch" + i)!.style.display = "inline"
          i++
          if (i === 20) {
            forward = false
            showResponse(3)
            timer = setTimeout(type, 1500)
          } else if (i === 11) {
            showResponse(2)
            timer = setTimeout(type, 1500)
          } else {
            timer = setTimeout(type, Math.random() * 180 + 70)
          }
        }
      } else {
        i--
        if (document.getElementById("ch" + i)) {
          document.getElementById("ch" + i)!.style.display = "none"
          if (i === 0) {
            forward = true
            showResponse(1)
            timer = setTimeout(type, 2000)
          } else {
            timer = setTimeout(type, 80)
          }
        }
      }
    }

    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="index-gradient">
      <section
        className="conf-block container flex flex-col justify-around gap-14 lg:flex-row-reverse lg:items-start lg:*:w-1/2"
        id="predictable-results"
      >
        <div className="max-lg:text-center">
          <h2>
            Ask for what you need, <br className="max-lg:hidden" />
            get exactly that
          </h2>
          {/*[Illustration: just a simple query and response?]*/}
          <p>
            Send a GraphQL query to your API and get exactly what you need,
            nothing more and nothing less. GraphQL queries always return
            predictable results. Apps using GraphQL are fast and stable because
            they control the data they get, not the server.
          </p>
        </div>
        <div
          ref={ref}
          className="nextra-codeblocks flex *:w-1/2 [&_pre]:!h-48"
          aria-hidden
        >
          <Pre data-filename="Query" className="p-4">
            {"{"}
            {"\n  hero {"}
            {"\n    name"}
            {"\n    height\n    mass".split("").map((char, i) => (
              <span key={i} id={"ch" + i} className="hidden">
                {char === "\n" ? <br /> : char}
              </span>
            ))}
            <span
              className={clsx(
                "-mb-0.5 ml-px inline-block h-4 w-2 !bg-primary/50",
                classes.cursor,
              )}
            />
            {"\n  }"}
            {"\n}"}
          </Pre>
          <PredictableResult />
        </div>
      </section>
    </div>
  )
}
