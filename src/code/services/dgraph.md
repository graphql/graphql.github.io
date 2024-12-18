---
name: Dgraph
description: Dgraph is a native GraphQL database with a graph backend. This means Dgraph is not an interface on top of an existing database like Postgres but is actually designed from the ground-up for GraphQL. It is optimized for speed and performance, depending on multiple computer science breakthroughs to get the best result. Dgraph Cloud is a fully managed GraphQL backend service that lets you iterate faster, without worrying about your infrastructure.
url: https://dgraph.io/graphql
github: dgraph-io/dgraph
---

Install Steps if running locally on linux not on Dgraph Cloud:

```bash
docker pull dgraph/standalone
mkdir -p ~/dgraph
docker run -it -p 5080:5080 -p 6080:6080 -p 8080:8080 \
  -p 9080:9080 -p 8000:8000 -v ~/dgraph:/dgraph --name dgraph \
  dgraph/standalone:master
```

Set your GraphQL Schema:

```bash
touch schema.graphql
nano schema.graphql
```

```graphql
type Product {
  id: ID!
  name: String! @id
  reviews: [Review] @hasInverse(field: about)
}

type Customer {
  username: String! @id
  reviews: [Review] @hasInverse(field: by)
}

type Review {
  id: ID!
  about: Product!
  by: Customer!
  comment: String @search(by: [fulltext])
  rating: Int @search
}
```

```bash
curl -X POST localhost:8080/admin/schema --data-binary '@schema.graphql'
```

Fire up your favorite GraphQL Client pointed at `http://localhost:8080/graphql` and run mutations and queries

```graphql
mutation {
  addProduct(input: [{ name: "Dgraph" }, { name: "Dgraph Cloud" }]) {
    product {
      id
      name
    }
  }
  addCustomer(input: [{ username: "TonyStark" }]) {
    customer {
      username
    }
  }
}
```

```graphql
mutation {
  addReview(
    input: [
      {
        by: { username: "TonyStark" }
        about: { name: "Dgraph" }
        comment: "Fantastic, easy to install, worked great. Best GraphQL server available"
        rating: 10
      }
    ]
  ) {
    review {
      id
      comment
      rating
      by {
        username
      }
      about {
        id
        name
      }
    }
  }
}
```

```graphql
query {
  queryReview(
    filter: { comment: { alloftext: "server easy install" }, rating: { gt: 5 } }
  ) {
    comment
    by {
      username
      reviews(order: { desc: rating }, first: 10) {
        about {
          name
          reviews(order: { asc: rating }, first: 5) {
            by {
              username
            }
            comment
            rating
          }
        }
        rating
      }
    }
    about {
      name
    }
  }
}
```
