# Contributing

Organization gh-pages deploy the `master` branch, so active development occurs
on this `source` branch.

The site is written in JS and Markdown files in `site/`.

The site chrome are all in JS files in `site/_core/`.

### Making changes

The first time, get all the dependencies loaded via

```
npm install
```

Then, run the server via

```
npm start
Open http://localhost:8444/
```

Anytime you change the contents, just refresh the page and it's going to be updated.

### Publish the Website

Once pushed to the `source` branch, Travis CI will publish http://graphql.org
