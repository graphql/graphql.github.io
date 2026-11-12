import { SOCIAL_IMAGE_SIZE, type SocialImageContent } from "@/social-metadata"

import { GraphQLLogo } from "./graphql-logo"
import { colors, fonts } from "./styles"
import { getCardPresentation } from "./presentation"
import {
  ARTICLE_ART_WIDTH,
  BODY_HEIGHT,
  BORDER,
  FOOTER_HEIGHT,
  HEADER_HEIGHT,
  INNER_WIDTH,
  PADDING,
  SPLIT_COLUMN,
} from "./geometry"

export async function SiteCard(content: SocialImageContent) {
  const card = await getCardPresentation(content)
  const { text } = card

  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        ...SOCIAL_IMAGE_SIZE,
        border: `${BORDER}px solid ${colors.neu600}`,
        backgroundColor: colors[card.surface],
        fontFamily: fonts.sans,
        color: colors.neu900,
        overflow: "hidden",
      }}
    >
      <header
        style={{
          display: "flex",
          height: HEADER_HEIGHT,
          flexShrink: 0,
          borderBottom: `${BORDER}px solid ${colors.neu600}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            width: card.divider,
            padding: `0 ${PADDING}px`,
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
            padding: `0 ${PADDING}px`,
            fontFamily: fonts.mono,
            fontSize: 24,
            color: colors.neu700,
          }}
        >
          {card.section.length > 30
            ? `${card.section.slice(0, 29)}…`
            : card.section}
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
        {card.layout === "full-width" && card.background && (
          <img
            src={card.background.src}
            alt=""
            width={card.background.width}
            height={card.background.height}
            style={{
              position: "absolute",
              right: 0,
              top: card.background.top,
              opacity: card.background.opacity,
            }}
          />
        )}
        {card.layout === "article-cover" && (
          <img
            src={card.artwork}
            alt=""
            width={ARTICLE_ART_WIDTH}
            height={BODY_HEIGHT}
            style={{ flexShrink: 0 }}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: text.align,
            width: text.width,
            padding: PADDING,
            gap: text.gap,
            position: "relative",
            flexShrink: 0,
          }}
        >
          <h1
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 0,
              fontSize: text.heading.size,
              lineHeight: 1.08,
              fontWeight: 400,
              letterSpacing: "-0.025em",
            }}
          >
            {text.heading.kind === "lines"
              ? text.heading.lines.map(line => (
                  <span
                    key={line}
                    style={{
                      display: "flex",
                      width: "100%",
                      height: text.heading.size * 1.08,
                      flexShrink: 0,
                    }}
                  >
                    {line}
                  </span>
                ))
              : text.heading.text}
          </h1>
          {text.deck && (
            <p
              style={{
                margin: 0,
                fontSize: 42,
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
              }}
            >
              {text.deck}
            </p>
          )}
          {text.supporting.kind === "publication" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                fontSize: 24,
                color: colors.neu700,
              }}
            >
              {text.supporting.lines.map((line, index) => (
                <span key={index}>{line}</span>
              ))}
            </div>
          ) : text.supporting.kind === "summary" ? (
            <p
              style={{
                margin: 0,
                maxWidth: text.supporting.maxWidth,
                fontSize: 26,
                lineHeight: 1.25,
                color: colors.neu700,
              }}
            >
              {text.supporting.text}
            </p>
          ) : null}
        </div>
        {card.layout === "split" &&
          (card.panel.kind === "artwork" ? (
            <img
              src={card.panel.src}
              alt=""
              width={INNER_WIDTH - SPLIT_COLUMN}
              height={BODY_HEIGHT}
              style={{ position: "absolute", right: 0, top: 0 }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                backgroundColor:
                  card.panel.kind === "code"
                    ? card.panel.background
                    : colors.neu0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 80,
                  flexShrink: 0,
                  padding: `0 ${PADDING}px`,
                  borderBottom: `1px solid ${colors.neu200}`,
                  fontSize: 26,
                  color: colors.neu700,
                }}
              >
                {card.panel.label}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: `32px ${PADDING}px`,
                  gap: card.panel.kind === "code" ? 0 : 24,
                }}
              >
                {card.panel.kind === "code"
                  ? card.panel.tokens.map((line, index) => (
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
                  : card.panel.headings.map(heading => (
                      <div
                        key={heading}
                        style={{
                          display: "flex",
                          fontSize: 28,
                          lineHeight: 1.2,
                        }}
                      >
                        {heading}
                      </div>
                    ))}
              </div>
            </div>
          ))}
      </main>
      <div
        style={{
          position: "absolute",
          left: card.divider,
          top: 0,
          width: BORDER,
          height: card.ruleHeight,
          backgroundColor: colors.neu600,
        }}
      />
      {card.layout === "full-width" && card.caption && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: `24px ${PADDING}px`,
            backgroundColor: colors.secLighter,
            fontSize: 28,
            lineHeight: 1.2,
          }}
        >
          {card.caption}
        </div>
      )}
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: FOOTER_HEIGHT,
          flexShrink: 0,
          padding: `0 ${PADDING}px`,
          borderTop: `${BORDER}px solid ${colors.neu600}`,
          fontFamily: fonts.mono,
          fontSize: 20,
          color: colors.neu700,
        }}
      >
        <span>
          {`graphql.org${card.path}`.length > 76
            ? `${`graphql.org${card.path}`.slice(0, 73)}…`
            : `graphql.org${card.path}`}
        </span>
        <span style={{ marginLeft: 24, flexShrink: 0 }}>GRAPHQL.ORG</span>
      </footer>
    </article>
  )
}
