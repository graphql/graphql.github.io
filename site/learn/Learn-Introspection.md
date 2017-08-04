---
title: 内省
layout: ../_core/DocsLayout
category: 学习
permalink: /learn/introspection/
next: /learn/best-practices/
---

我们有时候会需要去问 GraphQL Schema 它支持哪些查询。GraphQL 通过内省系统让我们可以做到这点！

在我们的星战例子里，文件
[starWarsIntrospection-test.js](https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsIntrospection-test.js)
包含了一系列展示了内省系统的查询，它也是一个测试文件，用来检验参考实现的内省系统。

如果是我们亲自设计了类型，那我们自然知道哪些类型是可用的。但如果类型不是我们设计的，我们也可以通过查询 `__schema` 字段来向 GraphQL 询问哪些类型是可用的。一个查询的根类型总是有 `__schema` 这个字段。现在来试试，查询一下有哪些可用的类型。


```graphql
# { "graphiql": true }
{
  __schema {
    types {
      name
    }
  }
}







```

哇，有好多类型！它们都是什么？我们来总结一下：

 - **Query, Character, Human, Episode, Droid** - 这些是我们在类型系统中定义的类型。
 - **String, Boolean** - 这些是内建的标量，由类型系统提供。
 - **\_\_Schema, \_\_Type, \_\_TypeKind, \_\_Field, \_\_InputValue,
\_\_EnumValue, \_\_Directive** - 这些有着两个下划线的类型是内省系统的一部分。

现在，来试试找到一个可以探索出有哪些可用查询的地方。当我们设计类型系统的时候，我们确定了一个所有查询开始的地方，来问问内省系统它是什么！

```graphql
# { "graphiql": true }
{
  __schema {
    queryType {
      name
    }
  }
}
```

这和我们在类型系统那章里说的一样，`Query` 类型是我们开始的地方！注意这里的命名只是一个惯例，我们也可以把 `Query` 取成别的名字，只要我们把它定义为所有查询出发的地方，它也依然会在这里被返回。尽管如此，还是把它命名为 `Query` 吧，这是一个有用的惯例。

有时候也需要检验一个特定的类型。来看看 `Droid` 类型：

```graphql
# { "graphiql": true }
{
  __type(name: "Droid") {
    name
  }
}
```

如果我们想要更了解 `Droid` 呢？例如，它是一个接口还是一个对象？

```graphql
# { "graphiql": true }
{
  __type(name: "Droid") {
    name
    kind
  }
}
```

`kind` 返回一个枚举类型 `__TypeKind`，其中一个值是 `OBJECT`。如果我们改问 `Character`，我们会发现它是一个接口：

```graphql
# { "graphiql": true }
{
  __type(name: "Character") {
    name
    kind
  }
}
```

对于一个对象来说，知道它有哪些字段是很有用的，所以来问问内省系统 `Droid` 有哪些字段：

```graphql
# { "graphiql": true }
{
  __type(name: "Droid") {
    name
    fields {
      name
      type {
        name
        kind
      }
    }
  }
}




```

这些正是我们为 `Droid` 定义的字段！

`id` 看起来有点儿奇怪，这个类型没有名字。这是因为它是一个 `NON_NULL` 类型的“包装” 。如果我们请求它的
`ofType` 字段，我们会发现它是 `ID` ，告诉我们这是一个非空的 ID。

相似地，`friends` 和 `appearsIn` 都没有名字，因为它们都是 `LIST` 包装类型。我们可以看看它们的 `ofType`，就能知道它们是装什么东西的列表。

```graphql
# { "graphiql": true }
{
  __type(name: "Droid") {
    name
    fields {
      name
      type {
        name
        kind
        ofType {
          name
          kind
        }
      }
    }
  }
}





```

最后我们来看看内省系统特别适合用来开发工具的特性，我们来向内省系统请求文档！

```graphql
# { "graphiql": true }
{
  __type(name: "Droid") {
    name
    description
  }
}
```

因此我们可以通过内省系统接触到类型系统的文档，并做出文档浏览器，或是提供丰富的 IDE 体验。

这些只是内省系统的浅浅一层。我们还可以查询枚举值、某个类型实现了什么接口等等，我们甚至可以对内省系统内省。关于这个主题的详细说明可以看规范的“Introspection”部分，以及 GraphQL.js 中的 [introspection](https://github.com/graphql/graphql-js/blob/master/src/type/introspection.js) 文件，它包含了符合规范的一个内省系统的实现。
