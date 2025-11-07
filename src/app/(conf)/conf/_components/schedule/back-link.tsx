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
      className="w-max cursor-pointer rounded-md text-sm text-[#333333] no-underline underline-offset-2 transition-all"
    >
      <span>&lt; &nbsp;Back to {capitalize(kind)}</span>
    </NextLink>
  )
}

function capitalize(str: string) {
  return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase()
}
