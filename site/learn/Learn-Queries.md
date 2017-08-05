---
title: 查询和变更
layout: ../_core/DocsLayout
category: 学习
permalink: /learn/queries/
next: /learn/schema/
sublinks: 字段（Fields）,参数（Arguments）,别名（Aliases）,片段（Fragments）,变量（Variables）,操作名称（Operation Name）,指令（Directives）,变更（Mutations）,内联片段（Inline Fragments）
---

你可以在本页学到有关如何查询 GraphQL 服务器的详细信息。

## 字段（Fields）

简单而言，GraphQL 是关于请求对象上的特定字段。我们以一个非常简单的查询以及其结果为例：

```graphql
# { "graphiql": true }
{
  hero {
    name
  }
}
```

你立即就能发现，查询和其结果拥有几乎一样的结构。这是 GraphQL 最重要的特性，因为这样一来，你就总是能得到你想要的数据，而服务器也准确地知道客户端请求的字段。

`name` 字段返回 `String` 类型，在这个示例中是《星球大战》主角的名字是：`"R2-D2"`。

> 对了，还有一点 —— 上述查询是**可交互的**。也就是你可以按你喜欢来改变查询，然后看看新的结果。尝试给查询中的 `hero` 对象添加一个` appearsIn` 字段，看看新的结果吧。

在前一例子中，我们请求了我们主角的名字，返回了一个字符串类型（String），但是字段也能指代对象类型（Object）。这个时候，你可以对这个对象的字段进行**次级选择（sub-selection）**。GraphQL 查询能够遍历相关对象及其字段，使得客户端可以一次请求查询大量相关数据，而不像传统 REST 架构中那样需要多次往返查询。

```graphql
# { "graphiql": true }
{
  hero {
    name
    # 查询可以有备注！
    friends {
      name
    }
  }
}
```

注意这个例子中，`friends` 返回了一个数组的项目，GraphQL 查询会同等看待单个项目或者一个列表的项目，然而我们可以通过 schema 所指示的内容来预测将会得到哪一种。


## 参数（Arguments）

即使我们能做的仅仅是遍历对象及其字段，GraphQL 就已经是一个非常有用的数据查询语言了。但是当你加入给字段传递参数的能力时，事情会变得更加有趣。

```graphql
# { "graphiql": true }
{
  human(id: "1000") {
    name
    height
  }
}
```

在类似 REST 的系统中，你只能传递一组简单参数 —— 请求中的 query 参数和 URL 段。但是在 GraphQL 中，每一个字段和嵌套对象都能有自己的一组参数，从而使得 GraphQL 可以完美替代多次 API 获取请求。甚至你也可以给 标量（scalar）字段传递参数，用于实现服务端的一次转换，而不用每个客户端分别转换。

```graphql
# { "graphiql": true }
{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}
```

参数可以是多种不同的类型。上面例子中，我们使用了一个枚举类型，其代表了一个有限选项集合（本例中为长度单位，即是 `METER` 或者 `FOOT`）。GraphQL 自带一套默认类型，但是 GraphQL 服务器可以声明一套自己的定制类型，只要能序列化成你的传输格式即可。

[更多的 GraphQL 类型系统请点击这里。](/learn/schema)


## 别名（Aliases）

如果你眼睛够锐利，你可能已经发现，即便结果中的字段与查询中的字段能够匹配，但是因为他们并不包含参数，你就没法通过不同参数来查询相同字段。这便是为何你需要**别名** —— 这可以让你重命名结果中的字段为任意你想到的名字。
```graphql
# { "graphiql": true }
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
```

上例中，两个 `hero` 字段将会存在冲突，但是因为我们可以将其另取一个别名，我们也就可以在一次请求中得到两个结果。


## 片段（Fragments）

假设我们的 app 有比较复杂的页面，将正反派主角及其友军分为两拨。你立马就能想到对应的查询会变得复杂，因为我们需要将一些字段重复至少两次 —— 两方各一次以作比较。

