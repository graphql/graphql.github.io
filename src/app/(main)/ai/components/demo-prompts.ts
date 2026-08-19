export const demoPrompts = [
  {
    id: "all-characters",
    icon: "users",
    prompt: "Find all Star Wars characters",
    types: ["Human", "Droid", "Starship"],
    query: `{
  search(text: "") {
    ... on Human {
      name
      height
      appearsIn
    }
    ... on Droid {
      name
      primaryFunction
    }
    ... on Starship {
      name
      length
    }
  }
}`,
    explanation:
      "One query, three inline fragments. `search` returns a union, so each member of the result is matched against the fragments and only the fields named there come back.",
  },
  {
    id: "luke-friends",
    icon: "human",
    prompt: "Show me Luke's friends and their starships",
    types: ["Human", "Character", "Starship"],
    query: `{
  human(id: "1000") {
    name
    friends {
      name
      ... on Human {
        starships {
          name
        }
      }
    }
  }
}`,
    explanation:
      "The query follows the schema's own relationships: human → friends → Character. An inline fragment fetches starships only for the friends that are Humans, so the droids come back without that field rather than with it set to null.",
  },
  {
    id: "r2-c3po",
    icon: "robot",
    prompt: "What movies did R2-D2 and C-3PO appear in?",
    types: ["Droid", "Episode"],
    query: `{
  r2d2: droid(id: "2001") {
    name
    appearsIn
  }
  c3po: droid(id: "2000") {
    name
    appearsIn
  }
}`,
    explanation:
      "Two aliases against the same field, resolved in one request. Each alias keys its own result, so the caller does not have to match responses back to requests.",
  },
  {
    id: "tallest",
    icon: "scale",
    prompt: "Find the tallest Star Wars character",
    types: ["Human", "Droid", "Starship"],
    query: `{
  search(text: "") {
    __typename
    ... on Human {
      name
      height
    }
  }
}`,
    explanation:
      "The schema exposes no sort, so the agent asks for the heights and compares them itself. `__typename` comes back for every member of the union, and the droids and starships arrive carrying only that, because those are the only fields the query asked of them.",
  },
  {
    id: "starships-feet",
    icon: "ship",
    prompt: "Compare starship lengths in meters and feet",
    types: ["Starship", "SearchResult"],
    query: `{
  search(text: "x") {
    ...dimensions
  }
}

fragment dimensions on Starship {
  name
  lengthInMeters: length
  lengthInFeet: length(unit: FOOT)
}`,
    explanation:
      "`search` returns a union, so the fragment picks out only the Starship members. The `unit` argument then returns `length` twice, aliased to two units. The conversion happens where the data lives, not in the client.",
  },
  {
    id: "heroes",
    icon: "sword",
    prompt: "Show me the hero of each episode and their friends",
    types: ["Character", "Episode"],
    query: `{
  newHope: hero(episode: NEWHOPE) {
    name
    friends { name }
  }
  empire: hero(episode: EMPIRE) {
    name
    friends { name }
  }
  jedi: hero(episode: JEDI) {
    name
    friends { name }
  }
}`,
    explanation:
      "Three aliased calls to `hero`, each with a different `episode` argument, in a single round trip.",
  },
] as const satisfies readonly {
  id: string
  icon: "users" | "human" | "robot" | "scale" | "ship" | "sword"
  prompt: string
  types: readonly string[]
  query: string
  explanation: string
}[]

export type DemoPrompt = (typeof demoPrompts)[number]
