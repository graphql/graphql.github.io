import Link from "next/link"
import { CodeA, CodeB, CodeC } from "../code-blocks"
import { GraphQLLogo } from "@/icons"
import { clsx } from "clsx"

export function Hero() {
  return (
    <div className="hero dark">
      <div className="container conf-block">
        <section
          className={clsx(
            "flex-wrap gap-14 justify-center items-center flex [&_pre]:inline-block max-sm:flex-col",
            "[&_h3]:text-white [&_h3]:text-2xl max-lg:[&_h3]:text-center",
            "[&_pre]:!bg-transparent [&_pre]:ring-0 [&_pre_span]:text-[--shiki-dark]",
            '[&_h3]:font-extralight'
          )}
        >
          <div className="named-logo max-md:grow max-xl:w-full flex flex-col items-center gap-2">
            <GraphQLLogo className="size-24" />
            <h1 className="text-primary text-3xl">GraphQL</h1>
          </div>

          <div className="marketing-col">
            <h3>Describe your data</h3>
            <CodeA />
          </div>

          <div className="marketing-col">
            <h3>Ask for what you want</h3>
            <CodeB />
          </div>

          <div className="marketing-col">
            <h3>Get predictable results</h3>
            <CodeC />
          </div>
        </section>

        <div className="buttons-unit flex gap-2 justify-center pt-10">
          <Link className="button" href="/code">
            Get Started
          </Link>
          <Link className="button" href="/learn">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}
