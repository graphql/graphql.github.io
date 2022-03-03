---
title: How to Use GraphQL with API Gateway Apache APISIX
tags: ["blog"]
layout: blog
date: 2022-03-03
byline: Chenwei Jiang, Fei Han
permalink: /blog/2022-03-03-apache-apisix
---

This article introduces the characteristics of Apache APISIX and GraphQL, and how to use Apache APISIX proxy GraphQL requests, and proposes a solution to solve the actual scene pain points.

## Background Information

[GraphQL](https://graphql.org/) is an open-source, API-oriented data query operation language and corresponding running environment. IT was originally developed by Facebook in 2012, then it became publicly released in 2015. On November 7th, 2018, Facebook transferred the GraphQL project to the newly established GraphQL foundation.

You can understand GraphQL by analogy with SQL query statements. Compared with SQL query statements, GraphQL provides an easier way to understand and complete description of the data in the API, so that the client can accurately obtain the data it needs through the customized description. This also allows the API to calmly face the development of increasingly complex interfaces and avoid eventually becoming a daunting complex interface.

[Apache APISIX](https://apisix.apache.org/) is a dynamic, real-time, high-performance API gateway that provides rich traffic management features such as load balancing, dynamic upstream, canary release, circuit breaking, authentication, observability, and more.

As a cloud native gateway, Apache APISIX already has the matching ability to recognize GraphQL syntax at the beginning of its design. By efficiently matching GraphQL statements carried in requests, it can filter out abnormal traffic to further ensure security and improve system performance.

Now that we are in the era of big data and large traffic, we can learn from each other's advantages and complement each other in order to form a win-win situation. Next, let me give you a scenario to illustrate.

If there is a practical application scenario microservices architecture, we will discuss the practical application of  Apache APISIX and GraphQL in this scenario.

### Problems Encountered in Actual Scenarios

In the late stage of the project, business complexity and team mobility are often the problems. Micro service architecture has become a common solution to such problems. In microservice architecture, GraphQL exposes two kinds of interfaces: decentralized and centralized. However, only centralized interface design can maximize GraphQL's advantages. However, in centralized interface design, all microservices are exposed to the same interface. So processing flow routing cannot simply forwarded according to the URL, but should be based on the request contained in different fields are forwarded.

Because NGINX only processes URLs and some parameters when processing requests, but only by parsing the query information in the request parameters can the resources accessed by the client be known, so as to perform routing forwarding, so this routing forwarding method cannot be completed through traditional NGINX. . In practical application scenarios, it is very dangerous to directly expose the GraphQL interface to the outside world, so a professional high-performance API gateway is required to protect the GraphQL interface.

### Solution to the Problems

Based on the security, stability, and high performance of Apache APISIX, adding flexible routing matching rules to GraphQL is the best solution to GraphQL's centralized interface design.

![APISIX GraphQL Solution][apisix-graphql-solution]

In this scheme, Apache APISIX is deployed before GraphQL Server as an API gateway, providing security for the whole backend system. In addition, Apache APISIX has GraphQL matching functions according to its own. Some of the requests are filtered and processed by the GraphQL Server, making the whole request resource process more efficient.

Thanks to the dynamic features of Apache APISIX, you can enable plugins such as current limiting, authentication, and observability without restarting services, which further improves the operating efficiency of this solution and facilitates operation and maintenance.

In addition, Apache APISIX can also perform different permission checks for different graphql_operations, and forward to different Upstream for different graphql_names. The details will be described below.

To sum up, the solution of Apache APISIX + GraphQL can fully utilize the advantages of GraphQL search and also have the security and stability of Apache APISIX as  API gateway.

## Application of GraphQL In Apache APISIX

### How It Works

![APISIX GraphQL workflow][apisix-graphql-workflow]

The execution logic of GraphQL in Apache APISIX is as follows:

1. Clients to  Apache APISIX initiated with GraphQL statements request;
2. Apache APISIX matching routing and extract the preset GraphQL data;
3. Apache APISIX matches the request data with the preset GraphQL data;
   1. If the match is successful,  Apache APISIX will continue to forward the request;
   2. If the match fails, Apache APISIX will immediately terminate the request.
4. Whether plugins exist;
   1. if the plugin exists, the request will continue to be processed by the plugin, and after the processing is completed, it will continue to be forwarded to the GraphQL Server;
   2. If no plugin exists, the request will be forwarded directly to GraphQL Server.

In the internal matching of APISIX core, Apache APISIX implements GraphQL support through the [graphql-lua library](https://github.com/bjornbytes/graphql-lua). The Apache APISIX GraphQL parsing library will first parse the request carrying the GraphQL syntax, and then match the parsed request with the configuration data preset in the Apache APISIX database. If the match is successful, Apache APISIX will pass and forward the request, otherwise it will terminate the request.

### Specific Configuration

Apache APISIX currently supports filtering routes by some properties of GraphQL: `graphql_operation`, `graphql_name`, and `graphql_root_fields`.

The GraphQL properties correspond to the GraphQL query statement shown below:

```shell
query getRepo {
    owner {
        name
    }
    repo {
        created
    }
}
```

- `graphql_operation` corresponds to `query`
- `graphql_name` corresponds to `getRepo`，
- `graphql_root_fields` corresponds to `["owner", "repo"]`

You can set up a route for Apache APISIX to verify GraphQL matching capabilities with the following example:

```shell
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -i -d '
{
    "methods": ["POST"],
    "uri": "/_graphql",
    "vars": [
        ["graphql_operation", "==", "query"],
        ["graphql_name", "==", "getRepo"],
        ["graphql_root_fields", "has", "owner"]
    ],
    "upstream": {
        "type": "roundrobin",
        "nodes": {
            "192.168.1.200:4000": 1
        }
    }
}'
```

Then use GraphQL statements request to visit:

```shell
curl -H 'content-type: application/graphql' -X POST http://127.0.0.1:9080/graphql -d '
query getRepo {
    owner {
        name
    }
    repo {
        created
    }
}'
```

If the match is successful, Apache APISIX proceeds to forward the request.

```shell
HTTP/1.1 200 OK
```

Otherwise, terminate the request.

```shell
HTTP/1.1 404 Not Found
```

### Advanced Operation

Apache APISIX can forward to different Upstreams according to different `graphql_names`, and perform different permission checks according to different `graphql_operation`. The following will show you the code configuration for this feature.

#### Match Upstream with graphql_name

1. Create the first Upstream.
2. Create GraphQL route bound to the first Upstream service with `graphql_name` set to `getRepo111`.
3. Create the second Upstream.
4. Create a GraphQL route bound to the second upstream service with `graphql_name` set to `getRepo222`.
5. Test Example

   Test with the two graphql_name services created earlier, you can find that Apache APISIX can automatically select the forwarded Upstream based on the different graphql_names in the request.

   1. If the request is this example.

   ```shell
    curl -i -H 'content-type: application/graphql' -X POST http://192.168.1.200:9080/graphql -d '
    query getRepo111 {
        owner {
            name
        }
        repo {
            created
        }
    }'
   ```

      Returns a response from upstream `192.168.1.200:1980`.

      ```shell
      HTTP/1.1 200 OK
        ---URI
        /graphql
        ---Service Node
        Centos-port: 1980
      ```

   2. If the request is this example.

   ```shell
   curl -i -H 'content-type: application/graphql' -X POST http://192.168.1.200:9080/graphql -d '
    query getRepo222 {
        owner {
            name
        }
        repo {
            created
        }
    }'
   ```

      Returns a response from upstream `192.168.1.200:1981`.

      ```shell
      HTTP/1.1 200 OK
        ---URI
        /graphql
        ---Service Node
        Centos-port: 1981
      ```

#### Use graphql_operation for Different Permission Checks

The above example provides a matching rule with graphql_operation as query, and now uses GraphQL requests in the form of mutation.

1. Configure Apache APISIX.

   ```shell
    curl http://192.168.1.200:9080/apisix/admin/routes/11 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
    {
        "methods": ["POST"],
        "uri": "/hello",
        "vars": [
            ["graphql_operation", "==", "mutation"],
            ["graphql_name", "==", "repo"]
        ],
        "upstream": {
            "nodes": {
                "192.168.1.200:1982": 1
            },
            "type": "roundrobin"
        }
    }'
   ```

2. Use `mutation` request to verify Apache APISIX configuration.

   ```shell
   curl -i -H 'content-type: application/graphql' -X POST http://192.168.1.200:9080/hello -d '
    mutation repo($ep: Episode!, $review: ReviewInput!) {
    createReview(episode: $ep, review: $review) {
        stars
        commentary
    }
    }'
   ```

The returned result is as follows:

```shell
HTTP/1.1 200 OK
---URI
/hello
---Service Node
Centos-port: 1982
```

### Collocation Plugins

Apache APISIX has a rich plugin ecosystem to apply different usage scenarios. If you add suitable plugins when using Apache APISIX + GraphQL, you can make more scenarios for the solution application.

This article only selects the following two types of plugins as examples.

#### limit-count Plugin

With the use of the `limit-count` plugin, the traffic is further limited after being forwarded by GraphQL matching rules. Thanks to the characteristics of Apache APISIX, dynamic, refined and distributed current and speed limiting can be achieved. For details, please refer to the official documentation.

#### Observability Plugin

Apache APISIX provides observability plugins including but not limited to Prometheus, Apache SkyWalking, etc., which can provide more monitoring indicator data for the system and facilitate the implementation of subsequent operation and maintenance of the system.

## Summary

This article briefly introduces the application of GraphQL in Apache APISIX, and uses the actual code to show you the combination of Apache APISIX and GraphQL. Users can use GraphQL in Apache APISIX according to their own business needs and actual scenarios.

For more instructions and complete configuration information about GraphQL, please refer to the [official documentation](https://apisix.apache.org/docs/apisix/router-radixtree/#how-to-filter-route-by-graphql-attributes).

Apache APISIX is also currently working on additional plugins to support the integration of additional services, so if you are interested, feel free to start a discussion in [GitHub Discussion](https://github.com/apache/apisix/discussions), or communicate via our [mailing list](https://apisix.apache.org/docs/general/subscribe-guide).

[apisix-graphql-solution]: /img/blog/20220303/apisix-graphql-solution.jpg "Architecture of the solution"
[apisix-graphql-workflow]: /img/blog/20220303/apisix-graphql-workflow.jpg "Workflow of the solution"
