---
title: Key Insights from the GraphQL EU Gathering
tags: ["blog"]
layout: blog
date: 2023-08-01
byline: Jamie Barton
permalink: /blog/2023-08-01-key-insights-from-the-graphql-eu-gathering
---

As the adage goes, unity is strength. The premier GraphQL EU "unconference", held in Berlin, is a testament to this belief. This phenomenal event was the result of immense collaboration between various companies and providers within our vibrant ecosystem. The partnership among these key players, backed by the tireless efforts of the [GraphQL Foundation](/foundation/), truly highlighted the strength of our community and the unity we foster.

Such dedication from all corners reinforces our commitment to growing and strengthening the global GraphQL community. We understand that a robust community is not built on grand events alone, but through localized meetups and smaller gatherings that allow enthusiasts and experts to exchange knowledge and ideas on a more intimate level.

To that end, we encourage and are excited to support local contributors eager to organize GraphQL meetups. A shining example of a successful local event was the recent gathering in Amsterdam, which saw a vibrant mix of participants sharing their GraphQL journeys, learning from each other, and expanding their networks. Now, with the backing of the GraphQL Foundation, anyone with the zeal and passion to bring the GraphQL community together at a local level can do so with our full support.

## GraphQL EU

![Promotional banner promoting the date, time and place for GraphQL EU](/img/blog/2023-08-01-key-insights-from-the-graphql-eu-gathering/banner.jpg)

The "unconference" format encourages an open dialogue; it provides a platform for all participants to express their ideas, facilitating enriching discussions about their daily experiences with GraphQL, both the victories and the challenges.

After everyone had gathered and invigorated themselves with coffee and croissants (it was a tad too early for currywurst), we proceeded to convene in the main hall.

### The Day

