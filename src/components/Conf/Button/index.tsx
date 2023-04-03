import React from "react"

interface Props {
  text: React.ReactNode
  className?: string
  href?: string
  target?: string
}

const ButtonConf = ({ text, href, target, className }: Props) => {
  return (
    <button
      className={
        "transition ease-in-out no-underline inline-flex text-center bg-fuchsia-800 border-0 py-2 px-6 focus:outline-none hover:drop-shadow-md hover:scale-[101%] rounded text-lg" +
        (className ?? "")
      }
    >
      <a
        className="whitespace-nowrap cursor-pointer text-white no-underline hover:no-underline"
        href={href}
        target={target}
      >
        {text}
      </a>
    </button>
  )
}

export default ButtonConf
