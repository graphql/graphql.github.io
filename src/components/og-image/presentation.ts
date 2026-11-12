import sharp from "sharp"
import { toString } from "mdast-util-to-string"
import remarkParse from "remark-parse"
import { unified } from "unified"

import { HOMEPAGE_LINES, type SocialImageContent } from "@/social-metadata"
import { getBlogPattern } from "@/components/blog-page/blog-card-pattern"

import { logoStripes } from "./artwork"
import { getDocumentationContent } from "./documentation"
import { getEventsMapImage } from "./events-map"
import {
  ARTICLE_ART_WIDTH,
  BODY_HEIGHT,
  HEADER_HEIGHT,
  INNER_WIDTH,
  SPLIT_COLUMN,
} from "./geometry"

type PagePolicy =
  | { template: "title"; section: string; lines?: readonly string[] }
  | { template: "quiet"; section: string; caption: string }
  | { template: "documentation" | "article" | "events"; section: string }

const pages: Record<string, PagePolicy> = {
  "/": {
    template: "title",
    section: "The API language",
    lines: HOMEPAGE_LINES,
  },
  "/blog/": { template: "title", section: "Blog" },
  "/community/events/": { template: "events", section: "Community" },
  "/brand/": {
    template: "quiet",
    section: "GraphQL",
    caption: "Logo files / Trademark / Usage guidelines",
  },
  "/users/": {
    template: "quiet",
    section: "GraphQL",
    caption: "The GraphQL community",
  },
  "/codeofconduct/": {
    template: "quiet",
    section: "GraphQL",
    caption: "Our Pledge / Our Standards / Our Responsibilities",
  },
  "/ai/": { template: "title", section: "GraphQL / AI" },
  "/day/": { template: "title", section: "GraphQL Day" },
}

const sections: [string, PagePolicy][] = [
  ["/learn/", { template: "documentation", section: "Learn" }],
  ["/faq/", { template: "documentation", section: "FAQ" }],
  ["/blog/", { template: "article", section: "Blog" }],
  ["/tags/", { template: "title", section: "Blog" }],
  ["/resources/", { template: "title", section: "Resource Hub" }],
  [
    "/community/foundation/",
    { template: "title", section: "GraphQL Foundation" },
  ],
  ["/community/", { template: "title", section: "Community" }],
  ["/conf/", { template: "title", section: "Conference Kit" }],
]

const titleParser = unified().use(remarkParse)

interface TextHeading {
  kind: "text"
  text: string
  size: number
}

interface LineHeading {
  kind: "lines"
  lines: readonly string[]
  size: number
}

function titleSize(length: number, narrow: boolean) {
  if (narrow) {
    if (length > 75) return 44
    if (length > 45) return 56
    if (length > 24) return 64
    return 76
  }
  if (length > 130) return 56
  if (length > 80) return 64
  if (length > 45) return 76
  return 88
}

async function articleArtwork(seed: string, width: number) {
  const cells = getBlogPattern(seed, width, BODY_HEIGHT)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${BODY_HEIGHT}">${cells.map(cell => `<rect x="${cell.x}" y="${cell.y}" width="${cell.width}" height="${cell.height}" fill="${cell.color}"/>`).join("")}</svg>`
  const png = await sharp(Buffer.from(svg)).png().toBuffer()
  return `data:image/png;base64,${png.toString("base64")}`
}

export async function getCardPresentation(content: SocialImageContent) {
  const policy: PagePolicy = pages[content.path] ||
    sections.find(([prefix]) => content.path.startsWith(prefix))?.[1] || {
      template: "title",
      section: "GraphQL",
    }
  const documentation =
    policy.template === "documentation"
      ? await getDocumentationContent(content.path)
      : null
  const title = toString(titleParser.parse(content.title))
  const heading: TextHeading | LineHeading =
    policy.template === "title" && policy.lines
      ? { kind: "lines", lines: policy.lines, size: 88 }
      : { kind: "text", text: title, size: titleSize(title.length, false) }
  const description = documentation?.subtitle || content.description
  const summary =
    description && description.length > 240
      ? `${description.slice(0, 237).replace(/\s+\S*$/, "")}…`
      : description
  const base = {
    path: content.path,
    section: policy.section,
    divider: SPLIT_COLUMN,
    ruleHeight: HEADER_HEIGHT,
    surface: "neu100" as const,
  }
  const text = {
    heading,
    width: INNER_WIDTH,
    align: "flex-end" as const,
    gap: 24,
    deck: null,
    supporting:
      summary && title.length <= 100
        ? { kind: "summary" as const, text: summary, maxWidth: 1000 }
        : { kind: "none" as const },
  }

  if (policy.template === "documentation" && documentation) {
    const preview = documentation.preview
    let height = 0
    const panel =
      preview.kind === "headings"
        ? {
            ...preview,
            headings: preview.headings.filter(heading => {
              height += Math.ceil(heading.length / 29) * 34 + 24
              return height <= 326
            }),
          }
        : preview
    return {
      ...base,
      section: `${policy.section} / ${title}`,
      ruleHeight: HEADER_HEIGHT + BODY_HEIGHT,
      layout: "split" as const,
      text: {
        ...text,
        heading: {
          kind: "text" as const,
          text: title,
          size: titleSize(title.length, true),
        },
        width: SPLIT_COLUMN,
        supporting:
          summary && title.length <= 100
            ? { kind: "summary" as const, text: summary, maxWidth: 568 }
            : { kind: "none" as const },
      },
      panel,
    }
  }

  if (policy.template === "article") {
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
    const supporting = {
      kind: "publication" as const,
      lines: [content.byline, published].flatMap(line => (line ? [line] : [])),
    }
    if (title.length > 100) {
      const colon = title.indexOf(":")
      const deck =
        colon > 0 && colon <= 32 ? title.slice(colon + 1).trim() : null
      return {
        ...base,
        layout: "article-cover" as const,
        divider: ARTICLE_ART_WIDTH,
        artwork: await articleArtwork(content.title, ARTICLE_ART_WIDTH),
        text: {
          ...text,
          heading: {
            kind: "text" as const,
            text: deck ? title.slice(0, colon + 1) : title,
            size: deck ? 72 : title.length > 160 ? 42 : 52,
          },
          deck,
          width: INNER_WIDTH - ARTICLE_ART_WIDTH,
          align: "center" as const,
          gap: 20,
          supporting,
        },
      }
    }
    return {
      ...base,
      layout: "split" as const,
      text: {
        ...text,
        heading: {
          kind: "text" as const,
          text: title,
          size: titleSize(title.length, true),
        },
        width: SPLIT_COLUMN,
        supporting,
      },
      panel: {
        kind: "artwork" as const,
        src: await articleArtwork(content.title, INNER_WIDTH - SPLIT_COLUMN),
      },
    }
  }

  if (policy.template === "quiet") {
    return {
      ...base,
      layout: "full-width" as const,
      surface: "neu0" as const,
      text: {
        ...text,
        align: "center" as const,
        supporting: { kind: "none" as const },
      },
      background: null,
      caption: policy.caption,
    }
  }

  const background =
    policy.template === "events"
      ? {
          src: await getEventsMapImage(),
          width: 1980,
          height: 1200,
          top: -335,
          opacity: 0.85,
        }
      : { src: logoStripes, width: 673, height: 476, top: 0, opacity: 0.65 }
  return {
    ...base,
    layout: "full-width" as const,
    text,
    background,
    caption: null,
  }
}
