---
title: Node.js setup
layout: ../_core/DocsLayout
category: Best Practices
permalink: /learn/project-setup/
---

Before diving into GraphQL-js, we need to set up a Node project that supports modern Javascript (ES6 and ES7 await/async). Let’s create a new project with these settings from scratch.

## Node
You’ll need to install Node.js v4.4 (LTS) or higher. Once installed, update npm:
```bash
npm install npm -g
```

## Project
Create a folder for our server and initialize the Node project.
```bash
mkdir graphql-server
cd graphql-server
npm init
```

## Modern Javascript
To run ES6 Javascript on Node, we need to transpile our code to ES5 using Babel. Install Babel and the presets/plugins we’re going to use.

```bash
npm i --save-dev babel-cli \
                 babel-preset-es2015 \
                 babel-plugin-syntax-async-functions \
                 babel-plugin-transform-regenerator \
                 babel-plugin-transform-runtime
```

Let’s configure Babel. Create a .babelrc file with the following contents:

```javascript
{
  "presets": [
    "es2015"
  ],
  "plugins": [
    "syntax-async-functions",
    "transform-regenerator",
    "transform-runtime"
  ]
}
```

Add the these two run scripts to our package.json:

```javascript
"scripts": {
  "build": "babel src -d build",
  "start": "node build/index.js"
}
```

## Source and Build Directory
Finally, create a source directory called “src”. This is where our ES6 source code will live.

```bash
mkdir src
cd src
echo "console.log('hello');" > index.js
```

## Building and running
To build our source code, run:

```bash
npm run build
```

To run our last build:

```bash
npm run start
```

To rebuild and run:

```bash
npm run build && npm run start
```
