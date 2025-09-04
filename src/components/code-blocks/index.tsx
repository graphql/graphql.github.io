import { Code } from "nextra/components"
import { ComponentPropsWithoutRef } from "react"
import { clsx } from "clsx"

import { Pre } from "@/components/pre"

import _CodeA from "./describe-your-data.mdx"
import _CodeB from "./ask-for-what-you-want.mdx"
import _CodeC from "./get-predictable-results.mdx"

import _Code1 from "./code1.mdx"
import _Code2 from "./code2.mdx"
import _Code3 from "./code3.mdx"
import _Code4 from "./code4.mdx"
export { default as V1 } from "./v1.mdx"
export { default as V2 } from "./v2.mdx"
export { default as V3 } from "./v3.mdx"
export { default as V4 } from "./v4.mdx"
export { default as V5 } from "./v5.mdx"
export { default as Query } from "./query.mdx"
export { default as Schema } from "./schema.mdx"
import _QueryHeroFriends from "./query.hero-friends.mdx"
import _ResponseHeroFriends from "./response.hero-friends.mdx"
import _PredictableResult from "./predictable-result.mdx"

const components = {
  pre: Pre,
  code: Code,
}

export const LandingPagePre = (props: ComponentPropsWithoutRef<typeof Pre>) => (
  <Pre
    {...props}
    className={clsx(
      props.className,
      "!bg-neu-0/[.48] backdrop-blur-[6px] [scrollbar-width:none] [&::-webkit-scrollbar]:size-0 max-xs:[&_span]:!text-xs",
    )}
    tabIndex={-1}
  />
)

// Since we use `layout: 'raw'` in index page, only `<a />` element will be replaced, but not
// `<pre />` and `<code />`, for this reason we pass `components` to each MDX partial file.
// This code could be removed in Nextra v4

export const Code1 = () => <_Code1 components={components} />
export const Code2 = () => <_Code2 components={components} />
export const Code3 = () => <_Code3 components={components} />
export const Code4 = () => <_Code4 components={components} />

export const CodeA = () => <_CodeA components={components} />
export const CodeB = () => <_CodeB components={components} />
export const CodeC = () => <_CodeC components={components} />

export const QueryHeroFriends = () => (
  <_QueryHeroFriends components={components} />
)
export const ResponseHeroFriends = () => (
  <_ResponseHeroFriends components={components} />
)
