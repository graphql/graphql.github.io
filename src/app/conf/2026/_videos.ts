/**
 * This was populated with data captured from the public GraphQLConf 2026
 * playlist using yt-dlp (https://github.com/yt-dlp/yt-dlp):
 *
 *   yt-dlp --flat-playlist -J \
 *     "https://www.youtube.com/playlist?list=PLu_TLSnl46RqumoahQfG7Yz2p8kAx4j-F"
 *
 * and then mapping each playlist entry to { id, title }:
 *
 * ```js
 * for (const item of data.entries) {
 *   videos.push({ id: item.id, title: item.title })
 * }
 * ```
 *
 * Unlike the 2025 playlist, the 2026 videos are public, so no YouTube API
 * authentication (or the generate-videos-mappings.py script) was required.
 * One playlist entry was skipped because it had been removed by the uploader.
 *
 * The titles are matched to schedule sessions by string similarity in
 * schedule/[id]/session-video.tsx, so exact ordering here does not matter.
 */
export const videos: {
  id: string
  title: string
}[] = [
  {
    id: "Cu3NRYIlaM0",
    title:
      "Built to Evolve: 13 Years of GraphQL - Elena Bukareva & Braxton Bragg",
  },
  {
    id: "2Ud1gxUpgrY",
    title: "Semantic Introspection - Pascal Senn, ChilliCream",
  },
  {
    id: "nFs1P3UKvbs",
    title:
      "Big Graphs, Tiny Contexts: Dev Tools for Agents - Stephen Spalding & Kavitha Srinivasan, Netflix",
  },
  {
    id: "RQEvjyDxpXk",
    title:
      "GraphQL Embeddings: AI-Powered Dynamic Operations From Schema To IDE - Michael Watson, Self",
  },
  {
    id: "50zRL19SSEg",
    title:
      "Turning San Francisco Into a GraphQL Server - Jean Lucas Lima, ConfrariaTech",
  },
  {
    id: "A7yu0fl20AE",
    title: "DoS Wars: Revenge of the Fragments - Sachin Shinde, Apollo GraphQL",
  },
  {
    id: "pss9DV1m_EY",
    title: "React Server Components Vs. GraphQL - Jordan Eldredge, Meta",
  },
  {
    id: "NIjfB2ck-xY",
    title:
      "Shopify's Breadth-First Bet: Rethinking GraphQL Execution - Greg MacWilliam, Shopify",
  },
  {
    id: "KXRSMs-XfPo",
    title:
      "An Alternative To JSON Responses: Argo in WhatsApp - Kevin Gorham, Meta",
  },
  {
    id: "jyerGZGJ8ro",
    title:
      "Teach Yourself GraphQL in 2026: An Anti-blueprint - Jeff Auriemma, Apollo",
  },
  {
    id: "KhPKebaglQA",
    title:
      "Lightning Talk: Resolvers Everywhere: Rethinking Client and Server Boundaries in GraphQL - J. Cheng",
  },
  {
    id: "WAqbItdSisU",
    title:
      "Lightning Talk: Breaking up With Inputs (Without Breaking Your Users) - Laurin Quast, The Guild",
  },
  {
    id: "-szDW7bZJ-Q",
    title:
      "The Invisible Fortress: Embedding Zero-Trust Governance in the Supergraph - G. Singh & S. Shanawaz",
  },
  {
    id: "gh6UZcc4t84",
    title:
      "Caching Deep Dive: The Ultimate Way To Speed up Your GraphQL API - Uri Goldshtein, The Guild",
  },
  {
    id: "fD4TxD4bBHg",
    title:
      "Scaling GraphQL on AWS: Production Architecture for High-Volume Data Systems - Aishwarya Tirumala",
  },
  {
    id: "5ms90QLus6k",
    title:
      "Understanding Your Graph, One Hash at a Time - Jens Neuse, WunderGraph",
  },
  {
    id: "_PtZN8RVATo",
    title:
      "Safely Merging Subgraphs in a Distributed World - Clarice Abreu & Rodrigo Jesus, Brex",
  },
  {
    id: "Ua7cbkNJZX8",
    title:
      "Lightning Talk: The 40,000-field Query: Optimizations for Gigantic High-QPS Operations - Gary Zeng",
  },
  {
    id: "lVzDqd_pT0E",
    title: "GraphQL: The Internal Agentic API - Christopher Chedeau, Meta",
  },
  {
    id: "FcXu6yj8hOE",
    title: "The State of GraphQL Agent Skills - Dale Seo, Apollo GraphQL",
  },
  {
    id: "EGw7_DkGDO0",
    title:
      "The Internal Lens: GraphQL Gateways From a Different Axis - Angel Svirkov, trivago",
  },
  {
    id: "pnu6qmohHMs",
    title:
      "Lightning Talk: Schema Composition Without Federation - Matt Mahoney, Meta",
  },
  {
    id: "KimiIel8Onw",
    title:
      "Lightning Talk: Making GraphQL Fun for the Backend Too - Stephen Haberman, Homebound",
  },
  {
    id: "LJKrWxL2h04",
    title:
      "Bringing GraphQL Natively To Relational Databases With AI - Shashank Gugnani, Oracle",
  },
  {
    id: "9dEJiAfJeGA",
    title:
      "Was It Worth It? Lessons from Implementing Two GraphQL Routers. In JavaScript & Rust - A. Tanrıkulu",
  },
  {
    id: "uKpDvWQBm1U",
    title: "Simplifying MCP Tool Sprawl With GraphQL - Roy Derks, IBM",
  },
  {
    id: "3gIluw2EeFg",
    title: "Inverse Conway Maneuver, with GraphQL - Sam Deng, Zillow Group",
  },
  {
    id: "8zOfPMH51ho",
    title:
      "Beyond HTTP 200: Observability With GraphQL - Kamil Kisiela, The Guild",
  },
  {
    id: "BymsPj6bIps",
    title: "Keynote: Opening Remarks - Janette Cheng, Software Engineer, Meta",
  },
  {
    id: "FPF4eelsR-w",
    title:
      "Sponsored Keynote: Federation Patterns We See in the Wild - Uri Goldshtein, CEO, The Guild",
  },
  {
    id: "l650d-0UKYc",
    title:
      "Keynote: GraphQL Foundation Update - Lee Byron, Co-Creator of GraphQL & Director, GraphQL Foundation",
  },
  {
    id: "fG7NcUxWzt8",
    title:
      "Keynote: GraphQL in the AI Era - Matt DeBergalis, CEO and Co-Founder, Apollo GraphQL",
  },
  {
    id: "A3lAHnUyO5E",
    title:
      "Keynote: Creating a Golden Path for GraphQL - Benjie Gillam & Kewei Qu",
  },
  {
    id: "WUz6MpB_epo",
    title: "Keynote: Closing Remarks - Janette Cheng, Software Engineer, Meta",
  },
  {
    id: "fSxYZKczP_E",
    title:
      "Sponsored Session: Federation, Reversed: A Consumer-First Future with Fission - David Stutt",
  },
  {
    id: "KdYpSKqpDNc",
    title: "Service-to-service GraphQL: The New Sweet Spot! - Mark Larah, Yelp",
  },
  {
    id: "PeB-L_npCG8",
    title:
      "From Query to Conversation: GraphQL as an AI Interface Layer - Hugh Nguyen & Adam Conrad, Meta",
  },
  {
    id: "-zYdJlIh7sM",
    title:
      "Sponsored Session: Closing the Loop: How GraphQL Gives Coding Agents Eyes on What Actual... M. Staib",
  },
  {
    id: "QiZjO7Rht68",
    title: "Lower Latency With Streaming GraphQL - Rob Richard, 1stDibs",
  },
  {
    id: "juh7AAIdLa0",
    title:
      "Scaling Real-Time: Building Federated Subscriptions in Rust - Denis Badurina, The Guild",
  },
  {
    id: "8sOEqlI22RA",
    title:
      "Sponsored Session: Hands Off the Keyboard: An Introduction to Agentic Coding for GraphQ... E. Bylund",
  },
  {
    id: "gDQQMz7PwgQ",
    title:
      "The Case Against __typename - Sabrina Wasserman, Meta Platforms Inc.",
  },
  {
    id: "loRKQw3YzqI",
    title:
      "Shifting Instagram Development Towards Monolith Server Via Federated Schema - Panel",
  },
  {
    id: "4PxdfGyTJoM",
    title:
      "Incrementally Adopting GraphQL. The Holy Grail? - Robert Balicki, Pinterest",
  },
  {
    id: "zO6MQwbILDs",
    title:
      "Screens on Shuffle: How Netflix Scales Server‑Driven, Ever‑Changing Pages - Sreekanth Ramakrishnan",
  },
  {
    id: "5lkCGe875fA",
    title:
      "The Biggest Change To GraphQL Codegen in 10 Years - Eddy Nguyen & Igor Kusakov",
  },
  {
    id: "kbx-yYM1SQE",
    title:
      "Grafast: A Declarative Solution To GraphQL's Execution Woes - Benjie Gillam, Graphile",
  },
  {
    id: "bdsvCKVl_lI",
    title:
      "Sharding a GraphQL Gateway for Blast Radius Reduction - Linquan Zhang & Cetin Sahin, Airbnb",
  },
  {
    id: "0rnUfXK84ao",
    title:
      "GraphQL Data Mocking at Scale With LLMs and @generateMock - Michael Rebello, Airbnb",
  },
  {
    id: "-VETdzKNnpo",
    title:
      "Changing the Game for Trusted Documents — What If Your Whole Platform Nati... L. Quast & D. Badurina",
  },
  {
    id: "Gi_WFSd4apI",
    title:
      "When GraphQL Gets Expensive: Performance & Cost Patterns in Production... H. Siddhu & S.G. Venkatesh",
  },
  {
    id: "bqHHlNbiKqg",
    title: "Modern Apollo Client React - Brennen Davis, Lease End",
  },
  {
    id: "QEIvWURmO4E",
    title:
      "How GraphQL Helped Create Scalability and Stability in the Retirement Space. - Cameron Sechrist",
  },
  {
    id: "T3R5OQ84HQU",
    title:
      "Stop Reviewing Schemas: How Intuit Made Developers Faster by Automating Governance - Oleks Bidiuk",
  },
  {
    id: "1ywvPLsX8OE",
    title:
      "Observability for a Multi-Tenant GraphQL Gateway at Scale - Vickey Yeh, Airbnb",
  },
  {
    id: "IeRjaphHOeA",
    title:
      "Building MCP Apps With GraphQL Patterns You Already Know - Jerel Miller, Apollo GraphQL",
  },
  {
    id: "r6_qx-yNtMQ",
    title:
      "Speed Without Sacrifice: How Wayfair Transforms DevEx With AI and MCP - M. Karlapudi & M. Sethi",
  },
  {
    id: "BtjGPV4yNqA",
    title:
      "@live GraphQL in Practice: Postgres-to-React Realtime Data Sync - Tobbe Lundberg, Cedar Software AB",
  },
  {
    id: "GXcAFnyMJEg",
    title: "GraphQL All Hands Meeting",
  },
  {
    id: "hrC_0Ud1gbE",
    title:
      "Lightning Talk: GraphQLShield: CWE-Aware Defense in Depth for GraphQL APIs in Go- Ravi Sastry Kadali",
  },
  {
    id: "2AJ8IYWPRaY",
    title:
      "Lightning Talk: The @deprecated Journey: Five Stops From Schema Hint To Gateway Power - N. Abouelazm",
  },
  {
    id: "Ig8YAsRNTjA",
    title: "Panel Discussion: The GraphQL Production Roundtable",
  },
  {
    id: "9TC5qKkhVcM",
    title:
      "Coordinated Access Control with @policy - Huang Minghe, Booking.com",
  },
  {
    id: "VUU_qTRSSos",
    title:
      "A GraphQL-inspired Orchestration Language for the AI Era - Martijn Walraven, Apollo",
  },
  {
    id: "ZalTPtYkdok",
    title:
      "The Easy Way and the Hard Way: Blue-green GraphQL Deployments - Zack Warnimont, Apollo",
  },
  {
    id: "i4K5FoeXz90",
    title: "The State of GraphQL Federation - Michael Staib, ChilliCream",
  },
  {
    id: "28ZsH3H2Vw8",
    title: "Brute Force Correctness - James Bellenger, Airbnb",
  },
  {
    id: "9OvhcjwMox8",
    title:
      "Sponsored Lightning Talk: Search and Execute with Code Mode Backed by the... J. Neuse & A. Soormally",
  },
  {
    id: "Xa8uLxQHeks",
    title:
      "Keynote: GraphQL’s Next Chapter: Progress, Proposals, and Participation - Pascal Senn & Mark Larah",
  },
  {
    id: "6tWsDpgEFlI",
    // Title trimmed from the full YouTube title ("...Co-Creator of GraphQL and
    // Director, GraphQL Foundation") so the fuzzy matcher doesn't mistake it
    // for the "GraphQL Foundation Update" keynote.
    title: "Keynote: Closing Remarks - Lee Byron",
  },
  {
    id: "pPATEv6RXSU",
    title:
      "GraphQL Meets LLMs & Agents: Building Production AI at Starbucks Scale - Sharon Gorla, Starbucks",
  },
]
