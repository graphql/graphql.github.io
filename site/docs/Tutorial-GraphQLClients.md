---
title: GraphQL Clients
layout: ../_core/DocsLayout
category: Tutorial
permalink: /graphql-js/graphql-clients/
next: /graphql-js/basic-types/
---

Since a GraphQL API has more underlying structure than a REST API, there are more powerful clients like [Relay](https://facebook.github.io/relay/) which can automatically handling batching, caching, and other features. But you don't need a complex client to call a GraphQL server. With `express-graphql`, you can just send an HTTP POST request to the endpoint you mounted your GraphQL server on, passing the GraphQL query as the `query` field in a JSON payload.

For example, let's say we mounted a GraphQL server on [http://localhost:4000/graphql](http://localhost:4000/graphql) as in the example code for [running an Express GraphQL server](/graphql-js/running-an-express-graphql-server/), and we want to send a GraphQL request from the browser. Open up [http://localhost:4000](http://localhost:4000/), open a developer console, and paste in:

```javascript
var query = '{ hello }';
fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({query: query}),
}).then(response => response.json()).then((response) => {
  console.log('data returned:', response.data);
});
```

You should see the data returned, logged in the console:

```
data returned: Object { hello: "Hello world!" }
```

The `fetch` API used here is in most modern browsers - check out [Mozilla's documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) if you'd like to learn more. Any mechanism of sending HTTP requests should work similarly. In the browser, we recommend using `fetch` over `XMLHttpRequest` if you have the choice because the API is nicer. In a mobile application, you can use whatever library you'd normally use to send HTTP requests.

In general, it will take a bit more time to set up a GraphQL client like Relay, but it's worth it to get more features as your application grows. You might want to start out just using HTTP requests as the underlying transport layer, and switching to a more complex client as your application gets more complex.

At this point you can write a client and server in GraphQL for an API that receives a single string. To do more, you will want to [learn how to use the other basic data types](/graphql-js/basic-types/).
