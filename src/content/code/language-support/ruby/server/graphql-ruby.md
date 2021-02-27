---
name: graphql-ruby
description: A Ruby library for building GraphQL APIs.
url: https://github.com/rmosolgo/graphql-ruby
github: rmosolgo/graphql-ruby
gem: graphql
---

To run a hello world script with `graphql-ruby`:
```bash
gem install graphql
```

Then run `ruby hello.rb` with this code in `hello.rb`:

```ruby
require 'graphql'

class QueryType < GraphQL::Schema::Object
  graphql_name 'Query'
  field :hello do
    type types.String
    resolve -> (obj, args, ctx) { 'Hello world!' }
  end
end

class Schema < GraphQL::Schema
  query QueryType
end

puts Schema.execute('{ hello }').to_json
```
There are also nice bindings for Relay and Rails.
