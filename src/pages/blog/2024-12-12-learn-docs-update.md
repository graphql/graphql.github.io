---
title: "Learn Documentation Update, October - November 2024"
tags: ["grants"]
date: 2024-12-12
byline: Mandi Wise
---

> The GraphQL Foundation offers [Community Grants](https://graphql.org/foundation/community-grant/) to help incentivize key technical and community initiatives. As part of the grant, applicants commit to write a blog post report describing their work and its impact on the GraphQL community. The following report was written by successful grant applicant Mandi Wise in November 2024, detailing the documentation updates she submitted during October and November of that year.

## The opportunity

The [Learn documentation](https://graphql.org/learn/) has been a key resource on this site since its launch. And because of their search engine ranking, the tutorial pages are often one of the first stops for someone starting their GraphQL learning journey. They're also a great resource for those already working on GraphQL projects who want to ensure they implement best practices.

The Learn docs have undergone some maintenance and iteration since their initial publication, but there were [some long-outstanding tasks](https://github.com/graphql/graphql.github.io/issues/41) for this section of the site, as well as several open docs-related issues in the repository that had been submitted by community members. I have some experience teaching and writing about GraphQL, so in late August, I decided to submit a proposal to the [GraphQL Community Grant](https://graphql.org/foundation/community-grant/) program so I could make a focused effort to address a collection of the open issues, as well as fill in some other content gaps that had emerged as the specification has evolved and certain best practices have become well-established in the community.

The grant application was approved by the GraphQL Foundation a few weeks later into September, and I started work on the project by early October, with a goal of completing the work by the end of November.

## Doing the work

The scope of my approved project was to review and edit most of the pages in the Learn section of the site, create several new pages, and split some of the existing pages into more focused topics with expanded content. After my proposal was approved, I further refined the scope of this work by completing a more detailed content audit that was reviewed by members of the GraphQL TSC before I proceeded.

Now that the work has been completed, some notable changes include:

- A new and improved [landing page](/learn/) for the docs
- Dedicated pages for [Queries](/learn/queries/) and [Mutations](/learn/mutations/) with additional examples, plus a new [Subscriptions page](/learn/subscriptions)
- A new [Response page](/learn/response/) with content about data and error formats
- An overhauled [Serving over HTTP page](/learn/serving-over-http/) so that it aligns with the [draft GraphQL over HTTP specification](https://graphql.github.io/graphql-over-http/draft/)
- New pages in the Best Practices section covering [Performance](/learn/performance/) and [Security](/learn/security) topics

In addition to these content changes, I also standardized the page formatting with subtitles and summaries, made some additions to the SWAPI schema to support the new examples in the docs, and made a quality of life improvement to the mini GraphiQL component to add labels to each of the panels in the editor.

To complete this work, I submitted PRs to the [graphql.github.io repo](https://github.com/graphql/graphql.github.io) and I typically sent one PR per docs page to keep the review process manageable. This approach also allowed us to incrementally release updated pages to the site when they were ready. In total, I submitted 12 PRs that addressed 8 open issues in the repository.

Refining and publishing the docs content was a collaborative process, and I'd like to give a big shout-out to [Benjie Gillam](https://github.com/benjie) for the time he committed to reviewing all of my PRs and providing feedback throughout this process. I'd like to thank [Uri Goldshtein](https://github.com/Urigo), [Saihajpreet Singh](https://github.com/saihaj), [Eddy Nguyen](https://github.com/eddeee888), and [Dimitri POSTOLOV](https://github.com/dimaMachina) for their feedback during this project too.

## What's next?

The Learn docs have been broadly updated now, but there's still potential for additional enhancements. Some ideas that were discussed but that ultimately fell outside the scope of this project included new pages on trusted documents, composite schemas, and migrating from REST, as well as developing expanded content for the existing Caching page.

If you're interested in any of these topics, I'd encourage you to send a PR or even [submit a grant proposal](https://graphql.org/foundation/community-grant/) too if you're inspired to take on a larger project. Feel free to reach out to me on Discord (@mandi.wise) or [Github](https://github.com/mandiwise/) and I'd be happy to provide input or help.
