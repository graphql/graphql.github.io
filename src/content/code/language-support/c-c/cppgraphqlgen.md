---
name: cppgraphqlgen
description: A C++20 GraphQL schema service and client generator.
url: https://github.com/microsoft/cppgraphqlgen
github: microsoft/cppgraphqlgen
---

The easiest way to build and install `cppgraphqlgen` is to use [microsoft/vcpkg](https://github.com/microsoft/vcpkg).
See the [Getting Started](https://github.com/microsoft/vcpkg#getting-started) section of the `vcpkg` README
for details. Once you have that configured, run `vcpkg install cppgraphqlgen` (or `cppgraphqlgen:x64-windows`,
`cppgraphqlgen:x86-windows-static`, etc. depending on your platform). That will build and install all of the
dependencies for `cppgraphqlgen`, and then build `cppgraphqlgen` itself without any other setup. The `cppgraphqlgen`
package (and its dependencies) are advertised to the `CMake` `find_package` function through the
`-DCMAKE_TOOLCHAIN_FILE=<...>/scripts/buildsystems/vcpkg.cmake` parameter/variable. There are more details about
this in the `vcpkg` documentation.
