---
name: Graphene Django CRUDDALS
description: Turn your Django-models into a complete GraphQL API with all CRUD operations
url: https://graphene-django-cruddals.readthedocs.io/en/latest/
github: juanjcardona13/graphene_django_cruddals
---

You can install the package with pip

```bash
pip install graphene-django-cruddals
```

To use it, simply create a new class that inherits "`DjangoModelCruddals`"
Suppose we have the following models.

```python
from django.db import models


class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    is_active = models.BooleanField(default=True)
```

Then we can create a complete CRUD+DALS for the models `Question` with the following code

```python
from graphene_django_cruddals import DjangoModelCruddals

class CruddalsQuestion(DjangoModelCruddals):
    class Meta:
        model = Question
```

Now you can use the `schema` that was generated for you,

```python
schema = CruddalsQuestion.Schema
```

or use in your existing schema root `Query` and `Mutation`

```python
class Query(
    # ... your others queries
    CruddalsQuestion.Query,
    graphene.ObjectType,
):
    pass


class Mutation(
    # ... your others mutations
    CruddalsQuestion.Mutation,
    graphene.ObjectType,
):
    pass


schema = graphene.Schema( query=Query, mutation=Mutation, )
```

That's it! You can test in graphiql or any other client that you use to test your GraphQL APIs..

Find more information in the [official documentation](https://graphene-django-cruddals.readthedocs.io/en/latest/).
