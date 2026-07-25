"use client"

/**
 * Zero-dependency syntax highlighting for GraphQL and JSON.
 * Uses Catppuccin Mocha palette — matches the [##1e1e2e] dark background.
 *
 * Colors:
 *   #cba6f7 – mauve  (keywords: query, mutation, fragment, on, true, false, null)
 *   #f9e2af – yellow (type names: Human, Starship, String, Int, etc.)
 *   #89b4fa – blue   (field names, property keys in JSON)
 *   #a6e3a1 – green  (strings)
 *   #fab387 – peach  (numbers)
 *   #6c7086 – overlay0 (comments, punctuation)
 *   #f38ba8 – red    (directives)
 */

/* ── Shared helpers ── */

function escapeHTML(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

/* ── GraphQL query / SDL highlighting ── */

export function highlightGraphQL(source: string): string {
  let html = escapeHTML(source)

  // Strings (single and double quoted)
  html = html.replace(
    /("(?:\\.|[^"\\])*")/g,
    '<span class="sh-string">$1</span>',
  )
  html = html.replace(
    /('(?:\\.|[^'\\])*')/g,
    '<span class="sh-string">$1</span>',
  )

  // Block strings (triple-quoted)
  html = html.replace(/("""[\s\S]*?""")/g, '<span class="sh-string">$1</span>')

  // Comments
  html = html.replace(/(#[^\n]*)/g, '<span class="sh-comment">$1</span>')

  // Directives (@skip, @include, @deprecated)
  html = html.replace(
    /(@[a-zA-Z_][a-zA-Z0-9_]*)/g,
    '<span class="sh-directive">$1</span>',
  )

  // Scalar types & built-ins (must come before general type names)
  html = html.replace(
    /\b(String|Int|Float|Boolean|ID)\b/g,
    '<span class="sh-type">$1</span>',
  )

  // GraphQL keywords
  html = html.replace(
    /\b(query|mutation|subscription|fragment|on|true|false|null|type|input|interface|union|enum|scalar|schema|extend|implements|directive|repeatable)\b/g,
    '<span class="sh-keyword">$1</span>',
  )

  // ... on Type (inline fragment)
  html = html.replace(
    /(\.\.\.\s+on\s+)([A-Z][a-zA-Z0-9_]*)/g,
    '<span class="sh-operator">$1</span><span class="sh-type">$2</span>',
  )

  // Standalone type names (Capitalized words that follow whitespace + are standalone)
  html = html.replace(
    /\b([A-Z][a-zA-Z0-9_]+)\b/g,
    (match, typeName, offset) => {
      // Check if this is already wrapped in a span
      const before = html.substring(Math.max(0, offset - 60), offset)
      const alreadyWrapped =
        before.lastIndexOf('<span class="sh-type">') >
        before.lastIndexOf("</span>")
      if (alreadyWrapped) return match
      return `<span class="sh-type">${typeName}</span>`
    },
  )

  // Field names at line start (unquoted identifiers followed by : or ()
  html = html.replace(
    /(^|\n)(\s*)([a-zA-Z_][a-zA-Z0-9_]*)(\s*)([:(])/gm,
    (
      _full: string,
      nl: string,
      indent: string,
      name: string,
      gap: string,
      paren: string,
    ) => {
      // Don't highlight if already inside a span
      if (
        _full.includes("<span") ||
        /^(query|mutation|subscription|fragment|type|input|interface|union|enum|scalar|schema|extend|implements|directive)$/.test(
          name,
        )
      ) {
        return _full
      }
      return `${nl}${indent}<span class="sh-field">${name}</span>${gap}${paren}`
    },
  )

  // Nested field names (indented identifiers followed by space + {)
  html = html.replace(
    /(^|\n)(\s+)([a-zA-Z_][a-zA-Z0-9_]*)(\s*\{)/gm,
    (
      _full: string,
      nl: string,
      indent: string,
      name: string,
      brace: string,
    ) => {
      if (
        _full.includes("<span") ||
        /^(query|mutation|subscription|fragment|on)$/.test(name)
      ) {
        return _full
      }
      return `${nl}${indent}<span class="sh-field">${name}</span>${brace}`
    },
  )

  // Arguments: parens and colons
  html = html.replace(
    /([a-zA-Z_][a-zA-Z0-9_]*)(\s*:)(\s*)/g,
    (_full: string, name: string, colon: string, space: string) => {
      if (_full.includes("<span")) return _full
      return `<span class="sh-arg">${name}</span>${colon}${space}`
    },
  )

  return html
}

/* ── GraphQL SDL (schema definition language) highlighting ── */

export function highlightGraphQLSchema(source: string): string {
  let html = escapeHTML(source)

  // Strings
  html = html.replace(
    /("(?:\\.|[^"\\])*")/g,
    '<span class="sh-string">$1</span>',
  )

  // Comments
  html = html.replace(/(#[^\n]*)/g, '<span class="sh-comment">$1</span>')

  // Directives
  html = html.replace(
    /(@[a-zA-Z_][a-zA-Z0-9_]*)/g,
    '<span class="sh-directive">$1</span>',
  )

  // Scalar types
  html = html.replace(
    /\b(String|Int|Float|Boolean|ID)\b/g,
    '<span class="sh-type">$1</span>',
  )

  // SDL keywords
  html = html.replace(
    /\b(type|input|interface|union|enum|scalar|schema|extend|implements|directive|repeatable|query|mutation|subscription|fragment|on|true|false|null)\b/g,
    '<span class="sh-keyword">$1</span>',
  )

  // Type names (CapitalizedWords after type/extends/implements)
  html = html.replace(
    /(\btype\s+)([A-Z][a-zA-Z0-9_]*)/g,
    '$1<span class="sh-type">$2</span>',
  )

  // General capitalized type references (field types)
  html = html.replace(
    /\b([A-Z][a-zA-Z0-9_]*)\b/g,
    (match, typeName, offset) => {
      const before = html.substring(Math.max(0, offset - 60), offset)
      const alreadyWrapped =
        before.lastIndexOf('<span class="sh-type">') >
        before.lastIndexOf("</span>")
      if (alreadyWrapped) return match
      return `<span class="sh-type">${typeName}</span>`
    },
  )

  // Field names (identifier colon pattern)
  html = html.replace(
    /(^|\n)(\s+)([a-zA-Z_][a-zA-Z0-9_]*)(\s*:\s*)/gm,
    (
      _full: string,
      nl: string,
      indent: string,
      name: string,
      colon: string,
    ) => {
      if (_full.includes("<span")) return _full
      return `${nl}${indent}<span class="sh-field">${name}</span>${colon}`
    },
  )

  // Required/non-null markers (!)
  html = html.replace(
    /(\s)(!)(\s|[,\n)])/g,
    '$1<span class="sh-operator">$2</span>$3',
  )

  // List brackets
  html = html.replace(
    /\[([A-Za-z!]+)\]/g,
    '<span class="sh-operator">[</span>$1<span class="sh-operator">]</span>',
  )

  return html
}

/* ── JSON highlighting ── */

export function highlightJSON(source: string): string {
  let html = escapeHTML(source)

  // Keys (property names before colon)
  html = html.replace(
    /("(?:\\.|[^"\\])*")(\s*:)/g,
    '<span class="sh-field">$1</span>$2',
  )

  // Numbers
  html = html.replace(
    /(:\s*)(-?\d+\.?\d*(?:[eE][+-]?\d+)?)/g,
    '$1<span class="sh-number">$2</span>',
  )

  // String values
  html = html.replace(
    /(:\s*)("(?:\\.|[^"\\])*")/g,
    '$1<span class="sh-string">$2</span>',
  )

  // Any remaining strings (e.g., in arrays)
  html = html.replace(
    /(^|[,[\s])("(?:\\.|[^"\\])*")/gm,
    '$1<span class="sh-string">$2</span>',
  )

  // Booleans and null
  html = html.replace(
    /\b(true|false|null)\b/g,
    '<span class="sh-keyword">$1</span>',
  )

  return html
}

/* ── Bare text prompt highlighting (command style) ── */

export function highlightPrompt(source: string): string {
  const html = escapeHTML(source)
  // Highlight the > prompt marker
  return html.replace(/^(>[^\n]*)/gm, '<span class="sh-comment">$1</span>')
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
