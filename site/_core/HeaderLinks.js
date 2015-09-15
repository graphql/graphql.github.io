/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');

var HeaderLinks = React.createClass({
  links: [
    {section: 'docs', text: 'Docs', href: '/docs/getting-started/' },
    {section: 'blog', text: 'Blog', href: '/blog/' },
    {section: 'help', text: 'Help', href: '/help/' },
    {section: 'code', text: 'Code', href: '/code/' },
    {section: 'spec', text: 'Spec', href: 'http://facebook.github.io/graphql/' },
  ],

  render: function() {
    return (
      <ul className="nav-site">
        {this.links.map(function(link) {
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
        }, this)}
      </ul>
    );
  }
});

module.exports = HeaderLinks;
