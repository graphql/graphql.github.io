---
title: Versioning GraphQL APIs
layout: docs
category: Best Practices
permalink: /learn/versioning/
next: /learn/serving-over-http/
---

## All About Versioning
> Don't let your application break by some breaking changes, Version your APIs

After a certain period of time, applications and softwares get challenged with some changes in users and business needs. Due to which stability is not compatible with the system while changing only some parts. This is where versioning comes into picture. Versioning of API is done to update the existing API and make it compatible with the updated needs and services. Any change in the existing feature can break the application and so the new versions of API should be developed. 

### Versioning of REST
Now let’s have a look on versioning of RESTful API. You’ll wonder why we are talking about RESTful APIs. But gradually you will understand how versioning of  GraphQL is much simpler and beautiful than REST. There are many best practices and strategies for REST API versioning such as

* URI Versioning : /api/v1
* Query Parameters :  /api?version=1
* Custom Headers : Accept-version : v1

In most of the cases, uri versioning is used for versioning REST API. The client uses a specific version of API for implementations. 


### Let's have a look at GraphQL
For GraphQL, you introduce or deprecate the fields or schema instead of versioning. While using GraphQL, one key point is that the query itself decides what response client wants. So there will be only one endpoint while using GraphQL API. We can say that instead of versioning, we are just modifying the existing schema. 

Let’s understand by an example. 
We have a schema named user, which had fields such as id, firstName and lastName. 
```graphql
type User {
	id: Int!
	firstName: String!
	lastName: String!
}
```

In the above schema all fields are required. But in the next version we can add a variable and can also change the requirements. Such as :
```graphql
type User {
	id: Int!
	firstName: String!
	middleName: String!
	lastName: String!
}
```

Here we have added the `middleName` field which is optional.

* The best practice is to use “@deprecated(reason)” defined in the schema. By using this the client can know which filed to use and which one is deprecated. This will not define the version number as the semantic versioning does. The deprecated fields will be shown by the GraphQL Explorer.


### More info on Versioning
There are few other best practices for versioning GraphQL APIs.
Version constraints can be added to the query which will tell that the field will be resolved by which version. Using version constraints we can access different fields of different versions. For example, the query will look like : 
```graphql
query {
	account(id : 5){
		old: profilePhoto(versionContraint: “^0.1”)
		new: profilePhoto(versionContraint: “^0.2”)
	}
}
```

We can define the versions in the schema and query can be written as above to access the fields of different versions.

### Evolution of Schema
This is definitely different from versioning, but this will be helpful to build schemas which can be evolved with time without making breaking changes. Schema can be evolved by making changes such as adding/removing fields, structures, types, etc. While making these changes, there can be some points which will restrict the schema while evolving and then @deprecated needs to be used as a last resort. For example there is a schema :
```graphql
type  User{
	id: String!
	name: String!
	Username: String!
	birthDate: DateTime!
	lastLoginHistory: [DateTime]!
}

```
In the above schema we have one field named lastLoginHistory which stores the DateTime fields as a list. Now there needs some changes in the schema and some additional data needs to be added in lastLoginHistory. For that we need to add another field to the User schema. These changes will add many fields and this could make the schema lengthier and worse.

But rather than this, we can build a schema for storing lastLoginHistory data and we can use that schema referenced to the User schema.
```graphql
type NewDateTime: {
	lastLoginTime: DateTime!
	lastLoginPeriodLength: Time!
}
```
``` graphql
type User{
	id: String!
	name: String!
	Username: String!
	birthDate: DateTime!
	lastLoginHistory: NewDateTime!
}
```
This way schemas can be evolved and can be maintained in a better way. Non-required fields should be deprecated but also the new fields should be introduced in that period and the old fields should be removed in such a way that no breaking changes occur.


### Example of Shopify
Shopify versioned their GraphQL APIs using the url versioning approach and made their graphql endpoint such as “/api/{ version }/graphql.json”. [Here](https://shopify.dev/concepts/about-apis/versioning#the-api-version-release-schedule) is the document of shopify. They deprecate the fields and instead name the new variable as newVariablev2.

### Some tools for managing schemas 
There are some tools which are used for schema validation, tracking schema versions, identifying unused types and many more. Some of the tools are `Apollo Graph Manager` and `GraphQL Inspector`. Schema can be validated using these tools and you can track all the schema changes. 

Using [Apollo Graph Manager](https://www.apollographql.com/docs/graph-manager/), you will be able to validate the schema and get the changes done in schema. For example : you will get to know which field is deprecated, for what reason and which fields are added new, etc. You will be able to validate the schema and check if anything is breaking or not. And you will also be able to know some detailed schema changes provided by this tool. 
Apollo schema registry can track the changes of the schema and also gives the option to create variants of the schema. Also you can trace your GraphQL server by getting the report of which operations are being executed, which clients are executing which operations, which parts of schema are most used and which of the resolvers are used most.

Now let’s have a look at GraphQL Inspector which also provides some similar functionalities.

Using [GraphQL Inspector](https://graphql-inspector.com/), you can detect the changes which can be breaking changes for the current schema. You are able to know the restriction changes in fields as well as addition/subtraction in fields. A complete difference is provided between old schema and new schema. And by that you can get to know the differences in form of non-breaking change, dangerous change and breaking change. 
In addition you can get the idea of coverage of the schema and can track which part of the schema is used, and by how many times. If any of the fields are deprecated, then the usage of those fields as well as checking of errors can be done using GraphQL Inspector.

### Conclusion
By this way we can version the GraphQL APIs and just move to the game of managing fields instead of versioning. It’s as simple as if you don’t want any field, then just drop it and add necessary fields with appropriate roles.
