import { clsx } from "clsx"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"

export function LookingForMore(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      {...props}
      className={clsx("gql-container gql-section", props.className)}
    >
      <div className="mx-auto grid max-w-[1504px] gap-0 bg-pri-dark text-white lg:grid-cols-[752px_1fr]">
        <div className="flex flex-col justify-between gap-8 border-pri-light p-8 lg:border-r lg:p-16">
          <h2 className="typography-h2">Looking for more?</h2>
          <p className="typography-body-lg max-w-[624px]">
            Learning is just the beginning. Discover tools and other resources —
            or connect with the GraphQL community around the world.
          </p>
        </div>
        <div className="flex flex-col">
          <a
            href="/resources"
            className="flex items-center justify-between border-b border-pri-light px-8 py-16 hover:bg-white/10 lg:px-8 lg:py-16"
          >
            <span className="typography-body-lg">Resources</span>
            <ArrowDownIcon className="size-10 shrink-0 -rotate-90 text-pri-light" />
          </a>
          <a
            href="/community"
            className="flex items-center justify-between px-8 py-16 hover:bg-white/10 lg:px-8 lg:py-16"
          >
            <span className="typography-body-lg">Community</span>
            <ArrowDownIcon className="size-10 shrink-0 -rotate-90 text-pri-light" />
          </a>
        </div>
      </div>
    </section>
  )
}
