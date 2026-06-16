import { clsx } from "clsx"
import { Anchor } from "@/app/conf/_design-system/anchor"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"

type LinkItem = { href: string; label: string }

interface LookingForMoreProps extends React.HTMLAttributes<HTMLElement> {
  description: string
  links: [LinkItem, LinkItem]
}

export function LookingForMore({
  description,
  links,
  ...props
}: LookingForMoreProps) {
  return (
    <section
      {...props}
      className={clsx("gql-container gql-section", props.className)}
    >
      <div className="mx-auto grid max-w-[1504px] gap-0 bg-pri-dark text-white dark:bg-pri-darker lg:grid-cols-[752px_1fr]">
        <div className="flex flex-col justify-between gap-6 border-pri-light p-6 xs:gap-8 xs:p-8 lg:border-r lg:p-16">
          <h2 className="typography-h2 text-balance">Looking for more?</h2>
          <p className="typography-body-lg max-w-[624px]">{description}</p>
        </div>
        <div className="flex flex-col">
          <Anchor
            href={links[0].href}
            className="flex items-center justify-between border-y border-pri-light px-6 py-10 hover:bg-white/10 xs:px-8 xs:py-16 lg:border-t-0"
          >
            <span className="typography-body-lg">{links[0].label}</span>
            <ArrowDownIcon className="size-10 shrink-0 -rotate-90 text-pri-light" />
          </Anchor>
          <Anchor
            href={links[1].href}
            className="flex items-center justify-between px-6 py-10 hover:bg-white/10 xs:px-8 xs:py-16"
          >
            <span className="typography-body-lg">{links[1].label}</span>
            <ArrowDownIcon className="size-10 shrink-0 -rotate-90 text-pri-light" />
          </Anchor>
        </div>
      </div>
    </section>
  )
}
