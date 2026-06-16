import NextLink from "next/link"
import { clsx } from "clsx"

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

export function GraphQLLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50 6.90308L87.323 28.4515V71.5484L50 93.0968L12.677 71.5484V28.4515L50 6.90308ZM16.8647 30.8693V62.5251L44.2795 15.0414L16.8647 30.8693ZM50 13.5086L18.3975 68.2457H81.6025L50 13.5086ZM77.4148 72.4334H22.5852L50 88.2613L77.4148 72.4334ZM83.1353 62.5251L55.7205 15.0414L83.1353 30.8693V62.5251Z"
      />
      <circle cx="50" cy="9.3209" r="8.82" />
      <circle cx="85.2292" cy="29.6605" r="8.82" />
      <circle cx="85.2292" cy="70.3396" r="8.82" />
      <circle cx="50" cy="90.6791" r="8.82" />
      <circle cx="14.7659" cy="70.3396" r="8.82" />
      <circle cx="14.7659" cy="29.6605" r="8.82" />
    </svg>
  )
}
