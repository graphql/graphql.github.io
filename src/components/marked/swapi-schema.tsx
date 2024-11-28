// @ts-nocheck
/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Buffer } from "buffer"

import { makeExecutableSchema } from "@graphql-tools/schema"

const typeDefs = /* GraphQL */ `
  schema {
    query: Query
    mutation: Mutation
  }

  "The query type, represents all of the entry points into our object graph"
  type Query {
    hero(episode: Episode): Character
    reviews(episode: Episode!): [Review]
    search(text: String): [SearchResult]
    character(id: ID!): Character
    droid(id: ID!): Droid
    human(id: ID!): Human
    starship(id: ID!): Starship
  }

  "The mutation type, represents all updates we can make to our data"
  type Mutation {
    createReview(episode: Episode, review: ReviewInput!): Review
    rateFilm(episode: Episode!, rating: FilmRating!): Film
    updateHumanName(id: ID!, name: String!): Human
    deleteStarship(id: ID!): ID
  }

  "The episodes in the Star Wars trilogy"
  enum Episode {
    "Star Wars Episode IV: A New Hope, released in 1977."
    NEWHOPE

    "Star Wars Episode V: The Empire Strikes Back, released in 1980."
    EMPIRE

    "Star Wars Episode VI: Return of the Jedi, released in 1983."
    JEDI
  }

  "A personal rating for a Star Wars episode"
  enum FilmRating {
    "Negative rating"
    THUMBS_DOWN

    "Positive rating"
    THUMBS_UP
  }

  "A film from the Star Wars trilogy"
  type Film {
    "The Star Wars episode portrayed in the film"
    episode: Episode!

    "The authenticated user's rating of the film"
    viewerRating: FilmRating
  }

  "A character from the Star Wars universe"
  interface Character {
    "The ID of the character"
    id: ID!

    "The name of the character"
    name: String!

    "The friends of the character, or an empty list if they have none"
    friends: [Character]

    "The friends of the character exposed as a connection with edges"
    friendsConnection(first: Int, after: ID): FriendsConnection!

    "The movies this character appears in"
    appearsIn: [Episode]!
  }

  "Units of height"
  enum LengthUnit {
    "The standard unit around the world"
    METER

    "Primarily used in the United States"
    FOOT
  }

  "A humanoid creature from the Star Wars universe"
  type Human implements Character {
    "The ID of the human"
    id: ID!

    "What this human calls themselves"
    name: String!

    "Height in the preferred unit, default is meters"
    height(unit: LengthUnit = METER): Float

    "Mass in kilograms, or null if unknown"
    mass: Float

    "This human's friends, or an empty list if they have none"
    friends: [Character]

    "The friends of the human exposed as a connection with edges"
    friendsConnection(first: Int, after: ID): FriendsConnection!

    "The movies this human appears in"
    appearsIn: [Episode]!

    "A list of starships this person has piloted, or an empty list if none"
    starships: [Starship]
  }

  "An autonomous mechanical character in the Star Wars universe"
  type Droid implements Character {
    "The ID of the droid"
    id: ID!

    "What others call this droid"
    name: String!

    "This droid's friends, or an empty list if they have none"
    friends: [Character]

    "The friends of the droid exposed as a connection with edges"
    friendsConnection(first: Int, after: ID): FriendsConnection!

    "The movies this droid appears in"
    appearsIn: [Episode]!

    "This droid's primary function"
    primaryFunction: String
  }

  "A connection object for a character's friends"
  type FriendsConnection {
    "The total number of friends"
    totalCount: Int

    "The edges for each of the character's friends."
    edges: [FriendsEdge]

    "A list of the friends, as a convenience when edges are not needed."
    friends: [Character]

    "Information for paginating this connection"
    pageInfo: PageInfo!
  }

  "An edge object for a character's friends"
  type FriendsEdge {
    "A cursor used for pagination"
    cursor: ID!

    "The character represented by this friendship edge"
    node: Character
  }

  "Information for paginating this connection"
  type PageInfo {
    startCursor: ID
    endCursor: ID
    hasNextPage: Boolean!
  }

  "Represents a review for a movie"
  type Review {
    "The number of stars this review gave, 1-5"
    stars: Int!

    "Comment about the movie"
    commentary: String
  }

  "The input object sent when someone is creating a new review"
  input ReviewInput {
    "0-5 stars"
    stars: Int!

    "Comment about the movie, optional"
    commentary: String
  }

  type Starship {
    "The ID of the starship"
    id: ID!

    "The name of the starship"
    name: String!

    "Length of the starship, along the longest axis"
    length(unit: LengthUnit = METER): Float
  }

  union SearchResult = Human | Droid | Starship
`

