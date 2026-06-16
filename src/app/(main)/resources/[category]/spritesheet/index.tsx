import type { SVGProps } from "react"

import sheet from "./sheet.svg?resource"

export type IconName =
  | "ballerina"
  | "c-net"
  | "clojure"
  | "elixir"
  | "elm"
  | "flutter"
  | "go"
  | "haskell"
  | "java"
  | "javascript"
  | "julia"
  | "multiplatform"
  | "php"
  | "python"
  | "ruby"
  | "rust"
  | "scala"
  | "swift"

interface IconSpritesheetProps extends SVGProps<SVGSVGElement> {
  sprite: IconName
}

export function IconSpritesheet({ sprite, ...props }: IconSpritesheetProps) {
  return (
    <>
      <svg fill="currentColor" {...props}>
        <use
          href={`${sheet}#${sprite}`}
          style={{ "--bg": "hsl(var(--color-neu-50))" } as {}}
        />
      </svg>
    </>
  )
}
