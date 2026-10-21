import { readFile } from "node:fs/promises"
import { join } from "node:path"
import sharp from "sharp"

import type { SocialImageContent } from "@/social-metadata"
import { GraphQLLogo } from "@/app/conf/2026/components/graphql-conf-logo-link"
import {
  colors,
  fonts,
} from "@/app/conf/2026/components/og-images/speaker-opengraph-image"
import { getBlogPattern } from "@/components/blog-page/blog-card-pattern"

import { getDocumentationContent } from "./documentation"
import { getEventsMapImage } from "./events-map"

export const CARD_SPLIT = 648
export const CARD_PADDING = 40
export const size = { width: 1200, height: 630 }

const stripes = readFile(
  join(
    process.cwd(),
    "src/app/conf/2026/components/og-images/graphql-logo-stripes.png",
  ),
).then(data => `data:image/png;base64,${data.toString("base64")}`)

export function getCardKind(path: string) {
  if (/^\/(learn|faq)(\/|$)/.test(path)) return "documentation"
  if (/^\/blog\/.+/.test(path)) return "article"
  if (path === "/community/events/") return "events"
  if (["/brand/", "/users/", "/codeofconduct/"].includes(path)) return "quiet"
  return "title"
}

export async function SiteCard(content: SocialImageContent) {
  const kind = getCardKind(content.path)
  const documentation =
    kind === "documentation"
      ? await getDocumentationContent(content.path)
      : null
  const headings: string[] = []
  let headingHeight = 0
  for (const heading of documentation?.headings || []) {
    headingHeight += Math.ceil(heading.length / 29) * 34 + 24
    if (headingHeight > 326) break
    headings.push(heading)
  }
  const title = (
    content.path === "/"
      ? "The API language for humans and agents"
      : content.title
  ).replace(/[`*_]/g, "")
  const longArticle = kind === "article" && title.length > 100
  const colon = title.indexOf(":")
  const deck =
    longArticle && colon > 0 && colon <= 32
      ? title.slice(colon + 1).trim()
      : undefined
  const headline = deck ? title.slice(0, colon + 1) : title
  const divider = longArticle ? 336 : CARD_SPLIT
  const split = kind === "documentation" || (kind === "article" && !longArticle)
  const section =
    content.path === "/"
      ? "The API language"
      : kind === "documentation"
        ? `${content.path.startsWith("/faq/") ? "FAQ" : "Learn"} / ${title}`
        : kind === "article" ||
            content.path === "/blog/" ||
            content.path.startsWith("/tags/")
          ? "Blog"
          : content.path.startsWith("/resources/")
            ? "Resource Hub"
            : content.path.startsWith("/community/foundation/")
              ? "GraphQL Foundation"
              : content.path.startsWith("/community/")
                ? "Community"
                : content.path === "/ai/"
                  ? "GraphQL / AI"
                  : content.path === "/day/"
                    ? "GraphQL Day"
                    : content.path.startsWith("/conf/")
                      ? "Conference Kit"
                      : "GraphQL"
  const description = documentation?.subtitle || content.description
  const summary =
    description && description.length > 240
      ? `${description.slice(0, 237).replace(/\s+\S*$/, "")}…`
      : description
  const fontSize = longArticle
    ? deck
      ? 72
      : title.length > 160
        ? 42
        : 52
    : split
      ? title.length > 75
        ? 44
        : title.length > 45
          ? 56
          : title.length > 24
            ? 64
            : 76
      : title.length > 130
        ? 56
        : title.length > 80
          ? 64
          : title.length > 45
            ? 76
            : 88
  let pattern: string | undefined
  if (kind === "article") {
    const patternWidth = longArticle ? 336 : 548
    const cells = getBlogPattern(content.title, patternWidth, 478)
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${patternWidth}" height="478">${cells.map(cell => `<rect x="${cell.x}" y="${cell.y}" width="${cell.width}" height="${cell.height}" fill="${cell.color}"/>`).join("")}</svg>`
    const png = await sharp(Buffer.from(svg)).png().toBuffer()
    pattern = `data:image/png;base64,${png.toString("base64")}`
  }
  const background =
    kind === "events"
      ? await getEventsMapImage()
      : kind === "title"
        ? await stripes
        : pattern
  const date = content.date ? new Date(content.date) : null
  const published =
    date && !Number.isNaN(date.getTime())
      ? new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        }).format(date)
      : undefined

  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: size.width,
        height: size.height,
        border: `2px solid ${colors.neu600}`,
        backgroundColor: kind === "quiet" ? colors.neu0 : colors.neu100,
        fontFamily: fonts.sans,
        color: colors.neu900,
        overflow: "hidden",
      }}
    >
      <header
        style={{
          display: "flex",
          height: 96,
          flexShrink: 0,
          borderBottom: `2px solid ${colors.neu600}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            width: divider,
            padding: `0 ${CARD_PADDING}px`,
            flexShrink: 0,
          }}
        >
          <GraphQLLogo
            width={48}
            height={48}
            style={{ color: colors.priBase }}
          />
          <span style={{ fontSize: 34 }}>GraphQL</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: `0 ${CARD_PADDING}px`,
            fontFamily: fonts.mono,
            fontSize: 24,
            color: colors.neu700,
          }}
        >
          {section.length > 30 ? `${section.slice(0, 29)}…` : section}
        </div>
      </header>
      <main
        style={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {background && kind !== "article" && (
          <img
            src={background}
            alt=""
            width={kind === "events" ? 1980 : 673}
            height={kind === "events" ? 1200 : 476}
            style={{
              position: "absolute",
              right: 0,
              top: kind === "events" ? -335 : 0,
              opacity: kind === "events" ? 0.85 : 0.65,
            }}
          />
        )}
        {longArticle && pattern && (
          <img
            src={pattern}
            alt=""
            width={336}
            height={478}
            style={{ flexShrink: 0 }}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent:
              kind === "quiet" || longArticle ? "center" : "flex-end",
            width: longArticle ? 860 : split ? CARD_SPLIT : "100%",
            padding: CARD_PADDING,
            gap: longArticle ? 20 : 24,
            position: "relative",
            flexShrink: 0,
          }}
        >
          <h1
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 0,
              fontSize,
              lineHeight: 1.08,
              fontWeight: 400,
              letterSpacing: "-0.025em",
            }}
          >
            {content.path === "/"
              ? ["The API language", "for humans and agents"].map(line => (
                  <span
                    key={line}
                    style={{
                      display: "flex",
                      width: "100%",
                      height: fontSize * 1.08,
                      flexShrink: 0,
                    }}
                  >
                    {line}
                  </span>
                ))
              : headline}
          </h1>
          {deck && (
            <p
              style={{
                margin: 0,
                fontSize: 42,
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
            >
              {deck}
            </p>
          )}
          {kind === "article" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                fontSize: 24,
                color: colors.neu700,
              }}
            >
              {content.byline && <span>{content.byline}</span>}
              {published && <span>{published}</span>}
            </div>
          ) : summary && title.length <= 100 && kind !== "quiet" ? (
            <p
              style={{
                margin: 0,
                maxWidth: split ? 568 : 1000,
                fontSize: 26,
                lineHeight: 1.25,
                color: colors.neu700,
              }}
            >
              {summary}
            </p>
          ) : null}
        </div>
        {kind === "article" && !longArticle && (
          <img
            src={pattern!}
            alt=""
            width={548}
            height={478}
            style={{ position: "absolute", right: 0, top: 0 }}
          />
        )}
        {kind === "documentation" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              backgroundColor: documentation?.highlighted?.bg || colors.neu0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: 80,
                flexShrink: 0,
                padding: `0 ${CARD_PADDING}px`,
                borderBottom: `1px solid ${colors.neu200}`,
                fontSize: 26,
                color: colors.neu700,
              }}
            >
              {documentation?.example
                ? documentation.example.language === "graphql"
                  ? /^\s*(type|input|enum|interface|scalar|union|schema)\b/.test(
                      documentation.example.code,
                    )
                    ? "Schema"
                    : "Operation"
                  : "Example"
                : "On this page"}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: `32px ${CARD_PADDING}px`,
                gap: documentation?.highlighted ? 0 : 24,
              }}
            >
              {documentation?.highlighted
                ? documentation.highlighted.tokens.map((line, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        minHeight: 36,
                        fontFamily: fonts.mono,
                        fontSize: 26,
                        lineHeight: 1.38,
                      }}
                    >
                      {line.map((token, tokenIndex) => (
                        <span
                          key={tokenIndex}
                          style={{ color: token.color, whiteSpace: "pre" }}
                        >
                          {token.content.replace(/ /g, "\u00a0")}
                        </span>
                      ))}
                    </div>
                  ))
                : headings.map(heading => (
                    <div
                      key={heading}
                      style={{ display: "flex", fontSize: 28, lineHeight: 1.2 }}
                    >
                      {heading}
                    </div>
                  ))}
            </div>
          </div>
        )}
      </main>
      <div
        style={{
          position: "absolute",
          left: divider,
          top: 0,
          width: 2,
          height: kind === "documentation" ? 574 : 96,
          backgroundColor: colors.neu600,
        }}
      />
      {kind === "quiet" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: `24px ${CARD_PADDING}px`,
            backgroundColor: colors.secLighter,
            fontSize: 28,
            lineHeight: 1.2,
          }}
        >
          {content.path === "/codeofconduct/"
            ? "Our Pledge / Our Standards / Our Responsibilities"
            : content.path === "/brand/"
              ? "Logo files / Trademark / Usage guidelines"
              : "The GraphQL community"}
        </div>
      )}
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 52,
          flexShrink: 0,
          padding: `0 ${CARD_PADDING}px`,
          borderTop: `2px solid ${colors.neu600}`,
          fontFamily: fonts.mono,
          fontSize: 20,
          color: colors.neu700,
        }}
      >
        <span>
          {`graphql.org${content.path}`.length > 76
            ? `${`graphql.org${content.path}`.slice(0, 73)}…`
            : `graphql.org${content.path}`}
        </span>
        <span style={{ marginLeft: 24, flexShrink: 0 }}>GRAPHQL.ORG</span>
      </footer>
    </article>
  )
}
