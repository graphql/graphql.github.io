import React from "react"
import { Link } from "gatsby"

interface Props {
  children?: React.ReactNode
  href: string
  className?: string
}

const LinkWrapped = ({ href, children, className, ...props }: Props) => {
  const isExternalUrl = href.slice(0, 4) === "http"

  return isExternalUrl ? (
    <a
      key={href}
      href={href}
      target="_blank"
      rel={"noopener noreferrer"}
      className={className}
      {...props}
    >
      {children}
    </a>
  ) : (
    <Link to={href} key={href} className={className} {...props}>
      {children}
    </Link>
  )
}

export default LinkWrapped
