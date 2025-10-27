import NextLink from "next/link"
import { memo, type ReactNode } from "react"

type Token =
  | { type: "text"; value: string }
  | { type: "link"; label: string; href: string }
  | { type: "code"; value: string }
  | { type: "bold"; value: string }
  | { type: "italic"; value: string }

const TOKEN_REGEX =
  /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|_([^_]+)_|(https?:\/\/[^\s)]+|www\.[^\s)]+)/g

const TRAILING_PUNCTUATION = /[),.?!]+$/

const formatUrlLabel = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/^www\./, "")

const splitMarkdown = (value: string): Token[] => {
  const tokens: Token[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  TOKEN_REGEX.lastIndex = 0

  while ((match = TOKEN_REGEX.exec(value)) !== null) {
    const matchIndex = match.index
    if (matchIndex > lastIndex) {
      tokens.push({ type: "text", value: value.slice(lastIndex, matchIndex) })
    }

    if (match[1] && match[2]) {
      const href = match[2].trim()
      tokens.push({ type: "link", label: match[1], href })
    } else if (match[3]) {
      tokens.push({ type: "code", value: match[3] })
    } else if (match[4]) {
      tokens.push({ type: "bold", value: match[4] })
    } else if (match[5]) {
      tokens.push({ type: "italic", value: match[5] })
    } else if (match[6]) {
      const rawUrl = match[6]
      const trailing = TRAILING_PUNCTUATION.exec(rawUrl)
      const trailingCharacters = trailing?.[0] ?? ""
      const href = trailingCharacters
        ? rawUrl.slice(0, rawUrl.length - trailingCharacters.length)
        : rawUrl
      tokens.push({
        type: "link",
        label: formatUrlLabel(href),
        href: href.startsWith("http") ? href : `https://${href}`,
      })
      if (trailingCharacters) {
        tokens.push({ type: "text", value: trailingCharacters })
      }
    }

    lastIndex = TOKEN_REGEX.lastIndex
  }

  if (lastIndex < value.length) {
    tokens.push({ type: "text", value: value.slice(lastIndex) })
  }

  return tokens
}

const renderTokens = (tokens: Token[], keyPrefix = ""): ReactNode[] =>
  tokens.map((token, index) => {
    const key = `${keyPrefix}${index}`
    if (token.type === "text") {
      return <span key={key}>{token.value}</span>
    }

    if (token.type === "bold") {
      return (
        <strong key={key}>
          {renderTokens(splitMarkdown(token.value), `${key}-`)}
        </strong>
      )
    }

    if (token.type === "italic") {
      return (
        <em key={key}>{renderTokens(splitMarkdown(token.value), `${key}-`)}</em>
      )
    }

    if (token.type === "code") {
      return (
        <code key={key} className="bg-neu-100 px-1 py-0.5">
          {token.value}
        </code>
      )
    }

    if (token.type === "link") {
      const { href, label } = token
      const isExternal = /^https?:\/\//.test(href)
      if (!isExternal) {
        return (
          <NextLink key={key} href={href} className="typography-link">
            {label}
          </NextLink>
        )
      }

      return (
        <a
          key={key}
          href={href}
          className="typography-link"
          target="_blank"
          rel="noreferrer"
        >
          {label}
        </a>
      )
    }

    return null
  })

type MicroMarkdownProps = {
  text: string
  className?: string
}

/**
 * Transforms a subset of Markdown for Tools and Libraries frontmatter descriptions.
 */
export const MicroMarkdown = memo(({ text, className }: MicroMarkdownProps) => {
  const tokens = splitMarkdown(text)
  return <p className={className}>{renderTokens(tokens)}</p>
})

MicroMarkdown.displayName = "μMd"