The day kicked off with brief presentations from all sponsors - [Mirumee Software](https://mirumee.com/), [The Guild Software](https://the-guild.dev/), [Stellate](https://stellate.co/), [Saleor Commerce](https://saleor.io/), [Hasura](https://hasura.io/), [Escape](https://escape.tech/). Far from being standard sponsor speeches, each speaker conveyed an inspiring experience that would later spark a day brimming with engaging discussions.

After the sponsor presentations concluded, [Van Riper](https://twitter.com/vanriper) did an outstanding job outlining the subsequent plan of action, ensuring we kept to the allocated timetable!

Each participant was given a card to jot down their discussion topic, followed by a 20-second slot on stage to present it. Once we deciphered the correct usage of sticky tape, these cards were affixed to the whiteboards. This interactive activity essentially laid down the structure for the remainder of the day's events.

![A whiteboard of attendee-provided topics for discussion](/img/blog/2023-08-01-key-insights-from-the-graphql-eu-gathering/whiteboard.jpg)

### Round 1

The moment had come to choose a topic and dive right in! We were allocated approximately an hour to join a section of the hall for in-depth topic discussions.

Given the multitude of subjects presented on various whiteboards, selecting just one posed quite a challenge.

I chose to participate in the conversation at location **R1/D**, which encompassed three related topics:

1. **Enhancing the GraphQL Developer Experience**
2. **Simplifying GraphQL Servers (with a gateway)**
3. **Identifying missing elements in GraphQL Developer Tooling**

Even though the discussion adhered to the set time limit, it undoubtedly contained a wealth of material.

The primary conclusion drawn from this conversation was the pressing need for additional standards, or even better, detailed specifications for GraphQL implementation on both the server and client side. Developers frequently find themselves reapplying identical logic across different languages due to a lack of standardization. This often results in using one language as a foundation for the next.

However, if there's a deviation from the original, it could negatively impact the developer experience, especially for those working with numerous languages across different stacks.

Creating a specification doesn't have to be a complex process, nor does it need the sanction of anyone to be beneficial. Several years ago, [Jayden Seric](https://github.com/jaydenseric/graphql-multipart-request-spec) introduced the GraphQL multipart request specification. Anyone who is implementing multipart uploads will appreciate the guidance and insights offered by such a singular specification, allowing developers to concentrate on the tasks of building and delivering their applications.

During the first round's intermission, I had the chance to observe Uri Goldshtein guiding the Beyond GraphQL group. This intriguing dialogue explored how GraphQL's concepts could be integrated with other tools and standards, including OpenAPI and gRPC. The group also pondered over the existing divide and potential ways to bridge these specifications, aiming for a more unified landscape where the right tool can be chosen for the job.

The discussion, under Uri's skillful moderation, took an exciting turn as they probed the potential for repurposing existing APIs using GraphQL by means of automation. Numerous organizations and tools like GraphQL Mesh, Grafbase, SOFA, Hasura, and Wundergraph are already navigating these waters. They invite and appreciate the participation of anyone interested in contributing to this evolving domain through open-source projects.

In his concluding remarks, Uri underscored, "The moment has arrived for the discourse within the GraphQL ecosystem to evolve beyond the 'GraphQL vs. REST' debate. Instead, we should focus on how we can apply GraphQL's robust features to enrich other existing APIs."

### Round 2

Choosing the next discussion to attend proved to be quite a difficult task that saw me staring at a board of topic cards longer than I would like to admit. I was torn between the following topics:

- **Relay**
- **Federation in Practice / Combining and Extending GraphQL APIs**

Given my day-to-day role involves guiding and assisting developers to excel in extending GraphQL APIs with [Grafbase](https://grafbase.com), I felt a strong inclination towards this topic. However, my intuition, coupled with the palpable growing support for Relay, guided my decision in the end.

Hearing from [Denis Badurina](https://twitter.com/enisdenjo), [Marion Schleifer](https://twitter.com/rubydwarf), [Stephan Schneider](https://twitter.com/zcei_GER), and others about their experiences with Relay was enlightening.

I openly admitted to the group that it had been several years since my last encounter with Relay (which, admittedly, was not entirely successful), but I was eager to understand the current usage patterns and share some of the narratives I've come across in my GraphQL journey regarding why developers often don't select Relay as their first choice.

As the session neared its end, it became evident that there were some common reasons why Relay wasn't the first choice for developers:

- A perceived steep learning curve, mainly resulting from the mental model shift surrounding components and data dependencies.
- Setting up the compiler configuration was frequently a tedious task.

**Interestingly, those developers who do use Relay are indeed very fond of it!**

### Round 3

As the day was nearing its conclusion, it was time to choose a topic that would potentially ignite conversations even during the evening reception drinks. And I must say, I certainly opted for such a topic!

The subject at **R3/C** centred around **the role of GraphQL in the era of TRPC and RSC**. I commend [Bogdan](https://twitter.com/soarebo) for his audacity to bring up such a contentious topic. But then again, we were at a GraphQL event, so the reactions wouldn't have been as fiery as they would have been if this topic had emerged on a tweet.

All participants were given the opportunity to express their opinions and explain why the topic stirred up so much controversy. [Uri Goldshtein](https://twitter.com/UriGoldshtein) introduced some impressive open source projects within the community, particularly [Garph](https://garph.dev/)/[GQty](https://gqty.dev/), which aim to close the gap and simplify the process of generating types for end-to-end type safety.

The omnipresence of React is no secret. Its adoption is surging across the board, a trend further amplified by the significant influence that Next.js has exerted within the ecosystem.

> [State of JavaScript 2022: Front-end Frameworks](https://2022.stateofjs.com/en-US/libraries/front-end-frameworks/)

It's also well-known that the rise of Next.js and RSC is stirring up numerous concerns and questions, and encountering some challenges, as it propels the community forward with their runtime implementation of **React Server Components**. I believe GraphQL is also at a crossroads, trying to determine its ideal niche within this evolving React ecosystem.

However, it's crucial to remember that while React and Next.js are prevalent choices, there are many other languages and frameworks that can leverage GraphQL. As a community, we sometimes overlook these alternatives.

If you haven't yet used [Houdini GraphQL](https://www.houdinigraphql.com) and Svelte, you're in for a treat. Houdini offers a refreshing approach to constructing type-safe web applications powered by GraphQL.

Overall, it seemed that GraphQL was continuing to expand, but its applications were shifting. Developers who are building web and mobile applications seem to be moving towards simpler routing mechanisms, like Tanstack and React Router, coupled with Relay for client-side data loading and caching.

## Key Insights from GraphQL EU

While I couldn't be part of every conversation, a myriad of topics were undoubtedly discussed during the reception after-party, and even the after-after-party.

Below are the main insights I jotted down in my Notes App throughout the day:

- Despite its initial complexity and paradigm shift, Relay is increasingly adopted by those with more GraphQL experience, especially due to its ability to co-locate fragments with their respective components.
- While tRPC is attractive, not all companies have total control over their tech stacks and rely on external GraphQL APIs. Consequently, more developers are utilizing gateway or federation methods to integrate these APIs.
- Ensuring GraphQL APIs are versionless is vital for mobile applications to function smoothly, given users frequently lag in updating their apps.
- For SPAs or mobile apps, where client fetching is preferable, GraphQL still offers a superior experience. React Server Components (RSC), particularly with Next.js, doesn't provide much scope for GraphQL, and that's acceptable.
- For server-rendered applications, GraphQL remains a viable choice. As a simple function or network call, it can facilitate integration with multiple APIs more efficiently than having to install numerous SDKs.

## What's next for GraphQL?

As significant as this event was, we are set to surpass it with the official [GraphQL Conf](https://graphql.org/conf), scheduled for September 19-21 in San Francisco. If you thought this event was insightful, I guarantee you that the upcoming conference is going to be a game-changer!

You wouldn't want to miss out, so grab your tickets soon! I look forward to seeing many familiar faces and meeting new ones at the conference.

- [Buy a Ticket!](https://graphql.org/conf/#attend)
- [See the schedule](https://graphql.org/conf/schedule/)
- [Become a sponsor](https://graphql.org/conf/sponsor/)

## Get involved

Though the aforementioned reflections encapsulate my journey, I encourage you to contribute your unique experiences to our collective narrative. [Connect with us on Discord](https://discord.graphql.org) and enrich the GraphQL community with your insights.

See you in San Francisco!
