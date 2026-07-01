import { cache } from "react"

import { VendorMetadata } from "./types"

/**
 * Single source of truth for the GraphQL vendors directory.
 *
 * Entries are vendor (company) level with free-form descriptions. This is
 * intentionally decoupled from the `/code` Tools & Libraries catalog, which is
 * product/service level — a company (e.g. Apollo) and one of its products
 * (e.g. Apollo Router) are different things and can carry different copy.
 *
 * Descriptions support light Markdown (links, bold, inline code) and should
 * stay within a sentence or two. The `slug` maps to a logo in `vendor-logo.tsx`.
 */
const vendors: VendorMetadata[] = [
  {
    name: "Apollo",
    slug: "apollo",
    description:
      "Apollo builds an end-to-end GraphQL platform — Apollo Server, Apollo Client, the Apollo Router, and the GraphOS schema management and observability suite — for building and scaling federated GraphQL APIs, with over 1 billion open-source downloads.",
    url: "https://www.apollographql.com/",
    github: "apollographql",
  },
  {
    name: "AWS",
    slug: "aws",
    description:
      "AWS offers AWS AppSync, a fully managed service for building GraphQL APIs with real-time subscriptions, offline data synchronization, and fine-grained security controls.",
    url: "https://aws.amazon.com/appsync/",
  },
  {
    name: "ChilliCream",
    slug: "chillicream",
    description:
      "ChilliCream builds the Hot Chocolate GraphQL server for .NET, the Strawberry Shake client, and Banana Cake Pop, an IDE for exploring and managing GraphQL APIs.",
    url: "https://chillicream.com/",
    github: "ChilliCream",
  },
  {
    name: "Dgraph",
    slug: "dgraph",
    description:
      "Dgraph is a distributed, native GraphQL database with a graph backend, designed from the ground up for GraphQL and optimized for speed and scale.",
    url: "https://dgraph.io/",
    github: "dgraph-io",
  },
  {
    name: "Escape",
    slug: "escape",
    description:
      "Escape provides automated GraphQL security testing and compliance, scanning endpoints for vulnerabilities during development across any language or framework.",
    url: "https://escape.tech/",
  },
  {
    name: "Graphile",
    slug: "graphile",
    description:
      "Graphile builds PostGraphile and related open-source tooling that generate a powerful, extensible, and performant GraphQL API from a PostgreSQL database.",
    url: "https://www.graphile.org/",
    github: "graphile",
  },
  {
    name: "GraphQL.Security",
    slug: "graphql-security",
    description:
      "GraphQL.Security offers a fast, free scan that runs a battery of security tests against a GraphQL endpoint — no login required.",
    url: "https://graphql.security/",
  },
  {
    name: "Hasura",
    slug: "hasura",
    description:
      "Hasura connects to your databases and services to instantly deliver production-ready GraphQL APIs with built-in authorization and real-time capabilities.",
    url: "https://hasura.io/",
    github: "hasura",
  },
  {
    name: "Hygraph",
    slug: "hygraph",
    description:
      "Hygraph is a federated content platform that composes content from multiple sources and serves it through a single, flexible GraphQL API.",
    url: "https://hygraph.com/",
  },
  {
    name: "Stellate",
    slug: "stellate",
    description:
      "Stellate provides GraphQL edge caching, analytics, and rate limiting to improve the performance and observability of your APIs.",
    url: "https://stellate.co/",
  },
  {
    name: "The Guild",
    slug: "the-guild",
    description:
      "The Guild maintains a broad suite of open-source GraphQL tooling, including GraphQL Code Generator, GraphQL Yoga, GraphQL Mesh, and Hive for schema registry and federation.",
    url: "https://the-guild.dev/",
    github: "the-guild-org",
  },
  {
    name: "Tyk",
    slug: "tyk",
    description:
      "Tyk is an open-source API management platform with full GraphQL support, including schema stitching, federation, subscriptions, and its Universal Data Graph.",
    url: "https://tyk.io/",
    github: "TykTechnologies",
  },
  {
    name: "WunderGraph",
    slug: "wundergraph",
    description:
      "WunderGraph builds Cosmo, an open-source platform for GraphQL Federation at scale with a schema registry, composition, routing, and analytics.",
    url: "https://wundergraph.com/",
    github: "wundergraph",
  },
]

export const readVendors = cache(async () =>
  vendors
    .map(vendor => VendorMetadata.assert(vendor))
    .sort((a, b) =>
      a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
    ),
)
