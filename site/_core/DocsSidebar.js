/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

var DocsSidebar = React.createClass({
  render: function() {
    return <div className="nav-docs">
      {getCategories(this.props.site).map((category) =>
        <div className="nav-docs-section" key={category.name}>
          <h3>{category.name}</h3>
          <ul>
            {category.links.map(page =>
              <li key={page.permalink}>
                <a
                  target={page.url.match(/^https?:/) && '_blank'}
                  style={{marginLeft: page.indent ? 20 : 0}}
                  className={page.id === this.props.page.id ? 'active' : ''}
                  href={page.url}>
                  {page.title}
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>;
  }
});

function getCategories(site) {
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
    if (!previous[page.url]) {
      first = page;
      break;
    }
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
