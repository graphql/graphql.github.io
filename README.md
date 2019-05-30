# graphql.org

[![Netlify Status](https://api.netlify.com/api/v1/badges/fe465681-9244-47cd-8366-6bbb3e012d53/deploy-status)](https://app.netlify.com/sites/graphql-org/deploys)

This repository houses the sources used to build the main [GraphQL](https://graphql.org) website.

## Contributing

The graphql.org site is built using JavaScript and [Markdown](https://www.markdownguide.org/) in the [`site`](./site) directory. The JavaScript sources can be found in [`site/_core`](./site/_core).

### Running the site locally

To run the graphql.org site locally, you need to have [npm](https://npmjs.org) installed.

To install the site's dependencies:

```bash
npm install
```

To run the server:

```bash
npm start
```

You can then access the locally running site at http://localhost:8444.

Anytime you change the contents, refresh the page and the site will be updated.

## Publishing the site

The site is published automatically by [Netlify](https://netlify.com).
