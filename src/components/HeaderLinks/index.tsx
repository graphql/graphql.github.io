import React, { useState } from "react"
import Link from "../Link"
import Search from "../Search";

interface LinkItem {
  section: string
  text: string
  href: string
}

const links: LinkItem[] = [
  { section: "learn", text: "Learn", href: "/learn/" },
  { section: "code", text: "Code", href: "/code/" },
  { section: "community", text: "Community", href: "/community/" },
  { section: "faq", text: "FAQ", href: "/faq/" },
  {
    section: "spec",
    text: "Spec",
    href: "https://graphql.github.io/graphql-spec/",
  },
  {
    section: "codeofconduct",
    text: "Code of Conduct",
    href: "/codeofconduct/",
  },
  {
    section: "foundation",
    text: "Foundation",
    href: "https://foundation.graphql.org/",
  },
  { section: "landscape", text: "Landscape", href: "https://l.graphql.org/" },
]
export default () => {
  const [expanded,setExpanded] = useState(false);
  const handleClick = ()=>{
    setExpanded(!expanded);
  }
  let classname = expanded?'navbar-links active':'navbar-links';
  return(
    <nav className='navbar'>
      <div className='toggle-button' onClick={handleClick}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <div className={classname}>
        <ul>
        {links.map((link, i) => (
        <li key={i}>
          <Link href={link.href}>
          {link.text}
          </Link>
        </li>
        ))}
        </ul>
      </div>
    </nav>
  )
}
