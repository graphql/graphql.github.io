---

name: PSGraphQL
description: A PowerShell module for querying and mutating GraphQL endpoints.
github: anthonyg-1/PSGraphQL
tags:

* tools-and-libraries
* frontend

---

PSGraphQL is a PowerShell module for working with GraphQL endpoints from scripts, shells, and automation workflows. It provides commands for sending GraphQL queries and mutations, passing variables, setting headers, and returning either PowerShell objects or raw JSON.

Install it from the PowerShell Gallery:

```powershell
Install-Module -Name PSGraphQL -Scope CurrentUser
```

Run a simple GraphQL query:

```powershell
$uri = "https://mytargetserver/v1/graphql"

$query = @'
query {
  users {
    id
    name
  }
}
'@

Invoke-GraphQLQuery -Uri $uri -Query $query
```

PSGraphQL can also send mutations, include operation names and variables, use custom headers for authentication, and read GraphQL queries from files.
