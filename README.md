# Contributing

Organization gh-pages deploy the `master` branch, so active development occurs
on this `source` branch.

The site is written in JS and Markdown files in `site/`.

The site chrome are all in JS files in `site/_core/`.

### Making changes

The first time, get all the dependencies loaded via

`$ npm install` or `$ yarn install`

Then, run the server via

`$ npm start` or `$ yarn start`

Open [http://localhost:8444](http://localhost:8444) to view it in the browser.
Anytime you make some changes, refresh the page to see the updates.

### Publish the Website

Once pushed to the `source` branch, Travis CI will publish http://graphql.org
