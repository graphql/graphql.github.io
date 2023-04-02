import React from "react"

interface Props {
  text: React.ReactNode
  className?: string
  href?: string
}

const ButtonConf = ({ text, href, className }: Props) => {
  return (
    <button
      className={
        className ??
        "transition ease-in-out no-underline inline-flex text-white bg-[--rhodamine] border-0 py-2 px-6 focus:outline-none hover:drop-shadow-lg hover:scale-105 rounded text-lg"
      }
    >
      <a className="cursor-pointer no-underline hover:no-underline" href={href}>
        {text}
      </a>
    </button>
  )
}

export default ButtonConf
