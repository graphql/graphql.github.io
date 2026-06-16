import { EditorView } from "@codemirror/view"
import { Extension } from "@codemirror/state"
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { tags as t } from "@lezer/highlight"

export const editorTheme = EditorView.theme({
  "&": {
    color: "var(--cm-foreground)",
    backgroundColor: "var(--cm-background)",
  },

  ".cm-content": {
    caretColor: "var(--cm-cursor)",
  },

  ".cm-cursor, .cm-dropCursor": { borderLeftColor: "var(--cm-cursor)" },
  "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
    { backgroundColor: "var(--cm-selection)" },

  ".cm-panels": {
    backgroundColor: "var(--cm-background)",
    color: "var(--cm-foreground)",
  },
  ".cm-panels.cm-panels-top": {
    borderBottom: "2px solid var(--cm-gutter-border)",
  },
  ".cm-panels.cm-panels-bottom": {
    borderTop: "2px solid var(--cm-gutter-border)",
  },

  ".cm-searchMatch": {
    backgroundColor: "#72a1ff59",
    outline: "1px solid #457dff",
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: "#6199ff2f",
  },

  ".cm-activeLine": { backgroundColor: "rgba(255, 255, 255, 0.05)" },
  ".cm-selectionMatch": { backgroundColor: "#aafe661a" },

  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: "#bad0f847",
  },

  ".cm-gutters": {
    backgroundColor: "var(--cm-gutter-background)",
    color: "var(--cm-line-number)",
    border: "none",
    borderRight: "1px solid var(--cm-gutter-border)",
  },

  ".cm-activeLineGutter": {
    backgroundColor: "var(--cm-gutter-background)",
  },

  ".cm-foldPlaceholder": {
    backgroundColor: "transparent",
    border: "none",
    color: "#ddd",
  },

  ".cm-tooltip": {
    border: "none",
    backgroundColor: "var(--cm-hints-background)",
    color: "var(--cm-hints-foreground)",
  },
  ".cm-tooltip .cm-tooltip-arrow:before": {
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },
  ".cm-tooltip .cm-tooltip-arrow:after": {
    borderTopColor: "var(--cm-hints-background)",
    borderBottomColor: "var(--cm-hints-background)",
  },
  ".cm-tooltip-autocomplete": {
    "& > ul > li[aria-selected]": {
      backgroundColor: "var(--cm-hints-active-background)",
      color: "var(--cm-hints-active-foreground)",
    },
  },
})

export const syntaxTheme = HighlightStyle.define([
  { tag: t.keyword, class: "cm-keyword" },
  {
    tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    class: "cm-def",
  },
  { tag: [t.function(t.variableName), t.labelName], class: "cm-variable" },
  { tag: [t.color, t.constant(t.name), t.standard(t.name)], class: "cm-atom" },
  { tag: [t.definition(t.name)], class: "cm-def" },
  {
    tag: [
      t.typeName,
      t.className,
      t.number,
      t.changed,
      t.annotation,
      t.modifier,
      t.self,
      t.namespace,
    ],
    class: "cm-atom",
  },
  {
    tag: [
      t.operator,
      t.operatorKeyword,
      t.url,
      t.escape,
      t.regexp,
      t.link,
      t.special(t.string),
      t.separator,
    ],
    class: "cm-punctuation",
  },
  { tag: [t.meta, t.comment], class: "cm-comment" },
  { tag: t.strong, fontWeight: "bold" },
  { tag: t.emphasis, fontStyle: "italic" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.link, class: "cm-comment", textDecoration: "underline" },
  { tag: t.heading, fontWeight: "bold", class: "cm-def" },
  { tag: [t.atom, t.bool, t.special(t.variableName)], class: "cm-atom" },
  { tag: [t.processingInstruction, t.string, t.inserted], class: "cm-string" },
  { tag: t.invalid, class: "cm-invalidchar" },
  {
    tag: t.punctuation,
    class: "cm-punctuation",
  },
])

export const codeMirrorThemeExtension: Extension = [
  editorTheme,
  syntaxHighlighting(syntaxTheme),
]
