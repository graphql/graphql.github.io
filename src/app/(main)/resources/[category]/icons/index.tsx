import type { ComponentType, SVGProps } from "react"

import Ballerina from "./ballerina.svg?svgr"
import CNet from "./c-net.svg?svgr"
import Clojure from "./clojure.svg?svgr"
import Elixir from "./elixir.svg?svgr"
import Elm from "./elm.svg?svgr"
import Flutter from "./flutter.svg?svgr"
import GoIcon from "./go.svg?svgr"
import Haskell from "./haskell.svg?svgr"
import JavaKotlinAndroid from "./java-kotlin-android.svg?svgr"
import Javascript from "./javascript.svg?svgr"
import Julia from "./julia.svg?svgr"
import LanguageSupport from "./language-support.svg?svgr"
import Php from "./php.svg?svgr"
import Python from "./python.svg?svgr"
import Ruby from "./ruby.svg?svgr"
import Rust from "./rust.svg?svgr"
import Scala from "./scala.svg?svgr"
import SwiftObjectiveCIos from "./swift-objective-c-ios.svg?svgr"

export const icons = {
  ballerina: Ballerina,
  "c-net": CNet,
  clojure: Clojure,
  elixir: Elixir,
  elm: Elm,
  flutter: Flutter,
  go: GoIcon,
  haskell: Haskell,
  "java-kotlin-android": JavaKotlinAndroid,
  javascript: Javascript,
  julia: Julia,
  "language-support": LanguageSupport,
  php: Php,
  python: Python,
  ruby: Ruby,
  rust: Rust,
  scala: Scala,
  "swift-objective-c-ios": SwiftObjectiveCIos,
} satisfies Record<string, ComponentType<SVGProps<SVGElement>>>
