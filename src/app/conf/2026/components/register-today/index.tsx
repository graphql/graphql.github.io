import { clsx } from "clsx"
import NextImage from "next/image"

import { Button } from "../../../_design-system/button"
import { GET_TICKETS_LINK } from "../../links"

import speakerImage from "./audience.jpg"

export interface RegisterTodayProps {
  className?: string
}

export function RegisterToday({ className }: RegisterTodayProps) {
  return (
    <section
      className={clsx(
        "gql-section flex gap-10 max-lg:flex-col-reverse",
        className,
      )}
    >
      <NextImage
        src={speakerImage}
        alt="GraphQL Conference audience"
        width="450"
        height="566"
        className="aspect-[312/392] w-full object-cover max-sm:hidden sm:aspect-[2] lg:aspect-[450/566] lg:h-[566px] lg:w-[450px]"
        placeholder="blur"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="typography-h2 text-neu-900">
            Let's celebrate GraphQL's success and plan for its future
          </h2>
          <p className="typography-h3 mt-6 text-neu-800 md:mt-10">
            Join two transformative days of expert insights and innovation to
            shape the next decade of APIs!
          </p>
        </div>
        <div className="mt-10 flex gap-x-6 gap-y-4 max-sm:flex-col">
          <Button disabled className="opacity-55" href={GET_TICKETS_LINK}>
            Registration Coming Soon
          </Button>
          <Button className="opacity-55" variant="secondary" href="#sponsors">
            Explore Sponsorship
          </Button>
        </div>
      </div>
    </section>
  )
}
