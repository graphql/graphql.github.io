"use client"

/**
 * Zero-dependency syntax highlighting for GraphQL and JSON.
 * Uses Catppuccin Mocha palette — matches the [#1e1e2e] dark background.
 *
 * Colors:
 *   #cba6f7 – mauve  (keywords: query, mutation, fragment, on, true, false, null)
 *   #f9e2af – yellow (type names: Human, Starship, String, Int, etc.)
 *   #89b4fa – blue   (field names, property keys in JSON)
 *   #a6e3a1 – green  (strings)
 *   #fab387 – peach  (numbers)
 *   #6c7086 – overlay0 (comments, punctuation)
 *   #f38ba8 – red    (directives)
 *
 * Implementation note: each highlighter runs a single tokenizer pass over the
 * escaped source and builds the HTML output as it goes, rather than running a
 * sequence of string replacements on an already-built HTML string. This prevents
 * later passes from matching keywords/types inside span attributes — the bug
 * that previously turned `<span class="sh-type">` into `<span class="sh-
 * <span class="sh-keyword">type</span>">`, leaking `type">` into the output.
 */

/* ── Shared helpers ── */

function escapeHTML(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

const wrap = (cls: string, text: string): string =>
  `<span class="sh-${cls}">${text}</span>`

/* ── GraphQL query / SDL highlighting ── */

export function highlightGraphQL(source: string): string {
  const esc = escapeHTML(source)

  // Master tokenizer, processed left-to-right. Alternative groups are tried in
  // order, so the first match wins (e.g. a scalar `Int` is consumed as a type
  // before the general capitalized-type alternative can grab it).
  const re =
    /("""[\s\S]*?""")|("(?:\\.|[^"\\])*")|('(?:\\.|[^'\\])*')|(#[^\n]*)|(@[a-zA-Z_][a-zA-Z0-9_]*)|\b(String|Int|Float|Boolean|ID)\b|\b(query|mutation|subscription|fragment|on|true|false|null|type|input|interface|union|enum|scalar|schema|extend|implements|directive|repeatable)\b|(\.\.\.\s*on\b)|\b([A-Z][a-zA-Z0-9_]+)\b/g

  let out = ""
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(esc)) !== null) {
    out += esc.slice(last, m.index)
    const [
      full,
      blockStr,
      str,
      sq,
      comment,
      directive,
      scalar,
      keyword,
      spreadOn,
      capType,
    ] = m
    if (blockStr) out += wrap("string", blockStr)
    else if (str) out += wrap("string", str)
    else if (sq) out += wrap("string", sq)
    else if (comment) out += wrap("comment", comment)
    else if (directive) out += wrap("directive", directive)
    else if (scalar) out += wrap("type", scalar)
    else if (keyword) out += wrap("keyword", keyword)
    else if (spreadOn) out += wrap("operator", spreadOn)
    else if (capType) out += wrap("type", capType)
    last = m.index + full.length
  }
  out += esc.slice(last)

  // Field names: a lowercase identifier at the start of a line, or just after a
  // `{` / `(`, followed by `:` or `(`. Skip identifiers already wrapped.
  out = out.replace(
    /(^|[\n{(])(\s*)([a-z_][a-zA-Z0-9_]*)(\s*)([:()])/gm,
    (
      _full,
      pre: string,
      space: string,
      name: string,
      gap: string,
      paren: string,
    ) =>
      _full.includes("sh-")
        ? _full
        : `${pre}${space}${wrap("field", name)}${gap}${paren}`,
  )

  // Non-null `!` and list `[` `]` markers
  out = out.replace(/(!)/g, wrap("operator", "$1"))
  out = out.replace(/([[\]])/g, wrap("operator", "$1"))

  return out
}

/* ── GraphQL Schema (SDL) highlighting ── */

export function highlightGraphQLSchema(source: string): string {
  const esc = escapeHTML(source)

  const re =
    /("""[\s\S]*?""")|("(?:\\.|[^"\\])*")|(#[^\n]*)|(@[a-zA-Z_][a-zA-Z0-9_]*)|\b(String|Int|Float|Boolean|ID)\b|\b(type|input|interface|union|enum|scalar|schema|extend|implements|directive|repeatable|query|mutation|subscription|fragment|on|true|false|null)\b|\b([A-Z][a-zA-Z0-9_]+)\b/g

  let out = ""
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(esc)) !== null) {
    out += esc.slice(last, m.index)
    const [full, blockStr, str, comment, directive, scalar, keyword, capType] =
      m
    if (blockStr) out += wrap("string", blockStr)
    else if (str) out += wrap("string", str)
    else if (comment) out += wrap("comment", comment)
    else if (directive) out += wrap("directive", directive)
    else if (scalar) out += wrap("type", scalar)
    else if (keyword) out += wrap("keyword", keyword)
    else if (capType) out += wrap("type", capType)
    last = m.index + full.length
  }
  out += esc.slice(last)

  // Field names: lowercase identifier at the start of a line followed by `:`.
  out = out.replace(
    /(^|\n)(\s+)([a-z_][a-zA-Z0-9_]*)(\s*:\s*)/gm,
    (_full, nl: string, indent: string, name: string, colon: string) =>
      _full.includes("sh-")
        ? _full
        : `${nl}${indent}${wrap("field", name)}${colon}`,
  )

  // Non-null `!` and list `[` `]` markers
  out = out.replace(/(!)/g, wrap("operator", "$1"))
  out = out.replace(/([[\]])/g, wrap("operator", "$1"))

  return out
}

