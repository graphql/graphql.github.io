import { parser } from "@hasparus/lezer-json-shikified"
import {
  continuedIndent,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  LRLanguage,
  LanguageSupport,
} from "@codemirror/language"

export const jsonLanguage = LRLanguage.define({
  name: "json",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Object: continuedIndent({ except: /^\s*\}/ }),
        Array: continuedIndent({ except: /^\s*\]/ }),
      }),
      foldNodeProp.add({
        "Object Array": foldInside,
      }),
    ],
  }),
  languageData: {
    closeBrackets: { brackets: ["[", "{", '"'] },
    indentOnInput: /^\s*[}\]]$/,
  },
})

export function json() {
  return new LanguageSupport(jsonLanguage)
}
