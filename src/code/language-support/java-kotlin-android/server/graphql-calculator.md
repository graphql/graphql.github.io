---
name: graphql-calculator
description: A lightweight graphql calculation engine.
github: graphql-calculator/graphql-calculator
---

GraphQL Calculator is a lightweight graphql calculation engine,
which is used to alter execution behavior of graphql query.

Here are some examples on how to use GraphQL Calculator on graphql query.

```graphql
query basicMapValue($userIds: [Int]) {
  userInfoList(userIds: $userIds) {
    id
    age
    firstName
    lastName
    fullName: stringHolder @map(mapper: "firstName + lastName")
  }
}

query filterUserByAge($userId: [Int]) {
  userInfoList(userIds: $userId) @filter(predicate: "age>=18") {
    userId
    age
    firstName
    lastName
  }
}

query parseFetchedValueToAnotherFieldArgumentMap($itemIds: [Int]) {
  itemList(itemIds: $itemIds) {
    # save sellerId as List<Long> with unique name "sellerIdList"
    sellerId @fetchSource(name: "sellerIdList")
    name
    saleAmount
    salePrice
  }

  userInfoList(userIds: 1)
    # transform the argument of "userInfoList" named "userIds" according to expression "sellerIdList" and expression argument,
    # which mean replace userIds value by source named "sellerIdList"
    @argumentTransform(
      argumentName: "userIds"
      operateType: MAP
      expression: "sellerIdList"
      dependencySources: ["sellerIdList"]
    ) {
    userId
    name
    age
  }
}
```

See [graphql-calculator README](https://github.com/graphql-calculator/graphql-calculator) for more information.