/**
 * This defines a basic set of data for our Star Wars Schema.
 *
 * This data is hard coded for the sake of the demo, but you could imagine
 * fetching this data from a backend service rather than from hardcoded
 * JSON objects in a more complex demo.
 */

const humans = [
  {
    id: "1000",
    name: "Luke Skywalker",
    friends: ["1002", "1003", "2000", "2001"],
    appearsIn: ["NEWHOPE", "EMPIRE", "JEDI"],
    height: 1.72,
    mass: 77,
    starships: ["3001", "3003"],
  },
  {
    id: "1001",
    name: "Darth Vader",
    friends: ["1004"],
    appearsIn: ["NEWHOPE", "EMPIRE", "JEDI"],
    height: 2.02,
    mass: 136,
    starships: ["3002"],
  },
  {
    id: "1002",
    name: "Han Solo",
    friends: ["1000", "1003", "2001"],
    appearsIn: ["NEWHOPE", "EMPIRE", "JEDI"],
    height: 1.8,
    mass: 80,
    starships: ["3000", "3003"],
  },
  {
    id: "1003",
    name: "Leia Organa",
    friends: ["1000", "1002", "2000", "2001"],
    appearsIn: ["NEWHOPE", "EMPIRE", "JEDI"],
    height: 1.5,
    mass: 49,
    starships: [],
  },
  {
    id: "1004",
    name: "Wilhuff Tarkin",
    friends: ["1001"],
    appearsIn: ["NEWHOPE"],
    height: 1.8,
    mass: null,
    starships: [],
  },
]

const humanData = {}
humans.forEach(ship => {
  humanData[ship.id] = ship
})

const droids = [
  {
    id: "2000",
    name: "C-3PO",
    friends: ["1000", "1002", "1003", "2001"],
    appearsIn: ["NEWHOPE", "EMPIRE", "JEDI"],
    primaryFunction: "Protocol",
  },
  {
    id: "2001",
    name: "R2-D2",
    friends: ["1000", "1002", "1003"],
    appearsIn: ["NEWHOPE", "EMPIRE", "JEDI"],
    primaryFunction: "Astromech",
  },
]

const droidData = {}
droids.forEach(ship => {
  droidData[ship.id] = ship
})

const starships = [
  {
    id: "3000",
    name: "Millenium Falcon",
    length: 34.37,
  },
  {
    id: "3001",
    name: "X-Wing",
    length: 12.5,
  },
  {
    id: "3002",
    name: "TIE Advanced x1",
    length: 9.2,
  },
  {
    id: "3003",
    name: "Imperial shuttle",
    length: 20,
  },
]

const starshipData = {}
starships.forEach(ship => {
  starshipData[ship.id] = ship
})

/**
 * Helper function to get a character by ID.
 */
function getCharacter(id) {
  // Returning a promise just to illustrate GraphQL.js's support.
  return Promise.resolve(humanData[id] || droidData[id])
}

/**
 * Allows us to query for a character's friends.
 */
function getFriends(character) {
  return character.friends.map(id => getCharacter(id))
}

/**
 * Allows us to fetch the undisputed hero of the Star Wars trilogy, R2-D2.
 */
function getHero(episode) {
  if (episode === "EMPIRE") {
    // Luke is the hero of Episode V.
    return humanData["1000"]
  }
  // Artoo is the hero otherwise.
  return droidData["2001"]
}

/**
 * Allows us to query for the human with the given id.
 */
function getHuman(id) {
  return humanData[id]
}

