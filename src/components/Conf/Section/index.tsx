import React from "react"

interface Props {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}
const SectionConf = ({
  id,
  title,
  children,
  className,
}: Props): JSX.Element => (
  <section id={id} className={`px-0 pt-32 -mt-28 ${className ?? ''}`}>
    <h2><a href={`#${id}`}>{title}</a></h2>
    {children}
  </section>
)

export default SectionConf
