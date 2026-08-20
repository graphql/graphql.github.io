import { cache } from "react"

import { VendorMetadata } from "./types"

/**
 * Single source of truth for the GraphQL vendors directory.
 *
 * Entries are a mix of companies (e.g. Apollo, The Guild) and product/platform
 * brands (e.g. Azure API Management, Kong Gateway, WSO2 API Manager) with
 * free-form descriptions. This is intentionally decoupled from the `/code`
 * Tools & Libraries catalog, which catalogs individual products/services — a
 * company (e.g. Apollo) and one of its products (e.g. Apollo Router) are
 * different things and can carry different copy.
 *
 * Descriptions support light Markdown (links, bold, inline code) and should
 * stay within a sentence or two. The `slug` maps to a logo in `vendor-logo.tsx`.
 */
const vendors: VendorMetadata[] = [
  {
    name: "Apigee",
    slug: "apigee",
    description:
      "Apigee is Google Cloud's API management platform, letting teams proxy, secure, and observe GraphQL APIs with policies for validation, threat protection, and analytics.",
    url: "https://cloud.google.com/apigee",
    github: "apigee",
  },
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
    name: "Azure API Management",
    slug: "azure-api-management",
    description:
      "Azure API Management is Microsoft's fully managed API gateway, with support for pass-through and synthetic GraphQL APIs and policies for security, caching, rate limiting, and GraphQL request validation.",
    url: "https://azure.microsoft.com/en-us/products/api-management",
    github: "Azure",
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
      "Hygraph is a federated content platform that unifies content and data from multiple sources and exposes it through a single GraphQL API.",
    url: "https://hygraph.com/",
  },
  {
    name: "IBM StepZen",
    slug: "stepzen",
    description:
      "IBM API Connect for GraphQL, formerly StepZen, lets teams declaratively build and deploy GraphQL APIs that compose data from REST services, databases, and other GraphQL endpoints.",
    url: "https://www.ibm.com/products/api-connect/graphql",
    github: "stepzen-dev",
  },
  {
    name: "Kong Gateway",
    slug: "kong",
    description:
      "Kong Gateway is a cloud-native API gateway that fronts GraphQL APIs with plugins for proxy caching, rate limiting, authentication, and observability.",
    url: "https://konghq.com/products/kong-gateway",
    github: "Kong",
  },
  {
    name: "The Guild",
    slug: "the-guild",
    description:
      "Builds [[Hive](https://the-guild.dev/graphql/hive)](https://the-guild.dev/graphql/hive), the fully open-source (MIT) GraphQL federation platform — schema registry, gateway, router, and observability — run self-hosted and in the cloud at some of the world's largest enterprises, exposing GraphQL APIs as governed MCP tools for AI agents. Maintains many of the ecosystem's most-used libraries, including [[GraphQL Code Generator](https://the-guild.dev/graphql/codegen)](https://the-guild.dev/graphql/codegen), [[Yoga](https://the-guild.dev/graphql/yoga-server)](https://the-guild.dev/graphql/yoga-server), [[Mesh](https://the-guild.dev/graphql/mesh)](https://the-guild.dev/graphql/mesh), and [[GraphQL Tools](https://the-guild.dev/graphql/tools)](https://the-guild.dev/graphql/tools), with tens of millions of downloads every month. Also runs [[Stellate](https://stellate.co/)](https://stellate.co), the CDN for GraphQL.",
    url: "https://the-guild.dev/",
    github: "the-guild-org",
  },
  {
    name: "Tyk",
    slug: "tyk",
    description:
      "Tyk is an open-source API management platform with GraphQL support for proxying, federation, subscriptions, and its Universal Data Graph.",
    url: "https://tyk.io/",
    github: "TykTechnologies",
  },
  {
    name: "WSO2 API Manager",
    slug: "wso2-api-manager",
    description:
      "WSO2 API Manager is an open-source platform for designing, securing, and managing APIs, with support for GraphQL queries, mutations, and subscriptions alongside REST.",
    url: "https://wso2.com/api-manager/",
    github: "wso2",
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
