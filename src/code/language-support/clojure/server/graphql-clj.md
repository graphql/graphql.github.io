---
name: graphql-clj
description: A Clojure library that provides a GraphQL implementation.
github: tendant/graphql-clj
---

Code that executes a hello world GraphQL query with `graphql-clj`:

```clojure
(def schema "type QueryRoot {
    hello: String
  }")

(defn resolver-fn [type-name field-name]
  (get-in {"QueryRoot" {"hello" (fn [context parent & rest]
                              "Hello world!")}}
          [type-name field-name]))

(require '[graphql-clj.executor :as executor])

(executor/execute nil schema resolver-fn "{ hello }")
```
