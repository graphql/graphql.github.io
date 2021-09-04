---
name: graphql-calculator
description: A lightweight graphql calculation engine.
url: https://github.com/graphql-calculator/graphql-calculator
github: graphql-calculator/graphql-calculator
---

GraphQL Calculator is a lightweight graphql calculation engine, 
which is used to alter execution behavior of graphql query.

Here are some examples on how to use GraphQL Calculator on graphql query.

```graphql

query baseMap($userIds:[Int]){
    userInfoList(userIds:$userIds)
    {
        id
        age
        firstName
        lastName
        fullName: stringHolder @map(mapper: "firstName + lastName")
    }
}


query filterUserByAge($userId:[Int]){
    userInfoList(userIds: $userId)
    @filter(predicate: "age>=18")
    {
        userId
        age
        firstName
        lastName
    }
}

query sortUserListByAge($userId:[Int]){
    userInfoList(userIds: $userId)
    @sort(key: "age",reversed: true)
    {
        userId
        age
        firstName
        lastName
    }
}
```

See [graphql-calculator README](https://github.com/graphql-calculator/graphql-calculator) for more information.

