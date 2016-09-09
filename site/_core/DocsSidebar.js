/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

// thisPageID is the id of the rendering page
// category is the category object to render a sidebar for
function sidebarForCategory(thisPageID, category) {
  var listItems = [];
  for (var page of category.links) {
    var target = page.url.match(/^https?:/) && '_blank';
    var marginLeft = page.indent ? 20 : 0;

    // Link for the main page overall
    listItems.push(
      <li key={page.permalink}>
        <a
          target={target}
          style={{marginLeft: marginLeft}}
          className={page.id === thisPageID ? 'active' : ''}
          href={page.url}>
          {page.sidebarTitle || page.title}
        </a>
      </li>
    );

    // Sublinks to any page sub-parts
    if (page.sublinks) {
      var sublinks = page.sublinks.split(',').sort();
      for (var sublink of sublinks) {
        listItems.push(
          <li key={page.permalink + '-' + sublink}>
            <a
              target={target}
              style={{marginLeft: marginLeft + 20}}
              href={page.url + '#' + sublink.toLowerCase()}>
              {sublink}
            </a>
          </li>
        );
      }
    }
  }

  return (
    <div className="nav-docs-section" key={category.name}>
      <h3>{category.name}</h3>
      <ul>{listItems}</ul>
    </div>
  );
}

var DocsSidebar = React.createClass({
  render: function() {
    return <div className="nav-docs">
      {getCategories(this.props.site, this.props.firstURL).map((category) =>
        sidebarForCategory(this.props.page.id, category)
      )}
    </div>;
  }
});

// If firstURL is provided, it's the URL (starting with /) of the
// first page to put on the sidebar.
function getCategories(site, firstURL) {
  var pages = site.files.docs.filter(file => file.content);

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
    if (firstURL ? (firstURL === page.url) : !previous[page.url]) {
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
