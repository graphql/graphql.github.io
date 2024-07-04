import NextLink from "next/link"

export function BackLink({
  year,
  kind,
}: {
  year: "2023" | "2024"
  kind: "speakers" | "sessions" | "schedule"
}) {
  return (
    <NextLink
      href={`/conf/${year}/${kind}`}
      className="w-max rounded-md underline-offset-2 cursor-pointer transition-all text-sm no-underline text-[#333333]"
    >
      <span>&lt; &nbsp;Back to {capitalize(kind)}</span>
    </NextLink>
  )
}

function capitalize(str: string) {
  return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase()
}
