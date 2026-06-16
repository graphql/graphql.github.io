import meta from "../../pages/learn/_meta"

export type LearnPagePath = Exclude<keyof typeof meta, `-- ${string}` | "index">

export interface LearnPageItem {
  title: string
  description: string
  icon: string
  section: "getting-started" | "best-practices"
  href: string
}

const _items: Record<
  LearnPagePath,
  Omit<LearnPageItem, "title" | "href"> | null
> = {
  introduction: {
    description:
      "Get a high-level overview of GraphQL and how it enables flexible, versionless APIs powered by a strong type system.",
    icon: new URL("./assets/computer.svg", import.meta.url).href,
    section: "getting-started",
  },
  schema: {
    description:
      "Learn how GraphQL’s schema language defines the shape of your data using types.",
    icon: new URL("./assets/hierarchy.svg", import.meta.url).href,
    section: "getting-started",
  },
  queries: {
    description:
      "Understand how to structure GraphQL queries to request exactly the data you need — including fields, variables and fragments.",
    icon: new URL("./assets/search.svg", import.meta.url).href,
    section: "getting-started",
  },
  mutations: {
    description:
      "Explore how to modify data with mutations, including how to update and remove records through your schema.",
    icon: new URL("./assets/dna.svg", import.meta.url).href,
    section: "getting-started",
  },
  subscriptions: {
    description:
      "Discover how GraphQL supports real-time data with subscriptions and how to use them effectively at scale.",
    icon: new URL("./assets/sync-square.svg", import.meta.url).href,
    section: "getting-started",
  },
  validation: {
    description:
      "See how GraphQL ensures query correctness through validation rules and how common errors are detected early.",
    icon: new URL("./assets/checkbox.svg", import.meta.url).href,
    section: "getting-started",
  },
  execution: {
    description:
      "Learn how resolvers power GraphQL execution and how the server processes and returns data for each query.",
    icon: new URL("./assets/cog-double.svg", import.meta.url).href,
    section: "getting-started",
  },
  response: {
    description:
      "Explore how GraphQL structures its responses, including data, errors and extensions for custom metadata.",
    icon: new URL("./assets/nav-left-circle.svg", import.meta.url).href,
    section: "getting-started",
  },
  introspection: {
    description:
      "Use introspection to explore the schema itself — a powerful way to inspect types and fields dynamically.",
    icon: new URL("./assets/zoom-page.svg", import.meta.url).href,
    section: "getting-started",
  },
  // ---
  "best-practices": {
    description:
      "Understand the context behind the GraphQL Best Practices lessons.",
    icon: new URL("./assets/keyboard.svg", import.meta.url).href,
    section: "best-practices",
  },
  "thinking-in-graphs": {
    description:
      "Learn how to shift your mindset from RESTful endpoints to graph-based thinking, aligning your schema with business logic and legacy systems.",
    icon: new URL("./assets/share.svg", import.meta.url).href,
    section: "best-practices",
  },
  "serving-over-http": {
    description:
      "Explore how GraphQL operates over HTTP, including methods, headers, status codes and API endpoint design.",
    icon: new URL("./assets/globe.svg", import.meta.url).href,
    section: "best-practices",
  },
  "file-uploads": {
    description:
      "Handle file uploads in GraphQL by wrapping them as mutations. Learn the recommended approach for integrating file handling into your API.",
    icon: new URL("./assets/note.svg", import.meta.url).href,
    section: "best-practices",
  },
  authorization: {
    description:
      "Understand how to secure your GraphQL APIs with type- and field-level authorization patterns.",
    icon: new URL("./assets/key.svg", import.meta.url).href,
    section: "best-practices",
  },
  pagination: {
    description:
      "Discover different pagination strategies in GraphQL, from simple slicing to fully connected edges and nodes.",
    icon: new URL("./assets/layer.svg", import.meta.url).href,
    section: "best-practices",
  },
  "schema-design": {
    description:
      "Learn how to design clear, adaptable schemas — including versioning and thoughtful use of nullability.",
    icon: new URL("./assets/solve.svg", import.meta.url).href,
    section: "best-practices",
  },
  "global-object-identification": {
    description:
      "Use globally unique IDs and the Node interface to enable caching, refetching, and efficient schema traversal.",
    icon: new URL("./assets/product-check.svg", import.meta.url).href,
    section: "best-practices",
  },
  caching: {
    description:
      "Explore caching techniques and ID strategies that make client-side performance and object reuse more effective.",
    icon: new URL("./assets/books.svg", import.meta.url).href,
    section: "best-practices",
  },
  performance: {
    description:
      "Get practical tips for improving GraphQL performance — from preventing N+1 problems to monitoring and compression.",
    icon: new URL("./assets/startup.svg", import.meta.url).href,
    section: "best-practices",
  },
  security: {
    description:
      "Protect your GraphQL API with best practices for query limits, input validation, introspection control and more.",
    icon: new URL("./assets/safe.svg", import.meta.url).href,
    section: "best-practices",
  },
  federation: {
    description:
      "Learn how GraphQL federation enables modular, scalable APIs by composing services into a unified schema.",
    icon: new URL("./assets/circuit.svg", import.meta.url).href,
    section: "best-practices",
  },
  "debug-errors": {
    description:
      "Learn about common 'graphql-http' errors and how to debug them.",
    icon: new URL("./assets/construction.svg", import.meta.url).href,
    section: "best-practices",
  },
}

const learnPages = _items as Record<LearnPagePath, LearnPageItem | null>

const pagesBySection: Record<LearnPageItem["section"], LearnPageItem[]> = {
  "getting-started": [],
  "best-practices": [],
}

for (const path in learnPages) {
  const page = learnPages[path as LearnPagePath]
  if (page === null) continue
  const metaEntry = meta[path as keyof typeof meta]

  if (typeof metaEntry === "string") {
    page.title =
      metaEntry ||
      path.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
  } else if (typeof metaEntry === "object" && "title" in metaEntry) {
    page.title = metaEntry.title
  } else {
    page.title = path.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
  }

  page.href = `/learn/${path}`

  pagesBySection[page.section].push(page)
}

export { learnPages, pagesBySection }
