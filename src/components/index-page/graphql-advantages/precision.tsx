import { ComponentPropsWithoutRef, useEffect, useRef } from "react"
import { Code } from "nextra/components"
import { clsx } from "clsx"
import { useInView } from "motion/react"

import { Pre } from "@/components/pre"
import { useCodeAnimation } from "@/components/code-animation/use-code-animation"

import PredictableResult from "../../code-blocks/predictable-result.mdx"

import classes from "./precision.module.css"

const extraFields = "\n    height\n    mass"
const fieldPauses = { 11: 1500 }

const components = {
  pre: (props: ComponentPropsWithoutRef<typeof Pre>) => (
    <Pre
      {...props}
      // todo: this bg style might need to become global for all code blocks
      className={clsx(
        props.className,
        "!bg-neu-0/[.48] pr-4 leading-[21px] backdrop-blur-[6px] max-xs:leading-[16px] max-xs:[&_span]:!text-xs",
      )}
      tabIndex={-1}
    />
  ),
  code: Code,
}

export function PrecisionFigure() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const { code, visibleCharacters } = useCodeAnimation(extraFields, {
    active: inView,
    initialDelay: 2000,
    minTypingDelay: 70,
    maxTypingDelay: 250,
    pauses: fieldPauses,
    loop: true,
  })
  const responseLines =
    visibleCharacters < 11 ? 1 : visibleCharacters < 20 ? 2 : 3

  useEffect(() => {
    const lines = ref.current?.querySelectorAll("code > span")
    if (!lines || lines.length < 5) return

    const firstComma = Array.from(lines[2].children).at(-1) as HTMLElement
    const secondComma = Array.from(lines[3].children).at(-1) as HTMLElement
    const secondResultLine = lines[3] as HTMLElement
    const thirdResultLine = lines[4] as HTMLElement

    firstComma.style.display = responseLines > 1 ? "inline" : "none"
    secondResultLine.style.display = responseLines > 1 ? "inline" : "none"
    secondComma.style.display = responseLines > 2 ? "inline" : "none"
    thirdResultLine.style.display = responseLines > 2 ? "inline" : "none"
  }, [responseLines])

  const Pre = components.pre

  return (
    <div
      ref={ref}
      id="predictable-results"
      className="nextra-codeblocks flex w-full max-w-[100vw] bg-gradient-to-b from-transparent to-sec-lighter px-[14px] py-[30px] *:w-1/2 dark:to-sec-darker/25 max-[380px]:px-0 sm:max-w-[calc(100vw-32px)] xl:px-[46px] max-[380px]:[&_:is(.rounded-t-md,pre)]:rounded-none [&_pre]:!h-48"
      aria-hidden
    >
      <Pre data-filename="Query" className="p-4 text-sm text-[#6E7557]">
        {"{"}
        {"\n  "}
        <span className="!text-pri-base dark:!text-sec-light">{"hero"}</span>
        {" {"}
        <span className="!text-pri-base dark:!text-sec-light">
          {"\n    name"}
        </span>
        <span className="!text-pri-base dark:!text-sec-light">{code}</span>
        <span
          className={clsx(
            "-mb-0.5 ml-px inline-block h-4 w-2 !bg-pri-base/50 motion-reduce:hidden dark:!bg-pri-light/60",
            classes.cursor,
          )}
        />
        {"\n  }"}
        {"\n}"}
      </Pre>
      <PredictableResult components={components} />
    </div>
  )
}
