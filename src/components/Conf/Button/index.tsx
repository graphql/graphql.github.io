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
    <a
      className={
        `block cursor-pointer transition ease-in-out no-underline inline-flex text-center w-[fit-content] border-0 py-2 px-6 no-underline hover:no-underline focus:outline-none hover:drop-shadow-md hover:[transform:scale(1.05)] rounded text-sm sm:text-base font-medium whitespace-nowrap ${onWhiteBg ? "bg-[#B48EF1] text-white" : "bg-white text-black"
        } ${className ?? ""}`
      }
      href={href}
      target={target}
    >
      {text}
    </a>
  )
}

export default ButtonConf
