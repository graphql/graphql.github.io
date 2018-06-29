---
title: "Wrapping a REST API in GraphQL"
layout: ../_core/BlogLayout
permalink: /blog/rest-api-graphql-wrapper/
date: 5 May 2016
byline: "Steven Luscher"
---

Time and time again I hear the same aspiration from front-end web and mobile developers: they're eager to reap the developer efficiency gains offered by new technologies like Relay and GraphQL, but they have years of momentum behind their existing REST API. Without data that clearly demonstrates the benefits of switching, they find it hard to justify an additional investment in GraphQL infrastructure.

In this post I will outline a rapid, low-investment method that you can use to stand up a GraphQL endpoint atop an existing REST API, using JavaScript alone. No backend developers will be harmed during the making of this blog post.

## A client-side REST wrapper

We're going to create a _GraphQL schema_ – a type system that describes your universe of data – that wraps calls to your existing REST API. This schema will receive and resolve GraphQL queries all on the client side. This architecture features some inherent performance flaws, but is fast to implement and requires no server changes.

Imagine a REST API that exposes a `/people/` endpoint through which you can browse `Person` models and their associated friends.

![A REST API that exposes an index of people][rest-api-people]

We will build a GraphQL schema that models people and their attributes (like `first_name` and `email`) as well as their association to other people through friendships.

### Installation

First we'll need a set of schema building tools.

```
npm install --save graphql
```

### Building the GraphQL Schema

Ultimately we will want to export a `GraphQLSchema` that we can use to resolve queries.

```js
import { GraphQLSchema } from 'graphql';

export default new GraphQLSchema({
  query: QueryType,
});
```

At the root of all GraphQL schemas is a type called `query` whose definition we provide, and have specified here as `QueryType`. Let's build `QueryType` now – a type on which we will define all the possible things one might want to fetch.

To replicate all of the functionality of our REST API, let's expose two fields on `QueryType`:

* an `allPeople` field – analogous to `/people/`
* a `person(id: String)` field – analogous to `/people/{ID}/`

Each field will consist of a return type, optional argument definitions, and a JavaScript method that resolves the data being queried for.

```js
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    allPeople: {
      type: new GraphQLList(PersonType),
      resolve: root => // Fetch the index of people from the REST API,
    },
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => // Fetch the person with ID `args.id`,
    },
  }),
});
```

Let's leave the resolvers as a sketch for now, and move on to defining `PersonType`.

```js
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'Somebody that you used to know',
  fields: () => ({
    firstName: {
      type: GraphQLString,
      resolve: person => person.first_name,
    },
    lastName: {
      type: GraphQLString,
      resolve: person => person.last_name,
    },
    email: {type: GraphQLString},
    id: {type: GraphQLString},
    username: {type: GraphQLString},
    friends: {
      type: new GraphQLList(PersonType),
      resolve: person => // Fetch the friends with the URLs `person.friends`,
    },
  }),
});
```

Note two things about the definition of `PersonType`. Firstly, we have not supplied a resolver for `email`, `id`, or `username`. The default resolver simply accesses the property of the `person` object that has the same name as the field. This works everywhere except where the property names do not match the field name (eg. the field `firstName` does not match the `first_name` property of the response object from the REST API) or where accessing the property would not yield the object that we want (eg. we want a list of person objects for the `friends` field, not a list of URLs).

Now, let's write resolvers that fetch people from the REST API. Because we need to load from the network, we won't be able to return a value right away. Luckily for us, `resolve()` can return either a value or a `Promise` for a value. We're going to take advantage of this to fire off an HTTP request to the REST API that eventually resolves to a JavaScript object that conforms to `PersonType`.

And here we have it – a complete first-pass at the schema:

```js{28,38,45}
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

const BASE_URL = 'https://myapp.com/';

function fetchResponseByURL(relativeURL) {
  return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
}

function fetchPeople() {
  return fetchResponseByURL('/people/').then(json => json.people);
}

function fetchPersonByURL(relativeURL) {
  return fetchResponseByURL(relativeURL).then(json => json.person);
}

const PersonType = new GraphQLObjectType({
  /* ... */
  fields: () => ({
    /* ... */
    friends: {
      type: new GraphQLList(PersonType),
      resolve: person => person.friends.map(getPersonByURL),
    },
  }),
});

const QueryType = new GraphQLObjectType({
  /* ... */
  fields: () => ({
    allPeople: {
      type: new GraphQLList(PersonType),
      resolve: fetchPeople,
    },
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => fetchPersonByURL(`/people/${args.id}/`),
    },
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});
```


