# Contributing to graphql.org

> This repository is governed by the [GraphQL Code of Conduct](https://graphql.org/codeofconduct/). By contributing, you agree to abide by its terms.

Thanks for taking the time to contribute! The GraphQL community is great because of people like you 🎉 

There are many ways to contribute to the GraphQL website. Follow this guide and feel free to [reach out if you have questions](#asking-questions).

## What's in this document

- [Development guide](#development-guide)
    - [Running the site locally](#running-the-site-locally)
    - [Branching](#branching)
    - [Folder structure](#folder-structure)
    - [Publishing the updated site](#publishing-the-updated-site)
- [Updating content](#updating-content)
    - [Fix a typo, code sample bug, or fomatting](#fix-a-typo-code-sample-bug-or-formatting)
    - [Add a library or tool to the Code page](#add-a-library-or-tool-to-the-code-page)
    - [Add a resource to the Community page](#add-a-resource-to-the-community-page)
    - [Add a question to the FAQ](#add-a-question-to-the-faq)
    - [Write a new section or guide](#write-a-new-section-or-guide)
- [Making changes to the code](#making-changes-to-the-code)
- [Contributing something else](#contributing-something-else)
- [Asking questions](#asking-questions)

## Development guide

### Running the site locally

First, clone this repository and move into the directory: 

```bash
git clone https://github.com/graphql/graphql.github.io.git
cd graphql.github.io
```

Then, use [Yarn](https://yarnpkg.com/getting-started/install) to install and load all of the necessary dependencies:

```bash
yarn 
```

> Note: [Yarn is currently the only way to run the site locally](https://github.com/graphql/graphql.github.io/issues/946).

Run the `start` script to launch the server:

```bash
yarn start
```

Finally, open [http://localhost:8000](http://localhost:8000) to view it in the browser.

Because graphql.org is built with [Gatsby](https://www.gatsbyjs.com/docs/), a hot-reloading development environment is accessible by default. 

### Branching

Active development for graphql.org happens on the `source` branch. Be sure to create any new branches or direct any pull requests back to `source`. 

### Folder structure

- `static` folder contains the files that will be copied directly to `public` folder which will contain the output files to be served by a static HTTP server.
- `src` folder contains markdown and TypeScript/JavaScript files used to generate the website.
- - `assets` folder contains `less` files and those files contain stylesheets.
- - `components` and `Containers` folders contains React components that are used in layouts and pages.
- - `content` folder contains markdown files for the content of pages.
- - `templates` contains the layout templates.
- - `utils` contains helper functions.

### Publishing the updated site

Once your changes have been merged into the `source` branch, the CI will automatically publish a new version of http://graphql.org via [Netlify](https://docs.netlify.com/).

## Updating content

### Fix a typo, code sample bug, or fomatting

If you notice something wrong in the text or code samples, please follow our [development guide](#development-guide) and [open a pull request directly](https://github.com/graphql/graphql.github.io/pulls) with your fix. 

All of the content on graphql.org is written and formatted in [Markdown](https://www.gatsbyjs.com/docs/mdx/markdown-syntax/).

### Add a library or tool to the Code page

The [Code page](https://graphql.org/code/) is a comprehensive resource of libraries, tools, services, and more built for GraphQL. 

To add your resource to this page, follow our [development guide](#development-guide) and [open a pull request directly](https://github.com/graphql/graphql.github.io/pulls). 

The content for this page is located in [various directories under `src/content/code`](./src/). Everything is written and formatted in [Markdown](https://www.gatsbyjs.com/docs/mdx/markdown-syntax/).

### Add a resource to the Community page

The [Community Resources page](https://graphql.org/community/) highlights resources and groups to help people become more involved with GraphQL.

To add something to this page, follow our [development guide](#development-guide) and [open a pull request directly](https://github.com/graphql/graphql.github.io/pulls). 

The content for this page is located in a [directory under `src/content/community`](./src/). Everything is written and formatted in [Markdown](https://www.gatsbyjs.com/docs/mdx/markdown-syntax/).

### Add a question to the FAQ

Our [Frequently Asked Questions (FAQ)](https://graphql.org/faq/) page is designed to help answer all of the GraphQL unknowns. This page is still in development, so if you think there's a question missing - please [open an issue](https://github.com/graphql/graphql.github.io/issues/new)! It'd be great if you could include both the question and a proposed answer outline in the issue description.

When your question has been approved, you can use our [development guide](#development-guide) to add your question and answer. All of the content for the FAQ is located in [`src/content/faq`](./src/content/faq/). Each section has its own file and all of the content is written in [Markdown](https://www.gatsbyjs.com/docs/mdx/markdown-syntax/). 

> Please note that all answers in this section should be _vendor-neutral_ and accessible to GraphQL users of all levels.

Once your answer is ready, [open a pull request](https://github.com/graphql/graphql.github.io/pulls/).

### Write a new section or guide

There are still several [Best Practices guides that haven't been written yet](https://github.com/graphql/graphql.github.io/issues/41). If you're interested in taking up one of these, please comment on [the original issue](https://github.com/graphql/graphql.github.io/issues/41) and mention that you're tackling it.

Then, you can use our [development guide](#development-guide) to determine where your new page best fits. All of our documentation is written and formatted in [Markdown](https://www.gatsbyjs.com/docs/mdx/markdown-syntax/). 

Once it's ready for review, please [open a pull request](https://github.com/graphql/graphql.github.io/pulls/).

## Making changes to the code

Before diving into any code updates, please [open an issue](https://github.com/graphql/graphql.github.io/issues/new) describing the change(s) you'd like to make.

If you're working off an [existing issue](https://github.com/graphql/graphql.github.io/issues/), you can follow our [development guide](#development-guide) to make your changes. Once it's ready for review, please [open a pull request](https://github.com/graphql/graphql.github.io/pulls/) and reference the original issue.

## Contributing something else

Interested in adding something not covered in this guide? Please [open an issue](https://github.com/graphql/graphql.github.io/issues/new) and tell us all about your idea.

## Asking questions

If you run into any problems or have questions while contributing, you're always welcome to [open an issue](https://github.com/graphql/graphql.github.io/issues/new). 

Alternatively, you can ping our team in the [#website channel on the GraphQL Slack](https://graphql.slack.com/messages/website/). [Get your invite here!](https://graphql-slack.herokuapp.com/) 