/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Site = require('../_core/Site');
var center = require('../_core/center');
var h2 = require('../_core/H2');

var Learn = React.createClass({
  render: function() {
    return (
      <Site section="learn" title="Learn">

        <section className="content documentationContent nosidebar">
          <div className="inner-content">
            <h1>Learn</h1>
            <p>
              <strong>GraphQL</strong> is worked on full-time by Facebook&#39;s product infrastructure engineering teams. They&#39;re often around and available for questions.
            </p>

            <h2>Slack</h2>
            <p>Many developers and users idle on Slack in <a href="https://graphql.slack.com/messages/general/" target="_blank"><strong>#general</strong> on GraphQL</a>. <a href="https://graphql-slack.herokuapp.com/" target="_blank">Get your invite here!</a></p>

            <h2>Stack Overflow</h2>
            <p>Many members of the community use Stack Overflow to ask questions. Read through the existing <a href="http://stackoverflow.com/questions/tagged/graphql" target="_blank">questions tagged with <strong>graphql</strong></a> or <a href="http://stackoverflow.com/questions/ask?tags=graphql" target="_blank">ask your own</a>!</p>

          </div>
        </section>

      </Site>
    );
  }
});

module.exports = Learn;
