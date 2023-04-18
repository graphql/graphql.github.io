---
name: Siler
description: Siler is a PHP library powered with high-level abstractions to work with GraphQL.
url: https://siler.leocavalcante.com/graphql/
github: leocavalcante/siler
---

To run a Siler hello world script:

```graphql
type Query {
  hello: String
}
```

```php
<?php
declare(strict_types=1);
require_once '/path/to/vendor/autoload.php';

use SilerDiactoros;
use SilerGraphql;
use SilerHttp;

$typeDefs = file_get_contents(__DIR__.'/schema.graphql');
$resolvers = [
    'Query' => [
        'hello' => 'world',
    ],
];
$schema = Graphqlschema($typeDefs, $resolvers);

echo "Server running at http://127.0.0.1:8080";

Httpserver(Graphqlpsr7($schema), function (Throwable $err) {
    var_dump($err);
    return Diactorosjson([
        'error'   => true,
        'message' => $err->getMessage(),
    ]);
})()->run();
```

It also provides functionality for the construction of a WebSocket Subscriptions Server based on how Apollo works.
