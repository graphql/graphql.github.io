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

import { makeExecutableSchema } from 'graphql-tools';

const schemaString = `
schema {
  query: Query
  mutation: Mutation
}

# The query type, represents all of the entry points into our object graph
type Query {
  hero(episode: Episode): Character
  reviews(episode: Episode!): [Review]
  search(text: String): [SearchResult]
  droid(id: ID!): Droid
  human(id: ID!): Human
  starship(id: ID!): Starship
}

# The mutation type, represents all updates we can make to our data
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

# Units of height
enum LengthUnit {
  # The standard unit around the world
  METER

  # Primarily used in the United States
  FOOT
}

# A humanoid creature from the Star Wars universe
type Human implements Character {
  # The ID of the human
  id: ID!

  # What this human calls themselves
  name: String!

  # Height in the preferred unit, default is meters
  height(unit: LengthUnit = METER): Float

  # Mass in kilograms, or null if unknown
  mass: Float

  # This human's friends, or an empty list if they have none
  friends: [Character]

  # The movies this human appears in
  appearsIn: [Episode]!

  # A list of starships this person has piloted, or an empty list if none
  starships: [Starship]
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

# Represents a review for a movie
type Review {
  # The number of stars this review gave, 1-5
  stars: Int!

  # Comment about the movie
  commentary: String
}

# The input object sent when someone is creating a new review
input ReviewInput {
  # 0-5 stars
  stars: Int!

  # Comment about the movie, optional
  commentary: String
}

type Starship {
  # The ID of the starship
  id: ID!

  # The name of the starship
  name: String!

  # Length of the starship, along the longest axis
  length(unit: LengthUnit = METER): Float
}

union SearchResult = Human | Droid | Starship
`;

/**
 * This defines a basic set of data for our Star Wars Schema.
 *
 * This data is hard coded for the sake of the demo, but you could imagine
 * fetching this data from a backend service rather than from hardcoded
 * JSON objects in a more complex demo.
 */

const humans = [
  {
    id: '1000',
    name: 'Luke Skywalker',
    friends: [ '1002', '1003', '2000', '2001' ],
    appearsIn: [ 'NEWHOPE', 'EMPIRE', 'JEDI' ],
    height: 1.72,
    mass: 77,
    starships: [ '3001', '3003' ],
  },
  {
    id: '1001',
    name: 'Darth Vader',
    friends: [ '1004' ],
    appearsIn: [ 'NEWHOPE', 'EMPIRE', 'JEDI' ],
    height: 2.02,
    mass: 136,
    starships: [ '3002' ],
  },
  {
    id: '1002',
    name: 'Han Solo',
    friends: [ '1000', '1003', '2001' ],
    appearsIn: [ 'NEWHOPE', 'EMPIRE', 'JEDI' ],
    height: 1.8,
    mass: 80,
    starships: [ '3000', '3003' ],
  },
  {
    id: '1003',
    name: 'Leia Organa',
    friends: [ '1000', '1002', '2000', '2001' ],
    appearsIn: [ 'NEWHOPE', 'EMPIRE', 'JEDI' ],
    height: 1.5,
    mass: 49,
    starships: [],
  },
  {
    id: '1004',
    name: 'Wilhuff Tarkin',
    friends: [ '1001' ],
    appearsIn: [ 'NEWHOPE' ],
    height: 1.8,
    mass: null,
    starships: [],
  },
];

const humanData = {};
humans.forEach((ship) => {
  humanData[ship.id] = ship;
});

const droids = [
  {
    id: '2000',
    name: 'C-3PO',
    friends: [ '1000', '1002', '1003', '2001' ],
    appearsIn: [ 'NEWHOPE', 'EMPIRE', 'JEDI' ],
    primaryFunction: 'Protocol',
  },
  {
    id: '2001',
    name: 'R2-D2',
    friends: [ '1000', '1002', '1003' ],
    appearsIn: [ 'NEWHOPE', 'EMPIRE', 'JEDI' ],
    primaryFunction: 'Astromech',
  },
];

const droidData = {};
droids.forEach((ship) => {
  droidData[ship.id] = ship;
});

const starships = [
  {
    id: '3000',
    name: 'Millenium Falcon',
    length: 34.37,
  },
  {
    id: '3001',
    name: 'X-Wing',
    length: 12.5,
  },
  {
    id: '3002',
    name: 'TIE Advanced x1',
    length: 9.2,
  },
  {
    id: '3003',
    name: 'Imperial shuttle',
    length: 20,
  },
];

const starshipData = {};
starships.forEach((ship) => {
  starshipData[ship.id] = ship;
});

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
  if (episode === 'EMPIRE') {
    // Luke is the hero of Episode V.
    return humanData['1000'];
  }
  // Artoo is the hero otherwise.
  return droidData['2001'];
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

function getStarship(id) {
  return starshipData[id];
}

const resolvers = {
  Query: {
    hero: (root, { episode }) => getHero(episode),
    human: (root, { id }) => getHuman(id),
    droid: (root, { id }) => getDroid(id),
    starship: (root, { id }) => getStarship(id),
    reviews: () => null,
    search: (root, { text }) => {
      const re = new RegExp(text, 'i');

      const allData = [
        ...humans,
        ...droids,
        ...starships,
      ];

      return allData.filter((obj) => re.test(obj.name));
    },
  },
  Mutation: {
    createReview: (root, { episode, review }) => review,
  },
  Character: {
    __resolveType(data, context, info){
      if(humanData[data.id]){
        return info.schema.getType('Human');
      }
      if(droidData[data.id]){
        return info.schema.getType('Droid');
      }
      return null;
    },
  },
  Human: {
    height: ({ height }, { unit }) => {
      if (unit === 'FOOT') {
        return height * 3.28084;
      }

      return height;
    },
    friends: ({ friends }) => friends.map(getCharacter),
    starships: () => null,
    appearsIn: ({ appearsIn }) => appearsIn,
  },
  Droid: {
    friends: ({ friends }) => friends.map(getCharacter),
    appearsIn: ({ appearsIn }) => appearsIn,
  },
  Starship: {
    length: ({ length }, { unit }) => {
      if (unit === 'FOOT') {
        return length * 3.28084;
      }

      return length;
    }
  },
  SearchResult: {
    __resolveType(data, context, info){
      if(humanData[data.id]){
        return info.schema.getType('Human');
      }
      if(droidData[data.id]){
        return info.schema.getType('Droid');
      }
      if(starshipData[data.id]){
        return info.schema.getType('Starship');
      }
      return null;
    },
  },
}

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
console.log('hi')
export const StarWarsSchema = makeExecutableSchema({
  typeDefs: [schemaString],
  resolvers
});
