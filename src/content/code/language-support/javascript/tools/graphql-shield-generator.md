---
name: GraphQL Shield Generator
description: Emits a GraphQL Shield from your GraphQL schema.
url: https://github.com/omar-dulaimi/graphql-shield-generator
github: omar-dulaimi/graphql-shield-generator
npm: "graphql-shield-generator"
---

This project helps you to automatically generate a GraphQL Shield from your GraphQL Schema, eliminating the need for manually 
writing it. It reads your schema, so the shield generated is always in-sync.

```ts
import { generateGraphqlShield } from 'graphql-shield-generator';

await generateGraphqlShield({
  schema,
  options: {
    outputDir: './permissions',
    fileName: 'shield',
    extension: 'ts',
  },
});

// or

await generateGraphqlShield({
  schema: { typeDefs, resolvers },
  options: {
    outputDir: './permissions',
    fileName: 'shield',
    extension: 'ts',
  },
});

```