这就是为何 GraphQL 包含了称作**片段**的可复用单元。片段使你能够组织一组字段，然后在需要它们的的地方引入。下面例子展示了如何使用片段解决上述场景：

```graphql
# { "graphiql": true }
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

你可以看到上面的查询如何漂亮地重复了字段。片段的概念经常用于将复杂的应用数据需求分割成小块，特别是你要将大量不同片段的 UI 组件组合成一个初始数据获取的时候。


## 变量（Variables）

目前为止，我们将参数写在了查询字符串内。但是在很多应用中，字段的参数可能是动态的：例如，可能是一个"下拉菜单"让你选择感兴趣的《星球大战》续集，或者是一个搜索区，或者是一组过滤器。

将这些动态参数直接传进查询字符串并不是好主意，因为这样我们的客户端就得动态地在运行时操作这些查询字符串了，再把它序列化成 GraphQL 专用的格式。其实，GraphQL 拥有一级方法将动态值提取到查询之外，然后作为分离的字典传进去。这些动态值即称为**变量**。

使用变量之前，我们得做三件事：

1. 使用 `$variableName` 替代查询中的静态值。
2. 声明 `$variableName` 为查询接受的变量之一。
3. 将 `variableName: value` 通过传输专用（通常是 JSON）的分离的变量字典中。

全部做完之后就像这个样子：

```graphql
# { "graphiql": true, "variables": { "episode": "JEDI" } }
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

这样一来，我们的客户端代码就只需要传入不同的变量，而不用构建一个全新的查询了。这事实上也是一个良好实践，意味着查询的参数将是动态的 —— 我们决不能使用用户提供的值来字符串插值以构建查询。


### 变量定义（Variable definitions）

变量定义看上去像是上述查询中的 `($episode: Episode)`。其工作方式跟类型语言中函数的参数定义一样。它以列出所有变量，变量前缀必须为 `$`，后跟其类型，本例中为 `Episode`。

所有声明的变量都必须是标量、枚举型或者输入对象类型。所以如果想要传递一个复杂对象到一个字段上，你必须知道服务器上其匹配的类型。可以从Schema页面了解更多关于输入对象类型的信息。

变量定义可以是可选的或者必要的。上例中，`Episode` 后并没有 `!`，因此其是可选的。但是如果你传递变量的字段要求非空参数，那变量一定是必要的。

如果想要进一步了解变量定义的句法，可以学习 GraphQL 的 schema 语言。schema 语言在 Schema 中有细述。


### 默认变量（Default variables）

可以通过在查询中的类型定义后面附带默认值的方式，将默认值赋给变量。

