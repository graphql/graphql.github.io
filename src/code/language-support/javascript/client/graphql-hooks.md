---
name: graphql-hooks
description: Minimal React hooks-first GraphQL client with a tiny bundle, SSR support and caching
github: nearform/graphql-hooks
npm: graphql-hooks
---

- 🥇 First-class hooks API
- ⚖️ _Tiny_ bundle: only 7.6kB (2.8 gzipped)
- 📄 Full SSR support: see [graphql-hooks-ssr](packages/graphql-hooks-ssr)
- 🔌 Plugin Caching: see [graphql-hooks-memcache](packages/graphql-hooks-memcache)
- 🔥 No more render props hell
- ⏳ Handle loading and error states with ease

### Quickstart

```bash
npm install graphql-hooks
```

First you'll need to create a client and wrap your app with the provider:

```js
import { GraphQLClient, ClientContext } from "graphql-hooks"

const client = new GraphQLClient({
  url: "/graphql",
})

function App() {
  return (
    <ClientContext.Provider value={client}>
      {/* children */}
    </ClientContext.Provider>
  )
}
```

Now in your child components you can make use of `useQuery`:

```js
import { useQuery } from "graphql-hooks"

const HOMEPAGE_QUERY = `query HomePage($limit: Int) {
  users(limit: $limit) {
    id
    name
  }
}`

function MyComponent() {
  const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {
    variables: {
      limit: 10,
    },
  })

  if (loading) return "Loading..."
  if (error) return "Something Bad Happened"

  return (
    <ul>
      {data.users.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  )
}
```
