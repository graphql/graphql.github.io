---
name: cppgraphqlgen-schemagen
description: A C++20 GraphQL service generator using the schema document.
url: https://github.com/microsoft/cppgraphqlgen
github: microsoft/cppgraphqlgen
---

Run `schemagen -?` to get a list of options. Many of the files in the [samples](https://github.com/microsoft/cppgraphqlgen/tree/main/samples) directory were generated
with `schemagen`, you can look at [samples/CMakeLists.txt](https://github.com/microsoft/cppgraphqlgen/blob/main/samples/CMakeLists.txt) for a few examples of how to call it:
```
Usage:  schemagen [options] <schema file> <output filename prefix> <output namespace>
Command line options:
  --version              Print the version number
  -? [ --help ]          Print the command line options
  -v [ --verbose ]       Verbose output including generated header names as
                         well as sources
  -s [ --schema ] arg    Schema definition file path
  -p [ --prefix ] arg    Prefix to use for the generated C++ filenames
  -n [ --namespace ] arg C++ sub-namespace for the generated types
  --source-dir arg       Target path for the <prefix>Schema.cpp source file
  --header-dir arg       Target path for the <prefix>Schema.h header file
  --stubs                Unimplemented fields throw runtime exceptions instead
                         of compiler errors
  --no-introspection     Do not generate support for Introspection
```
