import React from "react"

interface Props {
  text: React.ReactNode
  className?: string
  href?: string
  target?: string
  onWhiteBg?: boolean
}

const ButtonConf = ({ text, href, target, className, onWhiteBg }: Props) => {
  return (
    <button
      className={
        `transition ease-in-out no-underline inline-flex text-center ${
          onWhiteBg ? "bg-[#0e031c]" : "bg-white"
        } border-0 py-2 px-6 focus:outline-none hover:drop-shadow-md hover:scale-105 rounded text-lg ` +
        (className ?? "")
      }
    >
      <a
        className={`text-sm sm:text-base font-medium whitespace-nowrap cursor-pointer ${
          onWhiteBg ? "text-white" : "text-black"
        } no-underline hover:no-underline`}
        href={href}
        target={target}
      >
        {text}
      </a>
    </button>
  )
}

export default ButtonConf
