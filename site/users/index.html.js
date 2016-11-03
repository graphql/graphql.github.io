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
    link: 'https://github.com/NewSpring'
  },
  {
    name: 'Buildkite',
    img: 'buildkite.png',
    link: 'https://buildkite.com'
  },
  {
    name: 'LeanIX',
    img: 'leanix.png',
    link: 'https://www.leanix.net'
  },
  {
    name: 'Quri',
    img: 'quri.png',
    link: 'http://www.quri.com'
  },
  {
    name: 'Make School',
    img: 'make-school.png',
    link: 'http://www.makeschool.com'
  },
  {
    name: 'Drift',
    img: 'drift.png',
    link: 'https://www.drift.com/'
  },
  {
    name: 'Icon Systems',
    img: 'icon-systems.png',
    link: 'https://www.iconcmo.com/'
  },
  {
    name: 'ovos',
    img: 'ovos.png',
    link: 'http://www.ovos.at'
  },
  {
    name: 'GraphCMS',
    img: 'graphcms.png',
    link: 'https://graphcms.com'
  },
  {
    name: 'Credit Karma',
    img: 'creditkarma.png',
    link: 'https://www.creditkarma.com/'
  },
  {
    name: 'The Hunt',
    img: 'huntlogo.png',
    link: 'https://www.thehunt.com/'
  },
  {
    name: 'SYZYGY',
    img: 'Syzygy_logo.png',
    link: 'https://www.syzygy.net'
  },
  {
    name: 'UST Global',
    img: 'ustglobal.png',
    link: 'http://www.ust-global.com/'
  },
  {
    name: 'Sale Stock',
    img: 'salestock.png',
    link: 'https://www.salestockindonesia.com'
  },
  {
    name: 'IndonesiaX',
    img: 'indonesiax.png',
    link: 'https://www.indonesiax.co.id'
  },
  {
    name: 'ArangoDB',
    img: 'arangodb.png',
    link: 'https://www.arangodb.com'
  },
  {
    name: 'Wayfair',
    img: 'wayfair.png',
    link: 'https://www.wayfair.com/'
  },
  {
    name: 'BlenderBottle',
    img: 'blenderbottle.png',
    link: 'https://www.blenderbottle.com'
  },
  {
    name: 'Sky',
    img: 'sky.png',
    link: 'https://www.sky.com/'
  },
  {
    name: 'MojiLaLa',
    img: 'mojilala.png',
    link: 'https://www.mojilala.com/'
  },
  {
    name: 'Ningensoft',
    img: 'ningensoft.png',
    link: 'http://www.ningensoft.com/'
  },
  {
    name: 'Whitescape',
    img: 'whitescape.png',
    link: 'http://whitescape.com'
  },
  {
    name: 'Appier',
    img: 'appier.png',
    link: 'https://www.appier.com/'
  },
  {
    name: 'Bright',
    img: 'bright.png',
    link: 'https://www.thinkbright.mx/'
  },
  {
    name: 'Eastview',
    img: 'eastview.png',
    link: 'http://eastview.church/'
  },
  {
    name: 'zlyde',
    img: 'zlyde.png',
    link: 'http://www.zlyde.com/'
  },
  {
    name: 'Artsy',
    img: 'artsy.png',
    link: 'https://artsy.github.io/series/react-native-at-artsy/'
  },
  {
    name: 'Stem Disintermedia',
    img: 'stem.png',
    link: 'https://stem.is'
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
          <a href={logo.link} target="_blank" rel="noopener noreferrer" key={logo.name}>
            <img src={'/users/logos/' + logo.img} title={logo.name} className={logo.isRound ? 'round' : null} />
          </a>
        )}
      </div>

    </section>
  </Site>
