## Contributing to the Code Page

Hi, thanks for reading the docs! 

Secondly, we want to provide a really strong overview of all the libraries in the GraphQL eco-system. To make this
easy for contributors the code page is automatically generated from a series of markdown files in this repo.

```sh
$ tree src/content/code
src/content/code
├── language-support
│   ├── c-c
│   │   └── tools
│   │       └── libgraphqlparser.md
│   ├── clojure
│   │   ├── client
│   │   │   └── regraph.md
│   │   └── server
│   │       ├── alumbra.md
│   │       ├── graphql-clj.md
│   │       └── lacinia.md
│   ├── c-net
│   │   ├── client
│   │   │   ├── graphql-client.md
│   │   │   ├── graphql-net-client.md
│   │   │   └── sahb-graphqlclient.md
// etc
```

We'd love any new project to include a few paragraphs describing its goals and usage, the goal here is to make it easy for people to decide between options.

Here's an optimal example example of what we're looking for:

- It uses yml frontmatter to provide additional information like repo, npm
- It explains itself in the 'description' then fills fleshes out that description with some code samples

````md
---
name: Express GraphQL
description: The reference implementation of a GraphQL API server over an Express webserver. You can use this to run GraphQL in conjunction with a regular Express webserver, or as a standalone GraphQL server.
url: /graphql-js/running-an-express-graphql-server/
github: graphql/express-graphql
npm: "express-graphql"
---

To run an `express-graphql` hello world server:

```bash
npm install express express-graphql graphql
```

Then run `node server.js` with this code in `server.js`:

```js
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
```

````

Any library/tool/service has a maximum height in the site, and then it can be expanded by clicking, so if you need quite a lot of space to explain your project then that's OK.
