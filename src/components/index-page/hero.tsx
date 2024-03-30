import Link from "next/link"
import { CodeA, CodeB, CodeC } from "../code-blocks"
import { GraphQLLogo } from "@/icons"
import { clsx } from "clsx"

export function Hero() {
  return (
    <div className="hero">
      <div className="container conf-block">
        <section
          className={clsx(
            "flex-wrap gap-14 justify-center items-center flex max-sm:flex-col",
            "[&_h3]:text-white [&_h3]:text-2xl max-lg:[&_h3]:text-center",
            "[&_pre]:!bg-transparent [&_pre]:ring-0 [&_pre_span]:text-[--shiki-dark]",
            "[&_h3]:font-extralight",
            "[&_code]:whitespace-pre-wrap" /* fix scroll on mobile for code-blocks */,
          )}
        >
          <div className="max-md:grow max-xl:w-full flex flex-col items-center gap-2">
            <GraphQLLogo className="w-24" />
            <h1 className="text-primary text-3xl">GraphQL</h1>
          </div>

          <div>
            <h3>Describe your data</h3>
            <CodeA />
          </div>

          <div>
            <h3>Ask for what you want</h3>
            <CodeB />
          </div>

          <div>
            <h3>Get predictable results</h3>
            <CodeC />
          </div>
        </section>

        <Link className="text-white border-white index-button block w-fit mx-auto mt-10" href="/learn">
          Get Started
        </Link>
      </div>
    </div>
  )
}
