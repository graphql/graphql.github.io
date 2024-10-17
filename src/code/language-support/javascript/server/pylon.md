---
name: Pylon
description: A code-first framework for GraphQL API development, where your schema reflects your functionality. Run `npm create pylon@latest` to get started.
url: https://pylon.cronit.io
github: getcronit/pylon
---

1. **Create**

```bash
npm create pylon@latest
```

2. **Develop**

Example service:

```typescript
import { app } from "@getcronit/pylon"

class User {
  name: string
  email: string
  constructor(name: string, email: string) {
    this.name = name
    this.email = email
  }
}

const users = [
  new User("Alice", "alice@example.com"),
  new User("Bob", "bob@example.com"),
  new User("Charlie", "charlie@example.com"),
]

export const graphql = {
  Query: {
    users,
    user: (name: string) => {
      return users.find(user => user.name === name)
    },
  },
  Mutation: {
    addUser: (name: string, email: string) => {
      const user = new User(name, email)
      users.push(user)
      return user
    },
  },
}

export default app
```

3. **Query**

```graphql
query User {
  user(name: "Alice") {
    name
    email
  }
}

query Users {
  users {
    name
    email
  }
}

mutation AddUser {
  addUser(name: "Corina", email: "corina@example.com") {
    name
    email
  }
}
```
