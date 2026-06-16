"use client"

import type { ComponentPropsWithoutRef } from "react"
import { Code } from "nextra/components"

import { Pre } from "@/components/pre"

import _CityQuery from "./city-query.mdx"

// Mirrors the components-map override the landing-page Wires illustration
// uses for its API-gateway query: render the snippet frameless (no header,
// no border, no bg) so the parent's .highlightsQuery class can extend the
// per-line nth-child highlight overlays flush to the snippet's edges.
const framelessSnippetComponents = {
  pre: (props: ComponentPropsWithoutRef<typeof Pre>) => (
    <Pre
      {...props}
      tabIndex={-1}
      className="!rounded-none !border-0 !bg-transparent !px-0 !py-2"
    />
  ),
  code: Code,
}

export function CityQuerySnippet() {
  return <_CityQuery components={framelessSnippetComponents} />
}
