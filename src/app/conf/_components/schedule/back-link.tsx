import NextLink from "next/link"

export function BackLink({ kind }: { kind: "speakers" | "sessions" }) {
  return (
    <NextLink
      href={`/conf/2023/${kind}`}
      className="w-max rounded-md underline-offset-2 cursor-pointer transition-all text-sm no-underline text-[#333333]"
    >
      <span>
        &lt; &nbsp;Back to {kind === "speakers" ? "Speakers" : "Sessions"}
      </span>
    </NextLink>
  )
}
