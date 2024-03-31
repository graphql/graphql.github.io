---
name: Django Graphbox
description: Package for easy building a GraphQL API with basic CRUD operations for Django models.
url: https://90horasporsemana.com/graphbox/
github: yefeza/django-graphbox
---

A Quickstart for Django Graphbox:

1. Install the package:

```bash
pip install django-graphbox
```

2. Create a new Django project:

```bash
django-admin startproject myproject
```

3. Create a new Django app:

```bash
cd myproject
python manage.py startapp myapp
```

4. Define your Django models in `myapp/models.py`:

```python
from django.db import models

class MyModel(models.Model):
    name = models.CharField(max_length=100)
```

5. Create and run migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

6. Configure and Build your GraphQL Schema in `myapp/schema.py`:

```python
from django_graphbox.builder import SchemaBuilder
from myapp.models import MyModel

builder = SchemaBuilder()
builder.add_model(MyModel)

query_class = builder.build_schema_query()
mutation_class = builder.build_schema_mutation()
```

7. Create a main Schema in `myproject/schema.py` (In this main schema you can add your own queries and mutations):

```python
import graphene
from myapp.schema import query_class, mutation_class

class Query(query_class, graphene.ObjectType):
    pass

class Mutation(mutation_class, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
```

8. Add the GraphQL view to your `myproject/urls.py`:

```python
from django.urls import path
from graphene_file_upload.django import FileUploadGraphQLView
from django.views.decorators.csrf import csrf_exempt
from myproject.schema import schema

urlpatterns = [
    path('graphql/', csrf_exempt(FileUploadGraphQLView.as_view(graphiql=True, schema=schema))),
]
```

9. Run the server:

```sh
python manage.py runserver
```

10. Open the GraphiQL interface at `http://localhost:8000/graphql` and start querying your API!

You can find advanced examples with authentication, filters, validations and more on GitHub or pypi.
