import Link from "next/link"
import { CodeA, CodeB, CodeC } from "../code-blocks"
import { GraphQLLogo } from "@/icons"
import { clsx } from "clsx"
import NextImage from "next-image-export-optimizer"
import ArchImg from "public/img/diagrams/graphql-client-server.png"
import { arch } from "os"

export function Hero() {
  return (
    <div className="xl:py-12">
      <div className="relative conf-block">
        <section
          className={clsx(
            "container flex gap-14 max-sm:flex-col",
          )}
        >
          <div className="max-md:grow max-xl:w-full flex flex-col items-center left-1">
            <GraphQLLogo className="w-24" />
            <h1 className="text-primary text-3xl">GraphQL</h1>
          </div>

          <div className="left-1">
            <h2>A query language for your API</h2>
            <p className="left-1">
              GraphQL is a query language for APIs and a runtime for fulfilling
              those queries with your existing data. GraphQL provides a complete and
              understandable description of the data in your API, gives clients the
              power to ask for exactly what they need and nothing more, makes it
              easier to evolve APIs over time, and enables powerful developer tools.
            </p>
          </div>
          <NextImage
            src={ArchImg}
            alt="GraphQL Client Server Architecture"
            className="max-w-full"
          />
        </section>
        <Link
          className="text-black border-black index-button block w-fit mx-auto mt-10"
          href="/learn"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}
