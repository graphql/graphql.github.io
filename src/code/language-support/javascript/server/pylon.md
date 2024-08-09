---
name: Pylon
description: A code-first approach to GraphQL API development that generates schemas from TypeScript in real-time, enhancing development speed, type safety, and error reduction, with instant reflection of code changes in the API. For more information, go to https://pylon.cronit.io
url: https://pylon.cronit.io
github: getcronit/pylon
---

Example service:

```typescript
import { defineService } from "@getcronit/pylon"

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

export default defineService({
  Query: {
    users,
    user: (name: string) => {
      return users.find(user => user.name === name)
    },
    Mutation: {
      addUser: (name: string, email: string) => {
        const user = new User(name, email)
        users.push(user)
        return user
      },
    },
  },
})
```

After running the service, you can query it using GraphQL:

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
