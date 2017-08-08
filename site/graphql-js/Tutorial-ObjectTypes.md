---
title: 对象类型
layout: ../_core/GraphQLJSLayout
category: GraphQL.js 教程
permalink: /graphql-js/object-types/
next: /graphql-js/mutations-and-input-types/
---

很多情况下，你可能不想让 API 返回一个数字或字符串。你可能会期望它返回一个带有复杂行为的对象。GraphQL 刚好可以完美地契合你的这个要求。

在 GraphQL schema 语言中，定义一个新的对象类型就和我们在示例中定义的 `Query` 类型一样。每个对象可以有返回指定类型的的字段，或者带有参数的方法。例如，在 [参数传递](/graphql-js/passing-arguments/) 中，我们有一个掷骰子的方法：

```javascript
type Query {
  rollDice(numDice: Int!, numSides: Int): [Int]
}
```

如果随着时间的推移我们想要有越来越多的基于随机骰子的方法，我们可以实现一个 `RandomDie` 的对象类型来替代。

```javascript
type RandomDie {
  roll(numRolls: Int!): [Int]
}

type Query {
  getDie(numSides: Int): RandomDie
}
```

取而代之的是一个值为 `RandomDie` 类型的根级别解析器，我们可以用 ES6 的 class 语法来替代，这样的话这些解析器就是这个类的实例方法了。下面的代码展示了如何使用 ES6 的 class 语法来实现上面的 `RandomDie` 对象类型：

```javascript
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

var root = {
  getDie: function ({numSides}) {
    return new RandomDie(numSides || 6);
  }
}
```

对于那些不使用任何参数的字段来说，你可以使用对象属性或实例方法来表示。对于上面的示例方法，不论是 `numSides` 还是 `rollOnce` 实际上都可以被用来实现 GraphQL 的字段，所以上面的代码同样可以以 schema 的方式来实现:

```javascript
type RandomDie {
  numSides: Int!
  rollOnce: Int!
  roll(numRolls: Int!): [Int]
}

type Query {
  getDie(numSides: Int): RandomDie
}
```

最后把这些代码都整到一起，这里是一些运行了用了该 GraphQL API 的示例代码：

```javascript
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`);

// This class implements the RandomDie GraphQL type
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

// The root provides the top-level API endpoints
var root = {
  getDie: function ({numSides}) {
    return new RandomDie(numSides || 6);
  }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
```

当你对一个 API 发出一个 GraphQL 查询时它会返回一个对象类型，你可以通过嵌套 GraphQL 字段名来调用对象上的多个方法。例如，如果你想在调用一次 `rollOnce` 方法的同时也调用 `roll` 方法来掷 3 次骰子的话，你可以这么做：

```javascript
{
  getDie(numSides: 6) {
    rollOnce
    roll(numRolls: 3)
  }
}
```

如果你用 `node server.js` 命令来运行这些代码并且访问 http://localhost:4000/graphql 的话，你可以用 GraphQL 试一下这些 API。

这种定义对象类型的方式通常会比传统的 REST 风格的 API 会带来更多的好处。取而代之的是只需要请求一次 API 就可以获得一个对象的相关基本信息，或者可以通过多个附带的 API 请求来获取更多关于该对象的信息，当然你也可以通过一次请求来获取该对象的所有信息。这样不仅节省了带宽、让你的应用跑得更快，同时也简化了你客户端应用的逻辑。

到目前为止，我们所看到的每个 API 都是为返回数据而设计的。为了修改存储的数据或处理复杂的输入，它有助于学习 [mutations 和 input types](/graphql-js/mutations-and-input-types/)。
