import { ComponentProps } from "react"
import ConfImage from "../2023/gallery/images/8.jpg"
import ConfImage2 from "../2023/gallery/images/9.jpg"
import NextImage from "next-image-export-optimizer"

const list = [
  { title: "Cloud Engineering" },
  { title: "Software Development" },
  { title: "Platform Engineering" },
  { title: "Data Engineering" },
  { title: "Technology Architecture" },
  { title: "Data Architecture" },
  { title: "Product Management" },
]

const whyAttend = [
  {
    title: (
      <>
        <b>Learn</b> about the latest developments in GraphQL and related
        technologies, including GraphQL Core and beyond.
      </>
    ),
  },
  {
    title: (
      <>
        <b>Discover</b> best practices and real-world use cases through engaging
        presentations and panel discussions.
      </>
    ),
  },
  {
    title: (
      <>
        <b>Connect</b> with leading companies that are using GraphQL to
        transform their businesses and industries.
      </>
    ),
  },
  {
    title: (
      <>
        <b>Build</b> your skills and deepen your understanding of GraphQL
        through workshops, tutorials, and code labs.
      </>
    ),
  },
  {
    title: (
      <>
        <b>Network</b> with a diverse and vibrant community of professionals who
        are passionate about GraphQL and its potential.
      </>
    ),
  },
]

const classes = {
  title: "md:text-center mb-5 lg:mb-20 conf-heading",
}

export function About() {
  return (
    <div className="bg-gray-100">
      <div className="conf-block container">
        <h2 className={classes.title}>About</h2>
        <div className="mb-20 grid gap-14 lg:grid-cols-2 xl:gap-28">
          <div className="lg:text-lg">
            <p>
              GraphQLConf – is the official conference produced by the GraphQL
              Foundation that brings together the global community of GraphQL
              developers, leaders and innovators to further the education,
              adoption and advancement of GraphQL implementations in the
              industry.
            </p>
            <br />
            <p>
              In the 8 years of GraphQL being around, we have seen adoption
              across some of the largest organizations globally with homegrown
              implementations, open source tooling and several vendor solutions
              that have enabled the ease of adoption, implementation and
              management of GraphQL.
            </p>
          </div>
          <NextImage
            src={ConfImage}
            className="aspect-video w-full rounded-md object-cover"
            alt="GraphQL Conf Image"
          />
        </div>

        <div className="grid gap-14 lg:grid-cols-2 xl:gap-28">
          <NextImage
            alt="GraphQL Conf Image"
            src={ConfImage2}
            className="aspect-square w-full rounded-md object-cover max-lg:order-2"
          />
          <div className="flex flex-col gap-14">
            <p className="lg:text-lg">
              In the 3 days of workshops, keynotes and talks from the
              ecosystems, GraphQLConf aims to be the forum where we bring the
              community together to share and learn about what’s working and
              where we need to innovate & collaborate to help business succeed
              with GraphQL.
            </p>
            <h4 className="text-2xl font-bold">
              GraphQLConf is particularly relevant for engineers, architects,
              and managers involved in:
            </h4>
            <ul className="grid gap-3 md:grid-cols-2">
              {list.map((item, index) => (
                <li key={index} className="flex gap-2 md:items-center">
                  <CheckIcon className="shrink-0 text-primary" />
                  <span className="font-bold">{item.title}</span>
                </li>
              ))}
            </ul>
            <p>
              It is also a great place for GraphQL contributors, service
              providers, and those exploring GraphQL to learn about the
              technology, build connections within the community, and increase
              their knowledge about GraphQL powered application development.
            </p>
          </div>
        </div>
      </div>
      <div className="conf-block container">
        <h2 className={classes.title}>Why Attend?</h2>
        <ul
          role="list"
          className="ml-0 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-14"
        >
          {whyAttend.map((item, index) => (
            <li key={index} className="flex gap-4">
              <CheckIcon className="shrink-0 text-primary" />
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function CheckIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12.6743" cy="12.7295" r="12.6743" />
      <path
        d="M7.34351 12.3985L10.8974 16.1893L18.0051 9.26965"
        stroke="white"
        strokeWidth="3"
      />
    </svg>
  )
}
