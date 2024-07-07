---
name: GraphQL Java Generator
description: GraphQL Java Generator is a tool that generates Java code to speed up development for Client and Server of GraphQL APIs
url: https://github.com/graphql-java-generator
github: graphql-java-generator/graphql-gradle-plugin-project
---

- GraphQL Java client: it generates the Java classes that call the GraphQL endpoint, and the POJO that will contain the data returned by the server.
  The GraphQL endpoint can then be queried by using a simple call to a Java method (see sample below)
- GraphQL Java server: it is based on [graphql-java](https://github.com/graphql-java/graphql-java) (listed here above). It generates all the boilerplate code.
  You'll only have to implement what's specific to your server, which are the joins between the GraphQL types.
  GraphQL Java Generator is available as a [Maven Plugin](https://graphql-maven-plugin-project.graphql-java-generator.com/index.html).
  A Gradle plugin is coming soon.
  Please note that GraphQL Java Generator is an accelerator: the generated code doesn’t depend on any library specific to GraphQL Java Generator.
  So, it helps you to start building application based on graphql-java. Once the code is generated, you can decide to manually edit it as any standard java application, and get rid of GraphQL Java Generator.
  Of course you can, and should, according to us :), continue using GraphQL Java Generator when your project evolves.
