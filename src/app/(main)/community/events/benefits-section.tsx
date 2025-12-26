import UsersIcon from "@/app/conf/_design-system/pixelarticons/users.svg?svgr"
import CommentIcon from "@/app/conf/_design-system/pixelarticons/comment.svg?svgr"
import SlidersIcon from "@/app/conf/_design-system/pixelarticons/sliders.svg?svgr"
import EyeIcon from "@/app/conf/_design-system/pixelarticons/eye.svg?svgr"

import { BenefitCard } from "./benefit-card"

export function BenefitsSection({ id }: { id?: string }) {
  return (
    <section className="gql-section" id={id}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="typography-h2 text-balance">
          Benefits of getting involved
        </h2>
        <p className="typography-body-lg mt-4 text-balance text-neu-800 lg:mt-6">
          Contributing to GraphQL means more than writing code — it’s a chance
          to collaborate, share ideas, and shape the future of the ecosystem.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-16 xl:grid-cols-4">
        <BenefitCard
          icon={<UsersIcon aria-hidden className="size-10 text-sec-darker" />}
          title="Valuable networking opportunities"
          description="Engage in conversations and hands-on projects to deepen your understanding of GraphQL."
        />
        <BenefitCard
          icon={<CommentIcon aria-hidden className="size-10 text-sec-darker" />}
          title="Collaborate with others"
          description="Connect with contributors and teams building GraphQL tools and platforms."
        />
        <BenefitCard
          icon={<SlidersIcon aria-hidden className="size-10 text-sec-darker" />}
          title="Help guide the spec"
          description="Share ideas, give feedback, or participate in working groups to influence the future of GraphQL."
        />
        <BenefitCard
          icon={<EyeIcon aria-hidden className="size-10 text-sec-darker" />}
          title="Connect in real life"
          description="Put a face to the handle — meet contributors in person at events and meetups. Build lasting connections beyond the screen."
        />
      </div>
    </section>
  )
}
