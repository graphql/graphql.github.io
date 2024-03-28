---
name: API Platform
description: API Platform is a fully-featured, flexible and extensible API framework built on top of Symfony.
url: https://api-platform.com
github: api-platform/api-platform
---

The following class is enough to create both a Relay-compatible GraphQL server and a hypermedia API supporting modern REST formats (JSON-LD, JSONAPI...):

```php
<?php

namespace AppEntity;

use ApiPlatformCoreAnnotationApiResource;
use DoctrineORMMapping as ORM;

/**
 * Greet someone!
 *
 * @ApiResource
 * @ORMEntity
 */
class Greeting
{
    /**
     * @ORMId
     * @ORMColumn(type="guid")
     */
    public $id;

    /**
     * @var string Your nice message
     *
     * @ORMColumn
     */
    public $hello;
}
```

Other API Platform features include data validation, authentication, authorization, deprecations, cache and GraphiQL integration.
