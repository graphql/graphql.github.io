---
name: Rails GraphQL
description: A Fresh new GraphQL server for Rails applications, with a focus on natural and Ruby-like DSL
url: https://www.rails-graphql.dev/
github: virtualshield/rails-graphql
gem: rails-graphql
---

```ruby
require 'rails-graphql'

class GraphQL::AppSchema < GraphQL::Schema
  query_fields do
    field(:hello).resolve { 'Hello World!' }
  end
end

puts GraphQL::AppSchema.execute('{ hello }')
```

Less is more! Please check it out the [docs](https://www.rails-graphql.dev/?utm_source=graphql_org).
