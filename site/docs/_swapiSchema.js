/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLEnumType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

const schemaString = `
schema {
  query: Query
  mutation: Mutation
}

type Query {
  hero(episode: Episode): Character
  reviews(episode: Episode!): [Review]
  search(text: String): [SearchResult]
  droid(id: ID!): Droid
  human(id: ID!): Human
  starship(id: ID!): Starship
}

type Mutation {
  createReview(episode: Episode, review: ReviewInput!): Review
}

# The episodes in the Star Wars trilogy
enum Episode {
  # Star Wars Episode IV: A New Hope, released in 1977.
  NEWHOPE

  # Star Wars Episode V: The Empire Strikes Back, released in 1980.
  EMPIRE

  # Star Wars Episode VI: Return of the Jedi, released in 1983.
  JEDI
}

# A character from the Star Wars universe
interface Character {
  # The ID of the character
  id: ID!

  # The name of the character
  name: String!

  # The friends of the character, or an empty list if they have none
  friends: [Character]

  # The movies this character appears in
  appearsIn: [Episode]!
}

# A humanoid creature from the Star Wars universe
type Human implements Character {
  # The ID of the human
  id: ID!

  # What this human calls themselves
  name: String!

  # This human's friends, or an empty list if they have none
  friends: [Character]

  # The movies this human appears in
  appearsIn: [Episode]!

  # A list of starships this person has piloted, or an empty list if none
  starships: [Starship]

  # The number of credits this human has
  totalCredits: Int
}

# An autonomous mechanical character in the Star Wars universe
type Droid implements Character {
  # The ID of the droid
  id: ID!

  # What others call this droid
  name: String!

  # This droid's friends, or an empty list if they have none
  friends: [Character]

  # The movies this droid appears in
  appearsIn: [Episode]!

  # This droid's primary function
  primaryFunction: String
}

type Review {
  # The number of stars this review gave, 1-5
  stars: Int

  # Comments about the movie
  commentary: String
}

# The input object sent when someone is creating a new review
input ReviewInput {
  # 0-5 stars
  stars: Int

  # Comments about the movie
  commentary: String
}

# Units of length
enum LengthUnit {
  # The standard unit around the world
  METER

  # Primarily used in the United States
  FOOT
}

type Starship {
  # The ID of the starship
  id: ID!

  # The name of the starship
  name: String!

  # The length of the starship, in meters
  length(unit: LengthUnit = METER): Float!
}

union SearchResult = Character | Starship
`;








/**
 * This defines a basic set of data for our Star Wars Schema.
 *
 * This data is hard coded for the sake of the demo, but you could imagine
 * fetching this data from a backend service rather than from hardcoded
 * JSON objects in a more complex demo.
 */

var luke = {
  id: '1000',
  name: 'Luke Skywalker',
  friends: [ '1002', '1003', '2000', '2001' ],
  appearsIn: [ 4, 5, 6 ],
  homePlanet: 'Tatooine',
};

var vader = {
  id: '1001',
  name: 'Darth Vader',
  friends: [ '1004' ],
  appearsIn: [ 4, 5, 6 ],
  homePlanet: 'Tatooine',
};

var han = {
  id: '1002',
  name: 'Han Solo',
  friends: [ '1000', '1003', '2001' ],
  appearsIn: [ 4, 5, 6 ],
};

var leia = {
  id: '1003',
  name: 'Leia Organa',
  friends: [ '1000', '1002', '2000', '2001' ],
  appearsIn: [ 4, 5, 6 ],
  homePlanet: 'Alderaan',
};

var tarkin = {
  id: '1004',
  name: 'Wilhuff Tarkin',
  friends: [ '1001' ],
  appearsIn: [ 4 ],
};

var humanData = {
  1000: luke,
  1001: vader,
  1002: han,
  1003: leia,
  1004: tarkin,
};

var threepio = {
  id: '2000',
  name: 'C-3PO',
  friends: [ '1000', '1002', '1003', '2001' ],
  appearsIn: [ 4, 5, 6 ],
  primaryFunction: 'Protocol',
};

var artoo = {
  id: '2001',
  name: 'R2-D2',
  friends: [ '1000', '1002', '1003' ],
  appearsIn: [ 4, 5, 6 ],
  primaryFunction: 'Astromech',
};

var droidData = {
  2000: threepio,
  2001: artoo,
};

/**
 * Helper function to get a character by ID.
 */
function getCharacter(id) {
  // Returning a promise just to illustrate GraphQL.js's support.
  return Promise.resolve(humanData[id] || droidData[id]);
}

/**
 * Allows us to query for a character's friends.
 */
function getFriends(character) {
  return character.friends.map(id => getCharacter(id));
}

/**
 * Allows us to fetch the undisputed hero of the Star Wars trilogy, R2-D2.
 */
function getHero(episode) {
  if (episode === 5) {
    // Luke is the hero of Episode V.
    return luke;
  }
  // Artoo is the hero otherwise.
  return artoo;
}

/**
 * Allows us to query for the human with the given id.
 */
function getHuman(id) {
  return humanData[id];
}

/**
 * Allows us to query for the droid with the given id.
 */
