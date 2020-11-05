import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} from "graphql"

// Example data set
var data = ppl({
  1572451031: "Daniel Schafer",
  4802170: "Lee Byron",
  37000641: "Nick Schrock",
  100001239335739: "Scott Wolchok",
  13957785: "Alex Langenfeld",
  1433880147: "Laney Kuenzel",
  9020247: "William Sanville",
  305249: "Stephen Schwink",
  1422854581: "Mike Paleczny",
  1117650305: "Hyohyeon Jeong",
  728642302: "Rasmus Andersson",
  3108935: "Nathaniel Roman",
  1289640489: "Charles Ma",
  597621628: "Andrew Rasmussen",
  665215028: "Keito Uchiyama",
})

function ppl(input) {
  Object.keys(input).forEach(id => {
    input[id] = { id, name: input[id] }
  })
  return input
}

function makePic(user, size) {
  return {
    width: size,
    height: size,
    uri: `cdn://pic/${user.id}/${size}`,
  }
}

function friends(user, first) {
  var allFriends = Object.keys(data)
    .map(id => data[id])
    .filter(v => v !== user)
  return {
    totalCount: allFriends.length,
    friends: allFriends.slice(0, first),
  }
}

var ImageType = new GraphQLObjectType({
  name: "Image",
  fields: {
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
    uri: { type: GraphQLString },
  },
})

var FriendConnection = new GraphQLObjectType({
  name: "FriendConnection",
  fields: () => ({
    totalCount: { type: GraphQLInt },
    friends: { type: new GraphQLList(UserType) },
  }),
})

var UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    isViewerFriend: {
      type: GraphQLBoolean,
      resolve: () => true,
    },
    profilePicture: {
      args: { size: { type: GraphQLInt } },
      type: ImageType,
      resolve: (user, { size }) => makePic(user, size),
    },
    friendConnection: {
      args: { first: { type: GraphQLInt } },
      type: FriendConnection,
      resolve: (user, { first }) => friends(user, first),
    },
  },
})

// Define our schema, with one top level field, named `user`, that
// takes an `id` argument and returns the User with that ID.
export const UsersSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      user: {
        type: UserType,
        args: { id: { type: GraphQLID } },
        resolve: (_, { id }) => data[id],
      },
    },
  }),
})
