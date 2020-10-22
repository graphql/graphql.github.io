# Source Repository for graphql.org
This repository contains the source code of https://graphql.org website.

# Contributing

Organization gh-pages deploy the `master` branch, so active development occurs
on this `source` branch.

### Making changes

The first time, get all the dependencies loaded via

`$ npm install` or `$ yarn install`

Then, run the server via

`$ npm start` or `$ yarn start`

Open [http://localhost:8000](http://localhost:8000) to view it in the browser.
Anytime you make some changes, refresh the page to see the updates.

### Folder structure

- `static` folder contains the files that will be copied directly to `public` folder which will contain the output files to be served by a static HTTP server.

- `src` folder contains markdown and TypeScript/JavaScript files used to generate the website;
- - `assets` folder contains `less` files and those files contain stylesheets
- - `components` and `Containers` folders contains React components that are used in layouts and pages
- - `content` folder contains markdown files for the content of pages
- - `templates` contains the layout templates
- - `utils` contains helper functions

### Publish the Website

Once pushed to the `source` branch, CI will publish http://graphql.org
