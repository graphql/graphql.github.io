---
name: graphql-provider
description: GraphQL server-side rapid development framework, it's GRM(GraphQL relation Mapping), if users use RDBMS to manage persistent data, it can help users to quickly build GraphQL services in the shortest time (based on kotlin and R2DBC)
url: https://github.com/babyfish-ct/graphql-provider
github: babyfish-ct/graphql-provider
---

1. It is a GRM (GraphQL-Relation mapping), and its usage is similar to ORM. When kotlin dsl is used to complete the mapping configuration between entities and tables, GraphQL objects and associations are automatically completed, including the runtime association-level DataLoader and related batch loading optimization.

2. It is easy to add user implemention fields to entity, where you can implement business-related calculations. User implementation fields can also enjoy the automatic generated DataLoader and related batch loading optimization at runtime.

3. Whether it is to implement query-level arguments or association-level arguments, you only need to use  strongly typed SQL DSL to specify some dynamic filtering and sorting, and the rest is done automatically.

4. If you need pagination query, there is no development cost except changing the return type of ordinary query from List&lt;T&gt; to Connection&lt;T&gt;.

5. For mutation operations, the inputs type can be automatically generated according to a simple configuration, develpers only need to focus on entity objects, not input objects. At runtime, the framework can automatically convert the input object to a dynamic entity object tree and you only need one sentence to save any complex entity object tree to the database.

6. Integrated Spring security and JWT. Allows users to authorize by behavior, authorize by column, and authorize by row through the kotlin DSL.

**Here is a simple example** 

> Due to space limitations, all *EntityMapper*s only uses a static mapping configuration similar to ORM, and does not use a more dynamic code configuration. For a complete demonstration, please refer to the example and documentation of the project itself.

1. BookStoreMapper.kt
    ```kt
    @Component
    class BookStoreMapper: EntityMapper<BookStore, UUID>() {

            // Inverse one-to-many "BookStore.books" is the the 
            // mirror image of many-to-one association "Book.store"
            mappedList(BookStore::books, Book::store)
        }
    }
    ```

2. BookMapper.kt
    ```kt
    @Component
    class BookMapper: EntityMapper<Book, UUID>() {

        override fun EntityTypeDSL<Book, UUID>.config() {

            reference(Book::store) // many-to-one

            list(Book::authors) { // many-to-many
                db {
                    middleTable {
                        tableName = "BOOK_AUTHOR_MAPPING"
                        joinColumnName = "BOOK_ID"
                        targetJoinColumnName = "AUTHOR_ID"
                    }
                }
            }
        }
    }
    ```

3. Author.kt
    ```kt
    @Component
    class AuthorMapper: EntityMapper<Author, UUID>() {

        override fun EntityTypeDSL<Author, UUID>.config() {

            // Inverse many-to-many "Author.books" is the the 
            // mirror image of many-to-many association "Book.authors"
            mappedList(Author::books, Book::authors)
        }
    }
    ```

4. BookQuery.kt
    ```kt
    @Service
    class BookQuery: Query() {

        // Return type is Connection<Book>, not List<Book>,
        // that means its pagination query.
        // pagination arguments such as "first", "after", "last", "before"
        // will be added by framework automactically and implicitly
        suspend fun findBooks(
            name: String?,
            storeName: String?
        ): Connection<Book> = 
            runtime.queryConnection {
                name?.let {
                    db {
                        where(table.name ilike it)
                    }
                }
                storeName?.let {
                    db {
                        where(table.store.name ilike it)
                    }
                }
            }
    }
    ```
