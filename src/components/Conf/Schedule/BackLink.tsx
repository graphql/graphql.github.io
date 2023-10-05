import React from "react"

export const BackLink = ({ kind }: { kind: "speakers" | "sessions" }) => {
  return (
    <a
      href={`/conf/${kind}`}
      className="w-max rounded-md underline-offset-2 cursor-pointer transition-all text-sm no-underline text-[#333333]"
    >
      <span>
        &lt; &nbsp;Back to {kind === "speakers" ? "Speakers" : "Sessions"}
      </span>
    </a>
  )
}
