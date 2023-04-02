import React from "react"

interface Props {
  title: string
  classNameTitle?: string
  className?: string
}

const ContantConf = ({ title, classNameTitle, className }: Props) => {
  return (
    <>
      <div className={className ?? "w-full text-center m-5 "}>
        <span
          className={
            classNameTitle ??
            "bg-white text-[#562556] text-3xl font-bold  mr-2 px-2.5 py-0.5 rounded"
          }
        >
          {title}
        </span>
      </div>
    </>
  )
}

export default ContantConf
