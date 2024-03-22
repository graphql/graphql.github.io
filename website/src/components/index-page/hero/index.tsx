import Link from "next/link"
import { CodeA, CodeB, CodeC } from "../../code-blocks"
import { GraphQLLogo } from "@/icons"
import { clsx } from "clsx"
import classes from "./index.module.css"

export function Hero() {
  return (
    <div className="hero dark">
      <div className="container conf-block">
        <section
          className={clsx(
            "flex-wrap gap-14 justify-center items-center flex max-sm:flex-col",
            "[&_h3]:text-white [&_h3]:text-2xl max-lg:[&_h3]:text-center",
            "[&_pre]:!bg-transparent [&_pre]:ring-0 [&_pre_span]:text-[--shiki-dark]",
            "[&_h3]:font-extralight",
          )}
        >
          <div
            className={clsx(
              "max-md:grow max-xl:w-full flex flex-col items-center gap-2",
              classes.logo,
            )}
          >
            <GraphQLLogo className="w-24" />
            <h1 className="text-primary text-3xl">GraphQL</h1>
          </div>

          <div className={classes.col1}>
            <h3>Describe your data</h3>
            <CodeA />
          </div>

          <div className={classes.col2}>
            <h3>Ask for what you want</h3>
            <CodeB />
          </div>

          <div className={classes.col3}>
            <h3>Get predictable results</h3>
            <CodeC />
          </div>
        </section>

        <div
          className={clsx("flex gap-2 justify-center pt-10", classes.buttons)}
        >
          <Link className={classes.button} href="/code">
            Get Started
          </Link>
          <Link className={classes.button} href="/learn">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}
