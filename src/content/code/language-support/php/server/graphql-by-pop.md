---
name: GraphQL by PoP
description: CMS-agnostic GraphQL server in PHP. It follows the code-first approach, generating the schema dynamically
url: https://graphql-by-pop.com
github: leoloso/PoP
---

GraphQL by PoP follows the [code-first approach](https://graphql-by-pop.com/docs/architecture/code-first.html) to generate the schema (it can be customized for different clients/applications). Fields are dynamically "subscribed" to types, and may or may not be added to the schema depending on the context.

This is how a `User` type is satisfied:

```php
class UserTypeResolver extends AbstractTypeResolver
{
  public function getTypeName(): string
  {
    return 'User';
  }

  public function getSchemaTypeDescription(): ?string
  {
    $translationAPI = TranslationAPIFacade::getInstance();
    return $translationAPI->__('Representation of a user', 'users');
  }

  public function getID(object $user)
  {
    return $user->ID;
  }

  public function getTypeDataLoaderClass(): string
  {
    return UserTypeDataLoader::class;
  }
}
```

Please notice how the `TypeResolver` does not indicate which are its fields. It also does not load the objects from the database, but instead delegates this task to a `TypeDataLoader`.

Adding fields to the type is done via a `FieldResolver`:

```php
class UserFieldResolver extends AbstractDBDataFieldResolver
{
  public static function getClassesToAttachTo(): array
  {
    return [
      UserTypeResolver::class,
    ];
  }

  public static function getFieldNamesToResolve(): array
  {
    return [
      'username',
      'email',
      'url',
    ];
  }

  public function getSchemaFieldDescription(
    TypeResolverInterface $typeResolver,
    string $fieldName
  ): ?string {
    $translationAPI = TranslationAPIFacade::getInstance();
    $descriptions = [
      'username' => $translationAPI->__("User's username handle", "users"),
      'email' => $translationAPI->__("User's email", "users"),
      'url' => $translationAPI->__("URL of the user's profile in the website", "users"),
    ];
    return $descriptions[$fieldName];
  }

  public function getSchemaFieldType(
    TypeResolverInterface $typeResolver,
    string $fieldName
  ): ?string {
    $types = [
      'username' => SchemaDefinition::TYPE_STRING,
      'email' => SchemaDefinition::TYPE_EMAIL,
      'url' => SchemaDefinition::TYPE_URL,
    ];
    return $types[$fieldName];
  }

  public function resolveValue(
    TypeResolverInterface $typeResolver,
    object $user,
    string $fieldName,
    array $fieldArgs = []
  ) {
    switch ($fieldName) {
      case 'username':
        return $user->user_login;

      case 'email':
        return $user->user_email;

      case 'url':
        $userService = UserServiceFacade::getInstance();
        return $userService->getUserProfileURL($user->ID);
    }

    return null;
  }
}
```

The definition of a field for the GraphQL schema, and its resolution, is split into a multitude of functions from the `FieldResolver`: 

- `getSchemaFieldDescription`
- `getSchemaFieldType`
- `resolveValue`
- `getSchemaFieldArgs`
- `isSchemaFieldResponseNonNullable`
- `getImplementedInterfaceClasses`
- `resolveFieldTypeResolverClass`
- `resolveFieldMutationResolverClass`

This code is more legible than if all functionality is satisfied through a single function, or through a configuration array, making it easier to implement and maintain the resolvers.
