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
    <h1 className="text-white text-5xl font-bold mb-4">{title}</h1>
    <p className="text-white text-lg font-normal mb-8">{subtitle}</p>

    {/* Horizontal Scrollable Grid */}
    <div
      style={{
        scrollSnapType: "x mandatory",
      }}
      className="flex gap-6 overflow-x-auto scroll-snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible"
    >
      {listItems.map(({ title, description }, index) => (
        <div
          key={index}
          className="snap-start flex-shrink-0 lg-w[80%] w-[70%] lg:w-full lg:max-w-sm border border-primary p-6 shadow-lg text-white"
        >
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p
            className="text-base [&>a]:underline [&>a]:hover:text-primary"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
      ))}
    </div>
  </section>
)
