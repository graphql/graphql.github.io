import React from "react"

const list = [
  {
    title: "Cloud Engineering",
  },
  {
    title: "Software Development",
  },
  {
    title: "Platform Engineering",
  },
  {
    title: "Data Engineering",
  },
  {
    title: "Technology Architecture",
  },
  {
    title: "Data Architecture",
  },
  {
    title: "Product Management",
  },
]

const whyAttend = [
  {
    title:
      "Learn about the latest developments in GraphQL and related technologies, including GraphQL Core and beyond.",
  },
  {
    title:
      "Discover best practices and real-world use cases through engaging presentations and panel discussions.",
  },
  {
    title:
      "Connect with leading companies that are using GraphQL to transform their businesses and industries.",
  },
  {
    title:
      "Build your skills and deepen your understanding of GraphQL through workshops, tutorials, and code labs.",
  },
  {
    title:
      "Network with a diverse and vibrant community of professionals who are passionate about GraphQL and its potential.",
  },
]

const ContantSectionConf = () => {
  return (
    <div className="bg-white relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-2xl font-bold leading-7 text-[#862e69]">
                About
              </p>
              <h1 className=" text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                GRAPHQLCONF | SEP 19 – 21
              </h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                GraphQLConf – is the official conference produced by the GraphQL
                Foundation that brings together the global community of GraphQL
                developers, leaders and innovators to further the education,
                adoption and advancement of GraphQL implementations in the
                industry.
              </p>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                In the 8 years of GraphQL being around, we have seen adoption
                across some of the largest organizations globally with homegrown
                implementations, open source tooling and several vendor
                solutions that have enabled the ease of adoption, implementation
                and management of GraphQL.
              </p>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                In the 3 days of workshops, keynotes and talks from the
                ecosystems, GraphQLConf aims to be the forum where we bring the
                community together to share and learn about what’s working and
                where we need to innovate & collaborate to help business succeed
                with GraphQL.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            className="w-[36rem] max-w-none rounded-xl sm:w-[36rem]"
            src="/img/conf/graphql-conf-footer.png"
            alt="logo-color"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>
                GraphQLConf is particularly relevant for engineers, architects,
                and managers involved in:
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                {list.map((item, index) => (
                  <li key={index} className="flex gap-x-3">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      className="text-[#862e69] w-6 h-6 flex-shrink-0 mr-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                      <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                    <span>
                      <strong className="font-semibold text-gray-900">
                        {item.title}
                      </strong>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-8">
                It is also a great place for GraphQL contributors, service
                providers, and those exploring GraphQL to learn about the
                technology, build connections within the community, and increase
                their knowledge about GraphQL powered application development.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                WHY ATTEND?
              </h2>
              <p>
                GraphQLConf is particularly relevant for engineers, architects,
                and managers involved in:
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                {whyAttend.map((item, index) => (
                  <li key={index} className="flex gap-x-3">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      className="text-[#862e69] w-6 h-6 flex-shrink-0 mr-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                      <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                    <span>
                      <strong className="font-semibold text-gray-900">
                        {item.title}
                      </strong>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContantSectionConf
