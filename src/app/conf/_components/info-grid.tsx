import React from "react"

type InfoGridProps = {
  title: string
  subtitle: string
  id?: string
  listItems: { title: string; description: string }[]
}

export const InfoGrid: React.FC<InfoGridProps> = ({
  title,
  subtitle,
  listItems,
  id,
}) => (
  <section id={id}>
    <h1 className="mb-4 text-5xl font-bold text-white">{title}</h1>
    <p className="mb-8 text-lg font-normal text-white">{subtitle}</p>

    {/* Horizontal Scrollable Grid */}
    <div
      style={{
        scrollSnapType: "x mandatory",
      }}
      className="scroll-snap-x flex snap-mandatory gap-6 overflow-x-auto lg:grid lg:grid-cols-3 lg:overflow-visible"
    >
      {listItems.map(({ title, description }, index) => (
        <div
          key={index}
          className="lg-w[80%] w-[70%] flex-shrink-0 snap-start border border-primary p-6 text-white shadow-lg lg:w-full lg:max-w-sm"
        >
          <h2 className="mb-2 text-2xl font-bold">{title}</h2>
          <p
            className="text-base [&>a]:underline [&>a]:hover:text-primary"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
      ))}
    </div>
  </section>
)
