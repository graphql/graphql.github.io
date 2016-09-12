/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Site = require('../_core/Site');
var DocsSidebar = require('../_core/DocsSidebar');

var Learn = React.createClass({
  render: function() {
    var page = this.props.page;
    var site = this.props.site;

    return (
      <Site section="learn" title="Learn">

        <section className="content documentationContent">
          <DocsSidebar site={site} page={page} />
          <div className="inner-content">
            <h1>Learn</h1>
            <p>
              Whether you're new to GraphQL or running GraphQL in production, we've prepared a list of topics to help you understand everything from fundamentals to best practices.
            </p>

            <h3>Core Concepts</h3>
            <p>
              Start here to get a solid understanding GraphQL concepts and theory.
            </p>
            <ul>
              <li><a>Query Language</a></li>
              <li><a>Type System</a></li>
              <li><a>Validation</a></li>
              <li><a>Execution</a></li>
              <li><a>Introspection</a></li>
            </ul>

            <h3>Best Practices</h3>
            <p>
              Ready to add GraphQL to your stack? Follow these guidelines to get a running start.
            </p>
            <ul>
              <li><a href="/learn/serving-over-http/">Serving Over HTTP</a></li>
              <li><a href="/learn/authorization/">Authorization</a></li>
              <li><a>Domain Modeling</a></li>
              <li><a>Pagination</a></li>
              <li><a>Versioning</a></li>
              <li><a>Performance</a></li>
              <li><a>Security</a></li>
            </ul>

          </div>
        </section>

      </Site>
    );
  }
});

module.exports = Learn;