function getDroid(id) {
  return droidData[id];
}


/**
 * Using our shorthand to describe type systems, the type system for our
 * Star Wars example is:
 *
 * enum Episode { NEWHOPE, EMPIRE, JEDI }
 *
 * interface Character {
 *   id: String!
 *   name: String
 *   friends: [Character]
 *   appearsIn: [Episode]
 * }
 *
 * type Human : Character {
 *   id: String!
 *   name: String
 *   friends: [Character]
 *   appearsIn: [Episode]
 *   homePlanet: String
 * }
 *
 * type Droid : Character {
 *   id: String!
 *   name: String
 *   friends: [Character]
 *   appearsIn: [Episode]
 *   primaryFunction: String
 * }
 *
 * type Query {
 *   hero(episode: Episode): Character
 *   human(id: String!): Human
 *   droid(id: String!): Droid
 * }
 *
 * We begin by setting up our schema.
 */

/**
 * The original trilogy consists of three movies.
 *
 * This implements the following type system shorthand:
 *   enum Episode { NEWHOPE, EMPIRE, JEDI }
 */
var episodeEnum = new GraphQLEnumType({
  name: 'Episode',
  description: 'One of the films in the Star Wars Trilogy',
  values: {
    NEWHOPE: {
      value: 4,
      description: 'Released in 1977.',
    },
    EMPIRE: {
      value: 5,
      description: 'Released in 1980.',
    },
    JEDI: {
      value: 6,
      description: 'Released in 1983.',
    },
  }
});

/**
 * Characters in the Star Wars trilogy are either humans or droids.
 *
 * This implements the following type system shorthand:
 *   interface Character {
 *     id: String!
 *     name: String
 *     friends: [Character]
 *     appearsIn: [Episode]
 *   }
 */
var characterInterface = new GraphQLInterfaceType({
  name: 'Character',
  description: 'A character in the Star Wars Trilogy',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the character.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the character.',
    },
    friends: {
      type: new GraphQLList(characterInterface),
      description: 'The friends of the character, or an empty list if they ' +
                   'have none.',
    },
    appearsIn: {
      type: new GraphQLList(episodeEnum),
      description: 'Which movies they appear in.',
    },
  }),
  resolveType: character => {
    return getHuman(character.id) ? humanType : droidType;
  }
});

/**
 * We define our human type, which implements the character interface.
 *
 * This implements the following type system shorthand:
 *   type Human : Character {
 *     id: String!
 *     name: String
 *     friends: [Character]
 *     appearsIn: [Episode]
 *   }
 */
var humanType = new GraphQLObjectType({
  name: 'Human',
  description: 'A humanoid creature in the Star Wars universe.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the human.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the human.',
    },
    friends: {
      type: new GraphQLList(characterInterface),
      description: 'The friends of the human, or an empty list if they ' +
                   'have none.',
      resolve: human => getFriends(human),
    },
    appearsIn: {
      type: new GraphQLList(episodeEnum),
      description: 'Which movies they appear in.',
    },
    homePlanet: {
      type: GraphQLString,
      description: 'The home planet of the human, or null if unknown.',
    },
  }),
  interfaces: [ characterInterface ]
});

/**
 * The other type of character in Star Wars is a droid.
 *
 * This implements the following type system shorthand:
 *   type Droid : Character {
 *     id: String!
 *     name: String
 *     friends: [Character]
 *     appearsIn: [Episode]
 *     primaryFunction: String
 *   }
 */
var droidType = new GraphQLObjectType({
  name: 'Droid',
  description: 'A mechanical creature in the Star Wars universe.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the droid.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the droid.',
    },
    friends: {
      type: new GraphQLList(characterInterface),
      description: 'The friends of the droid, or an empty list if they ' +
                   'have none.',
      resolve: droid => getFriends(droid),
    },
    appearsIn: {
      type: new GraphQLList(episodeEnum),
      description: 'Which movies they appear in.',
    },
    primaryFunction: {
      type: GraphQLString,
      description: 'The primary function of the droid.',
    },
  }),
  interfaces: [ characterInterface ]
});

/**
 * This is the type that will be the root of our query, and the
 * entry point into our schema. It gives us the ability to fetch
 * objects by their IDs, as well as to fetch the undisputed hero
 * of the Star Wars trilogy, R2-D2, directly.
 *
 * This implements the following type system shorthand:
 *   type Query {
 *     hero(episode: Episode): Character
 *     human(id: String!): Human
 *     droid(id: String!): Droid
 *   }
 *
 */
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hero: {
      type: characterInterface,
      args: {
        episode: {
          description: 'If omitted, returns the hero of the whole saga. If ' +
                       'provided, returns the hero of that particular episode.',
          type: episodeEnum
        }
      },
      resolve: (root, { episode }) => getHero(episode),
    },
    human: {
      type: humanType,
      args: {
        id: {
          description: 'id of the human',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, { id }) => getHuman(id),
    },
    droid: {
      type: droidType,
      args: {
        id: {
          description: 'id of the droid',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, { id }) => getDroid(id),
    },
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var StarWarsSchema = new GraphQLSchema({
  query: queryType
});
