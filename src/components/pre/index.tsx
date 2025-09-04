import cn from "clsx"
import type { ComponentPropsWithoutRef, FC, ReactElement } from "react"
import { useRef } from "react"
import { WordWrapIcon } from "nextra/icons"
import { Button, CopyToClipboard } from "nextra/components"

import classes from "./pre.module.css"
import { CodeBlockLabel } from "./code-block-label"

export interface PreProps extends ComponentPropsWithoutRef<"pre"> {
  "data-filename"?: string
  "data-copy"?: ""
  "data-language"?: string
  "data-word-wrap"?: ""
  icon?: FC<{ className?: string }>
  containerClassName?: string
}

export function Pre({
  children,
  className,
  "data-filename": filename,
  "data-copy": copy,
  "data-language": _language,
  "data-word-wrap": hasWordWrap,
  icon: Icon,
  containerClassName,
  ...props
}: PreProps): ReactElement {
  const preRef = useRef<HTMLPreElement | null>(null)

  const copyButton = copy === "" && (
    <CopyToClipboard
      tabIndex={props.tabIndex}
      className={filename ? "_ml-auto" : ""}
      getValue={() => preRef.current?.querySelector("code")?.textContent || ""}
    />
  )

  return (
    <div className={cn(classes.pre, "relative", containerClassName)}>
      {filename && (
        <CodeBlockLabel
          text={filename}
          icon={Icon}
          button={copyButton}
          className="rounded-t-md border border-b-0 border-neu-200 bg-neu-0/[.64] backdrop-blur-[6px] dark:border-neu-50"
        />
      )}
      <pre
        className={cn(
          "overflow-x-auto border border-neu-200 py-4 subpixel-antialiased contrast-more:contrast-150 dark:border-neu-50",
          filename ? "rounded-b-md" : "rounded-md",
          className,
        )}
        ref={preRef}
        {...props}
      >
        {children}
      </pre>
      <div
        className={cn(
          "_opacity-0 _transition [div:hover>&]:_opacity-100 focus-within:_opacity-100",
          "_flex _gap-1 _absolute _right-4",
          filename ? "_top-14" : "_top-2",
        )}
      >
        {hasWordWrap === "" && (
          <Button
            onClick={toggleWordWrap}
            className="md:_hidden"
            title="Toggle word wrap"
            variant="outline"
          >
            <WordWrapIcon height="16" />
          </Button>
        )}
        {!filename && copyButton}
      </div>
    </div>
  )
}

function toggleWordWrap() {
  const htmlDataset = document.documentElement.dataset
  const hasWordWrap = "nextraWordWrap" in htmlDataset
  if (hasWordWrap) {
    delete htmlDataset.nextraWordWrap
  } else {
    htmlDataset.nextraWordWrap = ""
  }
}
