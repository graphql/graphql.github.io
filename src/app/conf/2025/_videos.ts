/**
 * This was populated with data captured via:
 *
 * https://developers.google.com/youtube/v3/docs/playlistItems/list
 *
 * with:
 *
 * - part: snippet
 * - maxResults: 50
 * - playlistId: UUIVbABX6aSk5hy5UPAhQdmQ
 *
 * And then also adding `pageToken` for the second request to get the second
 * page.
 *
 * Note that the playlistId is the ID of the "Uploads" playlist for the
 * "GraphQLFoundationTalks" channel.
 *
 * Since the videos are unlisted it needed to be authenticated with the
 * https://www.googleapis.com/auth/youtube.readonly scope. This is also
 * why we couldn't use the generate-videos-mappings.py script.
 *
 * Then we simply mapped over the results:
 *
 * ```js
 * for (const item of data.items) {
 *   const id = item.snippet.resourceId.videoId;
 *   const title = item.snippet.title
 *   videos.push({ id, title })
 * }
 * ```
 */
export const videos: {
  id: string
  title: string
}[] = [
  {
    id: "-ZpCOOf_fYE",
    title: "Relay Migration API at Pinterest - Mauricio Montalvo, Pinterest",
  },
  {
    id: "Orgyp3xOqwY",
    title:
      "LinkedIn's Code-First Approach To Federated GraphQL With gRPC - Ethan Shen & Spencer Kwok, LinkedIn",
  },
  {
    id: "UiTHTDNE5GQ",
    title:
      "Breaking the Monolith: Our Journey From Proto To Federated GraphQL at Scale - Mansi Mittal",
  },
  {
    id: "LBUSHL31MpI",
    title:
      "Deep Dive Into a GraphQL Federation Gateway, From Query Planning To the Execution - Benjamin Rabier",
  },
  {
    id: "tHXSmuoTcFg",
    title:
      "Rebuilding Buffer's Public API - Amanda Marochko & Joe Birch, Buffer",
  },
  {
    id: "hz0bGBaEKNQ",
    title: "Local Data Consistency With GraphQL - Sabrina Wasserman, Meta",
  },
  {
    id: "afKv3qzLpvc",
    title: "Hacking the Federation Query Planner - Mark Larah, Yelp",
  },
  {
    id: "PcbHYunr-gc",
    title:
      "LLMs + GraphQL + MCP: A Blueprint for Scalable AI Tooling - Erik Wrede & Thore Koritzius",
  },
  {
    id: "DoD7KJpiIkM",
    title: "Proven Schema Designs and Best-practices - Jeff Dolle, The Guild",
  },
  {
    id: "3_se3lJn-0o",
    title:
      "Lightning Talk: Efficient Semantic Comparison of GraphQL Queries - Derek Kuc, Apollo GraphQL",
  },
  {
    id: "grfAL6RYBPE",
    title:
      'Lightning Talk: "Please Migrate Away From Field X To Field Y Before Z" - A Story on... Rick Bijkerk',
  },
  {
    id: "rKxC4EJYGKo",
    title: "The Two GraphQLs - Andrei Bocan & Andreas Marek, Atlassian",
  },
  {
    id: "g76iuFsi2C0",
    title:
      "Smarter Caching With Events: Targeted Invalidation in Federated Graphs - Juan Carlos Blanco Delgado",
  },
  {
    id: "nmBGLw_vZo8",
    title:
      "Safely Roll Out Strict Error Handling in Your GraphQL Codebase - Itamar Kestenbaum, Meta",
  },
  {
    id: "bL2JCd1lo80",
    title: "From Data Loaders To Batch Resolvers - Aileen Chen, Airbnb",
  },
  {
    id: "AGVEV53fVEo",
    title:
      "One API Definition To Rule Them All: Generating GraphQL Schemas From TypeSpec - Fiona Huang",
  },
  {
    id: "ttmp_zkHH_0",
    title:
      "Lightning Talk: What If GraphQL Knew Accessibility? - Vanessa Johnson, The New York Times",
  },
  {
    id: "HK_TvL5jr0k",
    title:
      "Lightning Talk: Hello Graffle! A Modular Type Safe GraphQL Client - Jason Kuhrt, The Guild",
  },
  {
    id: "DcoI9HusjP0",
    title:
      "Keynote: Closing Remarks - Lee Byron, Co-Creator of GraphQL & Director, GraphQL Foundation",
  },
  {
    id: "LZQbu6wQfLs",
    title:
      "Keynote: What Is the GraphQL Foundation? - Jeff Auriemma, Senior Engineering Manager, Apollo GraphQL",
  },
  {
    id: "niizRUy-2Yk",
    title:
      "“One Schema To Rule Them All”: Simplifying 10+ Mediaset Apps With One Single GraphQL S... Marco Reni",
  },
  {
    id: "AIdqMIHR098",
    title:
      "Instagram’s REST To GraphQL Migrat... Xiao Han, Chi Chan, Anirudh Padmarao, Lisa Watkins & Curtis Li",
  },
  {
    id: "PUMPLX1pcGc",
    title:
      "Reintroducing Apollo Client: V4 and Beyond - Lenz Weber-Tronic, Apollo GraphQL",
  },
  {
    id: "3GWZ9yiskFk",
    title:
      "GraphQL in a World of Full-stack, Rich Clients: The Next Evolution - Robert Balicki, Pinterest",
  },
  {
    id: "uGlA_vN3P2g",
    title:
      "Lightning Talk: GraphQL Caching Lightning Talk - Emily Goodwin, Independent",
  },
  {
    id: "QsDfSSKPq9g",
    title:
      "Lightning Talk: Next-Generation GraphQL Cache Management in Your Android and iOS Apps - Benoit Lubek",
  },
  {
    id: "BY6Dd-eygq4",
    title:
      "Grats: Bringing Implementation-First GraphQL to TypeScript - Jordan Eldredge, Meta",
  },
  {
    id: "1sbK2t9JJGo",
    title:
      "From Hobby Project To Industry Standard: Lessons From 10 Years of Grap... Donna Zhou & Andreas Marek",
  },
  {
    id: "NUYMJbQc7Vs",
    title:
      'Workshop: Social Media App "Y" with GraphQL, Relay, and React Server Components... Saihajpreet Singh',
  },
  {
    id: "zw15cuj5gww",
    title:
      "Avoiding the Monolith Trap: Lessons from Airbnb’s Multi-Tenant GraphQL Platform - Adam Miskiewicz",
  },
  {
    id: "94Nz2B6ETD8",
    title: "Compose Your Mobile App With GraphQL - Martin Bonnin, Apollo",
  },
  {
    id: "cRTYf59rYMU",
    title:
      "GraphQL Isn't Just for Enterprises: The New King of Fullstack Typescript Application... Alec Aivazis",
  },
  {
    id: "H-FyKa4VaOY",
    title:
      "Breaking and Building Boundaries: Securing Federated GraphQL - Yehuda Rosenberg, JFrog",
  },
  {
    id: "O3PudaSzRh4",
    title:
      "Unlocking Federation Security at Scale in Booking.com - Sanver Tarmur & Minghe Huang, Booking.com",
  },
  {
    id: "NH6unhX6BZQ",
    title:
      "Streamlining Data Collection and Entity Management for Amazon's Buyer Abuse Preven... Adam Cervantes",
  },
  {
    id: "y_Ekm3dF3qI",
    title: "@async: Defer Even More! - Matt Mahoney, Meta",
  },
  {
    id: "WTSY3mgXKiQ",
    title: "Performant GraphQL at Scale - Andreas Marek, Atlassian",
  },
  {
    id: "IlAfS5oMiHM",
    title:
      "Imagining GraphQL 2.0: Choices in a Hypothetic... Kewei Qu, Curtis Li, Benjie Gillam & Martin Bonnin",
  },
  {
    id: "zUVm45MKrS8",
    title: "Lower Latency With Streaming GraphQL - Rob Richard, 1stDibs",
  },
  {
    id: "Ggmsij69xNY",
    title: "The State of GraphQL Open Telemetry - Pascal Senn, ChilliCream",
  },
  {
    id: "XKeGtImv4Ew",
    title:
      "The State of GraphQL Federation - Michael Staib, ChilliCream & Martijn Walraven, Apollo",
  },
  {
    id: "4rALfQ-SBrM",
    title:
      "Namespacing Is the Next Frontier of GraphQL Federation - Martijn Walraven, Apollo",
  },
  {
    id: "odwQUAkmW44",
    title:
      "Fixing GraphQL's Biggest Mistake in 512 Bytes - Benjie Gillam, Graphile",
  },
  {
    id: "c2Jgh3GD_Jo",
    title: "GraphQL All Hands Meeting",
  },
  {
    id: "eLz-TADWm0Q",
    title: "Workshop: Composite Schemas in Action - Michael Staib, Chillicream",
  },
  {
    id: "1RNzqXBNSzM",
    title:
      "Workshop: Unleash the Power of Federation with Hive Gateway - Denis Badurina & Arda Tanrıkulu",
  },
  {
    id: "lFrm-nR-TXs",
    title:
      "Workshop: Beyond GraphQL Federation: How We Use Composite Schemas and... Benjamin Rabier & Tom Houlé",
  },
  {
    id: "jJLRnjtQZDQ",
    title:
      "Workshop: Apollo Router & MCP: A Modern Agentic Development Approach - Michael Watson",
  },
  {
    id: "hX70dcYeIrA",
    title:
      "Building a Kotlin Federated GraphQL Gateway and Executor - Samuel Bernardo Vázquez Andalón",
  },
  {
    id: "2LsaClmcw7s",
    title:
      "Building an Open-Source Federation Query Planner & Router - Dotan Simha & Kamil Kisiela, The Guild",
  },
  {
    id: "hZQZrXk8dUE",
    title:
      "Lightning Talk: Authorization in Federated GraphQL - Tom Houlé, Grafbase",
  },
  {
    id: "smqavgkzwlI",
    title:
      "Lightning Talk: The Federated GraphQL Subscriptions Zoo - Tom Houlé, Grafbase",
  },
  {
    id: "1p2OAsYdUV0",
    title: "Event Sourcing + GraphQL = ♥️ - Mike Astle, Xolvio",
  },
  {
    id: "gUs0Zj28geM",
    title:
      "Composing Your UI With GraphQL: Building Federated Component Systems That Sca... Gabriel Cura-Castro",
  },
  {
    id: "euaUo-vJBKc",
    title:
      "From Docs To Conversation & Action - Daniel Hai & Dipro Bhowmik, monday.com",
  },
  {
    id: "1fwiLhSW-2Y",
    title:
      "Sponsored Session: Building the Ideal GraphQL Server Workflow Featuring GraphQL Code... Eddy Nguyen",
  },
  {
    id: "pL8DhC5iJCM",
    title:
      "Lightning Talk: See the Graph in GraphQL: Graph Visualization in Action - Ivan Goncharov, KeenEthics",
  },
  {
    id: "LgXtJymMp3U",
    title:
      "Lightning Talk: Offset Pagination Is Dead! Meet Relative Cursors - Michael Staib, ChilliCream",
  },
  {
    id: "vVLbh0n27m0",
    title:
      "What’s Missing in Your Graph? Using AI to Uncover and Close Gaps - Christian Ernst, Booking.com",
  },
  {
    id: "FINsHIb0p0g",
    title: "Death, Taxes, and Deprecation - Stephen Spalding, Netflix",
  },
  {
    id: "yInL1aPZjvI",
    title: "The Big Ideas in Relay - Jordan Eldredge, Meta",
  },
  {
    id: "kA55fNCyNJk",
    title:
      "From Private To Public: Evolving a GraphQL API for the Outside World - Laurin Quast, The Guild",
  },
  {
    id: "jlpH9nz_0tw",
    title:
      "GraphQL Performance Issues at Netflix Scale - Stephen Chambers, Netflix",
  },
  {
    id: "fsoWxaWqcrA",
    title: "Rethinking GraphQL Execution - Raymie Stata, Airbnb",
  },
  {
    id: "sNWe4wH67cE",
    title:
      "GraphQL Subscriptions Are Stateful; We Made Them Stateless - Matteo Collina, Platformatic",
  },
  {
    id: "gMCh8jRVMiQ",
    title:
      "How To Use Fragments (They're Not for Re-use!) - Janette Cheng, Meta",
  },
  {
    id: "Ot6O100VzQs",
    title:
      "Panel: APIs for AIs - Kewei Qu, Fredrik Björk, Boris Besemer, Michael Watson & Stephen Spalding",
  },
  {
    id: "zmKFUDemcJ8",
    title:
      "Sponsored Session: Schema Design Patterns: Leveraging Existing REST APIs for Rapid... Michael Watson",
  },
  {
    id: "u7C1bmB_TYg",
    title:
      "Keynote: How GraphQL is Redefining API Orchestration for the AI Era - Matt DeBergalis",
  },
  {
    id: "wM-wGpDxNb0",
    title:
      "Keynote: GraphQL at Meta - Jordan Eldredge, Software Engineer, Meta",
  },
  {
    id: "hQAuXJd15zM",
    title:
      "Keynote: Reimagining Developer Experience for AI-Native Development - Sarah Sanders",
  },
  {
    id: "IveEY_j9T8k",
    title:
      "Keynote: Community Update 2025: Growing in the Open - Benjie Gillam, Jem Gillam & Uri Goldshtein",
  },
  {
    id: "-pO67dMaB-U",
    title:
      "Keynote: Opening Remarks - Lee Byron, Co-Creator of GraphQL & Director, GraphQL Foundation",
  },
  {
    id: "UA9AQWJqWfc",
    title: "Keynote: Welcome Remarks - Sarah Sanders, Technical Writer, Docker",
  },
]
