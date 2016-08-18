/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

var HeaderLinks = React.createClass({
  linksInternal: [
    {section: 'docs', text: 'Learn', href: '/docs/getting-started/' },
    {section: 'code', text: 'Code', href: '/code/' },
    {section: 'help', text: 'Community', href: '/help/' },
    {section: 'blog', text: 'Blog', href: '/blog/' },
  ],
  linksExternal: [
    {section: 'spec', text: 'Spec', href: 'http://facebook.github.io/graphql/' },
  ],

  renderLinks: function(links) {
    return links.map(function(link) {
      return (
        <li key={link.section}>
          <a
            href={link.href}
            target={link.href.slice(0, 4) === 'http' ? '_blank' : null}
            className={link.section === this.props.section ? 'active' : ''}>
            {link.text}
          </a>
        </li>
      );
    }, this);
  },

  render: function() {
    return (
      <div className="nav-site-wrapper">
        <ul className="nav-site nav-site-internal">
          {this.renderLinks(this.linksInternal)}
        </ul>

        <div className="algolia-search-wrapper">
          <input id="algolia-doc-search" type="text" placeholder="Search docs..." />
        </div>

        <ul className="nav-site nav-site-external">
          {this.renderLinks(this.linksExternal)}
        </ul>
      </div>
    );
  }
});

module.exports = HeaderLinks;
