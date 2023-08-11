import React from "react"

export const BackLink = ({ kind }: { kind: "speakers" | "schedule" }) => {
  return (
    <a
      href={`/conf/${kind}`}
      className="w-max rounded-md underline-offset-2 cursor-pointer transition-all text-sm no-underline text-[#333333]"
    >
      <span>
        {"<"}&nbsp;&nbsp;Back to {kind === "speakers" ? "Speakers" : "Schedule"}
      </span>
    </a>
  )
}
