---
name: Mu-Haskell with Mu-GraphQL
description: A Haskell library for building microservices (gRPC, HTTP) and GraphQL APIs.
url: https://higherkindness.io/mu-haskell/
github: higherkindness/mu-haskell
---

Example implementation of a GraphQL server with type-level representation of the schema auto-generated:

```haskell
{-# LANGUAGE DataKinds #-}
{-# LANGUAGE NamedFieldPuns #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE PartialTypeSignatures #-}
{-# LANGUAGE TypeApplications #-}
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE TypeOperators #-}

-- imports omitted for brevity...

graphql "Library" "library.graphql" -- all the magic happens here! 🪄🎩

-- ... a bit more code...

libraryServer :: SqlBackend -> ServerT ObjectMapping i Library ServerErrorIO _
libraryServer conn =
  resolver
    ( object @"Book"
        ( field @"id" bookId,
          field @"title" bookTitle,
          field @"author" bookAuthor,
          field @"imageUrl" bookImage
        ),
      object @"Author"
        ( field @"id" authorId,
          field @"name" authorName,
          field @"books" authorBooks
        ),
      object @"Query"
        ( method @"authors" allAuthors,
          method @"books" allBooks
        ),
      object @"Mutation"
        ( method @"newAuthor" newAuthor,
          method @"newBook" newBook
        ),
      object @"Subscription"
        (method @"allBooks" allBooksConduit)
    )
  where
    bookId :: Entity Book -> ServerErrorIO Integer
    bookId (Entity (BookKey k) _) = pure $ toInteger k
    -- ... more resolvers...
```

See [our docs](https://higherkindness.io/mu-haskell/graphql/) for more information about how to build your own GraphQL server and [the library example](https://github.com/higherkindness/mu-graphql-example-elm) for a more end-to-end example that includes a client written in Elm!
