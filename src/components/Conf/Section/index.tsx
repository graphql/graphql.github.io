import React from "react"

interface Props {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

const SectionConf = ({ id, title, children }: Props): JSX.Element => (
  // Padding down so hash-links to this id display below the header menu
  <div key={id} id={id} className="pt-16 -mt-16">
    <h2>
      <a href={`#${id}`} className="no-underline">
        {title}
      </a>
    </h2>
    {children}
  </div>
)

export default SectionConf
