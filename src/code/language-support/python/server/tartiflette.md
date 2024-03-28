---
name: Tartiflette
description: A Python 3.6+ _(asyncio)_ library for building GraphQL APIs.
url: https://tartiflette.io
github: tartiflette/tartiflette
---

To run a tartiflette hello world script:

```sh
pip install tartiflette
```

Then run `python hello.py` with this code in `hello.py`:

```python
import asyncio
from tartiflette import Engine, Resolver
@Resolver("Query.hello")
async def resolver_hello(parent, args, ctx, info):
    return "hello " + args["name"]
async def run():
    tftt_engine = Engine("""
    type Query {
        hello(name: String): String
    }
    """)
    result = await tftt_engine.execute(
        query='query { hello(name: "Chuck") }'
    )
    print(result)
    # {'data': {'hello': 'hello Chuck'}}
if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(run())
```

There is also a nice [HTTP wrapper](https://github.com/dailymotion/tartiflette-aiohttp).
