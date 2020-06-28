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

