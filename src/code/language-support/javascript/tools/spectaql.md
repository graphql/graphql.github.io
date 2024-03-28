---
name: SpectaQL
description: SpectaQL generates static HTML documentation from a GraphQL schema.
github: anvilco/spectaql
npm: "spectaql"
---

SpectaQL is a Node.js library that generates static documentation for a GraphQL schema using a variety of options:

- From a live endpoint using the introspection query.
- From a file containing an introspection query result.
- From a file, files or glob leading to the schema definitions in SDL.

Out of the box, SpectaQL generates a single 3-column HTML page and lets you choose between a couple built-in themes. A main goal of the project is to be easily and extremely customizable--it is themeable and just about everything can be overridden or customized.

```sh
npm install --dev spectaql
# OR
yarn add -D spectaql

# Then generate your docs
npm run spectaql my-config.yml
# OR
yarn spectaql my-config.yml
```
