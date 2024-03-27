import { Code, Pre } from "nextra/components"

import _CodeA from "./describe-your-data.mdx"
import _CodeB from "./ask-for-what-you-want.mdx"
import _CodeC from "./get-predictable-results.mdx"

import _Code1 from "./code1.mdx"
import _Code2 from "./code2.mdx"
import _Code3 from "./code3.mdx"
import _Code4 from "./code4.mdx"
import _V1 from "./v1.mdx"
import _V2 from "./v2.mdx"
import _V3 from "./v3.mdx"
import _V4 from "./v4.mdx"
import _V5 from "./v5.mdx"
import _Query from "./query.mdx"
import _Schema from "./schema.mdx"
import _QueryHeroFriends from "./query.hero-friends.mdx"
import _ResponseHeroFriends from "./response.hero-friends.mdx"
import _PredictableResult from "./predictable-result.mdx"

const components = {
  pre: Pre,
  code: Code,
}

// Since we use `layout: 'raw'` in index page, only `<a />` element will be replaced, but not
// `<pre />` and `<code />`, for this reason we pass `components` to each MDX partial file.
// This code could be removed in Nextra v4

export const Code1 = () => <_Code1 components={components} />
export const Code2 = () => <_Code2 components={components} />
export const Code3 = () => <_Code3 components={components} />
export const Code4 = () => <_Code4 components={components} />

export const Query = () => <_Query components={components} />
export const Schema = () => <_Schema components={components} />
export const CodeA = () => <_CodeA components={components} />
export const CodeB = () => <_CodeB components={components} />
export const CodeC = () => <_CodeC components={components} />
export const V1 = () => <_V1 components={components} />
export const V2 = () => <_V2 components={components} />
export const V3 = () => <_V3 components={components} />
export const V4 = () => <_V4 components={components} />
export const V5 = () => <_V5 components={components} />
export const QueryHeroFriends = () => (
  <_QueryHeroFriends components={components} />
)
export const ResponseHeroFriends = () => (
  <_ResponseHeroFriends components={components} />
)
export const PredictableResult = () => (
  <_PredictableResult components={components} />
)
