import type { SVGProps } from "react"

const sprite = new URL("./sprite.svg", import.meta.url).href

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

interface IconProps extends SVGProps<SVGSVGElement> {
  icon: IconName
}

export function Icon({ icon, ...props }: IconProps) {
  return (
    <svg {...props}>
      <use href={`${sprite}#${icon}`} />
    </svg>
  )
}