/* ── JSON highlighting ── */

export function highlightJSON(source: string): string {
  const esc = escapeHTML(source)

  const re =
    /("(?:\\.|[^"\\])*")(\s*:)?|(-?\d+\.?\d*(?:[eE][+-]?\d+)?)|\b(true|false|null)\b/g

  let out = ""
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(esc)) !== null) {
    out += esc.slice(last, m.index)
    const [full, str, colon, num, kw] = m
    if (str && colon) out += wrap("field", str) + colon
    else if (str) out += wrap("string", str)
    else if (num) out += wrap("number", num)
    else if (kw) out += wrap("keyword", kw)
    last = m.index + full.length
  }
  out += esc.slice(last)

  return out
}

/* ── Bare text prompt highlighting (command style) ── */

export function highlightPrompt(source: string): string {
  // Highlight `>`-prefixed prompt lines. Escape per-line so the `>` marker and
  // any following text are both safe, then wrap the whole escaped line.
  return source
    .split("\n")
    .map(line => {
      if (!line.startsWith(">")) return escapeHTML(line)
      return wrap("comment", escapeHTML(line))
    })
    .join("\n")
}

/* ── CSS utility classes for the highlight spans ──
   Include these once in any parent that uses highlighted code.  ── */

export const syntaxColors = {
  comment: "#6c7086",
  keyword: "#cba6f7",
  type: "#f9e2af",
  field: "#89b4fa",
  string: "#a6e3a1",
  number: "#fab387",
  directive: "#f38ba8",
  operator: "#94e2d5",
  arg: "#89dceb",
} as const

/**
 * CSS string to inject once per page (or rely on Tailwind arbitrary values).
 * Exporting as a constant so consumers can use dangerouslySetInnerHTML with <style>.
 */
export const SYNTAX_CSS = `
.sh-comment  { color: ${syntaxColors.comment};  font-style: italic; }
.sh-keyword  { color: ${syntaxColors.keyword};  }
.sh-type     { color: ${syntaxColors.type};     }
.sh-field    { color: ${syntaxColors.field};    }
.sh-string   { color: ${syntaxColors.string};   }
.sh-number   { color: ${syntaxColors.number};   }
.sh-directive{ color: ${syntaxColors.directive};}
.sh-operator { color: ${syntaxColors.operator}; }
.sh-arg      { color: ${syntaxColors.arg};      }
/* Code blocks use a fixed dark background (Catppuccin Mocha #1e1e2e) in both
   light and dark mode, so base text must be light regardless of theme. */
pre { color: #cdd6f4; }
`
