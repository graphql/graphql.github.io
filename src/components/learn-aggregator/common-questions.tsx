import { clsx } from "clsx"

import { Eyebrow } from "@/_design-system/eyebrow"
import ArrowDownIcon from "@/app/conf/_design-system/pixelarticons/arrow-down.svg?svgr"
import { Anchor } from "@/app/conf/_design-system/anchor"

export function CommonQuestionsSection(
  props: React.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <section
      {...props}
      className={clsx(
        "gql-section gql-container grid-rows-[auto_auto_1fr] *:[grid-column:1] lg:grid lg:grid-cols-[1fr_auto]",
        props.className,
      )}
    >
      <Eyebrow>FAQ</Eyebrow>
      <h2 className="typography-h2 mt-6">Common questions</h2>
      <p className="typography-body-md mt-6">
        Find answers to the most common questions about GraphQL — from getting
        started to advanced use cases. This also covers frontend concerns and
        info about the official specification.
      </p>
      <ul className="row-span-full mt-6 ![grid-column:2] *:border-b *:border-neu-200 dark:*:border-neu-100 lg:w-[380px] xl:w-[496px]">
        <CommonQuestionsItem
          title="Getting started"
          href="/faq#getting-started"
        />
        <CommonQuestionsItem title="General" href="/faq#general" />
        <CommonQuestionsItem
          title="Best practices"
          href="/faq#best-practices"
        />
        <CommonQuestionsItem title="Specification" href="/faq#specification" />
        <CommonQuestionsItem title="Frontend" href="/faq#frontend" />
        <CommonQuestionsItem title="Foundation" href="/faq#foundation" />
      </ul>
    </section>
  )
}

function CommonQuestionsItem({ title, href }: { title: string; href: string }) {
  return (
    <li className="hover:!border-current">
      <Anchor
        href={href}
        className="typography-body-lg -mx-4 flex items-center justify-between p-4 text-neu-800 hover:text-neu-900 dark:text-neu-700"
      >
        {title}
        <ArrowDownIcon className="size-6 shrink-0 -rotate-90" />
      </Anchor>
    </li>
  )
}
