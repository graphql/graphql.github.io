import { useEffect, useRef } from "react"
import { Code } from "nextra/components"
import { clsx } from "clsx"

import { LandingPagePre, V1, V2, V3, V4, V5 } from "../../code-blocks"

import "./versionless.css"

const components = {
  pre: LandingPagePre,
  code: Code,
}

export function VersionlessFigure() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let i = -1
    const inView = ref.current!

    function move() {
      i = (i + 1) % 7
      inView.dataset.step = i.toString()
    }

    move()
    const interval = setInterval(move, 2200)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <section
      className="flex w-full max-w-[100vw] bg-gradient-to-b from-pri-lighter/[.05] to-pri-lighter/40 px-[14px] py-[30px] dark:from-sec-darker/[.01] dark:to-pri-light/10 max-[360px]:px-0 sm:max-w-[calc(100vw-32px)] xl:px-[46px] max-[360px]:[&_div]:rounded-none"
      id="without-versions"
    >
      <div
        className={clsx(
          "mx-auto w-full overflow-hidden",
          "[&_div.nextra-code]:h-full",
          "rounded-md border border-neu-200 bg-neu-0/[.64] dark:border-neu-50 dark:bg-neu-0/40 [&_pre]:h-full [&_pre]:rounded-none [&_pre]:ring-0",
        )}
        aria-hidden
      >
        <div className="versionless-figure" ref={ref}>
          <div className="v1">
            <V1 components={components} />
          </div>
          <div className="v2">
            <V2 components={components} />
          </div>
          <div className="v3">
            <V3 components={components} />
          </div>
          <div className="v4">
            <V4 components={components} />
          </div>
          <div className="v5">
            <V5 components={components} />
          </div>
        </div>
      </div>
    </section>
  )
}
