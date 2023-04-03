import React from "react"

interface Props {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

const SectionConf = ({ id, title, children }: Props): JSX.Element => (
  <div key={id} id={id}>
    <h2>
      <a href={`#${id}`}>{title}</a>
    </h2>
    {children}
  </div>
)

export default SectionConf
