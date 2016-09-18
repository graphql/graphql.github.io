/**
 * Copyright (c) 2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Site = require('../_core/Site');

/**
 * Adding your logo?
 * Add it to the /users/logos/ directory and then append an entry to this list.
 *
 * Please include logos with transparent backgrounds with no extra margin in the image.
 * If your logo is round, include `isRound: true` in your entry.
 */
var logos = [
  {
    name: 'Facebook',
    img: 'facebook.png',
    link: 'https://www.facebook.com/'
  },
  {
    name: 'GitHub',
    img: 'github.png',
    isRound: true,
    link: 'https://developer.github.com/early-access/graphql'
  },
  {
    name: 'Intuit',
    img: 'intuit.png',
    link: 'https://www.intuit.com/'
  },
  {
    name: 'Coursera',
    img: 'coursera.png',
    link: 'https://www.coursera.org/'
  },
  {
    name: 'Pinterest',
    img: 'pinterest.png',
    isRound: true,
    link: 'https://www.pinterest.com/'
  },
  {
    name: 'Hudl',
    img: 'hudl.png',
    link: 'https://www.hudl.com/'
  },
  {
    name: 'Reindex',
    img: 'reindex.png',
    link: 'https://www.reindex.io/'
  },
  {
    name: 'Shopify',
    img: 'shopify.png',
    isRound: true,
    link: 'https://www.shopify.com/'
  },
  {
    name: 'Meteor',
    img: 'meteor.png',
    link: 'https://medium.com/apollo-stack/snappier-uis-with-apollo-client-graphql-bffab0b52b79#.fr92aru2y'
  },
  {
    name: 'Persado',
    img: 'persado.png',
    link: 'http://persado.com/platform/persado-go/'
  },
  {
    name: 'Bazinga',
    img: 'bazinga.png',
    link: 'https://www.mybazinga.com/'
  },
  {
    name: 'OK GROW!',
    img: 'okgrow.png',
    link: 'https://www.okgrow.com/graphql'
  },
  {
    name: '20 Minutes',
    img: '20minutes.png',
    link: 'http://www.20minutes.fr'
  },
  {
    name: 'AlloCiné',
    img: 'allocine.png',
    link: 'http://www.allocine.fr'
  },
  {
    name: 'Easy Carros',
    img: 'easycarros.png',
    link: 'http://www.easycarros.com'
  },
  {
    name: 'Graphcool',
    img: 'graphcool.png',
    link: 'https://graph.cool'
  },
  {
    name: 'Alphasights',
    img: 'alphasights.png',
    link: 'https://engineering.alphasights.com'
  },
  {
    name: 'Inerva',
    img: 'inerva.png',
    link: 'http://www.inerva.com'
  },
  {
    name: 'Serverless',
    img: 'serverless.png',
    link: 'https://serverless.com/'
  },
  {
    name: 'NewSpring',
    img: 'newspring.png',
    link: 'http://www.newspring.cc'
  },
  // Adding your logo?
  // Add it to the /users/logos/ directory and then append an entry above this comment.
  //
  // Please include logos with transparent backgrounds with no extra margin in the image.
  // If your logo is round, include `isRound: true` in your entry.
];

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
          Edit this page with a <a target="_blank" href={'https://github.com/graphql/graphql.github.io/edit/source/site/' + page.relPath}>Pull Request</a> to add your logo.
        </p>
      </div>

      <div className="logos">
        {logos.sort((a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
        ).map(logo =>
          <a href={logo.link} target="_blank" key={logo.name}>
            <img src={'/users/logos/' + logo.img} title={logo.name} className={logo.isRound ? 'round' : null} />
          </a>
        )}
      </div>

    </section>
  </Site>
