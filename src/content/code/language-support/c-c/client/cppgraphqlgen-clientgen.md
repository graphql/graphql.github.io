---
name: cppgraphqlgen-clientgen
description: A C++20 GraphQL request client generator and response parser using the schema document. If you want to consume a GraphQL service from a C++ client, you can pre-compile queries and deserialization functions for the expected results.
url: https://github.com/microsoft/cppgraphqlgen
github: microsoft/cppgraphqlgen
---

The `clientgen` utility is based on `schemagen` and shares the same external dependencies. The command line arguments
are almost the same, except it takes an extra file for the request document and there is no equivalent to `--stubs`:

```
Usage:  clientgen [options] <schema file> <request file> <output filename prefix> <output namespace>
Command line options:
  --version              Print the version number
  -? [ --help ]          Print the command line options
  -v [ --verbose ]       Verbose output including generated header names as
                         well as sources
  -s [ --schema ] arg    Schema definition file path
  -r [ --request ] arg   Request document file path
  -o [ --operation ] arg Operation name if the request document contains more
                         than one
  -p [ --prefix ] arg    Prefix to use for the generated C++ filenames
  -n [ --namespace ] arg C++ sub-namespace for the generated types
  --source-dir arg       Target path for the <prefix>Client.cpp source file
  --header-dir arg       Target path for the <prefix>Client.h header file
  --no-introspection     Do not expect support for Introspection
```

This utility should output one header and one source file for each request document. A request document may contain more
than one operation, in which case it will output definitions for all of them together. You may limit the output to a
single operation from the request document by specifying the `--operation` (or `-o`) argument with the operation name.

The generated code depends on the `graphqlclient` library for serialization of built-in types. If you link the generated
code, you'll also need to link `graphqlclient`, `graphqlpeg` for the pre-parsed, pre-validated request AST, and
`graphqlresponse` for the `graphql::response::Value` implementation.
