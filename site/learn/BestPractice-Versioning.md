---
title: Versioning GraphQL APIs
layout: ../_core/DocsLayout
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
	id: Int!,
	firstName : String!,
	lastName : String!
}
```

In the above schema all fields are required. But in the next version we can add a variable and can also change the requirements. Such as :
```graphql
type User {
	Id : Int!,
	firstName : String!,
	middleName : String!
	lastName : String,
}
```

Here we have added the middleName parameter which is mandatory and have changed lastName to optional.


* The best practice is to use “@deprecated(reason)” defined in the schema. By using this the client can know which filed to use and which one is deprecated. This will not define the version number as the semantic versioning does. The deprecated fields will be shown by the GraphQL Explorer.

### Example of Shopify
Shopify versioned their GraphQL APIs using the url versioning approach and made their graphql endpoint such as “/api/{ version }/graphql.json”. [Here](https://shopify.dev/concepts/about-apis/versioning#the-api-version-release-schedule) is the document of shopify. They deprecate the fields and instead name the new variable as newVariablev2.


### More info on Versioning
There are few other best practices for versioning GraphQL APIs.
Version constraints can be added to the query which will tell that the field will be resolved by which version. Using version constraints we can access different fields of different versions. For example, the query will look like : 
```graphql
query {
	account(id : 5){
		old : profilePhoto(versionContraint : “^0.1”)
		new : profilePhoto(versionContraint : “^0.2”)
	}
}
```

We can define the versions in the schema and query can be written as above to access the fields of different versions.