/**
 * Allows us to query for the droid with the given id.
 */
function getDroid(id) {
  return droidData[id]
}

function getStarship(id) {
  return starshipData[id]
}

function toCursor(str) {
  return Buffer("cursor" + str).toString("base64")
}

function fromCursor(str) {
  return Buffer.from(str, "base64").toString().slice(6)
}

const resolvers = {
  Query: {
    hero: (root, { episode }) => getHero(episode),
    character: (root, { id }) => getCharacter(id),
    human: (root, { id }) => getHuman(id),
    droid: (root, { id }) => getDroid(id),
    starship: (root, { id }) => getStarship(id),
    reviews: () => null,
    search: (root, { text }) => {
      const re = new RegExp(text, "i")

      const allData = [...humans, ...droids, ...starships]

      return allData.filter(obj => re.test(obj.name))
    },
  },
  Mutation: {
    createReview: (root, { episode, review }) => review,
    rateFilm: (root, { episode, rating }) => ({
      episode,
      viewerRating: rating,
    }),
    updateHumanName: (root, { id, name }) => {
      const human = humanData[id]
      if (!human) {
        throw new Error("Human not found")
      }
      return { ...human, name }
    },
    deleteStarship: (root, { id }) => {
      const starship = getStarship(id)
      if (!starship) {
        throw new Error("Starship not found")
      }
      return id
    },
  },
  Character: {
    __resolveType(data, context, info) {
      if (humanData[data.id]) {
        return "Human"
      }
      if (droidData[data.id]) {
        return "Droid"
      }
      return null
    },
  },
  Human: {
    height: ({ height }, { unit }) => {
      if (unit === "FOOT") {
        return height * 3.28084
      }

      return height
    },
    friends: ({ friends }) => friends.map(getCharacter),
    friendsConnection: ({ friends }, { first, after }) => {
      first = first || friends.length
      after = after ? parseInt(fromCursor(after), 10) : 0
      const edges = friends
        .map((friend, i) => ({
          cursor: toCursor(i + 1),
          node: getCharacter(friend),
        }))
        .slice(after, first + after)
      const slicedFriends = edges.map(({ node }) => node)
      return {
        edges,
        friends: slicedFriends,
        pageInfo: {
          startCursor: edges.length > 0 ? edges[0].cursor : null,
          hasNextPage: first + after < friends.length,
          endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
        },
        totalCount: friends.length,
      }
    },
    starships: ({ starships }) => starships.map(getStarship),
    appearsIn: ({ appearsIn }) => appearsIn,
  },
  Droid: {
    friends: ({ friends }) => friends.map(getCharacter),
    friendsConnection: ({ friends }, { first, after }) => {
      first = first || friends.length
      after = after ? parseInt(fromCursor(after), 10) : 0
      const edges = friends
        .map((friend, i) => ({
          cursor: toCursor(i + 1),
          node: getCharacter(friend),
        }))
        .slice(after, first + after)
      const slicedFriends = edges.map(({ node }) => node)
      return {
        edges,
        friends: slicedFriends,
        pageInfo: {
          startCursor: edges.length > 0 ? edges[0].cursor : null,
          hasNextPage: first + after < friends.length,
          endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
        },
        totalCount: friends.length,
      }
    },
    appearsIn: ({ appearsIn }) => appearsIn,
  },
  FriendsConnection: {
    edges: ({ edges }) => edges,
    friends: ({ friends }) => friends,
    pageInfo: ({ pageInfo }) => pageInfo,
    totalCount: ({ totalCount }) => totalCount,
  },
  FriendsEdge: {
    node: ({ node }) => node,
    cursor: ({ cursor }) => cursor,
  },
  Starship: {
    length: ({ length }, { unit }) => {
      if (unit === "FOOT") {
        return length * 3.28084
      }

      return length
    },
  },
  SearchResult: {
    __resolveType(data, context, info) {
      if (humanData[data.id]) {
        return "Human"
      }
      if (droidData[data.id]) {
        return "Droid"
      }
      if (starshipData[data.id]) {
        return "Starship"
      }
      return null
    },
  },
}

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export const StarWarsSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
