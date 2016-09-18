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
    name: 'Attendify',
    img: 'attendify.png',
    link: 'https://attendify.com/'
  },
  {
    name: 'Brewery Buddy',
    img: 'brewerybuddy.png',
    link: 'http://brewerybuddy.co/'
  },
  {
    name: 'Loggi',
    img: 'loggi.png',
    link: 'https://www.loggi.com/'
  },
  {
    name: 'Restorando',
    img: 'restorando.png',
    link: 'https://www.restorando.com/'
  },
  {
    name: 'Wishlife',
    img: 'wishlife.png',
    link: 'http://www.wishlife.com'
  },
  {
    name: 'Project September',
    img: 'project-september.png',
    link: 'https://www.projectseptember.com/'
  },
  {
    name: 'Curio',
    img: 'curio.png',
    link: 'https://curio.org'
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
    name: 'Redbubble',
    img: 'redbubble.png',
    link: 'https://www.redbubble.com/'
  },
  {
    name: 'Commercetools',
    img: 'commercetools.png',
    isRound: true,
    link: 'https://commercetools.com/'
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
    name: 'Inerva',
    img: 'inerva.png',
    link: 'http://www.inerva.com'
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
