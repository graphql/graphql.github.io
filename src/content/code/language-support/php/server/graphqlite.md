---
name: GraphQLite
description: GraphQLite is a library that offers an annotations-based syntax for GraphQL schema definition.
url: https://graphqlite.thecodingmachine.io
github: thecodingmachine/graphqlite
---

It is framework agnostic with bindings available for Symfony and Laravel.
This code declares a "product" query and a "Product" Type:

```php
class ProductController
{
    /**
     * @Query()
     */
    public function product(string $id): Product
    {
        // Some code that looks for a product and returns it.
    }
}

/**
 * @Type()
 */
class Product
{
    /**
     * @Field()
     */
    public function getName(): string
    {
        return $this->name;
    }
    // ...
}
```

Other GraphQLite features include validation, security, error handling, loading via data-loader pattern...