```graphql
query HeroNameAndFriends($episode: Episode = "JEDI") {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

当所有变量都有默认值的时候，你可以不传变量直接调用查询。如果任何变量作为变量字典的部分传递了，它将覆盖其默认值。

## 操作名称（Operation name）

上面案例中我们看到的另一个东西就是我们的查询还有个**操作名**。这之前，我们都使用了简写句法，省略了 `query` 关键字和查询名称，但是生产中使用这些可以使我们代码减少歧义。

就把它想成你喜欢的程序语言中的函数名。例如，在 JavaScript 中，我们只用匿名函数就可以工作，但是当我们给了函数名之后，就更加容易追踪、调试我们的代码，并在其被调用的时候做日志。同理，GraphQL 的查询和变更名称，以及片段名称，都可以成为服务端侧用来识别不同 GraphQL 请求的有效调试工具。


## 指令（Directives）

我们上面讨论的变量使得我们可以避免手动字符串插值构建动态查询。传递变量给参数解决了一大堆这样的问题，但是我们可能也需要一个方式使用变量动态地改变我们查询的结构。譬如我们假设有个 UI 组件，其有概括视图和详情视图，后者比前者拥有更多的字段。

我们来构建一个这种组件的查询：

```graphql
# { "graphiql": true, "variables": { "episode": "JEDI", "withFriends": false } }
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
```

尝试修改上面的变量，传递 `true` 给 `withFriends`，看看结果的变化。

我们用了 GraphQL 中一种称作**指令**的新特性。一个指令可以附着在字段或者片段包含的字段上，然后以任何服务端期待的方式来改变查询的执行。GraphQL 的核心规范包含两个指令，其必须被任何规范兼容的 GraphQL 服务器实现所支持：

- `@include(if: Boolean)` 仅在参数为 `true` 时，包含此字段。
- `@skip(if: Boolean)` 如果参数为 `true`，跳过此字段。

指令在你不得不通过字符串操作来增减查询的字段时解救你。服务端实现也可以定义新的指令来添加新的特性。


## 变更（Mutations）

GraphQL 的大部分讨论集中在数据获取，但是任何完整的数据平台也都需要一个改变服务端数据的方法。

REST 中，任何请求都可能最后导致一些服务端副作用，但是约定上建议不要使用 `GET` 请求来修改数据。GraphQL 也是类似 —— 技术上而言，任何查询都可以被实现为导致数据写入。然而，建一个约定来规范任何导致写入的操作都应该显式通过变更（mutation）来发送。

就如同查询一样，如果任何变更字段返回一个对象类型，你也能请求其嵌套字段。获取一个对象变更后的新状态也是十分有用的。我们来看看一个变更例子：

```graphql
# { "graphiql": true, "variables": { "ep": "JEDI", "review": { "stars": 5, "commentary": "This is a great movie!" } } }
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
```

注意 `createReview` 字段如何返回了新建的 review 的 `stars` 和 `commentary` 字段。这在变更已有数据时特别有用，例如，当一个字段自增的时候，我们可以在一个请求中变更并查询这个字段的新值。

你也可能注意到，这个例子中，我们传递的 `review` 变量并非标量。它是一个**输入对象类型**，一种特殊的对象类型，可以作为参数传递。你可以在 Schema 页面上了解到更多关于输入类型的信息。

### 变更中的多个字段（Multiple fields in mutations）

一个变更也能包含多个字段，一如查询。查询和变更之间名称之外的一个重要区别是：

**查询字段时，是并行执行，而变更字段时，是线性执行，一个接着一个。**

这意味着如果我们一个请求中发送了两个 `incrementCredits` 变更，第一个保证在第二个之前执行，以确保我们不会出现竞态。


## 内联片段（Inline Fragments）

跟许多类型系统一样，GraphQL schema 也具备定义接口和联合类型的能力。[在 schema 指南中可了解更多。](/learn/schema/#interfaces)

如果你查询的字段返回的是接口或者联合类型，那么你可能需要使用**内联片段**来取出下层具体类型的数据：

```graphql
# { "graphiql": true, "variables": { "ep": "JEDI" } }
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
    ... on Human {
      height
    }
  }
}
```

这个查询中，`hero` 字段返回 `Character` 类型，取决于 `episode` 参数，其可能是 `Human` 或者 `Droid` 类型。在直接选择的情况下，你只能请求 `Character` 上存在的字段，譬如 `name`。

如果要请求具体类型上的字段，你需要使用一个类型条件**内联片段**。因为第一个片段标注为 `... on Droid`，`primaryFunction` 仅在 `hero` 返回的 `Character` 为 `Droid` 类型时才会执行。同理适用于 `Human` 类型的 `height` 字段。

具名片段也可以用于同样的情况，因为具名片段总是附带了一个类型。


### 元字段（Meta fields）

某些情况下，你并不知道你将从 GraphQL 服务获得什么类型，这时候你就需要一些方法在客户端来决定如何处理这些数据。GraphQL 允许你在查询的任何位置请求 `__typename`，一个元字段，以获得那个位置的对象类型名称。

```graphql
# { "graphiql": true}
{
  search(text: "an") {
    __typename
    ... on Human {
      name
    }
    ... on Droid {
      name
    }
    ... on Starship {
      name
    }
  }
}
```

上面的查询中，`search` 返回了一个联合类型，其可能是三种选项之一。没有 `__typename` 字段的情况下，几乎不可能在客户端分辨开这三个不同的类型。

GraphQL 服务提供了不少元字段，剩下的部分用于描述 [内省](../introspection/) 系统。

