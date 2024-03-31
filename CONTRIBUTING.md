# Contributing to graphql.org

> This repository is governed by the [GraphQL Code of Conduct](https://graphql.org/codeofconduct). By contributing, you agree to abide by its terms.

Thanks for taking the time to contribute! The GraphQL community is great because of people like you 🎉

There are many ways to get involved. Follow this guide and feel free to [reach out if you have questions](#asking-questions).

## What's in this document

- [Development guide](#development-guide)
  - [Running the site locally](#running-the-site-locally)
  - [Branching](#branching)
  - [Project structure](#project-structure)
  - [Publishing the updated site](#publishing-the-updated-site)
- [Updating content](#updating-content)
  - [Fix a typo, code sample bug, or formatting](#fix-a-typo-code-sample-bug-or-formatting)
  - [Add a library or tool to the Code page](#add-a-library-or-tool-to-the-code-page)
  - [Add a resource to the Community page](#add-a-resource-to-the-community-page)
  - [Add a question to the FAQ](#add-a-question-to-the-faq)
  - [Write a new section or guide](#write-a-new-section-or-guide)
- [Making changes to the code](#making-changes-to-the-code)
  - [Browser support](#browser-support)
- [Contributing something else](#contributing-something-else)
- [Asking questions](#asking-questions)

## Development guide

### Running the site locally

First, clone this repository and move into the directory:

```sh
git clone https://github.com/graphql/graphql.github.io.git
cd graphql.github.io
```

Then, use [pnpm](https://pnpm.io) to install and load all the necessary dependencies:

```sh
pnpm i
```

> Note: [pnpm is currently the only way to run the site locally](https://github.com/graphql/graphql.github.io/issues/946).

Run the `dev` script to launch the server:

```sh
pnpm dev
```

Finally, open http://localhost:3000 to view it in the browser.

The GraphQL website is built with [Nextra](https://nextra.site). This means that a hot-reloading development environment will be accessible by default.

### Branching

Active development for graphql.org happens on the `source` branch. Be sure to create any new branches or direct any pull requests back to `source`.

### Project structure

- `public`: Static files, like images, can be referenced by your code starting from the base URL (`/`)
- `out`: Output files that will be served by a static HTTP server
- `src`: Markdown and the TypeScript/JavaScript files used to generate the website
  - `app`: A new App Router built on React Server Components which supports shared layouts, nested routing, loading states, error handling, and more
  - `pages`: A file-system based router, when a file is added to the `pages` directory, it's automatically available as a route
  - `components`: React components used for pages

### Publishing the updated site

Your changes will be merged into the `source` branch. Then, the CI will automatically publish a new version of https://graphql.org via [Vercel](https://vercel.com/docs).

## Updating content

### Fix a typo, code sample bug, or formatting

If you notice something wrong in the text or code samples, please follow our [development guide](#development-guide) to [open a pull request](https://github.com/graphql/graphql.github.io/pulls) with your fix.

All of the content on https://graphql.org is written and formatted in [Markdown](https://nextra.site/docs/guide/markdown).

### Add a library, tool, or service to the Code page

The [Code page](https://graphql.org/code) is a collection of libraries, tools, and services built for GraphQL.

#### General guidelines

**Adding a resource:**

- With rare exceptions, any pull request that adds a new library, tool, or service to the Code page will be accepted.
- Any library should include a few paragraphs describing the usage and offering people a chance to grok the project priorities.
- If there isn't a section already for your programming language, please add it.

If it isn't a library, tool, or service - then it could go on the [Community page](#add-a-resource-to-the-community-page). If you aren't sure where your resource would fit, you can [open an issue](https://github.com/graphql/graphql.github.io/issues/new) and ask.

**Removing a resource:**

- Services that don't work anymore
- Code repositories that are archived
- Projects declared to be abandoned by their maintainers
- Any link that 404s

We rely on these concrete signals before removing a resource. Even if a project hasn't been released in a few years, that doesn't mean that it's not working.

#### Workflow

To add or remove a resource to this page, follow our [development guide](#development-guide) to [open a pull request](https://github.com/graphql/graphql.github.io/pulls).

The content for this page is located in [various directories under `src/code`](./src/code). Everything is written and formatted in [Markdown](https://nextra.site/docs/guide/markdown).

### Add a resource to the Community page

The [Community page](https://graphql.org/community) highlights resources and groups that help people get more involved with GraphQL.

To add something to this page, follow our [development guide](#development-guide) to [open a pull request](https://github.com/graphql/graphql.github.io/pulls).

The content for this page is located in a [directory under `src/pages/community`](./src/pages/community). Everything is written and formatted in [Markdown](https://nextra.site/docs/guide/markdown).

### Add a question to the FAQ

Our [Frequently Asked Questions (FAQ) page](https://graphql.org/faq) is designed to help answer questions from the community. This page is still in development, so if you think there's a question missing - please [open an issue](https://github.com/graphql/graphql.github.io/issues/new)! It'd be great if you could include both the question and a proposed answer outline in the issue description.

Once you have approval from a maintainer, use the [development guide](#development-guide) to add your question and answer. The content for the FAQ is located in [`src/pages/faq`](./src/pages/faq). Each section has its own [Markdown](https://nextra.site/docs/guide/markdown) file.

> Note: All answers in this section should be vendor-neutral and accessible to GraphQL users of all levels.

When your answer is ready, [open a pull request](https://github.com/graphql/graphql.github.io/pulls).

### Write a new section or guide

There are still several [Best Practices guides that no one has written](https://github.com/graphql/graphql.github.io/issues/41) yet. If you want to take one of these, comment on [the original issue](https://github.com/graphql/graphql.github.io/issues/41) and mention which topic you'll work on.

Then, use our [development guide](#development-guide) to determine where your new page best fits. Our documentation is written and formatted in [Markdown](https://nextra.site/docs/guide/markdown).

Once it's ready for review, please [open a pull request](https://github.com/graphql/graphql.github.io/pulls).

## Making changes to the code

Before diving into any code updates, please [open an issue](https://github.com/graphql/graphql.github.io/issues/new) describing the change(s) you'd like to make.

If you're working off an [existing issue](https://github.com/graphql/graphql.github.io/issues), follow our [development guide](#development-guide) to make your changes. Once it's ready for review, please [open a pull request](https://github.com/graphql/graphql.github.io/pulls) and reference the original issue.

### Browser support

We aim to support the latest stable versions of Chrome, Edge, Firefox, Safari, and Safari on mobile.

## Contributing something else

Interested in adding something not covered in this guide? Please [open an issue](https://github.com/graphql/graphql.github.io/issues/new) and tell us all about your idea.

## Asking questions

If you run into any problems or have questions while contributing, you're always welcome to [open an issue](https://github.com/graphql/graphql.github.io/issues/new).

# Opening a PR to contribute your code

You can also ping our team in the [#website channel on the GraphQL Slack](https://graphql.slack.com/messages/website/). [Get your invite here!](https://graphql-slack.herokuapp.com/)

This repository is managed by EasyCLA. Project participants must sign the free [GraphQL Specification Membership agreement](https://preview-spec-membership.graphql.org) before making a contribution. You only need to do this one time, and it can be signed by [individual contributors](https://individual-spec-membership.graphql.org) or their [employers](https://corporate-spec-membership.graphql.org).

To initiate the signature process please open a PR against this repo. The EasyCLA bot will block the merge if we still need a membership agreement from you.

You can find [detailed information here](https://github.com/graphql/graphql-wg/tree/main/membership). If you have issues, please email operations@graphql.org.

If your company benefits from GraphQL and you would like to provide essential financial support for the systems and people that power our community, please also consider membership in the [GraphQL Foundation](https://foundation.graphql.org/join).
