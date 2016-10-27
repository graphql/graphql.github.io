/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
import { toSlug } from './Header';

// thisPageID is the id of the rendering page
// category is the category object to render a sidebar for
function sidebarForCategory(thisPageID, category) {
  var listItems = [];
  for (var page of category.links) {

    const shouldOpenInNewWindow = page.url.slice(0, 4) === 'http';
    const target = shouldOpenInNewWindow ? '_blank' : null;
    const rel = shouldOpenInNewWindow ? 'noopener noreferrer' : null;

    var marginLeft = page.indent ? 20 : 0;

    // Sublinks to any page sub-parts
    var sublinkUL = page.sublinks &&
      <ul>{page.sublinks.split(',').map(sublink =>
        <li key={sublink}>
          <a target={target} rel={rel} href={page.url + '#' + toSlug(sublink)}>
            {sublink}
          </a>
        </li>
      )}</ul>;

    // Link for the main page overall
    listItems.push(
      <li key={page.permalink}>
        <a
          target={target}
          rel={rel}
          style={{marginLeft: marginLeft}}
          className={page.id === thisPageID ? 'active' : ''}
          href={page.url}>
          {page.sidebarTitle || page.title}
        </a>
        {sublinkUL}
      </li>
    );
  }

  return (
    <div key={category.name}>
      <h3>{category.name}</h3>
      <ul>{listItems}</ul>
    </div>
  );
}

var DocsSidebar = React.createClass({
  render: function() {
    return <div className="nav-docs">
      {getCategories(this.props.site, this.props.page.dir, this.props.firstURL).map((category) =>
        sidebarForCategory(this.props.page.id, category)
      )}
    </div>;
  }
});

// If firstURL is provided, it's the URL (starting with /) of the
// first page to put on the sidebar.
function getCategories(site, dir, firstURL) {
  if (!site.files[dir]) {
    throw new Error('Cannot build sidebar for ' + dir);
  }
  var pages = site.files[dir].filter(file => file.content);

  // Build a hashmap of url -> page
  var articles = {}
  for (var i = 0; i < pages.length; ++i) {
    var page = pages[i];
    articles[page.url] = page;
  }

  // Build a hashmap of url -> previous_url
  var previous = {};
  for (var i = 0; i < pages.length; ++i) {
    var page = pages[i];
    if (page.next) {
      if (!articles[page.next]) {
        throw new Error(
          '`next: ' + page.next + '` in ' + page.url + ' doesn\'t exist'
        );
      }
      previous[articles[page.next].url] = page.url;
    }
  }

  // Find the first element which doesn't have any previous
  var first = null;
  for (var i = 0; i < pages.length; ++i) {
    var page = pages[i];
    if (firstURL === page.url || !previous[page.url]) {
      first = page;
      break;
    }
  }
  if (!first) {
    throw new Error('first not found');
  }

  var categories = [];
  var currentCategory = null;

  var page = first;
  var i = 0;
  while (page && i++ < 1000) {
    if (!currentCategory || page.category !== currentCategory.name) {
      currentCategory && categories.push(currentCategory);
      currentCategory = {
        name: page.category,
        links: []
      }
    }
    currentCategory.links.push(page);
    page = articles[page.next];
  }
  categories.push(currentCategory);

  return categories;
}

module.exports = DocsSidebar;
