---
name: graphql-ruby
description: A Ruby library for building GraphQL APIs.
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
  field :hello, String

  def hello
    "Hello world!"
  end
end

class Schema < GraphQL::Schema
  query QueryType
end

puts Schema.execute('{ hello }').to_json
```

There are also nice bindings for Relay and Rails.
