import NextLink from "next/link"
import { clsx } from "clsx"

import { GraphQLLogo } from "@/components/og-image/graphql-logo"

export interface GraphQLConfLogoLinkProps
  extends React.HTMLAttributes<HTMLDivElement> {
  year: number
}

export function GraphQLConfLogoLink({
  className,
  year,
  ...rest
}: GraphQLConfLogoLinkProps) {
  return (
    <div
      className={clsx(
        "flex items-center gap-2 text-xl/none uppercase",
        className,
      )}
      {...rest}
    >
      <NextLink href="/" className="-m-1 p-1 hover:bg-neu-900/10">
        <GraphQLLogo className="h-6" />
      </NextLink>
      <span>/</span>
      <NextLink
        href={`/conf/${year}`}
        className="-m-2 p-2 underline-offset-4 hover:underline"
      >
        GraphQLConf {year}
      </NextLink>
    </div>
  )
}
