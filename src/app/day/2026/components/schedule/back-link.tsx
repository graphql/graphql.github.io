import NextLink from "next/link"

import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <NextLink
      href={href}
      className="group typography-menu -m-2 inline-flex cursor-pointer items-center gap-2 p-2 text-sec-darker transition-all [text-box:trim-both_cap_alphabetic] hover:underline hover:underline-offset-4 dark:text-neu-700"
    >
      <div className="[--arrow-left-x:-1px] group-hover:animate-arrow-left group-focus:animate-arrow-left">
        <ArrowDownIcon className="inline-block size-4 translate-y-[-.5px] rotate-90" />
      </div>
      {label}
    </NextLink>
  )
}
