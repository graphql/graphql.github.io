---
name: GQty
description: The No-GraphQL client for TypeScript.
url: http://gqty.dev/
github: gqty-dev/gqty
npm: "gqty"
---

GQty is a query builder, a query fetcher and a cache manager solution all-in-one.

You interact with your GraphQL endpoint via Proxy objects. Under the hood, GQty captures what is being read, checks cache validity, fetch missing contents and then updates the cache for you.

Start using GQty by simply running our interactive codegen:

```bash
# npm
npx @gqty/cli

# yarn
yarn dlx @gqty/cli

# pnpm
pnpm dlx @gqty/cli
```

GQty also provides framework specific integrations such as `@gqty/react` and `@gqty/solid`, which can be installed via our CLI.
