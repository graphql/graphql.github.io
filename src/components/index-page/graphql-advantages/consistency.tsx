import { useEffect, useRef } from "react"
import { Code } from "nextra/components"

import { LandingPagePre, Query, Schema } from "../../code-blocks"

const components = {
  pre: LandingPagePre,
  code: Code,
}

export function ConsistencyFigure() {
  const queryRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const [queryCode, responseCode] = queryRef.current!.querySelectorAll(
      "code",
    ) as unknown as HTMLElement[]
    let i = 0
    const typeLines = [1, 5, 6, 5, 7, 12, 13, 8, 17, 18, 19, 12]
    const queryLines = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13]
    let timer: ReturnType<typeof setTimeout> | undefined = undefined

    const highlightLine = () => {
      // Reset previous line
      queryCode.children[queryLines.at(i - 1)!].classList.remove("highlighted")
      responseCode.children[typeLines.at(i - 1)!].classList.remove(
        "highlighted",
      )

      queryCode.children[queryLines.at(i)!].classList.add("highlighted")
      responseCode.children[typeLines.at(i)!].classList.add("highlighted")

      // We're scrolling to top when the first line is highlighted and we're
      // scrolling to the  bottom when the last line is highlighted.
      const pre = responseCode.parentElement!
      if (i === 0) {
        pre.scrollTo({ top: 0, behavior: "smooth" })
      } else if (i === typeLines.length - 3) {
        pre.scrollTo({ top: pre.scrollHeight, behavior: "smooth" })
      }

      i = (i + 1) % typeLines.length

      timer = setTimeout(highlightLine, 1_000 + Math.random() * 200)
    }
    highlightLine()
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="type-system"
      className="nextra-codeblocks flex w-full bg-gradient-to-b from-transparent to-sec-lighter px-[14px] py-[30px] dark:to-sec-darker/25 max-[380px]:px-0 xl:px-[46px] max-[380px]:[&_:is(.rounded-t-md,pre)]:rounded-none [&_pre]:!h-[370px] md:[&_pre]:!h-[420px]"
    >
      <div
        className="nextra-codeblocks grid w-full grid-cols-2 [&_.highlighted]:!bg-pri-lighter/50 dark:[&_.highlighted]:!bg-neu-200/10"
        aria-hidden
        ref={queryRef}
      >
        <Query components={components} />
        <Schema components={components} />
      </div>
    </section>
  )
}
