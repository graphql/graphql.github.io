---
name: Morpheus GraphQL
description: A Haskell library for building GraphQL APIs.
github: morpheusgraphql/morpheus-graphql
---

Hello world example with `morpheus-graphql`:

```graphql
# schema.gql
"""
A supernatural being considered divine and sacred
"""
type Deity {
  name: String!
  power: String @deprecated(reason: "no more supported")
}
type Query {
  deity(name: String! = "Morpheus"): Deity!
}
```

```haskell
{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE DuplicateRecordFields #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE NamedFieldPuns #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}
module API (api) where
import Data.ByteString.Lazy.Char8 (ByteString)
import Data.Morpheus (interpreter)
import Data.Morpheus.Document (importGQLDocument)
import Data.Morpheus.Types (RootResolver (..), Undefined (..))
import Data.Text (Text)
importGQLDocument "schema.gql"
rootResolver :: RootResolver IO () Query Undefined Undefined
rootResolver =
  RootResolver
    { queryResolver = Query {deity},
      mutationResolver = Undefined,
      subscriptionResolver = Undefined
    }
  where
    deity DeityArgs {name} =
      pure
        Deity
          { name = pure name,
            power = pure (Just "Shapeshifting")
          }
api :: ByteString -> IO ByteString
api = interpreter rootResolver
```

See [morpheus-graphql-examples](https://github.com/morpheusgraphql/morpheus-graphql) for more sophisticated APIs.
