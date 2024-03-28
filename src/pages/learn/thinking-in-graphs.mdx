# Thinking in Graphs

## It's Graphs All the Way Down[^1]

> With GraphQL, you model your business domain as a graph

Graphs are powerful tools for modeling many real-world phenomena because they resemble our natural mental models and verbal descriptions of the underlying process. With GraphQL, you model your business domain as a graph by defining a schema; within your schema, you define different types of nodes and how they connect/relate to one another. On the client, this creates a pattern similar to Object-Oriented Programming: types that reference other types. On the server, since GraphQL only defines the interface, you have the freedom to use it with any backend (new or legacy!).

## Shared Language

> Naming things is a hard but important part of building intuitive APIs

Think of your GraphQL schema as an expressive shared language for your team and your users. To build a good schema, examine the everyday language you use to describe your business. For example, let's try to describe an email app in plain English:

- A user can have multiple email accounts
- Each email account has an address, inbox, drafts, deleted items, and sent items
- Each email has a sender, receive date, subject, and body
- Users cannot send an email without a recipient address

Naming things is a hard but important part of building intuitive APIs, so take time to carefully think about what makes sense for your problem domain and users. Your team should develop a shared understanding and consensus of these business domain rules because you will need to choose intuitive, durable names for nodes and relationships in the GraphQL schema. Try to imagine some of the queries you will want to execute:

Fetch the number of unread emails in my inbox for all my accounts

```graphql
{
  accounts {
    inbox {
      unreadEmailCount
    }
  }
}
```

Fetch the "preview info" for the first 20 drafts in the main account

```graphql
{
  mainAccount {
    drafts(first: 20) {
      ...previewInfo
    }
  }
}

fragment previewInfo on Email {
  subject
  bodyPreviewSentence
}
```

## Business Logic Layer

> Your business logic layer should act as the single source of truth for enforcing business domain rules

Where should you define the actual business logic? Where should you perform validation and authorization checks? The answer: inside a dedicated business logic layer. Your business logic layer should act as the single source of truth for enforcing business domain rules.

![Business Logic Layer Diagram](/img/diagrams/business_layer.png)

In the diagram above, all entry points (REST, GraphQL, and RPC) into the system will be processed with the same validation, authorization, and error handling rules.

### Working with Legacy Data

> Prefer building a GraphQL schema that describes how clients use the data, rather than mirroring the legacy database schema.

Sometimes, you will find yourself working with legacy data sources that do not perfectly reflect how clients consume the data. In these cases, prefer building a GraphQL schema that describes how clients use the data, rather than mirroring the legacy database schema.

Build your GraphQL schema to express "how" rather than "what". Then you can improve your implementation details without breaking the interface with older clients.

## One Step at a time

> Get validation and feedback more frequently

Don't try to model your entire business domain in one sitting. Rather, build only the part of the schema that you need for one scenario at a time. By gradually expanding the schema, you will get validation and feedback more frequently to steer you toward building the right solution.

[^1]: ["Turtles all the way down"](https://en.wikipedia.org/wiki/Turtles_all_the_way_down) is an expression of the problem of infinite regress.
