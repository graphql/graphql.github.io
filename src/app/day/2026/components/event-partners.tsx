import { Anchor } from "@/app/conf/_design-system/anchor"
import fostLogo from "../assets/fost-logo.avif"

export function EventPartnersSection() {
  return (
    <section className="gql-section xl:py-12">
      <h3 className="typography-h2 mb-12 text-center">Event Partners</h3>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-center">
          <Anchor
            href="https://www.joinfost.io"
            className="p-8 hover:bg-neu-100 dark:hover:bg-neu-50/25"
          >
            <img
              src={fostLogo.src}
              alt="FOST - Future of Software Technologies"
              width={240}
              height={80}
              className="h-12 w-auto"
            />
          </Anchor>
        </div>
        <p className="typography-body-lg mx-auto max-w-2xl text-pretty text-center">
          GraphQL Day is organized by the community for the community and hosted
          at FOST (Future of Software Technologies).
        </p>
      </div>
    </section>
  )
}
