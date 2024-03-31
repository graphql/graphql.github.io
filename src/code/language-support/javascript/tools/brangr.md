---
name: Brangr
description: Browse Any Graph - A user-friendly viewer for any GraphQL service
github: networkimprov/brangr
---

**Brangr - *Br*owse *An*y *Gr*aph**

- Brangr is a simple, unique tool that any web server can host
  to provide a user-friendly browser/viewer for any GraphQL service (or many).

- Brangr formats GraphQL results attractively, via a selection of
  user-configurable layouts.
  It lets users extract the generated HTML, and its source JSON.
  It provides a clever schema browser.
  It has built-in docs.

- Brangr enables sites hosting it to present users with
  a collection of pre-fab GraphQL requests, which they can edit if desired,
  and let them create their own requests.
  And it allows sites to define custom CSS styling for all aspects of the
  formatted results.

- Try it at the
  [**public Brangr site**](https://mnmnotmail.org/bgr/brangr.html).

**Example**

<!-- prettier-ignore -->
```graphql
query {
  heroes(_layout: { type: table }) { # _layout arg not sent to service
    first
    last
  }
}
```

Brangr renders the above query as follows (though not in a quote block):

<blockquote>heroes...
  <table style="border-spacing:0.5em 0">
    <tr><th>First </th><th>Last      </th></tr>
    <tr><td>Arthur</td><td>Dent      </td></tr>
    <tr><td>Ford  </td><td>Prefect   </td></tr>
    <tr><td>Zaphod</td><td>Beeblebrox</td></tr>
  </table>
</blockquote>
