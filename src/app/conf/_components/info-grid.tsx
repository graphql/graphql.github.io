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
    <h1 className="typography-h2 mb-4">{title}</h1>
    <p className="typography-body-lg xl:mb-4">{subtitle}</p>
    <div
      style={{
        scrollSnapType: "x mandatory",
      }}
      className="-mx-4 flex gap-6 overflow-x-auto p-4 lg:grid lg:grid-cols-3 lg:overflow-visible"
    >
      {listItems.map(({ title, description }, index) => (
        <div key={index} className="min-w-64 border border-neu-400 p-3">
          <h2 className="typography-body-lg mb-2">{title}</h2>
          <p
            className="typography-body-md [&_a]:typography-link"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
      ))}
    </div>
  </section>
)