### Using a client-side schema with Relay

Normally, Relay will send its GraphQL queries to a server over HTTP. We can inject [@taion](https://github.com/taion/)'s custom `relay-local-schema` network layer to resolve queries using the schema we just built. Put this code wherever it's guaranteed to be executed before you mount your Relay app.

```
npm install --save relay-local-schema
```

```
import RelayLocalSchema from 'relay-local-schema';

import schema from './schema';

Relay.injectNetworkLayer(
  new RelayLocalSchema.NetworkLayer({ schema })
);
```

And that's that. Relay will send all of its queries to your custom client-resident schema, which will in turn resolve them by making calls to your existing REST API.

## A server-side REST wrapper

The client-side REST API wrapper demonstrated above should help you get up and running quickly so that you can try out a Relay version of your app (or part of your app).

However, as we mentioned before, this architecture features some inherent performance flaws because of how GraphQL is still calling your underlying REST API which can be very network intensive. A good next step is to move the schema from the client side to the server side to minimize latency on the network and to give you more power to cache responses.

Take the next 10 minutes to watch me build a server side version of the GraphQL wrapper above using Node and Express.

<iframe id="ytplayer" type="text/html" width="640" height="390"
  src="https://www.youtube.com/embed/UBGzsb2UkeY?autoplay=0&origin=http://graphql.org&start=900"
  frameborder="0"></iframe>

## Bonus round: A truly Relay compliant schema

The schema we developed above will work for Relay up until a certain point – the point at which you ask Relay to refetch data for records you've already downloaded. Relay's refetching subsystem relies on your GraphQL schema exposing a special field that can fetch any entity in your data universe by GUID. We call this the _node interface_.

To expose a node interface requires that you do two things: offer a `node(id: String!)` field at the root of the query, and switch all of your ids over to GUIDs (globally-unique ids).

The `graphql-relay` package contains some helper functions to make this easy to do.

```
npm install --save graphql-relay
```

#### Global ids

First, let's change the `id` field of `PersonType` into a GUID. To do this, we'll use the `globalIdField` helper from `graphql-relay`.

```js
import {
  globalIdField,
} from 'graphql-relay';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'Somebody that you used to know',
  fields: () => ({
    id: globalIdField('Person'),
    /* ... */
  }),
});
```

Behind the scenes `globalIdField` returns a field definition that resolves `id` to a `GraphQLString` by hashing together the typename `'Person'` and the id returned by the REST API. We can later use `fromGlobalId` to convert the result of this field back into `'Person'` and the REST API's id.

#### The node field

Another set of helpers from `graphql-relay` will give us a hand developing the node field. Your job is to supply the helper two functions:

* One function that can resolve an object given a GUID.
* One function that can resolve a typename given an object.

```js
import {
  fromGlobalId,
  nodeDefinitions,
} from 'graphql-relay';

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Person') {
      return fetchPersonByURL(`/people/${id}/`);
    }
  },
  object => {
    if (object.hasOwnProperty('username')) {
      return 'Person';
    }
  },
);
```

The object-to-typename resolver above is no marvel of engineering, but you get the idea.

Next, we simply need to add the `nodeInterface` and the `nodeField` to our schema. A complete example follows:

```js{27-39,54,61,72}
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

const BASE_URL = 'https://myapp.com/';

function fetchResponseByURL(relativeURL) {
  return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
}

function fetchPeople() {
  return fetchResponseByURL('/people/').then(json => json.people);
}

function fetchPersonByURL(relativeURL) {
  return fetchResponseByURL(relativeURL).then(json => json.person);
}

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'Person') {
      return fetchPersonByURL(`/people/${id}/`);
    }
  },
  object => {
    if (object.hasOwnProperty('username')) {
      return 'Person';
    }
  },
);

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'Somebody that you used to know',
  fields: () => ({
    firstName: {
      type: GraphQLString,
      resolve: person => person.first_name,
    },
    lastName: {
      type: GraphQLString,
      resolve: person => person.last_name,
    },
    email: {type: GraphQLString},
    id: globalIdField('Person'),
    username: {type: GraphQLString},
    friends: {
      type: new GraphQLList(PersonType),
      resolve: person => person.friends.map(fetchPersonByURL),
    },
  }),
  interfaces: [ nodeInterface ],
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    allPeople: {
      type: new GraphQLList(PersonType),
      resolve: fetchPeople,
    },
    node: nodeField,
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => fetchPersonByURL(`/people/${args.id}/`),
    },
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});
```

## Taming pathological queries

Consider the following friends-of-friends-of-friends query:

```graphql
query {
  person(id: "1") {
    firstName
    friends {
      firstName
      friends {
        firstName
        friends {
          firstName
        }
      }
    }
  }
}
```

The schema we created above will generate multiple round trips to the REST API for the same data.

![Duplicate queries to the REST API][pathological-query]

This is obviously something we would like to avoid! At the very least, we need a way to cache the result of these requests.

We created a library called DataLoader to help tame these sorts of queries.

```
npm install --save dataloader
```

As a special note, make sure that your runtime offers native or polyfilled versions of `Promise` and `Map`. Read more [at the DataLoader site](https://github.com/facebook/dataloader#getting-started).

#### Creating a data loader

To create a `DataLoader` you supply a method that can resolve a list of objects given a list of keys. In our example, the keys are URLs at which we access our REST API.

```js
const personLoader = new DataLoader(
  urls => Promise.all(urls.map(getPersonByURL))
);
```

If this data loader sees a key more than once in its lifetime, it will return a memoized (cached) version of the response.

#### Loading data

We can make use of the `load()` and `loadMany()` methods on `personLoader` to load URLs without fear of hitting the REST API more than once per URL. A complete example follows:

```js{36,63,83}
import DataLoader from 'dataloader';
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

const BASE_URL = 'https://myapp.com/';

function fetchResponseByURL(relativeURL) {
  return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
}

function fetchPeople() {
  return fetchResponseByURL('/people/').then(json => json.people);
}

function fetchPersonByURL(relativeURL) {
  return fetchResponseByURL(relativeURL).then(json => json.person);
}

const personLoader = new DataLoader(
  urls => Promise.all(urls.map(fetchPersonByURL))
);

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const {type, id} = fromGlobalId(globalId);
    if (type === 'Person') {
      return personLoader.load(`/people/${id}/`);
    }
  },
  object => {
    if (object.hasOwnProperty('username')) {
      return 'Person';
    }
  },
);

const PersonType = new GraphQLObjectType({
  name: 'Person',
  description: 'Somebody that you used to know',
  fields: () => ({
    firstName: {
      type: GraphQLString,
      resolve: person => person.first_name,
    },
    lastName: {
      type: GraphQLString,
      resolve: person => person.last_name,
    },
    email: {type: GraphQLString},
    id: globalIdField('Person'),
    username: {type: GraphQLString},
    friends: {
      type: new GraphQLList(PersonType),
      resolve: person => personLoader.loadMany(person.friends),
    },
  }),
  interfaces: [nodeInterface],
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    allPeople: {
      type: new GraphQLList(PersonType),
      resolve: fetchPeople,
    },
    node: nodeField,
    person: {
      type: PersonType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => personLoader.load(`/people/${args.id}/`),
    },
  }),
});

export default new GraphQLSchema({
  query: QueryType,
});
```

Now, our pathological query produces the following nicely de-duped set of requests to the REST API:

![De-duped queries to the REST API][dataloader-query]

### Query planning and beyond

Consider that your REST API might already offer configuration offers that let you eagerly load associations. Maybe to load a person and all of their direct friends you might hit the URL `/people/1/?include_friends`. To take advantage of this in your GraphQL schema you will need the ability to develop a resolution plan based on the structure of the query itself (eg. whether the `friends` field is part of the query or not).

For those interested in the current thinking around advanced resolution strategies, keep an eye on [pull request #304](https://github.com/graphql/graphql-js/pull/304).

## Thanks for reading

I hope that this demonstration has torn down some of the barriers between you and a functional GraphQL endpoint, and has inspired you to experiment with GraphQL and Relay on an existing project.

[rest-api-people]: /img/blog/20160502-rest-api-graphql-wrapper/rest-api-people.png "A REST API that exposes an index of people"
[pathological-query]: /img/blog/20160502-rest-api-graphql-wrapper/pathological-query.png "Duplicate queries to the REST API"
[dataloader-query]: /img/blog/20160502-rest-api-graphql-wrapper/dataloader-query.png "De-duped queries to the REST API"
