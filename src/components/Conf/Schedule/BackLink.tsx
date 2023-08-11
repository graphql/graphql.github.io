import React from "react"

export const BackLink = () => {
  return (
    <a
      href="/conf/schedule"
      className="w-max rounded-md underline-offset-2 cursor-pointer transition-all text-sm no-underline text-[#333333]"
    >
      <span>{"<"}&nbsp;&nbsp;Back to Schedule</span>
    </a>
  )
}
