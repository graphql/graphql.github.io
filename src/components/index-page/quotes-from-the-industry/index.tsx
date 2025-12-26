import {
  TestimonialsList,
  type Testimonial,
} from "@/app/conf/2025/components/testimonials"
import { SectionLabel } from "@/app/conf/_design-system/section-label"

import matteoCollina from "./matteo-collina.webp"

const testimonials: Testimonial[] = [
  {
    quote:
      "GraphQL gives us enterprise performance with start-up agility: streamlined queries, lean payloads, live updates, and lightning-fast responses help our customers focus on building their applications, not building around them.",
    author: {
      name: "Matteo Collina",
      role: "Platformatic, Co-Founder & CTO",
      avatar: matteoCollina.src,
    },
  },
  {
    quote: (
      <>
        GraphQL is the best developer tool for creating and managing performant
        APIs at scale, both for producers and consumers. It can query any source
        and expose anything back, including real time data. It gives
        understanding of your API usage that no other
        spec&nbsp;can&nbsp;provide.
      </>
    ),
    author: {
      name: "Uri Goldshtein",
      role: "The Guild, Founder & CEO",
      avatar:
        "https://avatars.sched.co/8/2b/14900013/avatar.jpg.320x320px.jpg?9f1",
    },
  },
  {
    quote:
      "The rich ecosystem of powerful tooling enables companies to deliver delightful long-lived APIs rapidly without sacrificing performance or scalability. From solo devs to huge organizations, GraphQL has proven itself time and time again as the right API for mobile and web apps.",
    author: {
      name: "Benjie Gillam",
      role: "Graphile, Director",
      avatar: "https://avatars.sched.co/b/99/18743846/avatar.jpg.320x320px.jpg",
    },
  },
]

export function QuotesFromTheIndustry() {
  return (
    <div className="gql-container py-8 max-md:px-4 md:pb-16 md:pt-24 md:[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="gql-section !py-0">
        <SectionLabel className="max-sm:-ml-1 max-sm:justify-center">
          Quotes from the industry
        </SectionLabel>
        <h2 className="typography-h2 mt-6 text-balance max-sm:text-center">
          Loved by world‑class devs
        </h2>
      </div>
      <TestimonialsList
        testimonials={testimonials}
        className="gql-focus-visible focus-visible:!-outline-offset-4 lg:!mt-0 lg:*:px-16"
      />
    </div>
  )
}
