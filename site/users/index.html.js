/**
 * Copyright (c) 2015, GraphQL Contributors
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Site = require('../_core/Site');

const iframe = '<iframe frameBorder="0" id="landscape" scrolling="no" style="width: 1px; min-width: 100%" src="https://landscape.graphql.org/category=graph-ql-adopter&format=card-mode&grouping=no&embed=yes"></iframe>';

function Iframe(props) {
  return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);

module.exports = ({ page }) =>
  <Site title="Who's Using" page={page}>
    <section className="whos-using-page">

      <div className="prose">
        <h1>Who&rsquo;s using GraphQL?</h1>
        <p>
          GraphQL is used by teams of all sizes in many different environments and languages to power mobile apps, websites, and APIs.
        </p>
        <p>
          Is your company using GraphQL?<br />
          Please send a pull request to the <a href="https://github.com/graphql/graphql-landscape">GraphQL Landscape</a> and follow <a href="https://github.com/graphql/graphql-landscape#new-entries">instructions.</a>
        </p>
      </div>

      <Iframe iframe={iframe} />
      
      <script src="https://landscape.cncf.io/iframeResizer.js"></script>

    </section>
  </Site>
