import { ComponentPropsWithoutRef, useEffect, useRef } from "react"
import { Code } from "nextra/components"
import { clsx } from "clsx"

import { Pre } from "@/components/pre"

import PredictableResult from "../../code-blocks/predictable-result.mdx"

import classes from "./precision.module.css"

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
        {"\n    height\n    mass".split("").map((char, i) => (
          <span
            key={i}
            id={"ch" + i}
            className="hidden !text-pri-base dark:!text-sec-light"
          >
            {char === "\n" ? <br /> : char}
          </span>
        ))}
        <span
          className={clsx(
            "-mb-0.5 ml-px inline-block h-4 w-2 !bg-pri-base/50 dark:!bg-pri-light/60",
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
